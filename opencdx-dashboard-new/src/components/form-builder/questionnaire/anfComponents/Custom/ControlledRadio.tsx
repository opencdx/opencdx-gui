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
            defaultValue={field.value===true?'true':field.value===false?'false':'not'}
            onChange={(event) => {
              if (event.target.value === 'true' || event.target.value === 'false') {
                field.onChange(event.target.value==='true'?true:false);
              }
            }}>
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
