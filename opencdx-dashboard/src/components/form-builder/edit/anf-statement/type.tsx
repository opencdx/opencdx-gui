import React from 'react';
import { ControlledInput } from './custom/controlled-input';

interface TypeWrapperProps {
  anfStatementConnectorId: number;
  questionnaireItemId: number;
}

const TypeWrapper: React.FC<TypeWrapperProps> = ({
  anfStatementConnectorId,
  questionnaireItemId,
}) => {
  const inputName = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.type.expression`;

  return (
    <ControlledInput
      className="w-full p-4 pt-8"
      label="Type"
      name={inputName}
    />
  );
};

export {TypeWrapper};
