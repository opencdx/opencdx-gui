import React from 'react';
import { ControlledInput } from '@/components/custom/controlled-input';

interface LogicalExpressionComponentProps {
    label: string;
    anfStatementConnectorId: number;
    questionnaireItemId: number;
    tabName: string;
}

const LogicalExpressionComponent: React.FC<LogicalExpressionComponentProps> = ({
    label,
    anfStatementConnectorId,
    questionnaireItemId,
    tabName
}) => {
    // const baseFieldName = useMemo(() => 
    //     `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.${tabName}`,
    //     [questionnaireItemId, anfStatementConnectorId, tabName]
    // );

    return (
        <div >
            <ControlledInput 
                label={label} 
                name={`${tabName}.expression`} 
                // placeholder="Enter logical expression"
            />
        </div>
    );
};

export { LogicalExpressionComponent };
