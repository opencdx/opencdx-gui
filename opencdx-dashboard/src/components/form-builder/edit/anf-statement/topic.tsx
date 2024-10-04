import React from 'react';
import { ControlledInput } from './custom/controlled-input';

interface TopicWrapperProps {
  anfStatementConnectorId: number;
  questionnaireItemId: number;
}

const TopicWrapper: React.FC<TopicWrapperProps> = ({
  anfStatementConnectorId,
  questionnaireItemId,
}) => {
  const inputName = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.topic.expression`;

  return (
    <ControlledInput
      className="w-full p-4 pt-8"
      label="Topic"
      name={inputName}
    />
  );
};

export {TopicWrapper};
