import { ANFStatement } from '@/api/questionnaire/model/anfstatement';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioGroup, Radio } from 'ui-library';
import { useState } from 'react';
import { PerformanceCircumstance } from './performance-circumstance';
import { RequestCircumstance } from './request-circumstance';
import { NarrativeCircumstance } from './narrative-circumstance';

interface CircumstanceChoiceProps {
    anfStatementConnectorId: number;
    questionnaireItemId: number;
    anfStatement: ANFStatement;
}

const CircumstanceChoice = ({ anfStatementConnectorId, questionnaireItemId, anfStatement }: CircumstanceChoiceProps) => {
    const { control } = useFormContext();
    const [tabName, setTabName] = useState('requestCircumstance');

    const circumstanceComponents = {
        performanceCircumstance: PerformanceCircumstance,
        requestCircumstance: RequestCircumstance,
        narrativeCircumstance: NarrativeCircumstance,
    };

    const CircumstanceComponent = circumstanceComponents[tabName as keyof typeof circumstanceComponents];

    return (
        <div className='flex flex-col gap-4'>
            <div className='p-4'>
                <label className="text w-[200px]">Circumstance Type</label>
                <Controller
                    control={control}
                    name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.requestCircumstance.type`}
                    render={({ field }) => (
                        <RadioGroup
                            orientation='horizontal'
                            size='sm'
                            defaultValue={tabName}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                if (value in circumstanceComponents) {
                                    setTabName(value);
                                }
                            }}
                        >
                            {Object.keys(circumstanceComponents).map((key) => (
                                <Radio
                                    key={key}
                                    value={key}
                                    size='sm'
                                    className={`${key !== 'performanceCircumstance' ? 'ml-2' : ''} pt-8`}
                                >
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                                </Radio>
                            ))}
                        </RadioGroup>
                    )}
                />
            </div>
            {CircumstanceComponent && (
                <CircumstanceComponent
                    anfStatementConnectorId={anfStatementConnectorId}
                    questionnaireItemId={questionnaireItemId}
                    anfStatement={anfStatement}
                />
            )}
        </div>
    );
};

export { CircumstanceChoice };