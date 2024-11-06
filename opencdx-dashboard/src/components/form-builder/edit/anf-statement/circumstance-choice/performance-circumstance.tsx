import React, { useMemo } from 'react';

import {
  Divider
} from 'ui-library';
import { ANFStatement } from '@/api/questionnaire/model/anfstatement';
import { ControlledInput } from '@/components/custom/controlled-input';
import { MeasureComponent } from '@/components/form-builder/edit/anf-statement/custom/measure';
import { ParticipantComponent } from '@/components/form-builder/edit/anf-statement/custom/participant';
import { DeviceIdComponent } from '@/components/form-builder/edit/anf-statement/custom/deviceid';
import ControlledAccordion from '@/components/custom/controlled-accordian';


interface AccordionSectionProps {
  title: string;
  isTitleBold?: boolean;
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, isTitleBold = false, children }) => (
  <>
    <Divider className='bg-[#99C7FB]' />
    <ControlledAccordion title={title} isTitleBold={isTitleBold}>
      {children}
    </ControlledAccordion>
  </>
);

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
      <AccordionSection title="Status:">
        <ControlledInput placeholder="Status" name={`${baseFieldName}.status.expression`} />
      </AccordionSection>

      <AccordionSection title="Device ID:">
        <DeviceIdComponent
          anfStatementConnectorId={anfStatementConnectorId}
          questionnaireItemId={questionnaireItemId}
          tabName={tabName}
        />
      </AccordionSection>

      <AccordionSection title="Results" isTitleBold>
        <MeasureComponent anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={`${tabName}.result`} />
      </AccordionSection>

      <AccordionSection title="Health Risk:">
        <ControlledInput placeholder="Health Risk" name={`${baseFieldName}.healthRisk.expression`} />
      </AccordionSection>

      <AccordionSection title="Normal Range" isTitleBold>
        <MeasureComponent anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={`${tabName}.normalRange`} />
      </AccordionSection>

      <AccordionSection title="Timing" isTitleBold>
        <MeasureComponent anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={`${tabName}.timing`} />
      </AccordionSection>

      <AccordionSection title="Participant" isTitleBold>
        <ParticipantComponent anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} anfStatement={anfStatement} tabName={tabName} />
      </AccordionSection>
      <Divider className='bg-white' />
    </>
  );
};

export { PerformanceCircumstance };
