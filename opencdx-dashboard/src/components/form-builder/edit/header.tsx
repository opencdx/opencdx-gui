import { Card, CardBody, BreadcrumbItem, Breadcrumbs, Button, Image } from 'ui-library';
import { LeftChevronIcon, DownArrow} from 'ui-library'
import { useRouter } from 'next/navigation';
import editNoteLite from '../../../../public/images/edit_note.png';
import { useQuestionnaireStore } from '@/hooks/questionnaire';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { useGetRuleSets } from '@/hooks/iam-hooks';
import { CustomSelect } from '@/components/custom/controlled-select';

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
                                    <CustomSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={(ruleSetData?.data.ruleSets ?? []).map((rule: any) => ({
                                            value: rule.ruleId,
                                            label: rule.name
                                        }))}
                                        placeholder="Select a Rule"
                                        className="w-48 h-10"
                                        aria-label="Select a Rule"
                                    />
                                )}
                            />

                            <Controller
                                name={`ruleQuestionId`}
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        value={field.value}
                                        onChange={(value) => {
                                            const values = [value];
                                            field.onChange(values);
                                        }}
                                        options={fields.map((field: any, index: number) => ({
                                            value: `$.${index}`,
                                            label: field.text
                                        }))}
                                        placeholder="Select Response"
                                        className="w-48 h-10"
                                        aria-label="Select Responses"
                                    />
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