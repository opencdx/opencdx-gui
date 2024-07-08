
import React from 'react';

import { Participant } from '@/generated-api-ts/questionnaire/api';
import { Input } from '@nextui-org/input';
import { Card, Radio, RadioGroup } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';

const SubjectOfInformationWrapper = ({
  subjectOfInformation,
  anfStatementConnectorId,
  questionnaireItemId,
}: {
  subjectOfInformation: string;
  anfStatementConnectorId: number;
  questionnaireItemId: number;
}) => {
  const { register } = useFormContext();

  return (
    <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
      <div className=" flex items-center gap-4 w-full">
        <label className="text w-[250px]">Subject of Information</label>
        <Input
          type="text"
          label="Subject Of Information"
          className="mb-4"
          {...register(
            `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfInformation`,
          )}
        />
      </div>
     
    </Card>
  );
};

export { SubjectOfInformationWrapper };

