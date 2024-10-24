import React from 'react';
import { MeasureComponent } from './custom/measure';

interface TimeWrapperProps {
  anfStatementConnectorId: number;
  questionnaireItemId: number;
}

const TimeWrapper: React.FC<TimeWrapperProps> = ({ anfStatementConnectorId, questionnaireItemId }) => (
  <div className='flex flex-col p-4'>
    <MeasureComponent
      anfStatementConnectorId={anfStatementConnectorId}
      questionnaireItemId={questionnaireItemId}
      tabName="time"
    />
  </div>
);

export { TimeWrapper };
