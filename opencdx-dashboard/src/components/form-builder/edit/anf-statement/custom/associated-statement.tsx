import React from 'react';
import { Divider } from 'ui-library';
import { ControlledInput } from './controlled-input';
import { LogicalExpressionComponent } from './logical-expression';

interface AssociatedStatementProps {
    label: string;
    anfStatementConnectorId: number;
    questionnaireItemId: number;
    tabName: string;
}

export const AssociatedStatementComponent: React.FC<AssociatedStatementProps> = ({
    label,
    anfStatementConnectorId,
    questionnaireItemId,
    tabName,
}) => {

    return (
        <div >
            <div className='flex flex-col gap-4' >
                <ControlledInput
                    label="ID Reference"
                    name={`${tabName}.id.id`}
                    //placeholder="Enter reference ID"
                />
                <Divider className="my-4" />
                <ControlledInput
                    label="Display"
                    name={`${tabName}.id.display`}
                    //placeholder="Enter reference ID"
                />
                <Divider className="my-4" />
                <ControlledInput
                    label="Reference"
                    name={`${tabName}.id.reference`}
                    //placeholder="Enter reference ID"
                />
                <Divider className="my-4" />
                <ControlledInput
                    label="URI"
                    name={`${tabName}.id.uri`}
                    //placeholder="Enter reference ID"
                />
                <Divider className="my-4" />
               
                 <LogicalExpressionComponent 
                    label='Semantic' 
                    anfStatementConnectorId={anfStatementConnectorId} 
                    questionnaireItemId={questionnaireItemId} 
                    tabName={`${tabName}.semantic`} 
                />
            </div>
        </div>
    );
};
