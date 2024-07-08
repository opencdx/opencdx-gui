import React from 'react';

import { AnfStatementConnectorAnfOperatorTypeEnum } from '@/generated-api-ts/questionnaire/api';
import { Input } from '@nextui-org/input';
import { Card } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/select';
import { Controller, useFormContext } from 'react-hook-form';

export const values = [
  { key: 'ANF_OPERATOR_TYPE_EQUAL', label: 'Equal' },
  { key: 'ANF_OPERATOR_TYPE_NOT_EQUAL', label: 'Not Equal' },
];
export const answers = [
  { key: 'ans', label: 'Any Value' },
  { key: 'val', label: 'Value' },
];

const OperatorWrapper = ({
  anfOperatorType,
  questionnaireItemId,
  anfStatementConnectorId,
}: {
  anfOperatorType: AnfStatementConnectorAnfOperatorTypeEnum;
  questionnaireItemId: number;
  anfStatementConnectorId: number;
}) => {
  const { register, control, getValues } = useFormContext();
  const { name, ref, ...rest } = register(
    `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfOperatorType`,
  );
  return (
    <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center gap-4 text-align-center justify-center">
        <div className="w-1/2 flex items-center gap-4">
          <label className="text-sm font-semibold">Operator</label>
          <Controller
            control={control}
            name={name}
            render={({ field, value, name, ref }) => (
              <Select
                label="Select an operator"
                className="max-w-xs mb-4 mt-2 mr-4 ml-4"
                {...field}
                defaultSelectedKeys={[field.value]}
              >
                {values.map((type) => (
                  <SelectItem key={type.key}>{type.label}</SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
        <div className="w-1/2 flex items-center gap-4">
          <label className="text-sm font-semibold">Value</label>
          <Input
            type="text"
            label="Enter a answer"
            className="max-w-xs mb-4 mt-2 mr-4 ml-4"
            {...register(
              `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.operatorValue`,
            )}
          />
        </div>
      </div>
    </Card>
  );
};

export { OperatorWrapper };
