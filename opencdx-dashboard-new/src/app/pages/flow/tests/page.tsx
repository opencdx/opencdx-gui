'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import { Input, Button, Textarea, Select, SelectItem } from '@nextui-org/react';
import { ArrowBack } from '@mui/icons-material';
import { Manufacturer } from '@/api/logistics/model/manufacturer';
import { Vendor } from '@/api/logistics/model/vendor';
import { Device } from '@/api/logistics/model/device';
import { useRouter } from 'next/navigation';
import { useGetManufacturerList, useFetchVendors, useFetchDevices, useFetchTests, useDeleteTest, useHandleTestFormSubmit } from '@/hooks/manufacturers-hooks';

import ControlledTable from '@/components/flow/ControlledTable';
import ConfirmationModal from '@/components/flow/ConfirmationModal';

// Add a Test interface
interface Test {
    id?: string;
    manufacturerId: string;
    vendorId: string;
    deviceIds: string[];
    numberOfTests: number;
    batchNumber: string;
    serialNumber: string;
    storageRequirements: string;
    userInstructions: string;
    limitations: string;
    safety: string;
}

const TestsPage: React.FC = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [testToDelete, setTestToDelete] = useState<Test | null>(null);
    const [formData, setFormData] = useState<Omit<Test, 'id'>>({
        manufacturerId: '',
        vendorId: '',
        deviceIds: [],
        numberOfTests: 0,
        batchNumber: '',
        serialNumber: '',
        storageRequirements: '',
        userInstructions: '',
        limitations: '',
        safety: '',
    });

    const { data: testsData = [], refetch: fetchTests } = useFetchTests();

    const { data: manufacturersList = [], isError: isErrorList, mutate: mutateManufacturersList } = useGetManufacturerList();
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

    const getManufacturers = useMemo(() => {
        mutateManufacturersList({ pagination: { pageNumber: 0, pageSize: 100, sortAscending: true } }, {
            onSuccess: (data) => {
                setManufacturers(data?.data?.manufacturers || []);
            }
        });
    }, [mutateManufacturersList]); const { data: vendorsList = [] } = useFetchVendors();
    const { data: devicesList = [] } = useFetchDevices();

    const { mutate: handleFormSubmit, isPending: isSubmitting } = useHandleTestFormSubmit(isEdit, fetchTests, () => {
        // setFormData(
        //     {}
        // );
        setIsEdit(false);
    });
    const { mutate: handleDeleteConfirm } = useDeleteTest(fetchTests);

    const router = useRouter();

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string | string[] } }) => {
        const { name, value } = e.target;
        if (name === 'deviceIds') {
            // Ensure deviceIds is always an array
            setFormData(prev => ({ ...prev, [name]: Array.isArray(value) ? value : [value] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        handleFormSubmit(formData);
    }, [formData, handleFormSubmit]);

    const handleEdit = useCallback((test: Test) => {
        setFormData(test);
        setIsEdit(true);
    }, []);

    const handleDelete = useCallback((test: Test) => {
        setTestToDelete(test);
        setIsDeleteModalOpen(true);
    }, []);

    const handleConfirmDelete = useCallback(async () => {
        if (testToDelete && testToDelete.id) {
            handleDeleteConfirm(testToDelete.id);
            setTestToDelete(null);
            setIsDeleteModalOpen(false);
        } else {
            console.error('No test selected for deletion or missing ID');
        }
    }, [testToDelete, handleDeleteConfirm]);

    const columns = React.useMemo<MRT_ColumnDef<any>[]>(
        () => [
            { accessorKey: 'manufacturerId', header: 'Manufacturer' },
            { accessorKey: 'vendorId', header: 'Vendor' },
            { accessorKey: 'numberOfTests', header: 'Number of Tests' },
            { accessorKey: 'batchNumber', header: 'Batch Number' },
            { accessorKey: 'serialNumber', header: 'Serial Number' },
        ],
        []
    );

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
                <h1 className="pl-4 text-2xl font-bold mb-4">Tests</h1>
            </div>

            <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 w-full">
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
                    {manufacturers.map((manufacturer: Manufacturer) => (
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
                    {vendorsList.map((vendor: Vendor) => (
                        <SelectItem key={vendor.id ?? ''} value={vendor.id ?? ''}>{vendor.vendorName}</SelectItem>
                    ))}
                </Select>
                <Select
                    label="Devices"
                    name="deviceIds"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    selectionMode="multiple"
                    selectedKeys={formData.deviceIds}
                    onSelectionChange={(keys) => {
                        const selectedKeys = Array.from(keys as Set<string>);
                        handleInputChange({ target: { name: 'deviceIds', value: selectedKeys } });
                    }}
                    required
                >
                    {devicesList.map((device: Device) => (
                        <SelectItem key={device.id ?? ''} value={device.id ?? ''}>{device.name}</SelectItem>
                    ))}
                </Select>
                <Input
                    label="Number of Tests"
                    name="numberOfTests"
                    type="number"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.numberOfTests.toString()}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    label="Batch Number"
                    name="batchNumber"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.batchNumber}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    label="Serial Number"
                    name="serialNumber"
                    variant='bordered'
                    className='bg-white'
                    radius='sm'
                    value={formData.serialNumber}
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
                    label="User Instructions"
                    name="userInstructions"
                    variant='bordered'
                    className='bg-white col-span-2'
                    radius='sm'
                    value={formData.userInstructions}
                    onChange={handleInputChange}
                    required
                />
                <Textarea
                    label="Limitations"
                    name="limitations"
                    variant='bordered'
                    className='bg-white col-span-2'
                    radius='sm'
                    value={formData.limitations}
                    onChange={handleInputChange}
                    required
                />
                <Textarea
                    label="Safety"
                    name="safety"
                    variant='bordered'
                    className='bg-white col-span-2'
                    radius='sm'
                    value={formData.safety}
                    onChange={handleInputChange}
                    required
                />
                <Button type="submit" fullWidth={false} color="primary" disabled={isSubmitting} className="w-fit mt-4">
                    {isSubmitting ? 'Saving...' : isEdit ? 'Update Test' : 'Add Test'}
                </Button>
            </form>
            <div className='h-full w-full'>
                {testsData.length === 0 ? (
                    <div className="text-gray-500 mb-4">No tests found.</div>
                ) : (
                    <ControlledTable
                        data={testsData}
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
                title="Delete Test"
                message={`Are you sure you want to delete this test with batch number ${testToDelete?.batchNumber}?`}
            />
        </div>
    );
};

export default TestsPage;
