import { ANFStatement } from "@/api/questionnaire/model/anfstatement";  

interface RequestCircumstanceProps {
    anfStatementConnectorId: number;
    questionnaireItemId: number;
    anfStatement: ANFStatement;
}

const RequestCircumstance = ({ anfStatementConnectorId, questionnaireItemId, anfStatement }: RequestCircumstanceProps) => {
    return (
        <div>
            <h1>Request Circumstance</h1>
        </div>
    )
}

export { RequestCircumstance };