import React from 'react';
import { Divider } from 'ui-library';
import { MeasureComponent } from './measure';

interface RepetitionComponentProps {
    anfStatementConnectorId: number;
    questionnaireItemId: number;
    tabName: string;
}

export const RepetitionComponent: React.FC<RepetitionComponentProps> = ({
    anfStatementConnectorId,
    questionnaireItemId,
    tabName,
}) => {
    return (
        <div className="repetition-component ">
            <MeasureComponent
                label="Period Start"
                anfStatementConnectorId={anfStatementConnectorId}
                questionnaireItemId={questionnaireItemId}
                tabName={`${tabName}.periodStart`}
            />
            <Divider className="bg-[#99C7FB]" />
            <MeasureComponent
                label="Period Duration"
                anfStatementConnectorId={anfStatementConnectorId}
                questionnaireItemId={questionnaireItemId}
                tabName={`${tabName}.periodDuration`}
            />
            <Divider className="bg-[#99C7FB]" />
            <MeasureComponent
                label="Event Frequency"
                anfStatementConnectorId={anfStatementConnectorId}
                questionnaireItemId={questionnaireItemId}
                tabName={`${tabName}.eventFrequency`}
            />
            <Divider className="bg-[#99C7FB]" />
            <MeasureComponent
                label="Event Separation"
                anfStatementConnectorId={anfStatementConnectorId}
                questionnaireItemId={questionnaireItemId}
                tabName={`${tabName}.eventSeparation`}
            />
            <Divider className="bg-[#99C7FB]" />
            <MeasureComponent
                label="Event Duration"
                anfStatementConnectorId={anfStatementConnectorId}
                questionnaireItemId={questionnaireItemId}
                tabName={`${tabName}.eventDuration`}
            />
        </div>
    );
};
