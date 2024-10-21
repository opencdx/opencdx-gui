'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Input, Button, Textarea } from '@nextui-org/react';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ControlledTable from '@/components/flow/ControlledTable';
import { Organization } from '@/api/iam/model/organization';

const OrganizationsPage: React.FC = () => {
    const router = useRouter();
    const [isEdit, setIsEdit] = useState(false);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<Omit<Organization, 'id'>>(initialFormData);

    const fetchOrganizations = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                'https://api.dev-1.opencdx.io/iam/organization/list',
                { pagination: { pageNumber: 1, pageSize: 100, sortAscending: true } },
                {
                    headers: getHeaders(),
                }
            );
            setOrganizations(response.data.organizations);
        } catch (err) {
            console.error('Error fetching organizations:', err);
            setError('An error occurred while fetching organizations. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrganizations();
    }, [fetchOrganizations]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'revenue' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const wrappedFormData = { organization: formData };

        try {
            const url = 'https://api.dev-1.opencdx.io/iam/organization';
            const method = isEdit ? 'put' : 'post';
            await axios[method](url, wrappedFormData, { headers: getHeaders() });
            
            fetchOrganizations();
            setFormData(initialFormData);
            setIsEdit(false);
        } catch (err) {
            console.error('Error managing organization:', err);
            setError(`An error occurred while ${isEdit ? 'updating' : 'creating'} the organization. Please try again.`);
        }
    };

    const handleEdit = (organization: Organization) => {
        setFormData(organization);
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
                <h1 className="pl-4 text-2xl font-bold mb-4">Organizations</h1>
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
                    label="Website"
                    name="website"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.website}
                    onChange={handleInputChange}
                />
                <Input
                    label="Industry"
                    name="industry"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.industry}
                    onChange={handleInputChange}
                />
                <Input
                    label="Revenue"
                    name="revenue"
                    type="number"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.revenue?.toString() || ''}
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
                <Button type="submit" color="primary">
                  {isEdit ? 'Update' : 'Add'} Organization
                </Button>
            </form>

            <div className='h-full w-full'>
                <ControlledTable
                    data={organizations}
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

const initialFormData: Omit<Organization, 'id'> = {
    name: '',
    description: '',
    address: {
        countryId: 'US',
        addressPurpose: 'SECONDARY',
        address1: '',
        address2: '',
        address3: '',
        city: '',
        state: '',
        postalCode: '',
    },
    website: '',
    industry: '',
    revenue: 0,
    logoUrl: '',
    socialMediaLinks: [],
    missionStatement: '',
    visionStatement: '',
    contacts: [{
        name: { title: '', firstName: '', middleName: '', lastName: '', suffix: '' },
        addresses: [{
            countryId: 'US',
            addressPurpose: 'PRIMARY',
            address1: '',
            city: '',
            state: '',
            postalCode: '',
        }],
        phoneNumbers: [{ number: '', type: 'PHONE_TYPE_WORK' }],
        emails: [{ email: '', type: 'EMAIL_TYPE_WORK' }],
    }],
};

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem('serviceToken')}`,
    'Accept': 'application/json',
});

const tableColumns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'address.address1', header: 'Address' },
    { accessorKey: 'address.city', header: 'City' },
    { accessorKey: 'address.state', header: 'State' },
    { accessorKey: 'address.postalCode', header: 'Postal Code' },
    { accessorKey: 'website', header: 'Website' },
    { accessorKey: 'industry', header: 'Industry' },
    { accessorKey: 'revenue', header: 'Revenue' },
];

export default OrganizationsPage;
