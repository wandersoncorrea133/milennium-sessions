
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <AlertTriangle className="h-12 w-12 text-red-500" />
      <h3 className="mt-4 text-lg font-semibold text-red-800 dark:text-red-300">Something went wrong</h3>
      <p className="mt-2 max-w-md text-sm text-red-600 dark:text-red-400">{message}</p>
      <button
        onClick={onRetry}
        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </button>
    </div>
  );
};

export default ErrorDisplay;
