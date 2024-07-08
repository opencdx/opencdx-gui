
import React from 'react';

import { Input } from '@nextui-org/input';
import { Card, Radio, RadioGroup } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Select, SelectItem } from '@nextui-org/react';


export const values = [
  { key: 'performance', label: 'Performance' },
  { key: 'request', label: 'Request' },
];
const NarrativeCircumstanceWrapper = ({
  topic,
  anfStatementConnectorId,
  questionnaireItemId,
}: {
  topic: string;
  anfStatementConnectorId: number;
  questionnaireItemId: number;
}) => {
  const { register, control, getValues } = useFormContext();
  const { name, ref, ...rest } = register(
    `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.type`,
  );
  return (
    <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
      <div className=" flex items-center gap-4 w-full">
        <label className="text w-[250px]">Select a Type</label>

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
    </Card>
  );
};

export { NarrativeCircumstanceWrapper };

