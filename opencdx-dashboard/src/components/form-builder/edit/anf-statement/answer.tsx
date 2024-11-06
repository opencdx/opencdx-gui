import React from 'react';
import { AnfStatementType } from '@/api/questionnaire/model/anf-statement-connector';
import { Radio, RadioGroup } from 'ui-library';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from "@/lib/utils";

export const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
          'flex-row cursor-pointer rounded-lg gap-2 p-2 mb-1 border-2 border-transparent',
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
  const { control, getValues } = useFormContext();
  const name = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.operatorValue`;

  const radioOptions = [
    { value: 'anyvalue', label: "Any value", description: "Any value" },
    { value: 'value', label: "Value", description: "Value" },
   
  ];
  return (
    <div className='px-8'>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup
            {...field}  
            label="Select Answer"
            orientation="horizontal"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              field.onChange(e.target.value);
              const formData = getValues();
              localStorage.setItem('questionnaire-store', JSON.stringify(formData));
            }}
          >
            <div className="flex flex-wrap gap-4">
              {radioOptions.map((option) => (
                <div key={option.value} className="">
                  <CustomRadio
                    description={option.description}
                    value={option.value}
                  >
                    {option.label}
                  </CustomRadio>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}
      />
    </div>
  );
};

export { AnswerWrapper };
