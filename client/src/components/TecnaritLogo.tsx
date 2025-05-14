import React from 'react';

const TecnaritLogo: React.FC = () => {
  return (
    <div className="bg-tecnarit-gradient rounded-lg p-1 w-full h-full">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className="fill-current text-secondary"
      >
        <path d="M50.3,22.5c-3.2,0-5.8,2.6-5.8,5.8v19.2H38c-3.2,0-5.8,2.6-5.8,5.8v13.3c0,3.2,2.6,5.8,5.8,5.8s5.8-2.6,5.8-5.8V56.1h11.8
        c3.2,0,5.8-2.6,5.8-5.8V28.3C61.5,25.1,58.9,22.5,50.3,22.5z M44.6,28.3c0-3.2,2.6-5.8,5.8-5.8s5.8,2.6,5.8,5.8v22H44.6V28.3z" />
        <path d="M67.8,53.3c-3.2,0-5.8,2.6-5.8,5.8v13.3c0,3.2,2.6,5.8,5.8,5.8s5.8-2.6,5.8-5.8V59.2C73.7,56,71.1,53.3,67.8,53.3z" />
      </svg>
    </div>
  );
};

export default TecnaritLogo;