import React from 'react';
import { AnfStatementType } from '@/api/questionnaire/model/anf-statement-connector';
import { Radio, RadioGroup } from 'ui-library';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from "@/lib/utils";
import { AnfOperatorType } from '@/api/questionnaire/model/anf-statement-connector';

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

const OperatorTypeWrapper = ({
  questionnaireItemId,
  anfStatementConnectorId,
  currentComponentType,
}: {
  questionnaireItemId: number;
  anfStatementConnectorId: number;
  currentComponentType: AnfStatementType;
}) => {
  const { control, getValues } = useFormContext();
  const name = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfOperatorType`;

  const radioOptions = [
    { value: AnfOperatorType.AnfOperatorTypeEqual, label: "=", description: "Equal to" },
    { value: AnfOperatorType.AnfOperatorTypeGreaterThan, label: "(>)", description: "Greater than" },
    { value: AnfOperatorType.AnfOperatorTypeLessThan, label: "(<)", description: "Less than" },
    { value: AnfOperatorType.AnfOperatorTypeContains, label: "Contains", description: "Contains" },
    { value: AnfOperatorType.AnfOperatorTypeNotEqual, label: "!=", description: "Not equal to" },
    { value: AnfOperatorType.AnfOperatorTypeGreaterThanOrEqual, label: "(>=)", description: "Greater than or equal to" },
    { value: AnfOperatorType.AnfOperatorTypeLessThanOrEqual, label: "(<=)", description: "Less than or equal to" },
    { value: AnfOperatorType.AnfOperatorTypeNotContains, label: "Does not contain", description: "Does not contain" },
  ];

  return (
    <div className='px-6'>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup
            {...field}  
            label="Select Operator"
            orientation="horizontal"
            classNames={{
              label: 'text-black',
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              field.onChange(e.target.value);
              const formData = getValues();
              localStorage.setItem('questionnaire-store', JSON.stringify(formData));
            }}
          >
            <div className="flex flex-wrap">
              {radioOptions.map((option, index) => (
                <div key={option.value} className="w-1/4">
                  <CustomRadio
                    id={`custom-radio-${questionnaireItemId}-${anfStatementConnectorId}-${index}-${option.value}`}
                    description={option.description}
                    value={option.value}
                  >
                    {option.label}
                  </CustomRadio>
                  <span id={`description-${questionnaireItemId}-${anfStatementConnectorId}-${index}-${option.value}`} className="sr-only">
                    {option.description}
                  </span>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}
      />
    </div>
  );
};

export { OperatorTypeWrapper };
