import React, { useState, useEffect, useCallback } from 'react';
import { Divider, Button } from 'ui-library';
import { PlusIcon } from 'lucide-react';
import { Participant } from '@/api/questionnaire/model/participant';
import { ANFStatement } from '@/api/questionnaire/model/anfstatement';
import { ControlledInput } from './controlled-input';

const ParticipantComponent = ({
  label,
  anfStatementConnectorId,
  questionnaireItemId,
  anfStatement
}: {
  label: string;
  anfStatementConnectorId: number;
  questionnaireItemId: number;
  anfStatement: ANFStatement;
  tabName: string;
}) => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    setParticipants(anfStatement.performanceCircumstance?.participant || []);
  }, [anfStatement]);

  const handleAddParticipant = useCallback(() => {
    setParticipants(prevParticipants => [
      ...prevParticipants,
      {
        id: '',
        practitionerValue: { identifier: '', display: '', reference: '', uri: '' },
        code: { expression: '' },
      }
    ]);
  }, []);

  const renderParticipantFields = useCallback((participant: Participant, index: number) => {
    const baseFieldName = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.participant[${index}]`;
    
    return (
      <div key={index} className={index !== 0 ? 'border border-t-[#99C7FB] border-solid border-b-0 border-r-0 border-l-0' : ''}>
        <ControlledInput label="ID" className='p-4 pt-8' name={`${baseFieldName}.id`} />
        <Divider className='bg-[#99C7FB]' />
        <div className='flex flex-col gap-4'>
          <div className='text-sm pl-4 pt-4'>Practitioner Value:</div>
          {['identifier', 'display', 'reference', 'uri'].map((field) => (
            <React.Fragment key={field}>
              <ControlledInput
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                className='p-4'
                name={`${baseFieldName}.practitionerValue.${field}`}
              />
              <div className='px-4'><Divider /></div>
            </React.Fragment>
          ))}
        </div>
        <ControlledInput label="Code" className='p-4' name={`${baseFieldName}.code.expression`} />
        {index < participants.length - 1 && (
          <>
            <Divider className='bg-[#99C7FB]' />
            <Divider className='h-[16px]' />
          </>
        )}
      </div>
    );
  }, [anfStatementConnectorId, questionnaireItemId, participants.length]);

  const AddParticipantButton = useCallback(() => (
    <div className='p-4'>
      <Button
        variant='flat'
        color='primary'
        size='sm'
        onClick={handleAddParticipant}
        endContent={<PlusIcon size={16} />}
      >
        Add Participant
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

export { ParticipantComponent };
