import { ANFStatement } from '@/api/questionnaire/model/anfstatement';
import { useFormContext } from 'react-hook-form';
import { RadioGroup, Radio } from 'ui-library';
import { useState, useEffect, useRef } from 'react';
import { PerformanceCircumstance } from './performance-circumstance';
import { RequestCircumstance } from './request-circumstance';
import { NarrativeCircumstance } from './narrative-circumstance';

interface CircumstanceChoiceProps {
    anfStatementConnectorId: number;
    questionnaireItemId: number;
    anfStatement: ANFStatement;
}

const CircumstanceChoice = ({ anfStatementConnectorId, questionnaireItemId, anfStatement }: CircumstanceChoiceProps) => {
    const { setValue, getValues } = useFormContext();
    const previousTabRef = useRef<string>();
    const cachedValues = useRef<Record<string, any>>({});
    
    // Determine initial circumstance type from the ANF statement
    const getInitialCircumstanceType = () => {
        if (anfStatement.narrativeCircumstance) return 'narrativeCircumstance';
        if (anfStatement.requestCircumstance) return 'requestCircumstance';
        return 'performanceCircumstance';
    };

    const [tabName, setTabName] = useState(getInitialCircumstanceType());

    const circumstanceComponents = {
        performanceCircumstance: PerformanceCircumstance,
        requestCircumstance: RequestCircumstance,
        narrativeCircumstance: NarrativeCircumstance,
    };

    const handleCircumstanceSwitch = (selectedType: string) => {
        const basePath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement`;
        const currentValues = getValues();
        
        // Cache current values before switching
        if (previousTabRef.current) {
            const currentCircumstanceValues = currentValues?.item?.[questionnaireItemId]?.anfStatementConnector?.[anfStatementConnectorId]?.anfStatement?.[previousTabRef.current];
            if (currentCircumstanceValues) {
                cachedValues.current[previousTabRef.current] = currentCircumstanceValues;
            }
        }

        // Restore cached values for the selected type
        if (cachedValues.current[selectedType]) {
            setValue(`${basePath}.${selectedType}`, cachedValues.current[selectedType]);
        }

        // Hide current values from form but don't delete them
        const types = ['performanceCircumstance', 'requestCircumstance', 'narrativeCircumstance'];
        types.forEach(type => {
            if (type !== selectedType) {
                setValue(`${basePath}.${type}`, undefined);
            }
        });
    };

    // Handle circumstance type changes
    useEffect(() => {
        handleCircumstanceSwitch(tabName);
        previousTabRef.current = tabName;
    }, [tabName]);

    const CircumstanceComponent = circumstanceComponents[tabName as keyof typeof circumstanceComponents];

    return (
        <div className='flex flex-col gap-4'>
            <div className='p-4'>
                <label className="text w-[200px]">Circumstance Type</label>
                <RadioGroup
                    orientation='horizontal'
                    size='sm'
                    value={tabName}
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