'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Button, Modal, Input, Select, SelectItem } from '@nextui-org/react';
import { Country, Continent } from '@/api/logistics/model/country';
import { Delete, Edit, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFetchCountries, useHandleCountryFormSubmit, useDeleteCountry } from '@/hooks/manufacturers-hooks';
import ControlledTable from '@/components/flow/ControlledTable';
import ConfirmationModal from '@/components/flow/ConfirmationModal';

const CountryPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
  const { mutate: handleDeleteConfirm } = useDeleteCountry(fetchCountries);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleFormSubmit(formData);
  }, [formData, handleFormSubmit]);

  const handleEdit = useCallback((country: Country) => {
    setFormData(country);
    setIsEdit(true);
  }, []);

  const handleDelete = useCallback((country: Country) => {
    setSelectedCountry(country);
    setIsOpen(true);
  }, []);
 

  const columns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'ISO2', accessorKey: 'iso2' },
    { header: 'ISO3', accessorKey: 'iso3' },
    { header: 'Continent', accessorKey: 'continent' },
  ];

  return (
    <div className="w-full h-screen flex flex-col p-4">
      <div className='flex flex-start'>
        <Button 
          onClick={() => router.push('/pages/flow')}
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

      <div className='h-full w-full'>
        {countries.length === 0 ? (
          <div className="text-gray-500 mb-4">No countries found.</div>
        ) : (
          <ControlledTable
            columns={columns}
            data={countries}
            isLoading={isSubmitting}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedCountry(null);
        }}
        onConfirm={() => {
          console.log('onConfirm called');
          if (selectedCountry?.id) {
            handleDeleteConfirm(selectedCountry.id);
          }
          setIsOpen(false);
          setSelectedCountry(null);
          setFormData({ name: '', iso2: '', iso3: '', continent: Continent.Africa });
          setIsEdit(false);
          setIsModalVisible(false);
        }}
        title="Delete Country"
        message={`Are you sure you want to delete this country ${selectedCountry?.name}?`}
      />
    </div>
  );
};

export default CountryPage;
