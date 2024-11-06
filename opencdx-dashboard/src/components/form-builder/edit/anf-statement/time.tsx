import React from 'react';
import { MeasureComponent } from '@/components/form-builder/edit/anf-statement/custom/measure';

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
