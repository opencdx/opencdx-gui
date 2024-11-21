import { DownArrow } from 'ui-library';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder: string;
  className?: string;
  'aria-label': string;
}

const CustomSelect = ({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  className = '', 
  'aria-label': ariaLabel 
}: CustomSelectProps) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          bg-white px-[12px] pr-10 border-2 rounded-lg
          ${className}
        `}
        aria-label={ariaLabel}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { CustomSelect };