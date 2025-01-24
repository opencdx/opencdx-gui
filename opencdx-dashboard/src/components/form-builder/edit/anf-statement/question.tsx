import React, { useEffect, useState } from "react";
import { RadioGroup, Radio, Input, Button, Select, SelectItem } from "ui-library";
import { Trash, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Divider } from "@nextui-org/react";
import { QuestionnaireItem } from "@/api/questionnaire/model/questionnaire-item";
import { Controller, useFormContext } from 'react-hook-form';
import { AnfOperatorType } from "@/api/questionnaire/model/anf-statement-connector";
import { v4 as uuidv4 } from 'uuid';
import { useId } from 'react';
import { ControlledRadio } from "@/components/custom/controlled-radio";
import ControlledAccordion from "@/components/custom/controlled-accordian";
const QuestionnaireItemType = [
    { key: "boolean", label: "Boolean" },
    { key: "choice", label: "Choice" },
    { key: "open-choice", label: "Open Choice" },
    { key: "datetime", label: "Date/Time" },
    { key: "string", label: "String" },
    { key: "number", label: "Number" },
]
const QuestionCode = [
    { key: "icd", label: "ICD" },
    { key: "loinc", label: "LOINC" },
    { key: "master", label: "Master Specimen" },
    { key: "modifier", label: "Modifiers" },
    { key: "ndc", label: "NDC" },
    { key: "snomed", label: "SNOMED" },
]
const radioOptions = [
    { value: AnfOperatorType.AnfOperatorTypeEqual, label: "=", description: "is equal to" },
    { value: AnfOperatorType.AnfOperatorTypeNotEqual, label: "<>", description: "is not equal to" },
    { value: AnfOperatorType.AnfOperatorTypeContains, label: "Empty", description: "is empty" },
    { value: AnfOperatorType.AnfOperatorTypeNotContains, label: "Not empty", description: "is not empty" },

];

const radioOprionsExtended = [
    { value: AnfOperatorType.AnfOperatorTypeEqual, label: "=", description: "is equal to" },
    { value: AnfOperatorType.AnfOperatorTypeNotEqual, label: "<>", description: "is not equal to" },
    { value: AnfOperatorType.AnfOperatorTypeContains, label: "Empty", description: "is empty" },
    { value: AnfOperatorType.AnfOperatorTypeNotContains, label: "Not empty", description: "is not empty" },

    { value: AnfOperatorType.AnfOperatorTypeGreaterThanOrEqual, label: ">=", description: "is greater than or equal to" },
    { value: AnfOperatorType.AnfOperatorTypeLessThanOrEqual, label: "<=", description: "is less than or equal to" },
    { value: AnfOperatorType.AnfOperatorTypeGreaterThan, label: ">", description: "is greater than" },
    { value: AnfOperatorType.AnfOperatorTypeLessThan, label: "<", description: "is less than" },

];
export default function BooleanQuestionConfig({
    item,
    questionnaireItemId,
}: {
    item: QuestionnaireItem;
    questionnaireItemId: number;
}) {
    const { control, setValue, getValues } = useFormContext();
    const basePath = `item.${questionnaireItemId}`;

    const [showQuestionCode, setShowQuestionCode] = useState('no');
    const [showConditionalDisplay, setShowConditionalDisplay] = useState('no');

    useEffect(() => {
        if (item.enableWhen && item.enableWhen.length > 0 && item.enableWhen[0].operator) {
            setShowConditionalDisplay('yes');
        } else {
            setShowConditionalDisplay('no');
        }
        if (item.code && item.code.length > 0 && (item.code[0].system || item.code[0].code)) {

            setShowQuestionCode('yes');
        } else {
            setShowQuestionCode('no');
        }
    }, []);
    const fields = getValues('item') || [];
    const [dataType, setDataType] = useState(item.type);
    const handleChange = (value: string) => {
        setDataType(value);
    };

    // Update the initial state to include the existing answer options if any
    const [answerChoices, setAnswerChoices] = useState(() => {
        const existingAnswers = getValues(`${basePath}.answerOption`) || [];
        return existingAnswers.length > 0
            ? existingAnswers.map((answer: any) => ({ display: answer.valueCoding.display }))
            : [{ display: '' }];
    });
    useEffect(() => {
        if (!item.linkId) {
            setValue(`${basePath}.linkId`, uuidv4());
        }

    }, []);

    const CustomRadioOperator = (props: any) => {
        const { children, description, ...otherProps } = props;
        const descriptionId = `${otherProps.id}-description-${otherProps.value}`;

        return (
            <Radio
                {...otherProps}
                aria-describedby={descriptionId}
                classNames={{
                    base: cn(
                        'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
                        'flex-row cursor-pointer rounded-lg gap-2 p-2 w-[250px] mb-1 border-2 border-transparent',
                        'data-[selected=true]:border-primary',
                    ),
                }}
            >
                <div>
                    {children}
                    <p id={descriptionId} className="text-sm text-gray-500" >{description}</p>
                </div>
            </Radio>
        );
    };


    const addAnswerChoice = () => {
        setAnswerChoices([...answerChoices, { display: '' }]);
        // Also update the form context
        const currentAnswers = getValues(`${basePath}.answerOption`) || [];
        setValue(`${basePath}.answerOption`, [...currentAnswers, { valueCoding: { display: '' } }]);
    };



    const [questionCodes, setQuestionCodes] = useState(
        item.code && item.code.length > 0
            ? item.code.map((code: any) => ({ type: code.system, code: code.code }))
            : [{ type: '', code: '' }]);

    const handleAddQuestionCode = () => {
        setQuestionCodes([...questionCodes, { type: '', code: '' }]);
    };

    // Add new state for conditional display rows
    const [conditionalRows, setConditionalRows] = useState(
        item.enableWhen && item.enableWhen.length > 0
            ? item.enableWhen.map((enableWhen: any) => ({ operator: enableWhen.operator, answer: enableWhen.answer, action: enableWhen.question }))
            : [{ operator: '', answer: '', action: '' }]
    );

    // Add handler for adding new conditional row
    const handleAddConditionalRow = () => {
        setConditionalRows([...conditionalRows, { operator: '', answer: '', action: '' }]);
    };

    // Add handler for removing conditional row
    const handleRemoveConditionalRow = (index: number) => {
        const newRows = conditionalRows.filter((_, i) => i !== index);
        setConditionalRows(newRows);
    };

    // Generate a unique ID for ARIA attributes
    const uniqueId = useId().replace(/[^a-zA-Z0-9-_]/g, '');

    const units = [
        { value: 'year', label: 'Year' },
        { value: 'month', label: 'Month' },
        { value: 'day', label: 'Day' },
    ]
    return (
        <div className="space-y-6">
            <Divider />

            <div className="flex gap-4 w-full flex-wrap">
                <div className="flex-1">
                    <Controller
                        name={`${basePath}.text`}
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Enter your question"
                                variant="bordered"
                                radius="sm"
                                className="w-64 bg-white"
                            />
                        )}
                    />
                    <p id={`description-${uniqueId}-text`} className="text-sm text-gray-500 mt-2">
                        The text of the question.
                    </p>
                </div>

                <div className="flex-1">
                    <Controller
                        name={`${basePath}.unit`}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                variant="bordered"
                                radius="sm"
                                value={field.value}
                                onChange={(event: any) => {
                                    const values = [event.target.value];
                                    field.onChange(values);
                                }}
                                label="Units"
                                className="w-72 h-14"
                                aria-label="Select Unit"
                            >
                                {units.map((unit: any, index: number) => (
                                    <SelectItem key={index} value={unit.value}>{unit.label}</SelectItem>
                                ))}
                            </Select>
                        )}
                    />
                    <p className="text-sm text-gray-500 mt-2">The units for the answer.</p>
                </div>
            </div>
            <Divider />
            <div>
                <Controller
                    name={`${basePath}.initial[0].valueString`}
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            label="Initial Value"
                            variant="bordered"
                            radius="sm"
                            type='number'
                            className="w-64 bg-white"
                        />
                    )}
                />
                <p className="text-sm text-gray-500 mt-2">Value that should be pre-populated in the answer field.</p>
            </div>
            <Divider />
            <div>
                <Controller
                    name={`${basePath}.type`}
                    control={control}
                    render={({ field }: { field: any }) => (
                        <Select
                            {...field}
                            variant="bordered"
                            radius="sm"
                            value={field.value}
                            onChange={(event: any) => {
                                field.onChange(event.target.value);
                                handleChange(event.target.value);
                            }}
                            className="w-64 bg-white h-14"
                            aria-label="Data Type"
                            label="Data Type"
                        >
                            {QuestionnaireItemType.map((type) => (
                                <SelectItem key={type.key} value={type.key}>{type.label}</SelectItem>
                            ))}
                        </Select>

                    )}
                />

                <p className="text-sm text-gray-500 mt-2">The type of question item.</p>
            </div>
            <Divider />

            <div className='w-full'>
                <Controller
                    control={control}
                    name={`${basePath}.enableWhen[0].operator`}
                    render={({ field }) => (
                        <RadioGroup
                            orientation='horizontal'
                            label='Select Operator'
                            classNames={{
                                label: 'text-md font-normal text-black mb-2',
                                base: 'flex flex-wrap gap-4',
                                wrapper: 'grid grid-cols-4 gap-4'
                            }}
                            value={String(field.value)}
                            onChange={(event: { target: { value: string; }; }) => field.onChange(event.target.value)}
                        >
                            {
                                (dataType === "boolean" || dataType === "choice" || dataType === "open-choice"
                                    ? radioOptions
                                    : radioOprionsExtended
                                ).map((option) => (
                                    <Radio
                                        key={option.value}
                                        value={option.value}
                                        description={option.description}
                                        size='md'
                                        id={`${uniqueId}-${option.value}`}
                                        classNames={{
                                            base: 'w-full'
                                        }}
                                    >
                                        {option.label}
                                    </Radio>
                                ))
                            }
                        </RadioGroup>
                    )}
                />
            </div>


            <Divider />

            {(dataType === "choice" || dataType === "open-choice") && (
                <div>
                    <div>
                        <p className="text-md font-medium mb-2">Answer choices</p>
                        <p className="text-sm text-gray-500">The permitted answers.</p>
                        <div className="border overflow-hidden border-[#99C7FB] p-4 mt-4 mb-4">
                            {answerChoices.map((choice: any, index: number) => (
                                <div key={index} className="mt-2">
                                    <Controller
                                        name={`${basePath}.answerOption[${index}].valueCoding.display`}
                                        control={control}
                                        defaultValue={choice.display}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder="Display"
                                                variant="bordered"
                                                radius="sm"
                                                className="w-full"
                                            />
                                        )}
                                    />
                                </div>
                            ))}

                            <Button
                                className="text-sm mt-4"
                                variant="flat"
                                color="primary"
                                radius="sm"
                                fullWidth
                                endContent={<Plus aria-label="Add another answer" />}
                                onClick={addAnswerChoice}
                            >
                                Add Another Answer
                            </Button>
                        </div>
                    </div>
                    <Divider />

                    <div className="mt-6">
                        <p className="text-md font-medium mb-2">Answer list layout</p>
                        <p className="text-sm text-gray-500 mb-4">How the question should be displayed.</p>
                        <Controller
                            name={`${basePath}.extension[0].valueCodeableConcept.coding[0].code`}
                            control={control}
                            render={({ field }) => (

                                <RadioGroup
                                    orientation="horizontal"
                                    classNames={{
                                        label: 'text-sm font-normal text-black'
                                    }}
                                    defaultValue={String(field.value ?? 'drop-down')}
                                    onChange={(event: { target: { value: string; }; }) => field.onChange(event.target.value === 'drop-down' ? 'drop-down' : 'radio-button')}
                                >
                                    <Radio
                                        value="drop-down"
                                        size='md'
                                        id={`${uniqueId}-drop-down`}

                                    >
                                        Drop down
                                    </Radio>
                                    <Radio
                                        value="radio-button"
                                        size='md'
                                        className='ml-12'
                                        id={`${uniqueId}-radio-button`}
                                    >
                                        Radio button
                                    </Radio>
                                    <div id={`description-${uniqueId}-answer-list-layout`} className="sr-only">
                                        Description for the radio group
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </div>
                    <Divider className="my-4" />
                </div>
            )}
            <div className="space-y-4">
                <p className="text-md font-medium">Answer required?</p>
                <p className="text-sm text-gray-500">If yes, the questoin is required. If no, the question can be skipped.</p>
                <ControlledRadio name={`${basePath}.required`} />
                <Divider />
                <p className="text-md font-medium">Read only?</p>
                <p className="text-sm text-gray-500">If yes, the answer cannot be changed by a respondant.</p>
                <ControlledRadio name={`${basePath}.readOnly`} />
                <Divider />
                <div>
                    <p className="text-md font-medium">Add question code?</p>
                    <p className="text-sm text-gray-500 mt-2 mb-4">A terminology code that can be associated to this question.</p>

                    <RadioGroup
                        orientation="horizontal"
                        classNames={{
                            label: 'text-sm font-normal text-black'
                        }}
                        value={showQuestionCode}
                        defaultValue={showQuestionCode}
                        aria-labelledby={`description-${uniqueId}-question-code`}
                        onChange={(event: { target: { value: string; }; }) => {
                            setShowQuestionCode(event.target.value === 'yes' ? 'yes' : 'no')
                        }}
                    >
                        <Radio
                            value="yes"
                            size='md'
                            id={`${uniqueId}-yes-question-code`}

                        >
                            Yes
                        </Radio>
                        <Radio
                            value="no"
                            size='md'
                            className='ml-12'
                            id={`${uniqueId}-no-question-code`}
                        >
                            No
                        </Radio>
                        <div id={`description-${uniqueId}-question-code`} className="sr-only">
                            Description for the radio group
                        </div>
                    </RadioGroup>
                </div>
                {showQuestionCode === 'yes' && (
                    <div className="flex flex-col gap-4">
                        {questionCodes.map((qCode, index) => (
                            <div key={index} className="flex flex-wrap gap-4">
                                <div className="flex-1 min-w-[350px]">
                                    <Controller
                                        name={`${basePath}.code[${index}].system`}
                                        control={control}
                                        render={({ field }) =>
                                            <Select
                                                value={field.value}
                                                variant="bordered"
                                                radius="sm"
                                                onChange={(event: any) => {
                                                    const values = [event.target.value];
                                                    const selectedValue = Array.from(values)[0] as string;
                                                    field.onChange(selectedValue);
                                                    handleChange(selectedValue);
                                                }}

                                                label="Select Question Code"
                                                className="w-full bg-white h-14"
                                                aria-label="Select Question Code"
                                            >
                                                {QuestionCode.map((type) => (
                                                    <SelectItem key={type.key} value={type.key}>{type.label}</SelectItem>
                                                ))}
                                            </Select>
                                        }
                                    />


                                    <p className="text-sm text-gray-500 mt-2">The code system.</p>
                                </div>

                                <div className="flex-1 min-w-[350px]">
                                    <Controller
                                        name={`${basePath}.code[${index}].code`}
                                        control={control}
                                        render={({ field }) => (

                                            <Input
                                                {...field}
                                                label="Question Code"
                                                variant="bordered"
                                                radius="sm"
                                                className="w-full"
                                            />
                                        )}
                                    />
                                    <p className="text-sm text-gray-500 mt-2">The code from the coding system.</p>
                                </div>
                            </div>
                        ))}

                        <Button
                            className="text-sm w-fit"
                            variant="flat"
                            color="primary"
                            radius="sm"
                            endContent={<Plus aria-label="Add question code" />}
                            onClick={handleAddQuestionCode}
                        >
                            Add Question Code
                        </Button>
                    </div>
                )}
                <Divider />
            </div>

            <div>
                <p className="text-md font-medium">Conditional display?</p>
                <p className="text-sm text-gray-500 mt-2 mb-4">A constrait that indicates when the question should be displayed.</p>

                <RadioGroup
                    orientation="horizontal"
                    classNames={{
                        label: 'text-sm font-normal text-black'
                    }}
                    value={String(showConditionalDisplay)}
                    aria-labelledby={`description-${uniqueId}-conditional-display`}

                    onChange={(event: { target: { value: string; }; }) => setShowConditionalDisplay(event.target.value === 'yes' ? 'yes' : 'no')}
                >
                    <Radio
                        value="yes"
                        size='md'
                        id={`${uniqueId}-yes-conditional-display`}

                    >
                        Yes
                    </Radio>
                    <Radio
                        value="no"
                        size='md'
                        className='ml-12'
                        id={`${uniqueId}-no-conditional-display`}
                    >
                        No
                    </Radio>
                    <div id={`description-${uniqueId}-conditional-display`} className="sr-only">
                        Description for the radio group
                    </div>
                </RadioGroup>
            </div>


            {showConditionalDisplay === 'yes' && (
                <div>
                    <Divider className="my-4" />

                    <ControlledAccordion title="Advanced Fields" className=" p-0">
                        <div className="border border-[#99C7FB] p-4">
                            {conditionalRows.map((row, index) => (
                                <>
                                    <div key={index} className="flex flex-wrap gap-4 mb-4 ">

                                        <div className="flex-1 min-w-[150px]">
                                            <Controller
                                                name={`${basePath}.enableWhen[${index}].operator`}
                                                control={control}
                                                render={({ field }) => (

                                                    <Select
                                                        value={field.value}
                                                        onChange={(event: any) => {
                                                            const values = [event.target.value];
                                                            const selectedValue = Array.from(values)[0] as string;
                                                            field.onChange(selectedValue);
                                                            handleChange(selectedValue);
                                                        }}
                                                        label="Operator"
                                                        variant="bordered"
                                                        radius="sm"
                                                        className="w-full"
                                                        aria-label="Select operator"
                                                    >
                                                        {radioOprionsExtended.map((type) => (
                                                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                                        ))}
                                                    </Select>
                                                )}
                                            />
                                            <p className="text-sm text-gray-500 mt-2">The operatore in order for the question to be displayed.</p>
                                        </div>

                                        <div className="flex-1 min-w-[150px]">
                                            <Controller
                                                name={`${basePath}.enableWhen[${index}].answerCoding.display`}
                                                control={control}
                                                render={({ field }) => (
                                                    <Input

                                                        {...field}
                                                        label="Answer"
                                                        variant="bordered"
                                                        radius="sm"
                                                        className="w-full"
                                                    />
                                                )}
                                            />
                                            <p className="text-sm text-gray-500 mt-2">The answer that will trigger the question to be displayed.</p>
                                        </div>

                                        <div className="flex-1 min-w-[150px]">
                                            <Controller
                                                name={`${basePath}.enableWhen[${index}].question`}
                                                control={control}
                                                render={({ field }) => (

                                                    <Select
                                                        value={field.value}
                                                        onChange={(event: any) => {
                                                            const values = [event.target.value];
                                                            const selectedValue = Array.from(values)[0] as string;
                                                            field.onChange(selectedValue);
                                                            handleChange(selectedValue);
                                                        }}

                                                        label="Action"
                                                        variant="bordered"
                                                        radius="sm"
                                                        className="w-full"
                                                        aria-label="Action"
                                                    >
                                                        {fields
                                                            .filter((field: any) => field.linkId !== item.linkId)
                                                            .map((field: any, index: number) => (
                                                                <SelectItem key={index} value={field.linkId}>{field.text}</SelectItem>
                                                            ))}
                                                    </Select>
                                                )}
                                            />
                                            <p className="text-sm text-gray-500 mt-2">Which question should be displayed.</p>
                                        </div>

                                        <Button
                                            isIconOnly
                                            color="danger"
                                            variant="light"
                                            onClick={() => handleRemoveConditionalRow(index)}
                                            className="mt-2"
                                        >
                                            <Trash className="h-4 w-4" aria-label="Remove condition" />
                                        </Button>

                                    </div>
                                    {conditionalRows.length > 1 && index !== conditionalRows.length - 1 && (
                                        <Divider className=" my-4 border-[#99C7FB]" />
                                    )}
                                </>
                            ))}
                        </div>


                        <Button
                            className="text-sm mt-4"
                            variant="flat"
                            color="primary"
                            radius="sm"
                            fullWidth
                            endContent={<Plus aria-label="Add another condition" />}
                            onClick={handleAddConditionalRow}
                        >
                            Add Another Condition
                        </Button>
                    </ControlledAccordion>
                </div>
            )}


        </div>
    );
}