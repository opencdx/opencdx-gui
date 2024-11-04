import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

/**
 * Validates and formats a US address using the Census Geocoding API
 * @param {string} address - The address to validate
 * @returns {Promise<Object>} The validated address data
 * @throws {Error} If validation fails
 */
async function validateAddress(address) {
  // Input validation
  if (!address || typeof address !== 'string') {
    throw new Error('Address must be a non-empty string');
  }

  const trimmedAddress = address.trim();
  if (trimmedAddress.length < 5) {
    throw new Error('Address is too short to be valid');
  }

  try {
    const url = new URL('https://geocoding.geo.census.gov/geocoder/locations/onelineaddress');
    url.searchParams.append('address', trimmedAddress);
    url.searchParams.append('benchmark', '2020');
    url.searchParams.append('format', 'json');

    console.log('Calling Census API:', url.toString()); // Debug URL

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      timeout: 5000,
    });

    if (!response.ok) {
      throw new Error(`Census API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Census API response:', JSON.stringify(data, null, 2)); // Debug response

    // More detailed response validation
    if (!data.result) {
      throw new Error('Invalid response from Census API: Missing result object');
    }

    if (!data.result.addressMatches || !Array.isArray(data.result.addressMatches)) {
      throw new Error('Invalid response from Census API: Missing address matches array');
    }

    if (data.result.addressMatches.length === 0) {
      return {
        success: false,
        error: 'No matching addresses found',
        details: {
          inputAddress: trimmedAddress,
          apiResponse: data,
          suggestion: 'Please verify the address format: street, city, state, ZIP'
        },
        timestamp: new Date().toISOString(),
      };
    }

    const match = data.result.addressMatches[0];
    return {
      success: true,
      data: {
        matchedAddress: match.matchedAddress,
        coordinates: match.coordinates,
        tigerLine: match.tigerLine,
        addressComponents: match.addressComponents,
        inputAddress: trimmedAddress,
      },
      quality: {
        matchScore: match.score || 'N/A',
        matchType: match.matchedAddressType || 'N/A',
        isExact: match.exactMatch || false,
      },
      timestamp: new Date().toISOString(),
    };

  } catch (error) {
    // Enhanced error handling
    let errorResponse = {
      success: false,
      timestamp: new Date().toISOString(),
      inputAddress: trimmedAddress,
    };

    if (error.name === 'AbortError') {
      errorResponse.error = 'Request timed out while validating address';
      errorResponse.details = { timeoutLimit: '5 seconds' };
    } else if (error.name === 'TypeError') {
      errorResponse.error = 'Network error while validating address';
      errorResponse.details = { 
        suggestion: 'Please check your internet connection or try again later',
        originalError: error.message
      };
    } else if (error.message.includes('Census API error')) {
      errorResponse.error = error.message;
      errorResponse.details = {
        suggestion: 'The Census API service might be experiencing issues',
        statusCode: error.status
      };
    } else {
      errorResponse.error = `Address validation failed: ${error.message}`;
      errorResponse.details = {
        errorType: error.name,
        errorStack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      };
    }

    return errorResponse;
  }
}

// Add GET endpoint
app.get('/validate-address', async (req, res) => {
  try {
    const { address } = req.query;
    console.log('Received address:', address);

    if (!address) {
      return res.status(400).json({
        success: false,
        error: 'No address provided',
        receivedAddress: address,
        timestamp: new Date().toISOString(),
        statusCode: 400,
        details: {
          suggestion: 'Please provide an address to validate'
        }
      });
    }

    const result = await validateAddress(address);
    
    // Add status code to successful response
    res.status(200).json({
      ...result,
      statusCode: 200
    });
  } catch (error) {
    console.error('Validation error:', error);
    
    const statusCode = error.statusCode || 400;
    
    // If it's our formatted error response, send it directly with status code
    if (error.success === false) {
      res.status(statusCode).json({
        ...error,
        statusCode
      });
    } else {
      // Otherwise, format the error
      res.status(statusCode).json({
        success: false,
        error: error.message,
        receivedAddress: req.query.address,
        timestamp: new Date().toISOString(),
        statusCode,
        details: {
          errorType: error.name,
          suggestion: 'Please verify the address format and try again',
          errorStack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }
      });
    }
  }
});

// Add proxy endpoint
app.post('/validate-address', async (req, res) => {
  try {
    const { address } = req.body;
    const result = await validateAddress(address);
    res.json(result);
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});

export { validateAddress };