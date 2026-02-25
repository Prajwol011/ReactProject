import React from 'react';

const Badge = ({ text, type }) => {
  // types: 'success' (green), 'warning' (gold), 'danger' (red)
  return (
    <span className={`badge badge-${type}`}>
      {text}
    </span>
  );
};

export default Badge;