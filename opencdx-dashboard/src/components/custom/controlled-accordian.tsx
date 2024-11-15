import React, { useState } from 'react';
import Image from 'next/image';
import arrowDown from '../../../public/images/arrow-down.png';
import arrowUp from '../../../public/images/arrow-up.png';
import { cn } from '@/lib/utils';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isTitleBold?: boolean;
  className?: string;
}

const ControlledAccordion: React.FC<AccordionProps> = ({ title, children, isTitleBold = true, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={cn('px-4', className)}>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        {title && <label className={` text-sm ${isTitleBold ? 'font-bold' : ''} text-black`}>{title}</label>}
        <Image
          src={isExpanded ? arrowUp : arrowDown}
          alt={isExpanded ? 'Collapse' : 'Expand'}
          width={20}
          height={20}
          className="transform transition-transform duration-300"
          // style={{ transform:  'rotate(180deg)' : 'rotate(0deg)' }}
          priority
        />
      </div>
      {isExpanded && <div className='py-4'>{children}</div>}
    </div>
  );
};

export default ControlledAccordion;

