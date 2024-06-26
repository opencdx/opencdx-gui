 
import React, { ChangeEvent } from 'react';
import { Input as NextUIInput } from "@nextui-org/input";

interface InputProps {
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    id: string;
    type: string;
    label: string;
    required: boolean;
    defaultValue: string;

}

export const Input: React.FC<InputProps> = ({ value, onChange,id, type, label, required, defaultValue }) => {
    return (
        <NextUIInput  
            id={id}
            type={type}
            label={label}
            aria-label='' 
            required={required}
            defaultValue={defaultValue}  
        value={value} onChange={onChange} />
    );
};
