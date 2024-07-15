import React from 'react';
import { Card } from '@nextui-org/react';
import { ControlledInput } from './Custom/ControlledInput';


const AuthorsWrapper = ({
  anfStatementConnectorId,
  questionnaireItemId,
}: {
  anfStatementConnectorId: number;
  questionnaireItemId: number;
}) => {

  return (
    <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
        <ControlledInput
          label="ID"
          name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].id`}
        />
        <ControlledInput
          label="Practitioner Value"
          name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].practitionerValue`}
        />
        <ControlledInput
          label="Code"
          name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].code`}
        />
    </Card>
  );
};

export { AuthorsWrapper };
