import React from 'react';

import { Input } from '@nextui-org/input';
import { Controller, useFormContext } from 'react-hook-form';

const ControlledInput = ({ label, name }: { label: string; name: string }) => {
  const { control } = useFormContext();

  return (
    <div className=" flex items-center gap-4 w-full">
      <label className="text w-[250px]">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            className="mb-4"
            label={label}
            type="text"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
};

export { ControlledInput };
