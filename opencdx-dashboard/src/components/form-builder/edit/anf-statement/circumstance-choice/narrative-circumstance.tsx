import React, { useMemo } from 'react';

import {
    Divider
} from 'ui-library';
import { ANFStatement } from '@/api/questionnaire/model/anfstatement';
import { ControlledInput } from '../custom/controlled-input';
import { MeasureComponent } from '../custom/measure';
import ControlledAccordion from '../custom/controlled-accordian';
import { PurposeComponent } from '../custom/purpose';

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

const NarrativeCircumstance: React.FC<{
    anfStatementConnectorId: number;
    questionnaireItemId: number;
    anfStatement: ANFStatement;
}> = ({ anfStatementConnectorId, questionnaireItemId, anfStatement }) => {
    const tabName = 'narrativeCircumstance';

    const baseFieldName = useMemo(() =>
        `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.${tabName}`,
        [questionnaireItemId, anfStatementConnectorId, tabName]
    );

    return (
        <>
            <AccordionSection title="Timing" isTitleBold>
                <MeasureComponent anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={`${tabName}.timing`} />
            </AccordionSection>

            <AccordionSection title="Purpose" isTitleBold>
                <PurposeComponent anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={tabName} />
            </AccordionSection>

            <AccordionSection title="Text">
                <ControlledInput placeholder="Text" name={`${baseFieldName}.text`} />
            </AccordionSection>
            <Divider className='bg-white' />
        </>
    );
};

export { NarrativeCircumstance };
