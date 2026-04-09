import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      {/* Loading Text */}
      <p className="text-blue-500 text-lg font-semibold">Loading...</p>
    </div>
  );
};

export default Loading;