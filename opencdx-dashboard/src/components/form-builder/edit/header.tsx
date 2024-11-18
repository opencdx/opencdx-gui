import { Card, CardBody, BreadcrumbItem, Breadcrumbs, Button, Image } from 'ui-library';
import { LeftChevronIcon, DownArrow} from 'ui-library'
import { useRouter } from 'next/navigation';
import editNoteLite from '../../../../public/images/edit_note.png';
import { useQuestionnaireStore } from '@/hooks/questionnaire';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { useGetRuleSets } from '@/hooks/iam-hooks';

const Header = ({formTitle, control}: {formTitle: string, control: Control}) => {
    const router = useRouter();
    const resetStore = useQuestionnaireStore((state: any) => state.reset);
    const { mutate: getRuleSets, data: ruleSetData } = useGetRuleSets();
    const fetchRules = useCallback(async () => {
        await getRuleSets({ organizationId: "organizationId", workspaceId: "workspaceId" }); 
    }, [getRuleSets]); 

    const { getValues } = useFormContext();

    const fields = getValues('item') || [];

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

    const handleBack = () => {
        resetStore();
        router.push('/pages/form-builder');
    };

    return (
        <div className="h-full">
            <Card className="mb-4 mt-4 p-1 bg-white rounded-lg">
                <CardBody>
                    <div className="flex flex-row justify-between items-center mb-4 mt-4">
                        <div className="flex items-center space-x-4">
                            
                            <Image src={editNoteLite.src} alt="Dynamic Form" width={48} height={48} />
                            <div className="flex flex-col space-y-1">
                                <h1 className="text-xl">
                                    {formTitle ? `Edit Form: ${formTitle}` : 'Create New Form'}   
                                </h1>
                                <Breadcrumbs separator="/">
                                    <BreadcrumbItem href="/dashboard/pages/form-builder">Dashboard</BreadcrumbItem>
                                    <BreadcrumbItem href="/dashboard/pages/form-builder">Form Builder</BreadcrumbItem>
                                    <BreadcrumbItem>Edit Form: {formTitle}</BreadcrumbItem>
                                </Breadcrumbs>
                            </div>
                        </div>
                      

                        <div className="flex flex-row items-center space-x-4">
                        <Button
                               
                                startContent={<LeftChevronIcon />}
                                variant="bordered"
                                color="primary"
                                size='md'
                                onPress={handleBack}
                            >Back</Button>
                            <div className="relative">
                                <Controller
                                    name={`ruleId`}
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <select
                                                {...field}
                                                className="w-48 h-10 bg-white px-[14px] border-2 rounded-lg appearance-none"
                                                aria-label="Select a Rule"
                                            >
                                                <option value="">Select a Rule</option>
                                                {(ruleSetData?.data.ruleSets ?? []).map((rule: any) => (
                                                    <option key={rule.ruleId} value={rule.ruleId}>
                                                        {rule.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <DownArrow className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                                        </>
                                    )}
                                />
                            </div>
                            <div className="relative">
                                <Controller
                                    name={`ruleQuestionId`}
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <select
                                                {...field}
                                                className="w-64 h-10 bg-white px-[14px] border-2 rounded-lg appearance-none"
                                                aria-label="Select Responses"
                                                onChange={(e) => {
                                                    const values = Array.from(e.target.selectedOptions).map(option => option.value);
                                                    field.onChange(values);
                                                }}
                                            >
                                                <option value="">Select Response</option>
                                                {fields.map((field: any, index: number) => (
                                                    <option key={`$.${index}`} value={`$.${index}`}>
                                                        {field.text}
                                                    </option>
                                                ))}
                                            </select>
                                            <DownArrow className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                                        </>
                                    )}
                                />
                            </div>
                           
                            <Button type="submit" size='md' variant="solid" color="primary">
                                Submit Form
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export { Header };