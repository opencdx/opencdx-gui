import React from 'react';

import { AnfStatementConnectorAnfStatementTypeEnum } from '@/generated-api-ts/questionnaire/api';
import { FormControl, FormControlLabel, Grid } from '@mui/material';
import { Card, cn, Radio, RadioGroup } from '@nextui-org/react';
import { Controller, useFormContext } from 'react-hook-form';

export const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
          'flex-row max-w-[250px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
          'data-[selected=true]:border-primary',
        ),
      }}
    >
      {children}
    </Radio>
  );
};
const ComponentTypeWrapper = ({
  anfStatementType,
  questionnaireItemId,
  anfStatementConnectorId,
}: {
  anfStatementType: AnfStatementConnectorAnfStatementTypeEnum;
  questionnaireItemId: number;
  anfStatementConnectorId: number;
}) => {
  const { register, control } = useFormContext();

  const { name, ref, ...rest } = register(
    `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatementType`,
  );

  return (
    <>
      <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <RadioGroup
              {...field}
              orientation="horizontal"
              className="mb-4 "
              label="Component Type"
              onChange={(e) => {
                field.onChange(e.target.value);
                console.log('e.target.value', e.target.value);
              }}
            >
              <CustomRadio
                description="Component marked as Main ANF type"
                value="ANF_STATEMENT_TYPE_MAIN"
              >
                Main ANF Statement
              </CustomRadio>
              <CustomRadio
                description="Select Main Statement for the Associated Statement"
                value="ANF_STATEMENT_TYPE_ASSOCIATED"
              >
                Associated ANF Statement
              </CustomRadio>
              <CustomRadio
                description="User Provided Data"
                value="ANF_STATEMENT_USER_QUESTION"
              >
                User Question
              </CustomRadio>
              <CustomRadio
                description="Component marked as non ANF type."
                value="ANF_STATEMENT_TYPE_NOT_APPLICABLE"
              >
                Not Applicable
              </CustomRadio>
            </RadioGroup>
          )}
        />
      </Card>
    </>
  );
};

export { ComponentTypeWrapper };
