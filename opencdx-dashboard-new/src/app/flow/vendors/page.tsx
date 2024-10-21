'use client';

import React, { useState } from 'react';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { Vendor } from '@/api/logistics/model/vendor';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { ControlledInput } from '@/components/flow/ControlledInput';
import { useFetchVendors, useHandleFormSubmit, useDeleteVendor } from '@/hooks/manufacturers-hooks';
import ControlledTable from '@/components/flow/ControlledTable';
import ConfirmationModal from '@/components/flow/ConfirmationModal';

const STATES = {
    Alabama: 'AL',
    Alaska: 'AK',
    Arizona: 'AZ',
    Arkansas: 'AR',
    California: 'CA',
    Colorado: 'CO',
    Connecticut: 'CT',
    Delaware: 'DE',
    Florida: 'FL',
    Georgia: 'GA',
    Hawaii: 'HI',
    Idaho: 'ID',
    SouthAmerica: 'SOUTH_AMERICA',
    Unrecognized: 'UNRECOGNIZED'
} as const;
export type State = typeof STATES[keyof typeof STATES];

const VendorPage: React.FC = () => {
    const { control, handleSubmit, setValue, reset } = useForm<Omit<Vendor, 'id'>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const router = useRouter();

    const { data: vendorsData = [], refetch: fetchVendors } = useFetchVendors();
    const { mutate: handleFormSubmit } = useHandleFormSubmit(isEdit, fetchVendors, reset);
    const { mutate: handleDelete } = useDeleteVendor(fetchVendors);

    const columns = [
        { header: 'Name', accessorKey: 'name' },
        { header: 'Description', accessorKey: 'description' },
    ];

    const onSubmit = (data: Omit<Vendor, 'id'>) => {
        handleFormSubmit(data);
    };

    const handleEdit = (vendor: Vendor) => {
        setSelectedVendor(vendor);
        setIsEdit(true);
        // Populate form fields with vendor data
        Object.entries(vendor).forEach(([key, value]) => {
            setValue(key as any, value);
        });
    };

    const handleDeleteConfirmation = (vendor: Vendor) => {
        setSelectedVendor(vendor);
    };

    return (
        <div className="w-screen h-screen flex flex-col p-4">
            <div className='flex flex-start'>
                <Button
                    onClick={() => router.push('/flow')}
                    variant='bordered'
                    color='primary'
                    startContent={<ArrowBack />}
                >Back</Button>
                <h1 className="pl-4 text-2xl font-bold mb-4">Vendors</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mb-8 grid grid-cols-2 gap-4 w-full">

                <ControlledInput
                    control={control}
                    name="vendorName"
                    label="Name"
                />
                <ControlledInput
                    control={control}
                    name="vendorDescription"
                    label="Description"
                />
                <ControlledInput
                    control={control}
                    name="vendorAddress.address1"
                    label="Address Line 1"
                />
                <ControlledInput
                    control={control}
                    name="vendorAddress.address2"
                    label="Address Line 2"
                />
                <ControlledInput
                    control={control}
                    name="vendorAddress.address3"
                    label="Address Line 3"
                />
                <Controller
                    control={control}
                    name="vendorAddress.state"
                    render={({ field }) => (
                        <>
                            <Select
                                className="max-w-xs mb-4 mt-2 mr-4 ml-4 bg-white"
                                label="State"
                                variant='bordered'
                                radius='sm'
                                {...field}
                            >
                                {Object.keys(STATES).map((state) => (
                                    <SelectItem key={state} value={state}>
                                        {state}
                                    </SelectItem>
                                ))}
                            </Select>
                        </>
                    )}
                />
                <ControlledInput
                    control={control}
                    name="vendorAddress.countryId"
                    label="Country"
                />
                <ControlledInput
                    control={control}
                    name="vendorAddress.postalCode"
                    label="Postal Code"
                />
                <Button type="submit" color="primary" disabled={isLoading} className="w-fit mt-4">
                    {isLoading ? 'Saving...' : isEdit ? 'Update Vendor' : 'Add Vendor'}
                </Button>
            </form>

            <div className='h-full w-full'>
                <ControlledTable
                    data={vendorsData}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDeleteConfirmation}
                    isLoading={isLoading}
                />
            </div>

            <ConfirmationModal
                isOpen={!!selectedVendor}
                onClose={() => setSelectedVendor(null)}
                onConfirm={() => {
                    if (selectedVendor?.id) {
                        handleDelete(selectedVendor.id);
                    }
                    setSelectedVendor(null);
                    setIsEdit(false);
                }}
                title="Delete Vendor"
                message={`Are you sure you want to delete this vendor ${selectedVendor?.vendorName}?`}
            />
        </div>
    );
};

export default VendorPage;
