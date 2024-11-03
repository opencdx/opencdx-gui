import fetch from 'node-fetch';

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

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      timeout: 5000, // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`Census API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Check if the API returned any matches
    if (!data.result?.addressMatches?.length) {
      throw new Error('No matching addresses found');
    }

    return {
      success: true,
      data: data.result.addressMatches[0],
      timestamp: new Date().toISOString(),
    };

  } catch (error) {
    // Handle different types of errors
    if (error.name === 'AbortError') {
      throw new Error('Request timed out while validating address');
    }
    if (error.name === 'TypeError') {
      throw new Error('Network error while validating address');
    }
    
    // If it's our custom error, pass it through
    if (error.message.includes('Census API error') || 
        error.message === 'No matching addresses found') {
      throw error;
    }

    // For any other errors, throw a generic message
    throw new Error(`Address validation failed: ${error.message}`);
  }
}

export { validateAddress };