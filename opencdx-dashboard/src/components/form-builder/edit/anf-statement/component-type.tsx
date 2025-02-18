import React, { useState } from 'react';
import { AnfStatementType } from '@/api/questionnaire/model/anf-statement-connector';
import { Radio, RadioGroup, Select, SelectItem } from 'ui-library';
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
          'flex-row w-[450px] cursor-pointer rounded-lg gap-1 p-4 mb-1 border-2 border-transparent',
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
  const fields = getValues('item') || [];
  const name = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatementType`;
  const [componentType, setComponentType] = useState(currentComponentType);

  const radioOptions = [
    { value: AnfStatementType.AnfStatementTypeMain, label: "Main ANF Statement", description: "Component marked as Main ANF type" },
    { value: AnfStatementType.AnfStatementTypeContributing, label: "Contributing ANF Statement", description: "Select Main Statement for the Contributing ANF Statement" },
    { value: AnfStatementType.AnfStatementTypeAssociated, label: "Associated ANF Statement", description: "Select Main Statement for the Associated Statement" },
  ];

  return (
    <div className='px-6'>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div>
            <RadioGroup
              {...field}
              label="Select Component Type"
              orientation="horizontal"
              classNames={{
                label: 'text-black',
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e.target.value);
                const formData = getValues();
                if (e.target.value === AnfStatementType.AnfStatementTypeMain) {
                  formData.item[questionnaireItemId].anfStatementConnector[anfStatementConnectorId].mainStatement = null;
                }
                localStorage.setItem('questionnaire-store', JSON.stringify(formData));
                onValueChange(e.target.value as AnfStatementType);
                setComponentType(e.target.value as AnfStatementType);
              }}
            >
              <div className="flex flex-wrap">
                {radioOptions.map((option, index) => {
                  const descriptionId = `description-${questionnaireItemId}-${anfStatementConnectorId}-${index}`;
                  return (
                    <div key={option.value} className="w-1/2">
                      <CustomRadio
                        id={`custom-radio-${questionnaireItemId}-${anfStatementConnectorId}-${index}`}
                        description={option.description}
                        value={option.value}
                      >
                        <span id={descriptionId}>{option.label}</span>
                      </CustomRadio>
                    </div>
                  );
                })}
                {componentType === AnfStatementType.AnfStatementTypeContributing && (
                  <Controller
                    name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.mainStatement`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        defaultSelectedKeys={[field.value]}
                        onChange={(event) => {
                          field.onChange(event.target.value);
                          const formData = getValues();
                          localStorage.setItem('questionnaire-store', JSON.stringify(formData));
                        }}
                        variant="bordered"
                        radius="sm"
                        placeholder="ANF Statement"
                        description="Select Main ANF Statement"
                        className="w-80 pl-8"
                        size="lg"
                        aria-label="ANF Statement"
                      >
                        {fields.map((field: any) => (
                          <SelectItem key={field.linkId}>{field.text}</SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                )}
              </div>
            </RadioGroup>

            {componentType === AnfStatementType.AnfStatementTypeAssociated && (
              <div className="mt-4 pl-8">
                <Controller
                  name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.mainStatement`}
                  control={control}
                  render={({ field: selectField }) => (
                    <Select
                      value={selectField.value}
                      defaultSelectedKeys={[selectField.value]}
                      onChange={(event) => {
                        selectField.onChange(event.target.value);
                        const formData = getValues();
                        localStorage.setItem('questionnaire-store', JSON.stringify(formData));
                      }}
                      variant="bordered"
                      radius="sm"
                      placeholder="ANF Statement"
                      description="Select Main ANF Statement"
                      className="w-80"
                      size="lg"
                      aria-label="ANF Statement"
                    >
                      {fields.map((field: any) => (
                        <SelectItem key={field.linkId}>{field.text}</SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export { ComponentTypeWrapper };
