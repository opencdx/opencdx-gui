'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import { Input, Button, Textarea, Select, Switch, SelectItem } from '@nextui-org/react';
import { ArrowBack } from '@mui/icons-material';
import { Manufacturer } from '@/api/logistics/model/manufacturer';
import { Vendor } from '@/api/logistics/model/vendor';
import { useRouter } from 'next/navigation';
import { Device } from '@/api/logistics/model/device';
import { useGetCountryList, useGetManufacturerList, useFetchVendors, useFetchDevices, useHandleDeviceFormSubmit, useDeleteDevice } from '@/hooks/manufacturers-hooks';

import ControlledTable from '@/components/flow/ControlledTable';
import ConfirmationModal from '@/components/flow/ConfirmationModal';
import axios from 'axios';

const DevicesPage: React.FC = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null);
    const { data: manufacturersList = [], isError: isErrorList, mutate: mutateManufacturersList } = useGetManufacturerList();
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

    const getManufacturers = useMemo(() => {
        mutateManufacturersList({ pagination: { pageNumber: 0, pageSize: 100, sortAscending: true } }, {
            onSuccess: (data) => {
                setManufacturers(data?.data?.manufacturers || []);
            }
        });
    }, [mutateManufacturersList]);
    const [formData, setFormData] = useState<Omit<Device, 'id'>>({
        type: '',
        model: '',
        manufacturerId: '',
        manufacturerCountryId: '671125dddbd1c863d41b2730',
        vendorId: '',
        vendorCountryId: '671125dddbd1c863d41b2730',
        batchNumber: '',
        serialNumber: '',
        testTypeId: '',
        testSensitivity: 0,
        testSpecificity: 0,
        storageRequirements: '',
        approvalStatus: '',
        url: '',
        notes: '',
        safety: '',
        userInstructions: '',
        limitations: '',
        warrantyInfo: '',
        intendedUseAge: 0,
        isFdaAuthorized: false,
        deviceStatus: '',
        associatedSoftwareVersion: '',
        name: '',
        shortDescription: '',
        description: '',
    });

    const { data: devicesData = [], refetch: fetchDevices } = useFetchDevices();
    const { data: vendorsList = [] } = useFetchVendors();
    const { data: countriesList = [] } = useGetCountryList();

    const { mutate: handleFormSubmit, isPending: isSubmitting } = useHandleDeviceFormSubmit(isEdit, fetchDevices, () => {
        setFormData({ /* ... reset form data ... */ });
        setIsEdit(false);
    });
    const { mutate: handleDeleteConfirm } = useDeleteDevice(fetchDevices);

    const router = useRouter();

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSwitchChange = useCallback((name: string, checked: boolean) => {
        setFormData(prev => ({ ...prev, [name]: checked }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        handleFormSubmit(formData);
    }, [formData, handleFormSubmit]);

    const handleEdit = useCallback((device: Device) => {
        setFormData(device);
        setIsEdit(true);
    }, []);

    const handleDelete = useCallback((device: Device) => {
        setDeviceToDelete(device);
        setIsDeleteModalOpen(true);
    }, []);

    const handleConfirmDelete = useCallback(async () => {
        if (deviceToDelete && deviceToDelete.id) {
            handleDeleteConfirm(deviceToDelete.id);
            setDeviceToDelete(null);
            setIsDeleteModalOpen(false);
        } else {
            console.error('No device selected for deletion or missing ID');
        }
    }, [deviceToDelete, handleDeleteConfirm]);

    const columns = React.useMemo<MRT_ColumnDef<any>[]>(
        () => [
            { accessorKey: 'name', header: 'Name' },
            { accessorKey: 'type', header: 'Type' },
            { accessorKey: 'model', header: 'Model' },
            { accessorKey: 'manufacturerId', header: 'Manufacturer' },
            { accessorKey: 'vendorId', header: 'Vendor' },
            { accessorKey: 'testTypeId', header: 'Test Type' },
            { accessorKey: 'approvalStatus', header: 'Approval Status' },
            { accessorKey: 'deviceStatus', header: 'Device Status' },
        ],
        []
    );

    return (
        <div className="w-full h-full flex flex-col p-4">
            <div className='flex flex-start'>
                <Button
                    onClick={() => {
                        router.push('/flow');
                    }}
                    variant='bordered'
                    color='primary'
                    startContent={<ArrowBack />}
                >Back</Button>
                <h1 className="pl-4 text-2xl font-bold mb-4">Devices</h1>
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
                    label="Type"
                    name="type"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    label="Model"
                    name="model"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                />

                <Select
                    label="Manufacturer"
                    name="manufacturerId"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.manufacturerId}
                    onChange={(e) => handleInputChange({ target: { name: 'manufacturerId', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)}
                    required
                >
                    {manufacturers   && manufacturers.map((manufacturer: Manufacturer) => (
                        <SelectItem key={manufacturer.id ?? ''} value={manufacturer.id ?? ''}>{manufacturer.name}</SelectItem>
                    ))}
                </Select>
                <Select
                    label="Vendor"
                    name="vendorId"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.vendorId}
                    onChange={(e) => handleInputChange({ target: { name: 'vendorId', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)}
                    required
                >
                    {vendorsList && vendorsList.map((vendor: Vendor) => (
                        <SelectItem key={vendor.id ?? ''} value={vendor.id ?? ''}>{vendor.vendorName}</SelectItem>
                    ))}
                </Select>
                <Input
                    label="Test Type"
                    name="testTypeId"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.testTypeId}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    label="Test Sensitivity"
                    name="testSensitivity"
                    type="number"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.testSensitivity?.toString() ?? ''}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    label="Test Specificity"
                    name="testSpecificity"
                    type="number"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.testSpecificity?.toString() ?? ''}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    label="Approval Status"
                    name="approvalStatus"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.approvalStatus}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    label="Device Status"
                    name="deviceStatus"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.deviceStatus}
                    onChange={handleInputChange}
                    required
                />
                <Textarea
                    label="Storage Requirements"
                    name="storageRequirements"
                    variant='bordered'
                    className='bg-white col-span-2'
                    radius='sm'
                    value={formData.storageRequirements}
                    onChange={handleInputChange}
                    required
                />
                <Textarea
                    label="Description"
                    name="description"
                    variant='bordered'
                    className='bg-white col-span-2'
                    radius='sm'
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                />
                {/* <Switch
                    checked={formData.isFdaAuthorized}
                    onCheckedChange={(checked) => handleSwitchChange('isFdaAuthorized', checked)}
                    label="FDA Authorized"
                /> */}
                <Button type="submit" fullWidth={false} color="primary" disabled={isSubmitting} className="w-fit mt-4">
                    {isSubmitting ? 'Saving...' : isEdit ? 'Update Device' : 'Add Device'}
                </Button>
            </form>
            <div className='h-full w-full'>
                {devicesData.length === 0 ? (
                    <div className="text-gray-500 mb-4">No devices found.</div>
                ) : (
                    <ControlledTable
                        data={devicesData}
                        isLoading={isSubmitting}
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
                title="Delete Device"
                message={`Are you sure you want to delete this device ${deviceToDelete?.name}?`}
            />
        </div>
    );
};

export default DevicesPage;
