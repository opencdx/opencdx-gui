import React, { useMemo } from 'react';
import { Divider } from 'ui-library';
import { ANFStatement } from '@/api/questionnaire/model/anfstatement';
import { ControlledInput } from '../custom/controlled-input';
import { MeasureComponent } from '../custom/measure';
import { LogicalExpressionComponent } from '../custom/logical-expression';

interface NarrativeCircumstanceProps {
    anfStatementConnectorId: number;
    questionnaireItemId: number;
    anfStatement: ANFStatement;
}

const NarrativeCircumstance: React.FC<NarrativeCircumstanceProps> = ({
    anfStatementConnectorId,
    questionnaireItemId,
    anfStatement
}) => {
    const tabName = 'narrativeCircumstance';

    const baseFieldName = useMemo(() => 
        `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.${tabName}`,
        [questionnaireItemId, anfStatementConnectorId, tabName]
    );

    return (
        <>
            <Divider className='bg-[#99C7FB]' />
            <div className='p-4'>
                <ControlledInput label="Text" name={`${baseFieldName}.text`} />
            </div>
            <Divider className='bg-[#99C7FB]' />
            <MeasureComponent 
                label='Timing' 
                anfStatementConnectorId={anfStatementConnectorId} 
                questionnaireItemId={questionnaireItemId} 
                tabName={`${tabName}.timing`} 
            />
            <Divider className='bg-[#99C7FB]' />
            <LogicalExpressionComponent 
                label='Purpose' 
                anfStatementConnectorId={anfStatementConnectorId} 
                questionnaireItemId={questionnaireItemId} 
                tabName={`${tabName}.purpose`} 
            />
        </>
    );
};

export { NarrativeCircumstance };