import React from 'react';

export default function ConfigPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Available Configuration Options
        </h1>
        
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Account Information
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              When enabled, users will be required to provide account details during registration.
            </p>
            
            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md">
              <input
                type="checkbox"
                id="accountRequired"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label 
                htmlFor="accountRequired" 
                className="text-sm text-gray-700 cursor-pointer select-none"
              >
                Require account details during registration
              </label>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Shipping & Address Settings
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Configure shipping address requirements and validation settings for checkout process.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md">
                <input
                  type="checkbox"
                  id="shippingRequired"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label 
                  htmlFor="shippingRequired" 
                  className="text-sm text-gray-700 cursor-pointer select-none"
                >
                  Require shipping address during checkout
                </label>
              </div>

              <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md">
                <input
                  type="checkbox"
                  id="addressValidation"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label 
                  htmlFor="addressValidation" 
                  className="text-sm text-gray-700 cursor-pointer select-none"
                >
                  Enable real-time address validation
                </label>
              </div>
            </div>
          </div>

          <div className="pb-4">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Welcome Screen Types
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Select the type of welcome experience users will see when they first access the application.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-md">
                <input
                  type="radio"
                  id="welcomeDefault"
                  name="welcomeType"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-1 cursor-pointer"
                />
                <div>
                  <label 
                    htmlFor="welcomeDefault" 
                    className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                  >
                    Default
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    Standard welcome experience with basic onboarding steps and platform introduction.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-md">
                <input
                  type="radio"
                  id="welcomeInternal"
                  name="welcomeType"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-1 cursor-pointer"
                />
                <div>
                  <label 
                    htmlFor="welcomeInternal" 
                    className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                  >
                    Custom Internal
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    Customized in-app welcome flow with organization-specific branding and onboarding steps.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-md">
                <input
                  type="radio"
                  id="welcomeExternal"
                  name="welcomeType"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-1 cursor-pointer"
                />
                <div>
                  <label 
                    htmlFor="welcomeExternal" 
                    className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                  >
                    Custom External
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    Integration with an external welcome page or portal system for complete customization control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}