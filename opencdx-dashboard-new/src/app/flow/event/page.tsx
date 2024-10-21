'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { Delete, Edit, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFetchEventTemplates, useHandleEventTemplateFormSubmit, useDeleteEventTemplate } from '@/hooks/manufacturers-hooks';
import ControlledTable from '@/components/flow/ControlledTable';
import ConfirmationModal from '@/components/flow/ConfirmationModal';
import { NotificationEvent } from '@/api/communications/model/notification-event';

const INITIAL_FORM_DATA: Omit<NotificationEvent, 'id'> = {
    eventName: '',
    eventDescription: '',
    emailTemplateId: '',
    priority: 'NOTIFICATION_PRIORITY_UNSPECIFIED',
    sensitivity: 'SENSITIVITY_LEVEL_UNSPECIFIED',   
    eventParameters: ['userName'],
    messageTemplateId: '',
    smsTemplateId: '',

};

const EmailTemplatePage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<NotificationEvent | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState<Omit<NotificationEvent, 'id'>>(INITIAL_FORM_DATA);
    
    const router = useRouter();

    const { data: emailTemplates = [], refetch: fetchEmailTemplates } = useFetchEventTemplates();
    const { mutate: handleFormSubmit, isPending: isSubmitting } = useHandleEventTemplateFormSubmit(isEdit, fetchEmailTemplates, () => {
        setFormData(INITIAL_FORM_DATA);
        setIsEdit(false);
    });
    const { mutate: handleDeleteConfirm } = useDeleteEventTemplate(fetchEmailTemplates);

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
        { header: 'Event Name', accessorKey: 'eventName' },
        { header: 'Event Description', accessorKey: 'eventDescription' },
        { header: 'Email Template ID', accessorKey: 'emailTemplateId' },
    ], []);

    return (
        <div className="w-full h-screen flex flex-col p-4">
            <div className='flex flex-start'>
                <Button
                    onClick={() => router.push('/flow')}
                    variant='bordered'
                    color='primary'
                    startContent={<ArrowLeft />}
                >Back</Button>
                <h1 className="pl-4 text-2xl font-bold mb-4">Event Templates</h1>
            </div>

            <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 w-full">
                <Input
                    label="Event Name"
                    name="eventName"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.eventName}
                    onChange={handleInputChange}
                    required
                />
                <Textarea
                    label="Event Description"
                    name="eventDescription"
                    variant='bordered'
                    className='bg-white col-span-2'
                    radius='sm'
                    value={formData.eventDescription}
                    onChange={handleInputChange}
                    required
                />
                <Select
                    label="Email Template ID"
                    name="emailTemplateId"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.emailTemplateId}
                    onChange={handleInputChange}
                >
                    <SelectItem key="NOTIFICATION_PRIORITY_UNSPECIFIED" value="NOTIFICATION_PRIORITY_UNSPECIFIED">Unspecified</SelectItem>
                    <SelectItem key="NOTIFICATION_PRIORITY_LOW" value="NOTIFICATION_PRIORITY_LOW">Low</SelectItem>
                    <SelectItem key="NOTIFICATION_PRIORITY_MEDIUM" value="NOTIFICATION_PRIORITY_MEDIUM">Medium</SelectItem>
                    <SelectItem key="NOTIFICATION_PRIORITY_HIGH" value="NOTIFICATION_PRIORITY_HIGH">High</SelectItem>
                    <SelectItem key="NOTIFICATION_PRIORITY_IMMEDIATE" value="NOTIFICATION_PRIORITY_IMMEDIATE">Immediate</SelectItem>
                    <SelectItem key="UNRECOGNIZED" value="UNRECOGNIZED">Unrecognized</SelectItem>
                </Select>
                <Button type="submit" color="primary" disabled={isSubmitting} className="w-fit mt-4">
                    {isSubmitting ? 'Saving...' : isEdit ? 'Update Template' : 'Add Template'}
                </Button>
            </form>

            <div className='h-full w-full'>
                {emailTemplates.length === 0 ? (
                    <div className="text-gray-500 mb-4">No email templates found.</div>
                ) : (
                    <ControlledTable
                        columns={columns}
                        data={emailTemplates}
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
                    if (selectedTemplate?.eventId) {
                        handleDeleteConfirm(selectedTemplate.eventId);
                    }
                    resetForm();
                }}
                title="Delete Event Template"
                message={`Are you sure you want to delete this event template: ${selectedTemplate?.eventName}?`}
            />
        </div>
    );
};

export default EmailTemplatePage;
