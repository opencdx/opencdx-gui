import React from 'react';

import { Input } from '@nextui-org/input';
import { Controller } from 'react-hook-form';

const ControlledInput = ({ control, label, name, type = "text" }: { control: any; label: string; name: string; type?: string }) => {

  return (
    <div className=" flex items-center gap-4 w-full">
      <label className="text w-[250px]">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            className="mb-4 bg-white"
            label={label}
            type={type}
            value={field.value}
            variant='bordered'
            radius='sm'
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
};

export { ControlledInput };
