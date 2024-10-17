import React, { useMemo } from 'react';

import {
  Divider} from 'ui-library';
import { ANFStatement } from '@/api/questionnaire/model/anfstatement';
import { ControlledInput } from '../custom/controlled-input';
import { MeasureComponent } from '../custom/measure';
import { ParticipantComponent } from '../custom/participant';
import { DeviceIdComponent } from '../custom/deviceid';

export const values = [
  { key: 'performance', label: 'Performance Circumstance' },
  { key: 'request', label: 'Request Circumstance' },
  { key: 'narrative', label: 'Narrative Circumstance' },
];

const PerformanceCircumstance: React.FC<{
  anfStatementConnectorId: number;
  questionnaireItemId: number;
  anfStatement: ANFStatement;
}> = ({ anfStatementConnectorId, questionnaireItemId, anfStatement }) => {
  const tabName = 'performanceCircumstance';

  const baseFieldName = useMemo(() => 
    `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.${tabName}`,
    [questionnaireItemId, anfStatementConnectorId, tabName]
  );

  return (
    <>
      <Divider className='bg-[#99C7FB]' />
      <div className='p-4'>
        <ControlledInput label="Status" name={`${baseFieldName}.status.expression`} />
      </div>
      <Divider className='bg-[#99C7FB]' />
      <DeviceIdComponent
                anfStatementConnectorId={anfStatementConnectorId}
                questionnaireItemId={questionnaireItemId}
                tabName={tabName}
            />
      <Divider className='bg-[#99C7FB]' />
      <MeasureComponent label='Results' anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={`${tabName}.result`} />
      <Divider className='bg-[#99C7FB]' />
      <ControlledInput className='p-4' label="Health Risk" name={`${baseFieldName}.healthRisk.expression`} />
      <Divider className='bg-[#99C7FB]' />
      <MeasureComponent label='Normal Range' anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={`${tabName}.normalRange`} />
      <Divider className='bg-[#99C7FB]' />
      <MeasureComponent label='Timing' anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={`${tabName}.timing`} />
      <Divider className='bg-[#99C7FB]' />
      <ParticipantComponent label='Participant' anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} anfStatement={anfStatement} tabName={tabName} />

    </>

  );
};

export { PerformanceCircumstance };
