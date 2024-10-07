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
    const baseFieldName = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.${tabName}`;

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">{label}</h3>
            <div className="space-y-4">
                <ControlledInput
                    label="ID"
                    name={`${baseFieldName}.id.reference`}
                    //placeholder="Enter reference ID"
                />
                <Divider className="my-4" />
               
                 <LogicalExpressionComponent 
                    label='Semantic' 
                    anfStatementConnectorId={anfStatementConnectorId} 
                    questionnaireItemId={questionnaireItemId} 
                    tabName={`${baseFieldName}.semantic`} 
                />
            </div>
        </div>
    );
};
