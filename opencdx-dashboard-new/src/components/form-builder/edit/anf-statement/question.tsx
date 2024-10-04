import React, { useState } from "react";
import { RadioGroup, Radio, Input, Accordion, AccordionItem, Select, SelectItem, Button } from "ui-library";
import { Trash, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Divider } from "@nextui-org/react";
import { QuestionnaireItem } from "@/api/questionnaire/model/questionnaire-item";
import { Controller, useFormContext } from 'react-hook-form';

export default function BooleanQuestionConfig({
    item,
    questionnaireItemId,
}: {
    item: QuestionnaireItem;
    questionnaireItemId: number;
}) {
    const { control } = useFormContext();
    const basePath = `item.${questionnaireItemId}`;
    const QuestionnaireItemType = [
        { key: "boolen", label: "Boolean" },
        { key: "choice", label: "Choice" },
        { key: "open-choice", label: "Open Choice" },
        { key: "date", label: "Date" },
        { key: "datetime", label: "Datetime" },
        { key: "string", label: "String" },
        { key: "number", label: "Number" },
        { key: "integer", label: "Integer" },
        { key: "decimal", label: "Decimal" },
        { key: "quantity", label: "Quantity" },
    ]

    const [conditionalDisplayRows, setConditionalDisplayRows] = useState([{ id: 1, question: "", operator: "", answer: "" }]);
    const [activeTab, setActiveTab] = useState('question');

    const addConditionalDisplayRow = () => {
        setConditionalDisplayRows([...conditionalDisplayRows, { id: conditionalDisplayRows.length + 1, question: "", operator: "", answer: "" }]);
    };

    const removeConditionalDisplayRow = (id: number) => {
        if (conditionalDisplayRows.length > 1) {
            setConditionalDisplayRows(conditionalDisplayRows.filter(row => row.id !== id));
        }
    };

    const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>, tabId: string) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveTab(tabId);
    };

    const tabs = [
        { id: 'question', label: 'Question' },
        { id: 'operator', label: 'Operator' },
        { id: 'answer', label: 'Answer' },
    ];
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
                        value={field.value === true ? 'true' : field.value === false ? 'false' : 'unspecified'}
                        onValueChange={(value) => {
                            if (value === 'true') {
                                field.onChange(true);
                            } else if (value === 'false') {
                                field.onChange(false);
                            } else if (value === 'unspecified') {
                                field.onChange(undefined);
                            }
                        }}
                        className="mt-2 my-2"
                    >
                        <Radio className="text-sm mr-4" value="true">Yes</Radio>
                        <Radio className="text-sm mr-4" value="false">No</Radio>
                        <Radio className="text-sm mr-4" value="unspecified">Unspecified</Radio>
                    </RadioGroup>
                )}
            />
            <Divider className="my-4" />
        </div>
    );
    const [dataType, setDataType] = useState(item.type);
    const handleChange = (value: string) => {
        setDataType(value);
    };


    return (
        <div className="space-y-6">
            <div>
                <Controller
                    name={`${basePath}.type`}
                    control={control}
                    render={({ field }: { field: any }) => (
                        <Select
                            {...field}
                            className="w-full"
                            defaultSelectedKeys={[field.value]}
                            variant="bordered"
                            radius="sm"
                            onChange={(e) => handleChange(e.target.value)}
                        >
                            {Object.values(QuestionnaireItemType).map((type) => (
                                <SelectItem key={type.key}>{type.label}</SelectItem>
                            ))}
                        </Select>
                    )}
                />

                <p className="text-sm text-gray-500 mt-2">Descriptive informational helper text here.</p>
                <Divider className="my-4" />
            </div>
            {dataType === "quantity" || dataType === "decimal" || dataType === "integer" && (
                <div>
                    <p className="text-sm font-medium mb-2">Units</p>
                    <p className="text-sm text-gray-500 mb-2 ">Search for UCUM unit or type your own</p>
                    <Input
                        placeholder="Search"
                        variant="bordered"
                        radius="sm"
                        className="w-1/2"
                        startContent={<Search />}
                    />
                    <Divider className="my-4" />
                </div>
            )}

            <div className="space-y-4">
                <CustomRadio title="Allow repeating question?" description="Descriptive informational helper text here." name="repeats" />
                <CustomRadio title="Answer required?" description="Descriptive informational helper text here." name="required" />
                <CustomRadio title="Read only?" description="Descriptive informational helper text here." name="readOnly" />
            </div>

            <Accordion>
                <AccordionItem key="1" aria-label="Advanced Fields" title="Advanced Fields">
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm font-medium">Conditional display</p>
                            <p className="text-sm text-gray-500 mb-2">Descriptive informational helper text here.</p>
                            <div className="border overflow-hidden">
                                <div className="flex bg-[#99C7FB] flex-row justify-between px-2">
                                    {tabs.map((item) => (
                                        <button
                                            key={item.id}
                                            className={cn(
                                                'font-small text-sm focus:outline-none transition-colors text-black',
                                                activeTab === item.id
                                                    ? 'm-1 p-1.5 bg-[#006FEE] text-white'
                                                    : 'm-1 p-1.5 text-black hover:bg-blue-100'
                                            )}
                                            onClick={(e) => handleTabClick(e, item.id)}
                                        >
                                            {item.label}
                                        </button>
                                    ))}

                                </div>
                                <div className="border border-[#99C7FB] p-4">
                                    {activeTab === 'question' && (
                                        <>
                                            <p className="text-sm text-gray-600 mb-4">Descriptive informational helper text here for Question tab.</p>
                                            {conditionalDisplayRows.map((row, index) => (
                                                <div key={row.id} className="flex items-center space-x-2 mb-2">
                                                    <Input
                                                        placeholder="Question"
                                                        value={row.question}
                                                        className='w-full'
                                                        variant="bordered"
                                                        radius='sm'
                                                        endContent={<Trash className="w-4 h-4" onClick={() => removeConditionalDisplayRow(row.id)} />}
                                                        onChange={(e) => {
                                                            const updatedRows = conditionalDisplayRows.map(r => r.id === row.id ? { ...r, question: e.target.value } : r);
                                                            setConditionalDisplayRows(updatedRows);
                                                        }}
                                                    />

                                                </div>
                                            ))}
                                        </>
                                    )}
                                    {activeTab === 'operator' && (
                                        <>
                                            <p className="text-sm text-gray-600 mb-4">Descriptive informational helper text here for Operator tab.</p>
                                            {conditionalDisplayRows.map((row, index) => (
                                                <div key={row.id} className="flex items-center space-x-2 mb-2">
                                                    <Input
                                                        placeholder="Operator"
                                                        value={row.operator}
                                                        className='w-full'
                                                        variant="bordered"
                                                        radius='sm'
                                                        endContent={<Trash className="w-4 h-4" />}
                                                        onChange={(e) => {
                                                            const updatedRows = conditionalDisplayRows.map(r => r.id === row.id ? { ...r, operator: e.target.value } : r);
                                                            setConditionalDisplayRows(updatedRows);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    {activeTab === 'answer' && (
                                        <>
                                            <p className="text-sm text-gray-600 mb-4">Descriptive informational helper text here for Answer tab.</p>
                                            {conditionalDisplayRows.map((row, index) => (
                                                <div key={row.id} className="flex items-center space-x-2 mb-2">
                                                    <Input
                                                        placeholder="Answer"
                                                        value={row.answer}
                                                        className='w-full'
                                                        variant="bordered"
                                                        radius='sm'
                                                        endContent={<Trash className="w-4 h-4" onClick={() => removeConditionalDisplayRow(row.id)} />}
                                                        onChange={(e) => {
                                                            const updatedRows = conditionalDisplayRows.map(r => r.id === row.id ? { ...r, answer: e.target.value } : r);
                                                            setConditionalDisplayRows(updatedRows);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    <Button
                                        className="text-sm mr-4 mt-4"
                                        variant='flat'
                                        color="primary"
                                        radius="sm"
                                        fullWidth
                                        endContent={<Plus />}
                                        onClick={addConditionalDisplayRow}
                                    >
                                        Add another condition
                                    </Button>
                                </div>

                            </div>
                        </div>


                        <div>
                            <p className="text-sm font-medium mb-2">Show this item when</p>
                            <p className="text-sm text-gray-500">Descriptive informational helper text here.</p>
                            <RadioGroup
                                orientation="horizontal"
                                value={item.enableBehavior}
                                className="mt-2 mb-2"
                            >
                                <Radio className="text-sm mr-4" value="all">All the conditions are true</Radio>
                                <Radio className="text-sm mr-4" value="any">Any conditions are true</Radio>
                            </RadioGroup>
                            <Divider className="my-4" />
                        </div>

                        <div>
                            <p className="text-sm font-medium mb-2">Terminology server</p>
                            <p className="text-sm text-gray-500 mb-2 ">You can set this condition if you are providing an answer value set for either items or it's children</p>
                            <Input
                                placeholder="Enter url for preferred terminology server"
                                variant="bordered"
                                radius="sm"
                                className="w-full"
                                endContent={<Trash />}
                            />
                            <Divider className="my-4" />
                        </div>

                        <div>
                            <p className="text-sm font-medium mb-2">Add link to pre-populate FHIR Observation?</p>
                            <p className="text-sm text-gray-500">Descriptive informational helper text here.</p>
                            <RadioGroup
                                orientation="horizontal"
                                className="mt-2 mb-2"
                            >
                                <Radio className="text-sm mr-4" value="yes">Yes</Radio>
                                <Radio className="text-sm mr-4" value="no">No</Radio>
                            </RadioGroup>
                        </div>
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    );
}