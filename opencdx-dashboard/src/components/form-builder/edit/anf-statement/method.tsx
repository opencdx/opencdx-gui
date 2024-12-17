import React from 'react';
import { ControlledInput } from '@/components/custom/controlled-input';

interface MethodWrapperProps {
  anfStatementConnectorId: number;
  questionnaireItemId: number;
}

const MethoWrapper: React.FC<MethodWrapperProps> = ({
  anfStatementConnectorId,
  questionnaireItemId,
}) => {
  const inputName = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.method.expression`;

  return (
    <ControlledInput
      className="w-full p-4 pt-8"
      label="Type"
      name={inputName}
    />
  );
};

export {MethoWrapper};
