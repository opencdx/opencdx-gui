import React from 'react';
import { Input } from 'ui-library';
import { Controller, useFormContext } from 'react-hook-form';

interface ControlledInputProps {
  label?: string;
  name: string;
  type?: string;
  isFullWidth?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
}

const ControlledInput: React.FC<ControlledInputProps> = ({
  label,
  name,
  type = "text",
  isFullWidth = true,
  className = "",
  size = "lg",
  placeholder,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          {...field}
          label={label ? `${label}:` : ''}
          type={type}
          variant="bordered"
          labelPlacement="outside"
          placeholder={placeholder ? placeholder : label ? label : ''}
          radius="sm"
          size={size}
          className={`${isFullWidth ? 'w-full' : 'max-w-xs'} ${className}`}
          classNames={{
            input: "text-sm",
            label: "text-sm",
            base: "",
            description: "text-xs",
          }}
        />
      )}
    />
  );
};

export { ControlledInput };