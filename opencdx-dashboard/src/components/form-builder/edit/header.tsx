import { Card, CardBody, BreadcrumbItem, Breadcrumbs, Button, Image, Select, SelectItem } from 'ui-library';
import { LeftChevronIcon, DownArrow} from 'ui-library'
import { useRouter } from 'next/navigation';
import editNoteLite from '../../../../public/images/edit_note.png';
import { useQuestionnaireStore } from '@/hooks/questionnaire';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { useGetRuleSets } from '@/hooks/iam-hooks';
import { CustomSelect } from '@/components/custom/controlled-select';
// Update the base select styles to include both states
const selectStyles = `
  w-48 h-10 px-3 py-2 
  bg-white rounded-lg 
  border border-[#E4E4E7]
  text-gray-900
  appearance-none cursor-pointer 
  transition-all duration-200
  hover:bg-gray-50 
  focus:outline-none
  focus:ring-1
  focus:ring-[#E4E4E7]
  focus:border-[#E4E4E7]
  [&:not(:focus)]:shadow-none
`;
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
                                    <BreadcrumbItem>Edit Form</BreadcrumbItem>
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
                            <Controller
                                name={`ruleId`}
                                control={control}
                                render={({ field }) => (
                                   
                                    <div className="relative w-48 ">
                                    <select
                                    {...field}
                                    value={field.value}
                                    onChange={(event: any) => {
                                        field.onChange(event.target.value);
                                    }}
                                    className={selectStyles}
                                    aria-label="Select Unit"
                                >
                                    {(ruleSetData?.data.ruleSets ?? []).map((rule: any, index: number) => (
                                        <option key={index} value={rule.ruleId}>{rule.name}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 group-focus-within:rotate-180">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                </div>
                                )}
                            />

                            <Controller
                                name={`ruleQuestionId`}
                                control={control}
                                render={({ field }) => (
                                    <div className="relative w-48 ">
                                    <select
                                    {...field}
                                    value={field.value}
                                    onChange={(event: any) => {
                                        field.onChange([event.target.value]);
                                    }}
                                    className={selectStyles}
                                    aria-label="Select Unit"
                                >
                                    {fields.map((field: any, index: number) => (
                                        <option key={index} value={`${field.text}`}>{field.text}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 group-focus-within:rotate-180">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                </div>
                                )}
                            />
                            
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