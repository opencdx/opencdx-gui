'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Input, Button, Textarea } from '@nextui-org/react';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ControlledTable from '@/components/flow/ControlledTable';
import { Workspace } from '@/api/iam/model/workspace';

const WorkspacesPage: React.FC = () => {
    const router = useRouter();
    const [isEdit, setIsEdit] = useState(false);
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<Omit<Workspace, 'id'>>(initialFormData);

    const fetchWorkspaces = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                'https://api.dev-1.opencdx.io/iam/workspace/list',
                { pagination: { pageNumber: 1, pageSize: 100, sortAscending: true } },
                {
                    headers: getHeaders(),
                }
            );
            setWorkspaces(response.data.workspaces);
        } catch (err) {
            console.error('Error fetching workspaces:', err);
            setError('An error occurred while fetching workspaces. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWorkspaces();
    }, [fetchWorkspaces]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'capacity' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const wrappedFormData = { workspace: formData };

        try {
            const url = 'https://api.dev-1.opencdx.io/iam/workspace';
            const method = isEdit ? 'put' : 'post';
            await axios[method](url, wrappedFormData, { headers: getHeaders() });
            
            fetchWorkspaces();
            setFormData(initialFormData);
            setIsEdit(false);
        } catch (err) {
            console.error('Error managing workspace:', err);
            setError(`An error occurred while ${isEdit ? 'updating' : 'creating'} the workspace. Please try again.`);
        }
    };

    const handleEdit = (workspace: Workspace) => {
        setFormData(workspace);
        setIsEdit(true);
    };

    return (
        <div className="w-full h-full flex flex-col p-4">
            <div className='flex flex-start'>
                <Button
                    onClick={() => router.push('/flow')}
                    variant='bordered'
                    color='primary'
                    startContent={<ArrowBack />}
                >
                    Back
                </Button>
                <h1 className="pl-4 text-2xl font-bold mb-4">Workspaces</h1>
            </div>

            <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 w-full">
                <Input
                    label="Name"
                    name="name"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    label="Location"
                    name="location"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.location}
                    onChange={handleInputChange}
                />
                <Input
                    label="Manager"
                    name="manager"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.manager}
                    onChange={handleInputChange}
                />
                <Input
                    label="Capacity"
                    name="capacity"
                    type="number"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.capacity?.toString() || ''}
                    onChange={handleInputChange}
                />
                <Input
                    label="Workspace Type"
                    name="workspaceType"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.workspaceType}
                    onChange={handleInputChange}
                />
                <Textarea
                    label="Description"
                    name="description"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <Textarea
                    label="Usage Policy"
                    name="usagePolicy"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.usagePolicy}
                    onChange={handleInputChange}
                />
                <Button type="submit" color="primary">
                    {isEdit ? 'Update' : 'Add'} Workspace
                </Button>
            </form>

            <div className='h-full w-full'>
                <ControlledTable
                    data={workspaces}
                    columns={tableColumns}
                    onDelete={()=>{}}
                    onEdit={handleEdit}
                    isDelete={false}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

const initialFormData: Omit<Workspace, 'id'> = {
    name: '',
    description: '',
    location: '',
    manager: '',
    capacity: 0,
    workspaceType: '',
    usagePolicy: '',
    availabilitySchedule: '',
    facilities: [],
    workspaceImageUrls: [],
    departments: [],
    createdDate: { seconds: 0, nanos: 0 },
    created: { seconds: 0, nanos: 0 },
    modified: { seconds: 0, nanos: 0 },
    creator: '',
    modifier: '',
};

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem('serviceToken')}`,
    'Accept': 'application/json',
});

const tableColumns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'location', header: 'Location' },
    { accessorKey: 'manager', header: 'Manager' },
    { accessorKey: 'capacity', header: 'Capacity' },
    { accessorKey: 'workspaceType', header: 'Type' },
    { accessorKey: 'usagePolicy', header: 'Usage Policy' },
];

export default WorkspacesPage;

