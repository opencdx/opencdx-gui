import React, { useState, useEffect, useCallback } from 'react';
import { Divider, Button } from 'ui-library';
import { PlusIcon } from 'lucide-react';
import { Participant } from '@/api/questionnaire/model/participant';
import { ANFStatement } from '@/api/questionnaire/model/anfstatement';
import { ControlledInput } from '@/components/custom/controlled-input';
import { Reference } from '@/api/questionnaire';

const RequestedParticipantComponent = ({
  label,
  anfStatementConnectorId,
  questionnaireItemId,
  anfStatement,
  tabName,
  addLabel
}: {
  label?: string;
  anfStatementConnectorId: number;
  questionnaireItemId: number;
  anfStatement: ANFStatement;
  tabName: string;
  addLabel?: string;
}) => {
  const [participants, setParticipants] = useState<Reference[]>([]);

  useEffect(() => {
    setParticipants(anfStatement.requestCircumstance?.requestedParticipant || []);
  }, [anfStatement]);

  const handleAddParticipant = useCallback(() => {
    setParticipants(prevParticipants => [
      ...prevParticipants,
      { identifier: '', display: '', reference: '', uri: '' }
    ]);
  }, []);

  const renderParticipantFields = useCallback((participant: Reference, index: number) => {
    const baseFieldName = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.requestCircumstance.requestedParticipant[${index}]`;
    
    return (
      <div key={index} className={index !== 0 ? 'border border-t-[#99C7FB] border-solid border-b-0 border-r-0 border-l-0' : ''}>
        <div className='flex flex-col gap-4'>
          {['identifier', 'display', 'reference', 'uri'].map((field) => (
            <React.Fragment key={field}>
              <ControlledInput
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={`${baseFieldName}.${field}`}
              />
              <Divider className="my-2" />
            </React.Fragment>
          ))}
        </div>
        {index < participants.length - 1 && (
          <>
            <Divider className='mt-2 bg-[#99C7FB]' />
            <Divider className='h-[16px]' />
          </>
        )}
      </div>
    );
  }, [anfStatementConnectorId, questionnaireItemId, participants.length]);

  const AddParticipantButton = useCallback(() => (
    <div className='pt-4'>
      <Button
        variant='flat'
        color='primary'
        size='sm'
        onClick={handleAddParticipant}
        endContent={<PlusIcon size={16} />}
      >
        {addLabel || 'Add Participant'}
      </Button>
    </div>
  ), [handleAddParticipant]);

  return (
    <>
      {label && <label className='pl-4 pb-0 text-sm font-bold text-black'>{label}</label>}
      {participants.length > 0 ? participants.map(renderParticipantFields) : <AddParticipantButton />}
      {participants.length > 0 && <AddParticipantButton />}
    </>
  );
};

export { RequestedParticipantComponent };
