import React, { useEffect, useState } from "react";
import { RadioGroup, Radio, Input, Select, SelectItem, Button } from "ui-library";
import { Trash, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Divider } from "@nextui-org/react";
import { QuestionnaireItem } from "@/api/questionnaire/model/questionnaire-item";
import { Controller, useFormContext } from 'react-hook-form';
import { AnfOperatorType } from "@/api/questionnaire/model/anf-statement-connector";
import { v4 as uuidv4 } from 'uuid';
import { useId } from 'react';
const QuestionnaireItemType = [
    { key: "boolen", label: "Boolean" },
    { key: "choice", label: "Choice" },
    { key: "open-choice", label: "Open Choice" },
    { key: "datetime", label: "Date/Time" },
    { key: "string", label: "String" },
    { key: "number", label: "Number" },
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
    { value: AnfOperatorType.AnfOperatorTypeGreaterThan, label: ">", description: "is greater than" },
    { value: AnfOperatorType.AnfOperatorTypeLessThan, label: "<", description: "is less than" },
    { value: AnfOperatorType.AnfOperatorTypeGreaterThanOrEqual, label: ">=", description: "is greater than or equal to" },
    { value: AnfOperatorType.AnfOperatorTypeLessThanOrEqual, label: "<=", description: "is less than or equal to" },
    { value: AnfOperatorType.AnfOperatorTypeContains, label: "Empty", description: "is empty" },
    { value: AnfOperatorType.AnfOperatorTypeNotContains, label: "Not empty", description: "is not empty" },

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

    const [showQuestionCode, setShowQuestionCode] = useState(false);
    const [showConditionalDisplay, setShowConditionalDisplay] = useState(false);

    useEffect(() => {
        if (item.enableWhen && item.enableWhen.length > 0 && item.enableWhen[0].operator) {
            setShowConditionalDisplay(true);
        } else {
            setShowConditionalDisplay(false);
        }
        if (item.code && item.code.length > 0) {
            setShowQuestionCode(true);
        } else {
            setShowQuestionCode(false);
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
                    <p id={descriptionId} className="text-sm text-gray-500">{description}</p>
                </div>
            </Radio>
        );
    };

    const CustomRadio = ({ title, description, name }: { title: string, description: string, name: string }) => (
        <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-sm text-gray-500 mt-2">{description}</p>
            <Controller
                control={control}
                name={`${basePath}.${name}`}
                render={({ field }) => (
                    <RadioGroup
                        orientation="horizontal"
                        value={field.value === true ? 'true' : 'false'}
                        onValueChange={(value) => {
                            if (value === 'true') {
                                field.onChange(true);
                            } else {
                                field.onChange(false);
                            }
                        }}
                        className="mt-2 my-2"
                        aria-label={title}
                    >
                        <Radio className="text-sm mr-4" value="true">Yes</Radio>
                        <Radio className="text-sm mr-4" value="false">No</Radio>
                    </RadioGroup>
                )}
            />
        </div>
    );



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
                    <p id={`description-${uniqueId}`} className="text-sm text-gray-500 mt-2">
                        Descriptive informational helper text here.
                    </p>
                </div>

                <div className="flex-1">
                    <Controller
                        name={`${basePath}.unit`}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Units"
                                variant="bordered"
                                radius="sm"
                                className="w-64 bg-white"
                                selectedKeys={[field.value]}
                                onSelectionChange={(keys) => {
                                    const selectedValue = Array.from(keys)[0] as string;
                                    field.onChange(selectedValue);
                                }}
                            >
                                <SelectItem key="meter">Meter</SelectItem>
                                <SelectItem key="month">Month</SelectItem>
                            </Select>
                        )}
                    />
                    <p className="text-sm text-gray-500 mt-2">Descriptive informational helper text here.</p>
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
                <p className="text-sm text-gray-500 mt-2">Descriptive informational helper text here.</p>
            </div>
            <Divider />
            <div>
                <Controller
                    name={`${basePath}.type`}
                    control={control}
                    render={({ field }: { field: any }) => (
                        <Select
                            {...field}
                            className="w-64 bg-white"
                            label="Data Type"
                            selectedKeys={[field.value]}
                            variant="bordered"
                            radius="sm"
                            onSelectionChange={(keys) => {
                                const selectedValue = Array.from(keys)[0] as string;
                                field.onChange(selectedValue);
                                handleChange(selectedValue);
                            }}
                        >
                            {QuestionnaireItemType.map((type) => (
                                <SelectItem key={type.key} value={type.key}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                />

                <p className="text-sm text-gray-500 mt-2">Please select your Datatype.</p>
            </div>
            <Divider />

            <div className='w-full'>
                <Controller
                    control={control}
                    name={`${basePath}.enableWhen[0].operator`}
                    render={({ field }) => (
                        <RadioGroup
                            {...field}
                            label="Select Operator"
                            orientation="horizontal"
                            classNames={{
                                label: 'text-black',
                              }}
                            aria-label="Select Operator"
                            id="operator-radio-group"
                        >
                            <div className="flex flex-wrap">
                                {dataType === "boolean" || dataType === "choice" || dataType === "open-choice" ? (
                                    radioOptions.map((option) => (
                                        <div key={option.value} className="w-1/4">
                                            <CustomRadioOperator
                                                description={option.description}
                                                value={option.value}
                                                id={`operator-${option.value}`}
                                            >
                                                {option.label}
                                            </CustomRadioOperator>
                                        </div>
                                    ))
                                ) :
                                    radioOprionsExtended.map((option) => (
                                        <div key={option.value} className="w-1/4">
                                            <CustomRadioOperator
                                                description={option.description}
                                                value={option.value}
                                                id={`operator-${option.value}`}
                                            >
                                                {option.label}
                                            </CustomRadioOperator>
                                        </div>
                                    ))
                                }
                            </div>
                        </RadioGroup>
                    )}
                />
            </div>


            <Divider />

            {(dataType === "choice" || dataType === "open-choice") && (
                <div>
                    <div>
                        <p className="text-sm font-medium mb-2">Answer choices</p>
                        <p className="text-sm text-gray-500">Descriptive informational helper text here.</p>
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
                                    <p className="text-sm text-gray-500 mt-1">Descriptive informational helper text here.</p>
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
                        <p className="text-sm font-medium mb-2">Answer list layout</p>
                        <p className="text-sm text-gray-500">Descriptive informational helper text here.</p>
                        <Controller
                            name={`${basePath}.extension[0].valueCodeableConcept.coding[0].code`}
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    orientation="horizontal"
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="mt-2"
                                    aria-label="Answer list layout"
                                    id="answer-list-layout-radio-group"
                                >
                                    <Radio className="text-sm mr-4" value="drop-down">Drop down</Radio>
                                    <Radio className="text-sm mr-4" value="radio-button">Radio button</Radio>
                                </RadioGroup>
                            )}
                        />
                    </div>
                    <Divider className="my-4" />
                </div>
            )}
            <div className="space-y-4">
                <CustomRadio title="Answer required?" description="Descriptive informational helper text here." name="required" />
                <Divider />
                <CustomRadio title="Read only?" description="Descriptive informational helper text here." name="readOnly" />
                <Divider />
                <div>
                    <p className="text-sm font-medium">Add question code?</p>
                    <p className="text-sm text-gray-500 mt-2">Descriptive informational helper text here.</p>
                    <RadioGroup
                        orientation="horizontal"
                        onValueChange={(value) => {
                            if (value === 'true') {
                                setShowQuestionCode(true);
                            } else {
                                setShowQuestionCode(false);
                            }
                        }}
                        defaultValue={showQuestionCode ? 'true' : 'false'}
                        className="mt-2 my-2"
                        aria-label="Add question code"
                        id="add-question-code-radio-group"
                    >
                        <Radio className="text-sm mr-4" value="true">Yes</Radio>
                        <Radio className="text-sm mr-4" value="false">No</Radio>
                    </RadioGroup>
                </div>
                {showQuestionCode && (
                    <div className="flex flex-col gap-4">
                        {questionCodes.map((qCode, index) => (
                            <div key={index} className="flex flex-wrap gap-4">
                                <div className="flex-1 min-w-[350px]">
                                    <Controller
                                        name={`${basePath}.code[${index}].system`}
                                        control={control}
                                        render={({ field }) =>
                                            <Select
                                                {...field}
                                                label="Select Question Code"
                                                variant="bordered"
                                                radius="sm"
                                                className="w-full bg-white"
                                                value={qCode.type}

                                                defaultSelectedKeys={[field.value]}
                                                onSelectionChange={(keys) => {
                                                    const selectedValue = Array.from(keys)[0];
                                                    field.onChange(selectedValue);
                                                }}
                                            >
                                                <SelectItem key="icd">ICD</SelectItem>
                                                <SelectItem key="loinc">LOINC</SelectItem>
                                                <SelectItem key="snomed">SNOMED</SelectItem>
                                                <SelectItem key="ndc">NDC</SelectItem>
                                                <SelectItem key="tinkar">Tinkar</SelectItem>
                                            </Select>
                                        }
                                    />


                                    <p className="text-sm text-gray-500 mt-2">Descriptive informational helper text here.</p>
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
                                    <p className="text-sm text-gray-500 mt-2">Descriptive informational helper text here.</p>
                                </div>
                            </div>
                        ))}

                        <Button
                            className="text-sm"
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
                <p className="text-sm font-medium">Conditional display?</p>
                <p className="text-sm text-gray-500 mt-2">Descriptive informational helper text here.</p>
                <RadioGroup
                    orientation="horizontal"
                    onValueChange={(value) => {
                        if (value === 'true') {
                            setShowConditionalDisplay(true);
                        } else {
                            setShowConditionalDisplay(false);
                        }
                    }}
                    className="mt-2 my-2"
                    id="conditional-display-radio-group"
                    aria-label="Conditional display"
                    defaultValue={showConditionalDisplay ? 'true' : 'false'}
                >
                    <Radio className="text-sm mr-4" value="true" id="conditional-display-yes-radio">Yes</Radio>
                    <Radio className="text-sm mr-4" value="false" id="conditional-display-no-radio">No</Radio>
                </RadioGroup>
            </div>

            {showConditionalDisplay && (
                <div className="">
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
                                                    {...field}
                                                    label="Operator"
                                                    variant="bordered"
                                                    radius="sm"
                                                    className="w-full bg-white"
                                                    value={row.operator}
                                                    defaultSelectedKeys={[field.value]}
                                                    onSelectionChange={(keys) => {
                                                        const selectedValue = Array.from(keys)[0];
                                                        field.onChange(selectedValue);
                                                    }}
                                                    tabIndex={0}
                                                    aria-label="Select operator"
                                                >
                                                    {radioOprionsExtended.map((option) => (
                                                        <SelectItem key={option.value}>{option.label}</SelectItem>
                                                    ))}
                                                </Select>
                                            )}
                                        />
                                        <p className="text-sm text-gray-500 mt-2">Descriptive informational helper text here.</p>
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
                                        <p className="text-sm text-gray-500 mt-2">Descriptive informational helper text here.</p>
                                    </div>

                                    <div className="flex-1 min-w-[150px]">
                                        <Controller
                                            name={`${basePath}.enableWhen[${index}].question`}
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    label="Action"
                                                    variant="bordered"
                                                    radius="sm"
                                                    className="w-full bg-white"
                                                    value={row.action}
                                                    defaultSelectedKeys={[field.value]}
                                                    onSelectionChange={(keys) => {
                                                        const selectedValue = Array.from(keys)[0];
                                                        field.onChange(selectedValue);
                                                    }}
                                                    tabIndex={0}
                                                    aria-label="Select action"
                                                >
                                                    {fields
                                                        .filter((field: any) => field.linkId !== item.linkId)
                                                        .map((field: any, index: number) => (
                                                            <SelectItem 
                                                                key={field.linkId}
                                                                tabIndex={0}
                                                                aria-label={`Select ${field.text}`}
                                                            >
                                                                {field.text}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </Select>
                                            )}
                                        />
                                        <p className="text-sm text-gray-500 mt-2">Descriptive informational helper text here.</p>
                                    </div>

                                    <Button
                                        isIconOnly
                                        color="danger"
                                        variant="light"
                                        onClick={() => handleRemoveConditionalRow(index)}
                                        className="mt-2"
                                        size="sm"
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
                        size="sm"
                        fullWidth
                        endContent={<Plus aria-label="Add another condition" />}
                        onClick={handleAddConditionalRow}
                    >
                        Add Another Condition
                    </Button>
                </div>
            )}


        </div>
    );
}