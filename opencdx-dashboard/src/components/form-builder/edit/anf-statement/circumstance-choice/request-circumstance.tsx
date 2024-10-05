import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Divider, Button, Input } from 'ui-library';
import { ANFStatement } from '@/api/questionnaire/model/anfstatement';
import { ControlledInput } from '../custom/controlled-input';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { MeasureComponent } from '../custom/measure';
import { ParticipantComponent } from '../custom/participant';
import { useFormContext } from 'react-hook-form';
import { AssociatedStatementComponent } from '../custom/associated-statement';
import { RepetitionComponent } from '../custom/repetition';

const RequestCircumstance: React.FC<{
    anfStatementConnectorId: number;
    questionnaireItemId: number;
    anfStatement: ANFStatement;
}> = ({ anfStatementConnectorId, questionnaireItemId, anfStatement }) => {
    const [deviceIds, setDeviceIds] = useState<string[]>([]);
    const { setValue } = useFormContext();
    const tabName = 'requestCircumstance';

    // ... existing useEffect, useMemo, and handler functions ...

    const baseFieldName = useMemo(() => 
        `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.${tabName}`,
        [questionnaireItemId, anfStatementConnectorId, tabName]
    );

    
    // ... existing renderDeviceIdInputs function ...

    return (
        <>
            <Divider className='bg-[#99C7FB]' />
            <MeasureComponent label='Timing' anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={`${tabName}.timing`} />
            <Divider className='bg-[#99C7FB]' />
            <ControlledInput className='p-4' label="Purpose" name={`${baseFieldName}.purpose[0].expression`} />
            <Divider className='bg-[#99C7FB]' />
            {/* <AssociatedStatementComponent
                label='Conditional Trigger'
                anfStatementConnectorId={anfStatementConnectorId}
                questionnaireItemId={questionnaireItemId}
                tabName={`${tabName}.conditionalTrigger`}
            /> */}
            <Divider className='bg-[#99C7FB]' />
            <ParticipantComponent
                label='Requested Participant'
                anfStatementConnectorId={anfStatementConnectorId}
                questionnaireItemId={questionnaireItemId}
                anfStatement={anfStatement}
                tabName={`${tabName}.requestedParticipant`}
            />
            <Divider className='bg-[#99C7FB]' />
            <ControlledInput className='p-4' label="Priority" name={`${baseFieldName}.priority.expression`} />
            <Divider className='bg-[#99C7FB]' />
            <MeasureComponent label='Requested Result' anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={`${tabName}.requestedResult`} />
            <Divider className='bg-[#99C7FB]' />
            {/* <RepetitionComponent
                anfStatementConnectorId={anfStatementConnectorId}
                questionnaireItemId={questionnaireItemId}
                tabName={`${tabName}.repetition`}
            /> */}
            <Divider className='bg-[#99C7FB]' />
            {/* <div className='p-4 flex flex-col gap-4'>
                {renderDeviceIdInputs()}
            </div> */}
        </>
    );
};

export { RequestCircumstance };