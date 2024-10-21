'use client';

import React, { useState, useCallback } from 'react';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { Delete, Edit, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ControlledTable from '@/components/flow/ControlledTable';
import ConfirmationModal from '@/components/flow/ConfirmationModal';

// Add these imports
import { IamUser, SignUpRequest } from '@/api/iam/model';
import { useFetchUsers, useHandleUserFormSubmit, useDeleteUser } from '@/hooks/manufacturers-hooks';
export const Type = {
    IamUserTypeUnspecified: 'IAM_USER_TYPE_UNSPECIFIED',
    IamUserTypeRegular: 'IAM_USER_TYPE_REGULAR',
    IamUserTypeSystem: 'IAM_USER_TYPE_SYSTEM',
    IamUserTypeTrial: 'IAM_USER_TYPE_TRIAL',
    Unrecognized: 'UNRECOGNIZED'
} as const;
const AdminPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<Omit<SignUpRequest, 'id'>>({
    type: Type.IamUserTypeRegular,
    firstName: '',
    lastName: '',
    systemName: '',
    username: '',
    password: '',
  });

  const { data: users = [], refetch: fetchUsers } = useFetchUsers();
  const { mutate: handleFormSubmit, isPending: isSubmitting } = useHandleUserFormSubmit(isEdit, fetchUsers, () => {
    setFormData({ type: Type.IamUserTypeRegular, firstName: '', lastName: '', systemName: '', username: '', password: '' });
    setIsEdit(false);
  });
  const { mutate: handleDeleteConfirm } = useDeleteUser(fetchUsers);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleFormSubmit(formData);
  }, [formData, handleFormSubmit]);

  const handleEdit = useCallback((user: any) => {
    setFormData(user);
    setIsEdit(true);
  }, []);

  const handleDelete = useCallback((user:any) => {
    setSelectedUser(user);
    setIsOpen(true);
  }, []);

  const columns = [
    { header: 'First Name', accessorKey: 'firstName' },
    { header: 'Last Name', accessorKey: 'lastName' },
    { header: 'Username', accessorKey: 'username' },
    { header: 'System Name', accessorKey: 'systemName' },
    { header: 'Type', accessorKey: 'type' },
    {
      header: 'Actions',
      cell: ({ row }: { row: any }) => (
        <span className='flex flex-col gap-2'>
          <Button isIconOnly variant='light' color='primary' onClick={() => handleEdit(row.original)}>{<Edit />}</Button>
          <Button isIconOnly variant='light' color='danger' onClick={() => handleDelete(row.original)}>{<Delete />}</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col p-4">
      <div className='flex flex-start'>
        <Button 
          onClick={() => router.push('/flow')}
          variant='bordered'
          color='primary'
          startContent={<ArrowLeft />}
        >Back</Button>
        <h1 className="pl-4 text-2xl font-bold mb-4">Users</h1>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4 w-full">
        <Input
          label="First Name"
          name="firstName"
          variant='bordered'
          className='bg-white'
          radius='sm'
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          variant='bordered'
          className='bg-white'
          radius='sm'
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Username"
          name="username"
          variant='bordered'
          className='bg-white'
          radius='sm'
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <Input
          label="System Name"
          name="systemName"
          variant='bordered'
          className='bg-white'
          radius='sm'
          value={formData.systemName}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          variant='bordered'
          className='bg-white'
          radius='sm'
          value={formData.password}
          onChange={handleInputChange}
          required={!isEdit}
        />
        <Select
          label="User Type"
          name="type"
          variant='bordered'
          className='bg-white'
          radius='sm'
          value={formData.type}
          onChange={handleInputChange}
          required
        >
          {Object.values(Type).map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </Select>
        <Button type="submit" color="primary" disabled={isSubmitting} className="w-fit mt-4">
          {isSubmitting ? 'Saving...' : isEdit ? 'Update User' : 'Add User'}
        </Button>
      </form>

      <div className='h-full w-full'>
        {users.length === 0 ? (
          <div className="text-gray-500 mb-4">No users found.</div>
        ) : (
          <ControlledTable
            columns={columns}
            data={users}
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
          setSelectedUser(null);
        }}
        onConfirm={() => {
          if (selectedUser?.id) {
            handleDeleteConfirm(selectedUser.id);
          }
          setIsOpen(false);
          setSelectedUser(null);
          setFormData({ type: Type.IamUserTypeRegular, firstName: '', lastName: '', systemName: '', username: '', password: '' });
          setIsEdit(false);
        }}
        title="Delete User"
        message={`Are you sure you want to delete this user ${selectedUser?.firstName} ${selectedUser?.lastName}?`}
      />
    </div>
  );
};

export default AdminPage;

