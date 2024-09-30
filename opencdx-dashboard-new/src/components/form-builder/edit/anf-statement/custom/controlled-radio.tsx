import React from 'react';
import { Radio, RadioGroup } from 'ui-library';
import { Controller, useFormContext } from 'react-hook-form';

interface ControlledRadioProps {
  label?: string;
  name: string;
  orientation?: "horizontal" | "vertical";
}

const ControlledRadio: React.FC<ControlledRadioProps> = ({ label, name, orientation = "horizontal" }) => {
  const { control } = useFormContext();

  return (
    <div className='flex flex-col gap-4 pl-2'>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            orientation={orientation}
            label={label}
            classNames={{
              label: 'text-sm font-normal text-black'
            }}
            value={String(value)}
            onChange={(event) => onChange(event.target.value === 'true')}
          >
            <Radio 
              value="true"
              description='Lorem ipsum'
              size='sm'
            >
              Yes
            </Radio>
            <Radio
              value="false"
              description='Lorem ipsum'
              size='sm'
              className='ml-12'
            >
              No
            </Radio>
          </RadioGroup>
        )}
      />
    </div>
  );
};

export { ControlledRadio };
