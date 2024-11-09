'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFetchMessageTemplates, useHandleMessageTemplateFormSubmit, useDeleteMessageTemplate } from '@/hooks/manufacturers-hooks';
import ControlledTable from '@/components/flow/ControlledTable';
import ConfirmationModal from '@/components/flow/ConfirmationModal';
import { MessageTemplate } from '@/api/communications/model/message-template'; 

const INITIAL_FORM_DATA: Omit<MessageTemplate, 'id'> = {
  content: '',
  variables: ["userName"],
  type: 'UNSPECIFIED_MESSAGE_TYPE',
  templateId: '',
  title: '',
};

const MessageTemplatePage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState<Omit<MessageTemplate, 'id'>>(INITIAL_FORM_DATA);
    
    const router = useRouter();

    const { data: messageTemplates = [], refetch: fetchMessageTemplates } = useFetchMessageTemplates();
    const { mutate: handleFormSubmit, isPending: isSubmitting } = useHandleMessageTemplateFormSubmit(isEdit, fetchMessageTemplates, () => {
        setFormData(INITIAL_FORM_DATA);
        setIsEdit(false);
    });
        const { mutate: handleDeleteConfirm } = useDeleteMessageTemplate(fetchMessageTemplates);

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
        { header: 'Content', accessorKey: 'content' },
        { header: 'Template Type', accessorKey: 'type' },
        { header: 'Subject', accessorKey: 'title' },
    ], []);

    return (
        <div className="w-full h-screen flex flex-col p-4">
            <div className='flex flex-start'>
                <Button
                    onClick={() => router.push('/pages/communication')}
                    variant='bordered'
                    color='primary'
                    startContent={<ArrowLeft />}
                >Back</Button>
                <h1 className="pl-4 text-2xl font-bold mb-4">Message Templates</h1>
            </div>

            <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 w-full">
                <Input
                    label="Subject"
                    name="title"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
                <Textarea
                    label="Content"
                    name="content"
                    variant='bordered'
                    className='bg-white col-span-2'
                    radius='sm'
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                />
                <Select
                    label="Template Type"
                    name="type"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.type}
                    onChange={handleInputChange}
                >
                    <SelectItem key="UNSPECIFIED_MESSAGE_TYPE" value="UNSPECIFIED_MESSAGE_TYPE">Unspecified</SelectItem>
                    <SelectItem key="INFO" value="INFO">Info</SelectItem>
                    <SelectItem key="WARNING" value="WARNING">Warning</SelectItem>
                    <SelectItem key="ERROR" value="ERROR">Error</SelectItem>
                </Select>
                <Button type="submit" color="primary" disabled={isSubmitting} className="w-fit mt-4">
                    {isSubmitting ? 'Saving...' : isEdit ? 'Update Template' : 'Add Template'}
                </Button>
            </form>

            <div className='h-full w-full'>
                {messageTemplates.length === 0 ? (
                    <div className="text-gray-500 mb-4">No message templates found.</div>
                ) : (
                    <ControlledTable
                        columns={columns}
                        data={messageTemplates}
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
                title="Delete Message Template"
                message={`Are you sure you want to delete this message template: ${selectedTemplate?.templateId}?`}
            />
        </div>
    );
};

export default MessageTemplatePage;
