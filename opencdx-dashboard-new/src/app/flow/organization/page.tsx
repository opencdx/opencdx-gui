'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import axios from 'axios';
import { Select, SelectItem, Button } from '@nextui-org/react';

import type { Organization } from '@/api/iam/model/organization';
import type { Workspace } from '@/api/iam/model/workspace';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

type OrganizationData = Organization & {
    workspaces: WorkspaceData[];
};

type WorkspaceData = Workspace;

const TablesPage: React.FC = () => {
    const router = useRouter();
    const [data, setData] = useState<OrganizationData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const orgResponse = await axios.post(
                'https://api.dev-1.opencdx.io/iam/organization/list',
                { pagination: { pageNumber: 1, pageSize: 100, sortAscending: true } },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('serviceToken')}`,
                        'Accept': 'application/json',
                    }
                }
            );

            const organizations = orgResponse.data.organizations;
            const organizationsWithWorkspaces = await Promise.all(
                organizations.map(async (org: any) => {
                    const workspaceResponse = await axios.post(
                        'https://api.dev-1.opencdx.io/iam/workspace/list',
                        {
                            pagination: { pageNumber: 1, pageSize: 100, sortAscending: true },
                            organizationId: org.id
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('serviceToken')}`,
                                'Accept': 'application/json',
                            }
                        }
                    );

                    return {
                        ...org,
                        workspaces: workspaceResponse.data.workspaces
                    };
                })
            );

            setData(organizationsWithWorkspaces);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('An error occurred while fetching data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const columns = useMemo<MRT_ColumnDef<OrganizationData>[]>(
        () => [
            { accessorKey: 'name', header: 'Name' },
            { accessorKey: 'description', header: 'Description' },
            { accessorKey: 'foundingDate', header: 'Founding Date' },
            { accessorKey: 'industry', header: 'Industry' },
            { accessorKey: 'website', header: 'Website' },
            { accessorKey: 'revenue', header: 'Revenue' },
            { accessorKey: 'logoUrl', header: 'Logo URL' },
            { accessorKey: 'missionStatement', header: 'Mission Statement' },
            { accessorKey: 'visionStatement', header: 'Vision Statement' },
            { accessorKey: 'created', header: 'Created' },
            { accessorKey: 'modified', header: 'Modified' },
            { accessorKey: 'creator', header: 'Creator' },
            { accessorKey: 'modifier', header: 'Modifier' },
        ],
        []
    );

    const workspaceColumns = useMemo<MRT_ColumnDef<WorkspaceData>[]>(
        () => [
            { accessorKey: 'name', header: 'Workspace Name' },
            { accessorKey: 'description', header: 'Description' },
            { accessorKey: 'location', header: 'Location' },
            { accessorKey: 'capacity', header: 'Capacity' },
            { accessorKey: 'workspaceType', header: 'Type' },
            { accessorKey: 'manager', header: 'Manager' },
            { accessorKey: 'facilities', header: 'Facilities' },
            { accessorKey: 'usagePolicy', header: 'Usage Policy' },
            { accessorKey: 'availabilitySchedule', header: 'Availability Schedule' },
            { accessorKey: 'createdDate', header: 'Created Date' },
            { accessorKey: 'created', header: 'Created' },
            { accessorKey: 'modified', header: 'Modified' },
            { accessorKey: 'creator', header: 'Creator' },
            { accessorKey: 'modifier', header: 'Modifier' },
        ],
        []
    );

    const renderDetailPanel = useCallback(
        ({ row }: { row: { original: OrganizationData } }) => (
            <MantineReactTable
                columns={workspaceColumns}
                data={row.original.workspaces}
                enableColumnFilters={false}
                enableTopToolbar={false}
                enableBottomToolbar={false}
                enablePagination={false}
            />
        ),
        [workspaceColumns]
    );

    const table = useMantineReactTable({
        columns,
        data,
        initialState: { showColumnFilters: true },
        enableColumnFilters: true,
        enableSorting: true,
        enablePagination: true,
        enableColumnResizing: true,
        enableColumnActions: true,
        enableRowActions: true,
        enableRowSelection: true,
        enableGrouping: true,
        state: { isLoading },
        renderDetailPanel,
        mantineTableProps: {
            height: '600px',
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

    const organizationOptions = useMemo(() => 
        data.map((org) => ({ value: org.id, label: org.name })),
        [data]
    );

    const workspaceOptions = useMemo(() => 
        data.flatMap(org => org.workspaces.map(workspace => ({
            value: workspace.id,
            label: workspace.name
        }))),
        [data]
    );

    const handleOrganizationChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        const selectedOrg = data.find((org) => org.id === value);
        if (selectedOrg) {
            setData([selectedOrg]);
        }
    }, [data]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className='flex flex-start'>
        <Button 
        onClick={()=>{
            router.push('/flow');
        }}
        variant='bordered'
        color='primary'
        startContent={<ArrowBack />}
        >Back</Button>
      <h1 className="pl-4 text-2xl font-bold mb-4">Organizations and Workspaces</h1>
      </div>
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            <div className="flex justify-center w-screen gap-4">
                <div className="mt-4 w-1/2">
                    <Select
                        label="Select Organization"
                        items={organizationOptions}
                        onChange={handleOrganizationChange}
                    >
                        {organizationOptions.map((org, index) => (
                            <SelectItem key={index} value={org.value?.toString() ?? ''}>
                                {org.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="mt-4 w-1/2">
                    <Select label="Select Workspace">
                        {workspaceOptions.map((workspace, index) => (
                            <SelectItem key={index} value={workspace.value?.toString() ?? ''}>
                                {workspace.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="h-full w-full">
                <MantineReactTable table={table} />
            </div>
        </div>
    );
};

export default TablesPage;
