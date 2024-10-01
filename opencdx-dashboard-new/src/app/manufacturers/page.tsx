'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef, type MRT_Row } from 'mantine-react-table';
import { Input, Button, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from 'ui-library';
import { IconEdit, IconTrash } from '@tabler/icons-react';

import { Manufacturer } from '../../api/logistics/model/manufacturer';
import { useGetManufacturerList, useAddManufacturer, useDeleteManufacturer, useUpdateManufacturer } from '../../hooks/iam-hooks';



const ManufacturersPage: React.FC = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: manufacturersList=[], isError: isErrorList, mutate: mutateManufacturersList } = useGetManufacturerList();
  const { mutate: mutateAddManufacturer } = useAddManufacturer();
  const { mutate: mutateDeleteManufacturer } = useDeleteManufacturer();
  const { mutate: mutateUpdateManufacturer } = useUpdateManufacturer();
  const [isOpen, setIsOpen] = useState(false);
  const [onOpenChange, setOnOpenChange] = useState(false);
  const [row, setRow] = useState<Manufacturer | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState<Omit<Manufacturer, 'id'>>({
    name: '',
    manufacturerAddress: {
      countryId: '66faed240e1b22662c798775',
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
        mutateManufacturersList({pagination: {pageNumber: 0, pageSize: 100, sortAscending: true}}, {onSuccess: (data) => {
      setManufacturers(data?.data?.manufacturers || []);
    }});
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
        if(isEdit){
            await mutateUpdateManufacturer(formData, {
          onSuccess: (data) => {
            setManufacturers(prev => [...prev, data.data]);
          }
        });
        }else{
        await mutateAddManufacturer(formData, {
          onSuccess: (data) => {
            setManufacturers(prev => [...prev, data.data]);
          }
        }); }
    } catch (err) {
        console.error('Error adding manufacturer:', err);
        setError('An error occurred while adding the manufacturer. Please try again.');
    } finally {
        setIsLoading(false);
        setIsEdit(false);
        setFormData({
            name: '',
            manufacturerAddress: {
              countryId: '66faed240e1b22662c798775',
              addressPurpose: 'SECONDARY',
              address1: '',
              city: '',
              state: '',
              postalCode: '',
            },
            manufacturerWebsite: '',
            manufacturerDescription: '',
            manufacturerCertifications: [],
          });

        
    }
  }, [formData]);

  const columns = useMemo<MRT_ColumnDef<Manufacturer>[]>(
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
    if (isErrorList) {
      setError('Error fetching manufacturers. Please try again.');
    }
  }, [isErrorList]);
  const openDeleteConfirmModal = (row: MRT_Row<Manufacturer>) =>{
    setIsOpen(true);
    setOnOpenChange(true);
    setRow(row);
    return 
  }

   
  const table = useMantineReactTable({
    columns,
    data: manufacturers,
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
    getRowId: (row)=>row.id,
    // onEditingRowSave: (row)=>{
    //    setFormData(row.values);
    // },
    renderRowActions: ({ row, table }) => (
        
        <span    className='flex flex-col gap-2'>
            <Button isIconOnly variant='light' color='primary'
            onClick={() => {
                setFormData(row.original);
                setIsEdit(true);
            }}
            >{<IconEdit />}</Button>
            <Button isIconOnly variant='light' color='danger'
            onClick={() => openDeleteConfirmModal(row)}
            >{<IconTrash />}</Button>
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
    <div className="w-full h-full flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Manufacturers</h1>
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
      <div className=' h-full w-full'>
        {
            isErrorList ? <div className="text-red-500 mb-4">Error fetching manufacturers. Please try again.</div> :
            manufacturers.length === 0 ? <div className="text-gray-500 mb-4">No manufacturers found.</div> :
            <MantineReactTable table={table} />
        }
     
      </div>
      <Modal 
        isOpen={isOpen} 
        placement={'center'}
        hideCloseButton = {true}
        radius='none'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Manufacturer</ModalHeader>
              <ModalBody>
                <p> 
                Are you sure you want to delete this manufacturer {row?.name}?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant='bordered' onPress={()=>{
                    onClose();
                    setRow(null);
                    setIsOpen(false);
                    setError(null);
                }} aria-label='Cancel' tabIndex={0} size='lg'>
                  Cancel
                </Button>
                <Button
                    color="danger"
                    aria-label='Continue to delete manufacturer' 
                    tabIndex={0}
                    size='lg'
                    onPress={() => {
                      onClose();
                      mutateDeleteManufacturer(row?.id || '');
                      setManufacturers(prev => prev.filter(manufacturer => manufacturer.id !== row?.id));
                      mutateManufacturersList({pagination: {pageNumber: 0, pageSize: 100, sortAscending: true}}, {onSuccess: (data) => {
                        setManufacturers(data?.data?.manufacturers || []);
                      }});
                      setRow(null);
                      setIsOpen(false);
                      setError(null);
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

export default ManufacturersPage;
