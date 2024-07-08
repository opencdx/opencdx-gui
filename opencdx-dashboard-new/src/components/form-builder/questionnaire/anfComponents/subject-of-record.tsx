import React from 'react';

import { Participant } from '@/generated-api-ts/questionnaire/api';
import { Input } from '@nextui-org/input';
import { Card, Radio, RadioGroup } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';

const SubjectOfRecordWrapper = ({
  subjectOfRecord,
  anfStatementConnectorId,
  questionnaireItemId,
}: {
  subjectOfRecord: Participant;
  anfStatementConnectorId: number;
  questionnaireItemId: number;
}) => {
  const { register } = useFormContext();
  return (
    <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
      <div className=" flex items-center gap-4 w-full">
        <label className="text w-[250px]">ID</label>
        <Input
          type="text"
          label="ID"
          className="mb-4"
          {...register(
            `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord.id`,
          )}
        />
      </div>
      <div className=" flex items-center gap-4 w-full">
        <label className="text w-[250px]">Practitioner Value</label>
        <Input
          type="text"
          label="Practitioner Value"
          className="mb-4"
          {...register(
            `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord.practitionerValue`,
          )}
        />
      </div>

      <div className=" flex items-center gap-4 w-full">
        <label className="text w-[250px]">Code</label>
        <Input
          type="text"
          label="Code"
          className="mb-4"
          {...register(
            `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord.code`,
          )}
        />
      </div>
    </Card>
  );
};

export { SubjectOfRecordWrapper };
