import React from 'react';
import { AnfStatementType } from '@/api/questionnaire/model/anf-statement-connector';
import { cn, Radio, RadioGroup } from '@nextui-org/react';
import { Controller, useFormContext } from 'react-hook-form';

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
  currentComponentType: string;
  onValueChange: (value: AnfStatementType) => void;
}) => {
  const { register, control , getValues} = useFormContext();

  const { name, ref } = register(
    `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatementType`,
  );

  return (
    <>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <RadioGroup
              {...field}
              label="Select Component Type"
              orientation="horizontal"
              onChange={(e) => {
                field.onChange(e.target.value);
                const formData=getValues();
                localStorage.setItem('questionnaire-store', JSON.stringify(formData));
                onValueChange(
                  e.target.value as AnfStatementType,
                );
              }}
            >
              <div className="flex flex-wrap">
                <div className="w-1/2">
                  <CustomRadio
                    description="Component marked as Main ANF type"
                    value={AnfStatementType.AnfStatementTypeMain}
                  >
                    Main ANF Statement
                  </CustomRadio>
                </div>
                <div className="w-1/2">
                  <CustomRadio
                    description="Select Main Statement for the Associated Statement"
                    value={AnfStatementType.AnfStatementTypeAssociated}
                    className="w-full"
                  >
                    Associated ANF Statement
                  </CustomRadio>
                </div>
                <div className="w-1/2">
                  <CustomRadio
                    description="User Provided Data"
                    value={AnfStatementType.AnfStatementUserQuestion}
                  >
                    User Question
                  </CustomRadio>
                </div>
                <div className="w-1/2">
                  <CustomRadio
                    description="Component marked as non ANF type."
                    value={AnfStatementType.AnfStatementTypeNotApplicable}
                  >
                    Not Applicable
                  </CustomRadio>
                </div>
              </div>
            </RadioGroup>
          )}
        />
    </>
  );
};

export { ComponentTypeWrapper };
