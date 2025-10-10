'use client';

import { Card, CardBody, Button } from 'ui-library';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
  componentName?: string;
}

export function ErrorFallback({ error, resetErrorBoundary, componentName }: ErrorFallbackProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <Card className="max-w-2xl w-full">
        <CardBody className="p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <svg 
                  className="h-6 w-6 text-red-600 dark:text-red-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {componentName ? `${componentName} Failed to Load` : 'Content Failed to Load'}
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400">
              There was an error loading this section. Other parts of the application should continue to work normally.
            </p>
            
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                Technical Details
              </summary>
              <div className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-xs font-mono text-gray-800 dark:text-gray-200 break-all">
                  {error.message}
                </p>
                {error.stack && (
                  <pre className="mt-2 text-xs text-gray-600 dark:text-gray-400 overflow-x-auto">
                    {error.stack.split('\n').slice(0, 5).join('\n')}
                  </pre>
                )}
              </div>
            </details>

            {resetErrorBoundary && (
              <div className="flex gap-2 mt-6">
                <Button
                  color="primary"
                  onPress={resetErrorBoundary}
                  aria-label="Try again"
                >
                  Try Again
                </Button>
                <Button
                  variant="bordered"
                  onPress={() => window.location.href = '/pages/dashboard'}
                  aria-label="Go to dashboard"
                >
                  Go to Dashboard
                </Button>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

