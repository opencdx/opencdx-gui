import { ANFStatement } from '@/api/questionnaire/model/anfstatement';


interface NarrativeCircumstanceProps {
    anfStatementConnectorId: number;
    questionnaireItemId: number;
    anfStatement: ANFStatement;
}

const NarrativeCircumstance = ({ anfStatementConnectorId, questionnaireItemId, anfStatement }: NarrativeCircumstanceProps) => {  
    return (
        <div>
            <h1>Narrative Circumstance</h1>
        </div>
    )
}

export { NarrativeCircumstance };