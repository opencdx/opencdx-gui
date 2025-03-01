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
  const descriptionId = `radio-group-${name}-description`;

  return (
    <div className='flex flex-col gap-4'>
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
            onChange={(event: { target: { value: string; }; }) => onChange(event.target.value === 'true')}
            aria-labelledby={descriptionId}
          >
            <Radio 
              value="true"
              size='md'
              id={`${name}-true`}
            >
              Yes
            </Radio>
            <Radio
              value="false"
              size='md'
              id={`${name}-false`}
              className="ml-12"
            >
              No
            </Radio>
            <div id={descriptionId} className="sr-only">
              Description for the radio group
            </div>
          </RadioGroup>
        )}
      />
    </div>
  );
};

export { ControlledRadio };
