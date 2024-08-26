import '../../styles/password-validation.css';
import React from 'react';
const ValidationRow = ({ isValid, label }: { isValid: boolean, label: string }) => (

    <div className="validation-row">
      {isValid ? (
        <div className="validation-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="blue"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
        </div>
      ) : (
        <div className="validation-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D1D5DB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
        </div>
      )}
      <p className='text-gray-400 text-small' style={{ fontSize: '0.65rem' }}>{label}</p>
    </div>
  );

  export default ValidationRow;