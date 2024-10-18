'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal, Input, Select, SelectItem, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { Country, Continent } from '@/api/logistics/model/country';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { Delete, Edit, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFetchCountries, useHandleCountryFormSubmit, useDeleteCountry } from '@/hooks/manufacturers-hooks';

const CountryPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<Omit<Country, 'id'>>({
    name: '',
    iso2: '',
    iso3: '',
    continent: Continent.Africa,
  });

  const { data: countries = [], refetch: fetchCountries } = useFetchCountries();
  const { mutate: handleFormSubmit, isPending: isSubmitting } = useHandleCountryFormSubmit(isEdit, fetchCountries, () => {
    setFormData({ name: '', iso2: '', iso3: '', continent: Continent.Africa });
    setIsEdit(false);
    setIsModalVisible(false);
  });
  const { mutate: handleDelete } = useDeleteCountry(fetchCountries);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleFormSubmit(formData);
  }, [formData, handleFormSubmit]);

  const columns: MRT_ColumnDef<Country>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'ISO2', accessorKey: 'iso2' },
    { header: 'ISO3', accessorKey: 'iso3' },
    { header: 'Continent', accessorKey: 'continent' },
    {
      header: 'Actions',
      accessorKey: 'actions',
    },
  ];

  const table = useMantineReactTable({
    columns,
    data: countries,
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
    state: { isLoading: isSubmitting },

    getRowId: (row) => row.id,
    renderRowActions: ({ row }) => (
      <span className='flex flex-col gap-2'>
        <Button isIconOnly variant='light' color='primary'
          onClick={() => {
            setSelectedCountry(row.original);
            setFormData(row.original);
            setIsEdit(true);
            setIsModalVisible(true);
          }}
        >{<Edit />}</Button>
        <Button isIconOnly variant='light' color='danger'
          onClick={() => {
            setIsOpen(true);
            setSelectedCountry(row.original);
            setIsEdit(false);
            setIsModalVisible(true);
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
        <h1 className="pl-4 text-2xl font-bold mb-4">Countries</h1>
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
          label="ISO2"
          name="iso2"
          variant='bordered'
          className='bg-white'
          radius='sm'
          value={formData.iso2}
          onChange={handleInputChange}
          required
        />
        <Input
          label="ISO3"
          name="iso3"
          variant='bordered'
          className='bg-white'
          radius='sm'
          value={formData.iso3}
          onChange={handleInputChange}
          required
        />
        <Select
          label="Continent"
          name="continent"
          variant='bordered'
          className='bg-white'
          radius='sm'
          value={formData.continent}
          onChange={handleInputChange}
          required
        >
          {Object.values(Continent).map((continent) => (
            <SelectItem key={continent} value={continent}>
              {continent}
            </SelectItem>
          ))}
        </Select>
        <Button type="submit" color="primary" disabled={isSubmitting} className="w-fit mt-4">
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Country' : 'Add Country'}
        </Button>
      </form>

      <div className=' h-full w-full'>
        {
            countries.length === 0 ? <div className="text-gray-500 mb-4">No countries found.</div> :
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
              <ModalHeader className="flex flex-col gap-1">Delete Country</ModalHeader>
              <ModalBody>
                <p> 
                Are you sure you want to delete this country {selectedCountry?.name}?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant='bordered' onPress={()=>{
                    onClose();
                    setSelectedCountry(null);
                    setIsOpen(false);
                }} aria-label='Cancel' tabIndex={0} size='lg'>
                  Cancel
                </Button>
                <Button
                    color="danger"
                    aria-label='Continue to delete country' 
                    tabIndex={0}
                    size='lg'
                    onPress={() => {
                      onClose();
                      if (selectedCountry?.id) {
                        handleDelete(selectedCountry.id);
                      }
                      setIsOpen(false);
                      setSelectedCountry(null);
                      setFormData({ name: '', iso2: '', iso3: '', continent: Continent.Africa });
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

export default CountryPage;
