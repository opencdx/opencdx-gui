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

export default function BooleanQuestionConfig({
    item,
    questionnaireItemId,
}: {
    item: QuestionnaireItem;
    questionnaireItemId: number;
}) {
    const { control, setValue, getValues } = useFormContext();
    const basePath = `item.${questionnaireItemId}`;
    const QuestionnaireItemType = [
        { key: "boolen", label: "Boolean" },
        { key: "choice", label: "Choice" },
        { key: "open-choice", label: "Open Choice" },
        { key: "datetime", label: "Datetime" },
        { key: "string", label: "String" },
        { key: "number", label: "Number" },
    ]


    const CustomRadioOperator = (props: any) => {
        const { children, ...otherProps } = props;

        return (
            <Radio
                {...otherProps}
                classNames={{
                    base: cn(
                        'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
                        'flex-row cursor-pointer rounded-lg gap-2 p-2 w-[250px] mb-1 border-2 border-transparent',
                        'data-[selected=true]:border-primary',
                    ),
                }}
            >
                {children}
            </Radio>
        );
    };
    const [activeTab, setActiveTab] = useState('question');


    const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>, tabId: string) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveTab(tabId);
    };
    useEffect(() => {
        if (!item.linkId) {
            setValue(`${basePath}.linkId`, uuidv4());
        }

    }, []);

    const [showQuestionCode, setShowQuestionCode] = useState(false);
    const [showConditionalDisplay, setShowConditionalDisplay] = useState(false);

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
                    >
                        <Radio className="text-sm mr-4" value="true">Yes</Radio>
                        <Radio className="text-sm mr-4" value="false">No</Radio>
                    </RadioGroup>
                )}
            />
        </div>
    );

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

    const addAnswerChoice = () => {
        setAnswerChoices([...answerChoices, { display: '' }]);
        // Also update the form context
        const currentAnswers = getValues(`${basePath}.answerOption`) || [];
        setValue(`${basePath}.answerOption`, [...currentAnswers, { valueCoding: { display: '' } }]);
    };

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

    const [questionCodes, setQuestionCodes] = useState([{ type: '', code: '' }]);

    const handleAddQuestionCode = () => {
        setQuestionCodes([...questionCodes, { type: '', code: '' }]);
    };

    // Add new state for conditional display rows
    const [conditionalRows, setConditionalRows] = useState([
        { operator: '', answer: '', action: '' }
    ]);

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
                                aria-describedby={`description-${uniqueId}`}
                            />
                        )}
                    />
                    <p id={`description-${uniqueId}`} className="text-sm text-gray-500 mt-2">
                        Descriptive informational helper text here.
                    </p>
                </div>

                <div className="flex-1">
                    <Select
                        label="Units"
                        variant="bordered"
                        radius="sm"
                        className="w-64 bg-white"
                        aria-describedby={`units-${uniqueId}`}
                    >
                        <SelectItem key="meter">Meter</SelectItem>
                        <SelectItem key="month">Month</SelectItem>
                    </Select>
                    <p className="text-sm text-gray-500 mt-2">Descriptive informational helper text here.</p>
                </div>
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
                            defaultSelectedKeys={[field.value]}
                            variant="bordered"
                            radius="sm"
                            aria-describedby={`type-${uniqueId}`}
                            onSelectionChange={(keys) => {
                                const selectedValue = Array.from(keys)[0];
                                field.onChange(selectedValue);
                            }}
                            onChange={(e) => handleChange(e.target.value)}
                        >
                            {Object.values(QuestionnaireItemType).map((type) => (
                                <SelectItem key={type.key}>{type.label}</SelectItem>
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
                            aria-label="Select Operator"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                field.onChange(e.target.value);
                                //   const formData = getValues();
                                //   localStorage.setItem('questionnaire-store', JSON.stringify(formData));
                            }}
                        >
                            <div className="flex flex-wrap">
                                {dataType === "boolean" || dataType === "choice" || dataType === "open-choice" ? (
                                    radioOptions.map((option) => (
                                        <div key={option.value} className="w-1/4">
                                            <CustomRadioOperator
                                                description={option.description}
                                                value={option.value}
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
                                                aria-describedby={`answer-choice-${index + 1}`}
                                                placeholder="Display"
                                                variant="bordered"
                                                radius="sm"
                                                className="w-full"
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    const newChoices = [...answerChoices];
                                                    newChoices[index].display = e.target.value;
                                                    setAnswerChoices(newChoices);
                                                }}
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
                                endContent={<Plus />}
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
                        className="mt-2 my-2"
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
                            name={`${basePath}.code[0].system`}
                                        control={control}
                                        render={({ field }) => 
                                            <Select
                                                {...field}
                                                label="Select System"
                                                variant="bordered"
                                                aria-describedby={`system-${uniqueId}`}
                                                radius="sm"
                                                className="w-full bg-white"
                                                value={qCode.type}
                                                onChange={(e) => {
                                            const newCodes = [...questionCodes];
                                            newCodes[index].type = e.target.value;
                                            setQuestionCodes(newCodes);
                                        }}
                                    >
                                        <SelectItem key="icd">ICD</SelectItem>
                                        <SelectItem key="loinc">LOINC</SelectItem>
                                        <SelectItem key="snomed">SNOMED</SelectItem>
                                                <SelectItem key="ndc">NDC</SelectItem>
                                            </Select>
                                        }
                                    />


                                    <p className="text-sm text-gray-500 mt-2">Descriptive informational helper text here.</p>
                                    </div>

                                <div className="flex-1 min-w-[350px]">
                                    <Controller
                                        name={`${basePath}.code[0].code`}
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Question Code"
                                                variant="bordered"
                                                radius="sm"
                                                className="w-full"
                                                aria-describedby={`question-code-${uniqueId}`}
                                                placeholder="Enter question code"
                                                value={qCode.code}
                                                onChange={(e) => {
                                            const newCodes = [...questionCodes];
                                            newCodes[index].code = e.target.value;
                                                    setQuestionCodes(newCodes);
                                                }}
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
                            endContent={<Plus />}
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
                >
                    <Radio className="text-sm mr-4" value="true">Yes</Radio>
                    <Radio className="text-sm mr-4" value="false">No</Radio>
                </RadioGroup>
            </div>

            {showConditionalDisplay && (
                <div className="">
                    <div className="border border-[#99C7FB] p-4">
                        {conditionalRows.map((row, index) => (
                            <>
                                <div key={index} className="flex flex-wrap gap-4 mb-4 ">

                                    <div className="flex-1 min-w-[150px]">
                                        <Select
                                            label="Operator"
                                            variant="bordered"
                                            radius="sm"
                                            className="w-full bg-white"
                                            aria-describedby={`operator-${uniqueId}`}   
                                            value={row.operator}
                                            onChange={(e) => {
                                                const newRows = [...conditionalRows];
                                                newRows[index].operator = e.target.value;
                                                setConditionalRows(newRows);
                                            }}
                                        >
                                            <SelectItem key="=">=</SelectItem>
                                            <SelectItem key="<>">≠</SelectItem>
                                            <SelectItem key="exists">Empty</SelectItem>
                                            <SelectItem key="not-exists">Not empty</SelectItem>
                                        </Select>
                                        <p className="text-sm text-gray-500 mt-2">Descriptive informational helper text here.</p>
                                    </div>

                                    <div className="flex-1 min-w-[150px]">
                                        <Input
                                            label="Answer"
                                            variant="bordered"
                                            radius="sm"
                                            className="w-full"
                                            placeholder="Enter answer"
                                            value={row.answer}
                                            onChange={(e) => {
                                                const newRows = [...conditionalRows];
                                                newRows[index].answer = e.target.value;
                                                setConditionalRows(newRows);
                                            }}
                                        />
                                        <p className="text-sm text-gray-500 mt-2">Descriptive informational helper text here.</p>
                                    </div>

                                    <div className="flex-1 min-w-[150px]">
                                        <Select
                                            label="Action"
                                            variant="bordered"
                                            radius="sm"
                                            className="w-full bg-white"
                                            aria-describedby={`action-${uniqueId}`}
                                            value={row.action}
                                            onChange={(e) => {
                                                const newRows = [...conditionalRows];
                                                newRows[index].action = e.target.value;
                                                setConditionalRows(newRows);
                                            }}
                                        >
                                            <SelectItem key="q1">Q1</SelectItem>
                                            <SelectItem key="q2">Q2</SelectItem>
                                            <SelectItem key="q3">Q3</SelectItem>
                                        </Select>
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
                                        <Trash className="h-4 w-4" />
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
                        endContent={<Plus />}
                        onClick={handleAddConditionalRow}
                    >
                        Add Another Condition
                    </Button>
                </div>
            )}


        </div>
    );
}