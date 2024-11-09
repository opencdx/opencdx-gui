'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFetchSMSTemplates, useHandleSMSTemplateFormSubmit, useDeleteSMSTemplate } from '@/hooks/manufacturers-hooks';
import ControlledTable from '@/components/flow/ControlledTable';
import ConfirmationModal from '@/components/flow/ConfirmationModal';
import { SMSTemplate } from '@/api/communications/model/smstemplate';

const INITIAL_FORM_DATA: Omit<SMSTemplate, 'id'> = {
  message: '',
  variables: ["userName"],
  templateType: 'TEMPLATE_TYPE_UNSPECIFIED',
  templateId: '',
};

const SMSMessageTemplatePage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<SMSTemplate | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState<Omit<SMSTemplate, 'id'>>(INITIAL_FORM_DATA);
    
    const router = useRouter();

    const { data: smsTemplates = [], refetch: fetchSMSTemplates } = useFetchSMSTemplates();
    const { mutate: handleFormSubmit, isPending: isSubmitting } = useHandleSMSTemplateFormSubmit(isEdit, fetchSMSTemplates, () => {
        setFormData(INITIAL_FORM_DATA);
        setIsEdit(false);
    });
    const { mutate: handleDeleteConfirm } = useDeleteSMSTemplate(fetchSMSTemplates);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        handleFormSubmit(formData);
    }, [formData, handleFormSubmit]);

    const resetForm = useCallback(() => {
        setIsOpen(false);
        setSelectedTemplate(null);
        setFormData(INITIAL_FORM_DATA);
        setIsEdit(false);
    }, []);

    const handleEdit = useCallback((template: any) => {
        setFormData(template);
        setIsEdit(true);
    }, []);

    const handleDelete = useCallback((template: any) => {
        setIsOpen(true);
        setSelectedTemplate(template);
    }, []);

    const columns = useMemo(() => [
        { header: 'Template ID', accessorKey: 'templateId' },
        { header: 'Message', accessorKey: 'message' },
        { header: 'Template Type', accessorKey: 'templateType' },
    ], []);

    return (
        <div className="w-full h-screen flex flex-col p-4">
            <div className='flex flex-start'>
                <Button
                    onClick={() => router.push('/pages/templates')}
                    variant='bordered'
                    color='primary'
                    startContent={<ArrowLeft />}
                >Back</Button>
                <h1 className="pl-4 text-2xl font-bold mb-4">SMS Templates</h1>
            </div>

            <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 w-full">
                <Input
                    label="Template ID"
                    name="templateId"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.templateId}
                    onChange={handleInputChange}
                    required
                />
                <Textarea
                    label="Message"
                    name="message"
                    variant='bordered'
                    className='bg-white col-span-2'
                    radius='sm'
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                />
                <Select
                    label="Template Type"
                    name="templateType"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.templateType}
                    onChange={handleInputChange}
                >
                    <SelectItem key="TEMPLATE_TYPE_UNSPECIFIED" value="TEMPLATE_TYPE_UNSPECIFIED">Unspecified</SelectItem>
                    <SelectItem key="TEMPLATE_TYPE_NOTIFICATION" value="TEMPLATE_TYPE_NOTIFICATION">Notification</SelectItem>
                    <SelectItem key="TEMPLATE_TYPE_WELCOME" value="TEMPLATE_TYPE_WELCOME">Welcome</SelectItem>
                    <SelectItem key="TEMPLATE_TYPE_NEWSLETTER" value="TEMPLATE_TYPE_NEWSLETTER">Newsletter</SelectItem>
                    <SelectItem key="TEMPLATE_TYPE_ALERT" value="TEMPLATE_TYPE_ALERT">Alert</SelectItem>
                    <SelectItem key="TEMPLATE_TYPE_REMINDER" value="TEMPLATE_TYPE_REMINDER">Reminder</SelectItem>
                    <SelectItem key="TEMPLATE_TYPE_CONFIRMATION" value="TEMPLATE_TYPE_CONFIRMATION">Confirmation</SelectItem>
                    <SelectItem key="UNRECOGNIZED" value="UNRECOGNIZED">Unrecognized</SelectItem>

                </Select>
                <Button type="submit" color="primary" disabled={isSubmitting} className="w-fit mt-4">
                    {isSubmitting ? 'Saving...' : isEdit ? 'Update Template' : 'Add Template'}
                </Button>
            </form>

            <div className='h-full w-full'>
                {smsTemplates.length === 0 ? (
                    <div className="text-gray-500 mb-4">No SMS templates found.</div>
                ) : (
                    <ControlledTable
                        columns={columns}
                        data={smsTemplates}
                        isLoading={isSubmitting}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            <ConfirmationModal
                isOpen={isOpen}
                onClose={resetForm}
                onConfirm={() => {
                    if (selectedTemplate?.templateId) {
                        handleDeleteConfirm(selectedTemplate.templateId);
                    }
                    resetForm();
                }}
                title="Delete SMS Template"
                message={`Are you sure you want to delete this SMS template: ${selectedTemplate?.templateId}?`}
            />
        </div>
    );
};

export default SMSMessageTemplatePage;
