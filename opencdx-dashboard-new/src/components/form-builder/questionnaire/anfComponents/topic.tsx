import React from 'react';

import { Input } from '@nextui-org/input';
import { Card } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';

const TopicWrapper = ({
  anfStatementConnectorId,
  questionnaireItemId,
}: {
  anfStatementConnectorId: number;
  questionnaireItemId: number;
}) => {
  const { register } = useFormContext();

  return (
    <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
      <div className=" flex items-center gap-4 w-full">
        <label className="text w-[250px]">Topic</label>
        <Input
          type="text"
          label="Topic"
          className="mb-4"
          {...register(
            `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.topic`,
          )}
        />
      </div>
     
    </Card>
  );
};

export { TopicWrapper };


