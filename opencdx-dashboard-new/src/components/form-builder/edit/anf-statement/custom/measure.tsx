import { ControlledInput } from "./controlled-input";
import { ControlledRadio } from "./controlled-radio";
import { Divider } from "ui-library";

const MeasureComponent = ({ anfStatementConnectorId, questionnaireItemId, tabName, label }: MeasureComponentProps) => {
    const getFieldName = (field: string) =>
        `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.${tabName}.${field}`;
    const BoundInput = ({ label, fieldName, includeBoundName }: BoundInputProps) => (
        <>
            <div className="flex items-center gap-4 p-4 pt-8">
                <ControlledInput isFullWidth={false} label={label} name={getFieldName(fieldName)} />
                <ControlledRadio label={`Include ${label}:`} name={getFieldName(includeBoundName)} />
            </div>
            <Divider className="bg-[#99C7FB]" />
        </>
    );
    return (
        <div className="flex flex-col gap-4">
            {label && <label className="pl-4 pb-0 text-sm font-bold text-black">{label}</label>}
            
            <BoundInput label="Lower Bound" fieldName="lowerBoundConfig" includeBoundName="includeLowerBound" />
            <BoundInput label="Upper Bound" fieldName="upperBoundConfig" includeBoundName="includeUpperBound" />
            
            <ControlledInput
                className="w-full p-4"
                isFullWidth
                label="Semantic"
                name={getFieldName("semantic.expression")}
            />
            
            <ControlledInput
                className="w-full p-4"
                isFullWidth
                label="Resolution"
                type="number"
                name={getFieldName("resolution")}
            />
        </div>
    );
};

interface MeasureComponentProps {
    anfStatementConnectorId: number;
    questionnaireItemId: number;
    tabName: string;
    label?: string;
}

interface BoundInputProps {
    label: string;
    fieldName: string;
    includeBoundName: string;
}



export { MeasureComponent };