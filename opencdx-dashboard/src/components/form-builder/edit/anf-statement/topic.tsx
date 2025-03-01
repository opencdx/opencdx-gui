import React from 'react';
import { ControlledInput } from '@/components/custom/controlled-input';
import { Divider } from '@nextui-org/react';
interface TopicWrapperProps {
  anfStatementConnectorId: number;
  questionnaireItemId: number;
}

const TopicWrapper: React.FC<TopicWrapperProps> = ({
  anfStatementConnectorId,
  questionnaireItemId,
}) => {
  const topicName = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.topic.expression`;

  return (
    <>
      <ControlledInput
        className="w-full p-4 pt-8"
        label="Topic"
        name={topicName}
      />
      <Divider className='bg-[#99C7FB]' />
    </>
  );
};

export {TopicWrapper};
