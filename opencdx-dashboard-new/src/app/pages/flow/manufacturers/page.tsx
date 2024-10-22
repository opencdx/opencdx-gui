'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import { Input, Button, Textarea } from '@nextui-org/react';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Manufacturer } from '@/api/logistics/model/manufacturer';
import { useGetManufacturerList, useAddManufacturer, useDeleteManufacturer, useUpdateManufacturer } from '@/hooks/manufacturers-hooks';
import ControlledTable from '@/components/flow/ControlledTable';
import ConfirmationModal from '@/components/flow/ConfirmationModal';

const ManufacturersPage: React.FC = () => {
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [manufacturerToDelete, setManufacturerToDelete] = useState<Manufacturer | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { data: manufacturersList = [], isError: isErrorList, mutate: mutateManufacturersList } = useGetManufacturerList();
    const { mutate: mutateAddManufacturer } = useAddManufacturer();
    const { mutate: mutateDeleteManufacturer } = useDeleteManufacturer();
    const { mutate: mutateUpdateManufacturer } = useUpdateManufacturer();
    const [isEdit, setIsEdit] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState<Omit<Manufacturer, 'id'>>({
        name: '',
        manufacturerAddress: {
            countryId: '671125dddbd1c863d41b2730',
            addressPurpose: 'SECONDARY',
            address1: '',
            city: '',
            state: '', // Initialize with a 24-character hex string
            postalCode: '',
        },
        manufacturerWebsite: '',
        manufacturerDescription: '',
        manufacturerCertifications: [],
    });
    const getManufacturers = useMemo(() => {
        mutateManufacturersList({ pagination: { pageNumber: 0, pageSize: 100, sortAscending: true } }, {
            onSuccess: (data) => {
                setManufacturers(data?.data?.manufacturers || []);
            }
        });
    }, [mutateManufacturersList]);



    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            if (name.startsWith('manufacturerAddress.')) {
                const addressField = name.split('.')[1];
                return {
                    ...prev,
                    manufacturerAddress: {
                        ...prev.manufacturerAddress,
                        [addressField]: value,
                    },
                };
            }
            return { ...prev, [name]: value };
        });
    }, []);

    const handleCertificationsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const certifications = e.target.value.split(',').map(cert => cert.trim());
        setFormData(prev => ({ ...prev, manufacturerCertifications: certifications }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const mutateFunction = isEdit ? mutateUpdateManufacturer : mutateAddManufacturer;
            await mutateFunction(formData, {
                onSuccess: (data) => {
                    setManufacturers(prev => [...prev, data.data]);
                    mutateManufacturersList({pagination: {pageNumber: 0, pageSize: 100, sortAscending: true}}, {onSuccess: (data) => {
                      setManufacturers(data.data.manufacturers ?? []);
                    }});
                }
            });
        } catch (err) {
            console.error('Error managing manufacturer:', err);
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
            setIsEdit(false);
            setFormData({
                manufacturerAddress: {
                    countryId: '671125dddbd1c863d41b2730',
                },
            });


        }
    }, [formData, isEdit, mutateAddManufacturer, mutateUpdateManufacturer, mutateManufacturersList]);

    const handleEdit = useCallback((manufacturer: Manufacturer) => {
        setFormData(manufacturer);
        setIsEdit(true);
    }, []);

    const handleDelete = useCallback((manufacturer: Manufacturer) => {
        console.log('Deleting manufacturer:', manufacturer);
        setManufacturerToDelete(manufacturer);
        setIsDeleteModalOpen(true);
    }, []);
    useEffect(() => {
        console.log('manufacturerToDelete updated:', manufacturerToDelete);
    }, [manufacturerToDelete]);

    const handleConfirmDelete = useCallback(() => {
        if (manufacturerToDelete && manufacturerToDelete.id) {
            mutateDeleteManufacturer(manufacturerToDelete.id, {
                onSuccess: () => {
                    setManufacturers(prev => prev.filter(manufacturer => manufacturer.id !== manufacturerToDelete.id));
                    mutateManufacturersList({ pagination: { pageNumber: 0, pageSize: 100, sortAscending: true } }, {
                        onSuccess: (data) => {
                            setManufacturers(data?.data?.manufacturers || []);
                        }
                    });
                    setManufacturerToDelete(null);
                    setIsDeleteModalOpen(false);
                    setError(null);
                },
                onError: (error) => {
                    console.error('Error deleting manufacturer:', error);
                    setError('Failed to delete manufacturer. Please try again.');
                }
            });
        } else {
            console.error('No manufacturer selected for deletion or missing ID');
            setError('No manufacturer selected for deletion or missing ID');
        }
    }, [manufacturerToDelete, mutateDeleteManufacturer, mutateManufacturersList, setManufacturers]);

    const columns = React.useMemo<MRT_ColumnDef<any>[]>(
        () => [
          { accessorKey: 'name', header: 'Name' },
          { accessorKey: 'manufacturerAddress.address1', header: 'Address' },
          { accessorKey: 'manufacturerAddress.city', header: 'City' },
          { accessorKey: 'manufacturerAddress.state', header: 'State' },
          { accessorKey: 'manufacturerAddress.postalCode', header: 'Postal Code' },
          { accessorKey: 'manufacturerWebsite', header: 'Website' },
          { accessorKey: 'manufacturerDescription', header: 'Description' },
          {
            accessorKey: 'manufacturerCertifications',
            header: 'Certifications',
            Cell: ({ cell }) => cell.getValue<string[]>().join(', '),
          },
        ],
        []
      );
    useEffect(() => {
        console.log('manufacturerToDelete updated:', manufacturerToDelete);
    }, [manufacturerToDelete]);
    return (
        <div className="w-full h-full flex flex-col p-4">
            <div className='flex flex-start'>
                <Button
                    onClick={() => {
                        router.push('/pages/flow');
                    }}
                    variant='bordered'
                    color='primary'
                    startContent={<ArrowBack />}
                >Back</Button>
                <h1 className="pl-4 text-2xl font-bold mb-4">Manufacturers</h1>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 w-full">
                <Input
                    label="Name"
                    name="name"
                    variant='bordered'
                    className=' bg-white'
                    radius='sm'
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    label="Website"
                    name="manufacturerWebsite"
                    variant='bordered'
                    className=' bg-white'
                    radius='sm'
                    value={formData.manufacturerWebsite}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    label="Address"
                    name="manufacturerAddress.address1"
                    variant='bordered'
                    className=' bg-white'
                    radius='sm'
                    value={formData.manufacturerAddress?.address1 || ''}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    label="City"
                    name="manufacturerAddress.city"
                    variant='bordered'
                    className=' bg-white'
                    radius='sm'
                    value={formData.manufacturerAddress?.city || ''}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    label="State"
                    name="manufacturerAddress.state"
                    variant='bordered'
                    className=' bg-white'
                    radius='sm'
                    value={formData.manufacturerAddress?.state || ''}
                    onChange={handleInputChange}
                    placeholder="State"
                    required
                />
                <Input
                    label="Postal Code"
                    name="manufacturerAddress.postalCode"
                    variant='bordered'
                    className=' bg-white'
                    radius='sm'
                    value={formData.manufacturerAddress?.postalCode || ''}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    label="Country"
                    name="manufacturerAddress.countryId"
                    variant='bordered'
                    className=' bg-white'
                    radius='sm'
                    disabled
                    value={formData.manufacturerAddress?.countryId || '66faed240e1b22662c798775'}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    label="Certifications (comma-separated)"
                    name="manufacturerCertifications"
                    variant='bordered'
                    className=' bg-white'
                    radius='sm'
                    value={formData.manufacturerCertifications?.join(', ') || ''}
                    onChange={handleCertificationsChange}
                />
                <Textarea
                    label="Description"
                    name="manufacturerDescription"
                    variant='bordered'
                    className=' bg-white col-span-2'
                    radius='sm'
                    value={formData.manufacturerDescription}
                    onChange={handleInputChange}
                    required
                />
                <Button type="submit" fullWidth={false} color="primary" disabled={isLoading} className="w-fit mt-4">
                    {isLoading ? 'Saving...' : isEdit ? 'Update Manufacturer' : 'Add Manufacturer'}
                </Button>
            </form>
            <div className='h-full w-full'>
                {isErrorList ? (
                    <div className="text-red-500 mb-4">Error fetching manufacturers. Please try again.</div>
                ) : manufacturers.length === 0 ? (
                    <div className="text-gray-500 mb-4">No manufacturers found.</div>
                ) : (
                    <ControlledTable
                        data={manufacturers}
                        isLoading={isLoading}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        columns={columns}
                    />
                )}
            </div>
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Manufacturer"
                message={`Are you sure you want to delete this manufacturer ${manufacturerToDelete?.name}?`}
            />
        </div>
    );
};

export default ManufacturersPage;
