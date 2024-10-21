'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { Vendor } from '@/api/logistics/model/vendor';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { ControlledInput } from '@/components/flow/ControlledInput';
import { useFetchVendors, useHandleFormSubmit, useDeleteVendor } from '@/hooks/manufacturers-hooks';
import ControlledTable from '@/components/flow/ControlledTable';
import ConfirmationModal from '@/components/flow/ConfirmationModal';
import {STATES } from '@/lib/constant';


const VendorPage: React.FC = () => {
    const { control, handleSubmit, setValue, reset } = useForm<Omit<Vendor, 'id'>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const router = useRouter();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    const { data: vendorsData = [], refetch: fetchVendors } = useFetchVendors();
    const { mutate: handleFormSubmit } = useHandleFormSubmit(isEdit, fetchVendors, reset);
    const { mutate: handleDelete } = useDeleteVendor(fetchVendors);

    const columns = useMemo(() => [
        { header: 'Name', accessorKey: 'vendorName' },
        { header: 'Description', accessorKey: 'vendorDescription' },
        { header: 'Address', accessorKey: 'vendorAddress.address1' },
        { header: 'City', accessorKey: 'vendorAddress.city' },
        { header: 'State', accessorKey: 'vendorAddress.state' },
        { header: 'Postal Code', accessorKey: 'vendorAddress.postalCode' },
        { header: 'Website', accessorKey: 'vendorWebsite' },
    ], []);

    const onSubmit = useCallback((data: Omit<Vendor, 'id'>) => {
        handleFormSubmit(data);
    }, [handleFormSubmit]);

    const handleEdit = useCallback((vendor: Vendor) => {
        setSelectedVendor(vendor);
        setIsEdit(true);
        Object.keys(vendor).forEach((key) => {
            setValue(key as any, vendor[key as keyof Vendor]);
        });
    }, [setValue]);

    const handleDeleteConfirmation = useCallback((vendor: Vendor) => {
        setSelectedVendor(vendor);
        setIsDeleteModalOpen(true);
    }, []);

    const stateOptions = useMemo(() => 
        Object.keys(STATES).map((state) => (
            <SelectItem key={state} value={STATES[state as keyof typeof STATES]}>
                {state}
            </SelectItem>
        ))
    , []);

    return (
        <div className="w-full h-screen flex flex-col p-4">
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
                <ControlledInput
                    control={control}
                    name="vendorAddress.city"
                    label="City"
                />
               <div className=" flex items-center gap-4 w-full">
               <label className="text w-[250px]">State</label>
                <Controller
                    control={control}
                    name="vendorAddress.state"
                    render={({ field }) => (
                        <Select
                            className="  bg-white"
                            label="State"
                            variant='bordered'
                            radius='sm'
                            {...field}
                        >
                            {stateOptions}
                        </Select>
                    )}
                />
                </div>
                <ControlledInput
                    control={control}
                    name="vendorAddress.postalCode"
                    label="Postal Code"
                />
                <ControlledInput
                    control={control}
                    name="vendorWebsite"
                    label="Website"
                />
                <ControlledInput
                    control={control}
                    name="vendorAddress.countryId"
                    label="Country ID"
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
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => {
                    selectedVendor?.id && handleDelete(selectedVendor.id);
                    setIsDeleteModalOpen(false);
                }}
                title="Delete Vendor"
                message={`Are you sure you want to delete this vendor ${selectedVendor?.vendorName}?`}
            />
        </div>
    );
};

export default VendorPage;
