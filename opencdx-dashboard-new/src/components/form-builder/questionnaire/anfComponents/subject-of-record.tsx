import React from 'react';

import { Input } from '@nextui-org/input';
import { Card } from '@nextui-org/react';
import { Controller, useFormContext } from 'react-hook-form';

const SubjectOfRecordWrapper = ({
  anfStatementConnectorId,
  questionnaireItemId,
}: {
  anfStatementConnectorId: number;
  questionnaireItemId: number;
  currentComponentType: string;
}) => {
  const { register, control } = useFormContext();

  return (
    <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
      <div className=" flex items-center gap-4 w-full">
        <label className="text w-[250px]">ID</label>
        <Controller
          control={control}
          {...register(
            `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord.id`,
          )}
          render={({ field }) => (
            <Input
              type="text"
              label="ID"
              className="mb-4"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div className=" flex items-center gap-4 w-full">
        <label className="text w-[250px]">Practitioner Value</label>
        <Controller
          control={control}
          {...register(
            `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord.practitionerValue`,
          )}
          render={({ field }) => (
            <Input
              type="text"
              label="Practitioner Value"
              className="mb-4"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className=" flex items-center gap-4 w-full">
        <label className="text w-[250px]">Code</label>
        <Controller
          control={control}
          {...register(
            `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord.code`,
          )}
          render={({ field }) => (
            <Input
              type="text"
              label="Code"
              className="mb-4"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </Card>
  );
};

export { SubjectOfRecordWrapper };
