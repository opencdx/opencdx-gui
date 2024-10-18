'use client';

import React, { useState } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from '@nextui-org/react';
import { Vendor } from '@/api/logistics/model/vendor';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { Delete, Edit, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { ControlledInput } from '@/components/flow/ControlledInput';
import { useFetchVendors, useHandleFormSubmit, useDeleteVendor } from '@/hooks/manufacturers-hooks';

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
    const { control, handleSubmit, setValue, reset } = useForm<Omit<Vendor, 'id'>>({

    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const router = useRouter();

    const { data: vendorsData = [], refetch: fetchVendors } = useFetchVendors();
    const { mutate: handleFormSubmit,  } = useHandleFormSubmit(isEdit, fetchVendors, reset);
    const { mutate: handleDelete } = useDeleteVendor(fetchVendors);

    const columns: MRT_ColumnDef<Vendor>[] = [
        { header: 'Name', accessorKey: 'name' },
        { header: 'Description', accessorKey: 'description' },
        {
            header: 'Actions',
            accessorKey: 'actions',
        },
    ];
    const onSubmit = (data: Omit<Vendor, 'id'>) => {
        handleFormSubmit(data);
    };

    const table = useMantineReactTable({
        columns,
        data: vendors,
        initialState: { showColumnFilters: true, density: 'xs' },
        enableColumnFilters: true,
        enableSorting: true,
        enablePagination: true,
        enableColumnResizing: true,
        enableColumnActions: true,
        enableRowActions: true,
        enableRowSelection: true,
        enableGrouping: true,
        enableEditing: true,
        state: { isLoading },

        getRowId: (row) => row.id,
        renderRowActions: ({ row }) => (
            <span className='flex flex-col gap-2'>
                <Button isIconOnly variant='light' color='primary'
                    onClick={() => {
                        setSelectedVendor(row.original);
                      
                        setIsEdit(true);
                        setIsModalVisible(true);
                    }}
                >{<Edit />}</Button>
                <Button isIconOnly variant='light' color='danger'
                    onClick={() => {
                        setIsOpen(true);
                        setSelectedVendor(row.original);
                    }}
                >{<Delete />}</Button>
            </span>
        ),
        mantineTableProps: {
            height: '500px',
            striped: true,
            highlightOnHover: true,
            withColumnBorders: true,
            sx: {
                '& tr:nth-of-type(odd)': {
                    backgroundColor: '#F7FAFE !important',
                },
                '& tr:nth-of-type(even)': {
                    backgroundColor: '#FFFFFF !important',
                },
                '& thead tr:nth-of-type(1)': {
                    backgroundColor: '#E5F0FF !important',
                },
            },
            withBorder: true,
        },
    });

    return (
        <div className="w-screen h-screen flex flex-col p-4">
            <div className='flex flex-start'>
                <Button
                    onClick={() => router.push('/flow')}
                    variant='bordered'
                    color='primary'
                    startContent={<ArrowLeft />}
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
                {
                    vendors.length === 0 ? <div className="text-gray-500 mb-4">No vendors found.</div> :
                        <MantineReactTable table={table} />
                }
            </div>

            <Modal
                isOpen={isOpen}
                placement={'center'}
                hideCloseButton={true}
                radius='none'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Vendor</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this vendor {selectedVendor?.vendorName}?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant='bordered' onPress={() => {
                                    onClose();
                                    setSelectedVendor(null);
                                    setIsOpen(false);
                                }} aria-label='Cancel' tabIndex={0} size='lg'>
                                    Cancel
                                </Button>
                                <Button
                                    color="danger"
                                    aria-label='Continue to delete vendor'
                                    tabIndex={0}
                                    size='lg'
                                    onPress={() => {
                                        onClose();
                                        if (selectedVendor?.id) {
                                            handleDelete(selectedVendor.id);
                                        }
                                        setIsOpen(false);
                                        setSelectedVendor(null);
                                        setIsEdit(false);
                                        setIsModalVisible(false);
                                    }}
                                >
                                    Continue
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default VendorPage;
