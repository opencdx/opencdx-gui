import React, { useState } from 'react';
import { AnfStatementType } from '@/api/questionnaire/model/anf-statement-connector';
import { Radio, RadioGroup } from 'ui-library';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from "@/lib/utils";
import { ControlledInput } from '@/components/custom/controlled-input';

export const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
          'flex-row cursor-pointer rounded-lg gap-1 p-2 mb-1 border-2 border-transparent',
          'data-[selected=true]:border-primary',
        ),
      }}
    >
      {children}
    </Radio>
  );
};

const AnswerWrapper = ({
  questionnaireItemId,
  anfStatementConnectorId,
  currentComponentType,
}: {
  questionnaireItemId: number;
  anfStatementConnectorId: number;
  currentComponentType: AnfStatementType;
}) => {
  const { control, getValues, setValue } = useFormContext();
  const name = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.operatorValue`;
  const [answerValue, setAnswerValue] = useState(getValues(name) ? 'value' : 'anyvalue');

  const radioOptions = [
    { value: 'anyvalue', label: "Any value", description: "Any value" },
    { value: 'value', label: "Value", description: "Value" },
  ];

  return (
    <div className='px-8'>
      <RadioGroup
        label="Select Answer"
        orientation="horizontal"
        classNames={{
          label: 'text-black',
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAnswerValue(e.target.value);
          const formData = getValues();
          if (e.target.value === 'anyvalue') {
            formData[name] = '';
            setValue(name, '');
          }
          localStorage.setItem('questionnaire-store', JSON.stringify(formData));
        }}
        defaultValue={getValues(name) ? 'value' : 'anyvalue'}
      >
        <div className="flex items-center gap-4 w-full">
          {radioOptions.map((option) => (
            <div key={option.value} className="flex-shrink-0">
              <CustomRadio
                description={option.description}
                value={option.value}
                id={`description-${questionnaireItemId}-${anfStatementConnectorId}-${option.value}`}
              >
                {option.label}
              </CustomRadio>
            </div>
          ))}
          {(answerValue === "value") && (
            <ControlledInput label='Enter Value' name={name} className="w-auto" />
          )}
        </div>
      </RadioGroup>
    </div>
  );
};

export { AnswerWrapper };
