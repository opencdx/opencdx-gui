import React, { useState } from 'react';
import Image from 'next/image';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isTitleBold?: boolean;
}

const ControlledAccordion: React.FC<AccordionProps> = ({ title, children, isTitleBold = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='px-4'>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        {title && <label className={` text-sm ${isTitleBold ? 'font-bold' : ''} text-black`}>{title}</label>}
        <Image
          src={isExpanded ? '/images/arrow-up.png' : '/images/arrow-down.png'}
          alt={isExpanded ? 'Collapse' : 'Expand'}
          width={20}
          height={20}
          className="transform transition-transform duration-300"
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          priority
        />
      </div>
      {isExpanded && <div className='py-4'>{children}</div>}
    </div>
  );
};

export default ControlledAccordion;

