import React from 'react';
import { Input } from 'ui-library';
import { Controller, useFormContext } from 'react-hook-form';

interface ControlledInputProps {
  label: string;
  name: string;
  type?: string;
  isFullWidth?: boolean;
  className?: string;
}

const ControlledInput: React.FC<ControlledInputProps> = ({
  label,
  name,
  type = "text",
  isFullWidth = true,
  className = "",
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          {...field}
          label={`${label}:`}
          type={type}
          variant="bordered"
          labelPlacement="outside"
          placeholder={label}
          radius="sm"
          size="lg"
          className={`${isFullWidth ? 'w-full' : 'max-w-xs'} ${className}`}
          classNames={{
            input: "text-sm",
            label: "text-sm",
            base: "mb-4",
            description: "text-xs",
          }}
        />
      )}
    />
  );
};

export { ControlledInput };
