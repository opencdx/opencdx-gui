import { Card, CardBody, BreadcrumbItem, Breadcrumbs, Button, Image, Select, SelectItem } from 'ui-library';
import { LeftChevronIcon} from 'ui-library'
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


                        <div className="flex flex-row items-center">
                        <Controller
                        name={`ruleId`}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Select a Rule"
                                variant="bordered"
                                radius="sm"
                                size='sm'
                                className="w-64 bg-white pr-4"
                                selectedKeys={field.value ? new Set([field.value]) : new Set()}
                                onSelectionChange={(keys) => {
                                    const selectedValue = Array.from(keys)[0];
                                    field.onChange(selectedValue);
                                }}
                            >
                                {(ruleSetData?.data.ruleSets ?? []).map((rule: any) => (
                                    <SelectItem key={rule.ruleId} value={rule.ruleId}>{rule.name}</SelectItem>
                                ))}
                            </Select>
                        )}
                        />
                        <Controller
                        name={`ruleQuestionId`}
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Select Responses"
                                variant="bordered"
                                radius="sm"
                                size='sm'
                                className="w-64 bg-white pr-4"
                                selectedKeys={field.value ? new Set(field.value) : new Set()}
                                onSelectionChange={(keys) => {
                                    // Convert the selected keys Set to an array of strings
                                    field.onChange(Array.from(keys));
                                }}
                            >
                                {fields.map((field: any) => (
                                    <SelectItem key={field.id} value={field.id}>{field.text}</SelectItem>
                                ))}
                            </Select>
                        )}
                        />
                            <Button
                                className="mr-4 pr-4"
                                startContent={<LeftChevronIcon />}
                                variant="bordered"
                                color="primary"
                                size='md'
                                onPress={handleBack}
                            >Back</Button>
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