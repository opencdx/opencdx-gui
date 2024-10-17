import React from 'react';
import { Divider, Button } from 'ui-library';
import { ANFStatement } from '@/api/questionnaire/model/anfstatement';
import { ControlledInput } from '../custom/controlled-input';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { MeasureComponent } from '../custom/measure';
import { ParticipantComponent } from '../custom/participant';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AssociatedStatementComponent } from '../custom/associated-statement';
import { RepetitionComponent } from '../custom/repetition';
import { DeviceIdComponent } from '../custom/deviceid';

const RequestCircumstance: React.FC<{
    anfStatementConnectorId: number;
    questionnaireItemId: number;
    anfStatement: ANFStatement;
}> = ({ anfStatementConnectorId, questionnaireItemId, anfStatement }) => {
    const { control } = useFormContext();
    const tabName = 'requestCircumstance';

    const baseFieldName = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.${tabName}`;

    const { fields: purposeFields, append: appendPurpose, remove: removePurpose } = useFieldArray({
        control,
        name: `${baseFieldName}.purpose`,
    });

    const { fields: conditionalTriggerFields, append: appendConditionalTrigger, remove: removeConditionalTrigger } = useFieldArray({
        control,
        name: `${baseFieldName}.conditionalTrigger`,
    });

    const { fields: requestedParticipantFields, append: appendRequestedParticipant, remove: removeRequestedParticipant } = useFieldArray({
        control,
        name: `${baseFieldName}.requestedParticipant`,
    });


    return (
        <>
            <Divider className='bg-[#99C7FB]' />
            <DeviceIdComponent
                anfStatementConnectorId={anfStatementConnectorId}
                questionnaireItemId={questionnaireItemId}
                tabName={tabName}
            />
            <Divider className='bg-[#99C7FB]' />

            <MeasureComponent label='Timing' anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={`${tabName}.timing`} />
            <Divider className='bg-[#99C7FB]' />

            {/* Purpose */}
            <div className='p-4'>
                <h3>Purpose</h3>
                {purposeFields.map((field, index) => (
                    <div key={field.id} className='flex items-center gap-2 mb-2'>
                        <ControlledInput size='md' placeholder='Purpose' name={`${baseFieldName}.purpose.${index}.expression`} />
                        <Button
                            variant='flat'
                            color='danger'
                            radius='sm'
                            className='rounded-lg mb-4'
                            onClick={() => removePurpose(index)}
                            endContent={<TrashIcon size={18} />}
                        />
                    </div>
                ))}
                <Button
                    className='w-fit'
                    variant='flat'
                    size='sm'
                    color='primary'
                    radius='sm'
                    onClick={() => appendPurpose({ expression: '' })}
                    endContent={<PlusIcon size={18} />}
                >Add Purpose</Button>
            </div>

            <Divider className='bg-[#99C7FB]' />

            {/* Conditional Trigger */}
            <div className='p-4'>
                <h3>Conditional Trigger</h3>
                {conditionalTriggerFields.map((field, index) => (
                    <div key={field.id} className='mb-2'>
                        <AssociatedStatementComponent
                            label={`Conditional Trigger ${index + 1}`}
                            anfStatementConnectorId={anfStatementConnectorId}
                            questionnaireItemId={questionnaireItemId}
                            tabName={`${tabName}.conditionalTrigger[${index}]`}
                        />
                        <Button onClick={() => removeConditionalTrigger(index)} endContent={<TrashIcon size={18} />} />
                    </div>
                ))}
                <Button onClick={() => appendConditionalTrigger({})} endContent={<PlusIcon size={18} />}>Add Conditional Trigger</Button>
            </div>

            <Divider className='bg-[#99C7FB]' />

            {/* Requested Participant */}
            <div className='p-4'>
                <h3>Requested Participant</h3>
                {requestedParticipantFields.map((field, index) => (
                    <div key={field.id} className='mb-2'>
                        <ParticipantComponent
                            label={`Requested Participant ${index + 1}`}
                            anfStatementConnectorId={anfStatementConnectorId}
                            questionnaireItemId={questionnaireItemId}
                            anfStatement={anfStatement}
                            tabName={`${tabName}.requestedParticipant[${index}]`}
                        />
                        <Button onClick={() => removeRequestedParticipant(index)} endContent={<TrashIcon size={18} />} />
                    </div>
                ))}
                <Button onClick={() => appendRequestedParticipant({})} endContent={<PlusIcon size={18} />}>Add Requested Participant</Button>
            </div>

            <Divider className='bg-[#99C7FB]' />
            <ControlledInput className='p-4' label="Priority" name={`${baseFieldName}.priority.expression`} />
            <Divider className='bg-[#99C7FB]' />
            <MeasureComponent label='Requested Result' anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={`${tabName}.requestedResult`} />
            <Divider className='bg-[#99C7FB]' />
            <RepetitionComponent
                anfStatementConnectorId={anfStatementConnectorId}
                questionnaireItemId={questionnaireItemId}
                tabName={`${tabName}.repetition`}
            />
            <Divider className='bg-[#99C7FB]' />
        </>
    );
};

export { RequestCircumstance };
