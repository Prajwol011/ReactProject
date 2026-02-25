import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  // variants: 'primary' (brown), 'danger' (red), 'outline' (transparent)
  return (
    <button 
      className={`custom-btn btn-${variant} ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;