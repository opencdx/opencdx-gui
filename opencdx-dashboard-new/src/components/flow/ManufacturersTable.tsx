import React from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { Button } from '@nextui-org/react';
import { Edit, Delete } from '@mui/icons-material';
import { Manufacturer } from '@/api/logistics/model/manufacturer';

interface ManufacturersTableProps {
  manufacturers: Manufacturer[];
  isLoading: boolean;
  onEdit: (manufacturer: Manufacturer) => void;
  onDelete: (manufacturer: Manufacturer) => void;
  columns: MRT_ColumnDef<Manufacturer>[];
}

const ManufacturersTable: React.FC<ManufacturersTableProps> = ({
  manufacturers,
  isLoading,
  onEdit,
  onDelete,
  columns,
}) => {
  
  const table = useMantineReactTable({
    columns: columns,
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
    getRowId: (row) => row.id,
    renderRowActions: ({ row }) => (
      <span className='flex flex-col gap-2'>
        <Button isIconOnly variant='light' color='primary' onClick={() => onEdit(row.original)}>
          <Edit />
        </Button>
        <Button isIconOnly variant='light' color='danger' onClick={() => onDelete(row.original)}>
          <Delete />
        </Button>
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

  return <MantineReactTable table={table} />;
};

export default ManufacturersTable;
