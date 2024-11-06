import React from 'react';
import { ControlledInput } from '@/components/custom/controlled-input';

interface SubjectOfInformationWrapperProps {
  anfStatementConnectorId: number;
  questionnaireItemId: number;
}

const SubjectOfInformationWrapper: React.FC<SubjectOfInformationWrapperProps> = ({
  anfStatementConnectorId,
  questionnaireItemId,
}) => (
  <ControlledInput
    className="w-full p-4 pt-8"
    label="Subject of Information"
    name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfInformation.expression`}
  />
);

export { SubjectOfInformationWrapper };
