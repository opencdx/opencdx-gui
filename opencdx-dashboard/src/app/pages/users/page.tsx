'use client';

import { useEffect, useState } from 'react';
import { Card, CardBody, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from 'ui-library';
import { useSearchParams } from 'next/navigation';
import { iamApi } from '@/api';
import type { IamUser } from '@/api/iam';

export default function UsersPage() {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState<IamUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const statusFilter = searchParams.get('status');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsersLoading(true);
        setUsersError(null);
        const resp = await iamApi.listIamUsers({ listIamUsersRequest: { pagination: { pageNumber, pageSize, sortAscending: true } } });
        const allUsers: IamUser[] = resp.data.iamUsers || [];
        const filtered = statusFilter === 'active'
          ? allUsers.filter(u => u.status === 'IAM_USER_STATUS_ACTIVE')
          : statusFilter === 'inactive'
            ? allUsers.filter(u => u.status === 'IAM_USER_STATUS_INACTIVE')
            : allUsers;
        setUsers(filtered);
        setTotalPages(resp.data.pagination?.totalPages ? Number(resp.data.pagination.totalPages) : 1);
        setTotalRecords(resp.data.pagination?.totalRecords ? Number(resp.data.pagination.totalRecords) : filtered.length);
      } catch (e: any) {
        setUsersError(e?.message || 'Failed to fetch users');
      } finally {
        setUsersLoading(false);
      }
    };
    fetchUsers();
  }, [pageNumber, pageSize, statusFilter]);

  return (
    <div className="p-8 bg-[#F4F9FF] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Users</h1>
            <p className="text-gray-600">Manage users and view their status</p>
          </div>
          <div>
            <Dropdown>
              <DropdownTrigger>
                <button className="px-3 py-2 border rounded text-sm">{statusFilter ? `Status: ${statusFilter}` : 'Status: all'}</button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Status filter" onAction={(key: React.Key) => {
                const url = new URL(window.location.href);
                if (key === 'all') {
                  url.searchParams.delete('status');
                } else {
                  url.searchParams.set('status', String(key));
                }
                window.history.replaceState({}, '', url.toString());
                setPageNumber(0);
              }}>
                <DropdownItem key="all">All</DropdownItem>
                <DropdownItem key="active">Active</DropdownItem>
                <DropdownItem key="inactive">Inactive</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </header>

        <Card className="bg-white">
          <CardBody className="p-6">
            {usersLoading && <div className="text-gray-500">Loading users...</div>}
            {usersError && <div className="text-red-600 bg-red-50 p-4 rounded-lg">{usersError}</div>}

            {!usersLoading && !usersError && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 bg-blue-50">
                    <tr>
                      <th className="px-6 py-3">Username</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="bg-white border-b">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{u.username}</td>
                        <td className="px-6 py-4">{u.type}</td>
                        <td className="px-6 py-4">{u.status}</td>
                        <td className="px-6 py-4">{u.created}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex justify-between items-center p-4">
              <div>Records: {totalRecords}</div>
              <div className="flex gap-2 items-center">
                <button className="px-2 py-1 border rounded" disabled={pageNumber <= 0} onClick={() => setPageNumber(p => Math.max(0, p - 1))}>Prev</button>
                <span className="text-sm">Page {pageNumber + 1} / {totalPages || 1}</span>
                <button className="px-2 py-1 border rounded" disabled={pageNumber + 1 >= totalPages} onClick={() => setPageNumber(p => p + 1)}>Next</button>
                <Input type="number" className="w-20" value={String(pageSize)} onChange={(e: any) => setPageSize(Math.max(1, Number(e.target.value) || 10))} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}


