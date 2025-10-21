
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">Loading Active Sessions...</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">Please wait a moment.</p>
    </div>
  );
};

export default LoadingSpinner;
