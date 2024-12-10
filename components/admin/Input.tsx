import React from 'react';

interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({ name, label, placeholder, type = 'text', value, onChange, className }) => {
  return (
    <div className="flex flex-col mb-4">
      {label && <label htmlFor={name} className="text-gray-700 font-medium mb-1">{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;
