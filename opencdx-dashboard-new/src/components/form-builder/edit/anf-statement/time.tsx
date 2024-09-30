import React from 'react';
import { MeasureComponent } from './custom/measure';

interface TimeWrapperProps {
  anfStatementConnectorId: number;
  questionnaireItemId: number;
}

const TimeWrapper: React.FC<TimeWrapperProps> = ({ anfStatementConnectorId, questionnaireItemId }) => (
  <MeasureComponent
    anfStatementConnectorId={anfStatementConnectorId}
    questionnaireItemId={questionnaireItemId}
    tabName="time"
  />
);

export {TimeWrapper};
