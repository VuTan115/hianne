import React from 'react';

interface FullWidthInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FullWidthInput: React.FC<FullWidthInputProps> = (props) => {
  return (
    <input
      className='w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-1 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
      {...props}
    />
  );
};

export default FullWidthInput;
