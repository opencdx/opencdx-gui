import React from 'react';
import { Divider, Button } from 'ui-library';
import { ANFStatement } from '@/api/questionnaire/model/anfstatement';
import { ControlledInput } from '../custom/controlled-input';
import { PlusIcon } from 'lucide-react';
import { MeasureComponent } from '../custom/measure';
import { ParticipantComponent } from '../custom/participant';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AssociatedStatementComponent } from '../custom/associated-statement';
import { RepetitionComponent } from '../custom/repetition';
import { DeviceIdComponent } from '../custom/deviceid'
import { PurposeComponent } from '../custom/purpose'
import ControlledAccordion from '../custom/controlled-accordian';

interface AccordionSectionProps {
    title: string;
    isTitleBold?: boolean;
    children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, isTitleBold = false, children }) => (
    <>
        <Divider className='bg-[#99C7FB]' />
        <ControlledAccordion title={title} isTitleBold={isTitleBold}>
            {children}
        </ControlledAccordion>
    </>
);

const RequestCircumstance: React.FC<{
    anfStatementConnectorId: number;
    questionnaireItemId: number;
    anfStatement: ANFStatement;
}> = ({ anfStatementConnectorId, questionnaireItemId, anfStatement }) => {
    const { control } = useFormContext();
    const tabName = 'requestCircumstance';

    const baseFieldName = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.${tabName}`;
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
                <AccordionSection title="Device ID">
                <DeviceIdComponent  
                    anfStatementConnectorId={anfStatementConnectorId}
                    questionnaireItemId={questionnaireItemId}
                    tabName={tabName}
                />
            </AccordionSection>

            <AccordionSection title="Timing" isTitleBold>
                <MeasureComponent  anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={`${tabName}.timing`} />
            </AccordionSection>

            <AccordionSection title="Conditional Trigger" isTitleBold>
                {conditionalTriggerFields.map((field, index) => (
                    <div key={field.id} className='mb-2'>
                        <AssociatedStatementComponent
                            label={`Conditional Trigger ${index + 1}`}
                            anfStatementConnectorId={anfStatementConnectorId}
                            questionnaireItemId={questionnaireItemId}
                            tabName={`${tabName}.conditionalTrigger[${index}]`}
                        />
                        {index !== conditionalTriggerFields.length - 1 && <>
                            <Divider className='bg-[#99C7FB] h-[16px] my-4'  />
                        </>}
                    </div>
                ))}
                <Button className='w-fit'
                    variant='flat'
                    size='sm'
                    color='primary'
                    radius='sm' onClick={() => appendConditionalTrigger({})} endContent={<PlusIcon size={18} />}>Add Conditional Trigger</Button>      </AccordionSection>

            <AccordionSection title="Requested Participant" isTitleBold>
            <ParticipantComponent anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} anfStatement={anfStatement} tabName={tabName} addLabel="Add Requested Participant" />
            </AccordionSection>

            <AccordionSection title="Priority">
                <ControlledInput placeholder="Priority" name={`${baseFieldName}.priority.expression`} />
            </AccordionSection>
           
            <AccordionSection title="Purpose">
                <PurposeComponent
                    anfStatementConnectorId={anfStatementConnectorId}
                    questionnaireItemId={questionnaireItemId}
                    tabName={tabName}
                />
            </AccordionSection>

            <AccordionSection title="Requested Result" isTitleBold>
                <MeasureComponent label='Requested Result' anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={`${tabName}.requestedResult`} />
            </AccordionSection>
            <AccordionSection title="Repetition" isTitleBold>
            <RepetitionComponent
                anfStatementConnectorId={anfStatementConnectorId}
                questionnaireItemId={questionnaireItemId}
                    tabName={`${tabName}.repetition`}
                />
            </AccordionSection>
            <Divider  />

        </>
    );
};

export { RequestCircumstance };