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
          'flex-row w-[450px] cursor-pointer rounded-lg gap-4 p-4 mb-1 border-2 border-transparent',
          'data-[selected=true]:border-primary',
        ),
      }}
    >
      {children}
    </Radio>
  );
};

const ComponentTypeWrapper = ({
  questionnaireItemId,
  anfStatementConnectorId,
  currentComponentType,
  onValueChange,
}: {
  questionnaireItemId: number;
  anfStatementConnectorId: number;
  currentComponentType: AnfStatementType;
  onValueChange: (value: AnfStatementType) => void;
}) => {
  const { control, getValues } = useFormContext();
  const name = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatementType`;

  const radioOptions = [
    { value: AnfStatementType.AnfStatementTypeMain, label: "Main ANF Statement", description: "Component marked as Main ANF type" },
    { value: AnfStatementType.AnfStatementTypeAssociated, label: "Associated ANF Statement", description: "Select Main Statement for the Associated Statement" },
    { value: AnfStatementType.AnfStatementUserQuestion, label: "User Question", description: "User Provided Data" },
    { value: AnfStatementType.AnfStatementTypeNotApplicable, label: "Not Applicable", description: "Component marked as non ANF type." },
  ];
  return (
    <div className='p-8'>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup
            {...field}
            label="Select Component Type"
            orientation="horizontal"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              field.onChange(e.target.value);
              const formData = getValues();
              localStorage.setItem('questionnaire-store', JSON.stringify(formData));
              onValueChange(e.target.value as AnfStatementType);
            }}
          >
            <div className="flex flex-wrap pt-4">
              {radioOptions.map((option) => (
                <div key={option.value} className="w-1/2">
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

export { ComponentTypeWrapper };
