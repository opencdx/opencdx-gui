import React from 'react';

import { Radio, RadioGroup } from '@nextui-org/react';
import { Controller, useFormContext } from 'react-hook-form';

const ControlledRadio = ({ label, name }: { label: string; name: string }) => {
  const { control } = useFormContext();

  return (
    <div className=" flex items-center gap-4 w-full">
      <label className="text w-[200px]">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup
            className="mb-4"
            orientation="horizontal"
            value={field.value}
            onChange={field.onChange}
          >
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
            <Radio value="not">Not Specified</Radio>
          </RadioGroup>
        )}
      />
    </div>
  );
};

export { ControlledRadio };
