import React from 'react';
import { Divider } from 'ui-library';
import { ControlledInput } from './custom/controlled-input';

interface SubjectOfRecordWrapperProps {
  anfStatementConnectorId: number;
  questionnaireItemId: number;
}

const SubjectOfRecordWrapper: React.FC<SubjectOfRecordWrapperProps> = ({
  anfStatementConnectorId,
  questionnaireItemId,
}) => {
  const getFieldName = (field: string) =>
    `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord.${field}`;

  return (
    <div className="flex flex-col gap-4">
      <ControlledInput
        className="w-full p-4 pt-8"
        label="ID"
        name={getFieldName('id')}
      />
      <Divider className="bg-[#99C7FB]" />
      <ControlledInput
        className="w-full p-4"
        label="Practitioner Value"
        name={getFieldName('practitionerValue.identifier')}
      />
      <Divider className="bg-[#99C7FB]" />
      <ControlledInput
        className="w-full p-4"
        label="Code"
        name={getFieldName('code.expression')}
      />
    </div>
  );
};

export { SubjectOfRecordWrapper };
