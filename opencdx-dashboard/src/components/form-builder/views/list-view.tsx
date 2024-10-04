import React, { useMemo } from 'react';
import { Button as NButton } from '@nextui-org/button';
import TitleIcon from '@mui/icons-material/Title';
import Image from 'next/image';
import { Questionnaire } from '@/api/questionnaire/model/questionnaire';
import { Pagination } from "ui-library";

interface ListViewProps {
  questionnaires: Questionnaire[];
  onView: (questionnaire: Questionnaire) => void;
  onDownload: (questionnaire: Questionnaire) => void;
  onEdit: (questionnaire: Questionnaire) => void;
  onDelete: (id: string) => void;
  convertDate: (date: any) => string;
  pagination: any;
}

const ListView: React.FC<ListViewProps> = ({
  questionnaires,
  onView,
  onDownload,
  onEdit,
  onDelete,
  convertDate,
  pagination,
}) => {
  const tableHeaders = useMemo(() => [
    { icon: <TitleIcon className="w-6 h-6 mr-2 text-black-500 flex-shrink-0" />, label: 'Form Title' },
    { icon: <Image src="/images/calendar_today.png" alt="Calendar" width={24} height={24} className='mr-2 text-black-500 flex-shrink-0' />, label: 'Last Updated' },
    { icon: <Image src="/images/fact_check.png" alt="Upload" width={24} height={24} className='mr-2 text-black-500 flex-shrink-0' />, label: 'Status' },
    { icon: <Image src="/images/settings_suggest.png" alt="Settings" width={24} height={24} className='mr-2 text-black-500 flex-shrink-0' />, label: 'Actions' },
  ], []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'UNRECOGNIZED': return 'bg-yellow-500';
      case 'retired': return 'bg-gray-500';
      default: return 'bg-red-500';
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-blue-50 dark:bg-gray-700 dark:text-gray-400" style={{ backgroundColor: 'var(--colors-base-primary-100, #CCE3FD)' }}>
            <tr>
              {tableHeaders.map(({ icon, label }, index) => (
                <th key={index} className="px-6 py-3" scope="col">
                  <div className="flex items-center">
                    {icon}
                    {label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {questionnaires?.map((questionnaire: Questionnaire, index: number) => (
              <tr
                key={questionnaire.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {questionnaire.title}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {convertDate(questionnaire.modified)}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full mr-2 ${getStatusColor(questionnaire.status || '')}`} />
                    <span className="capitalize">{questionnaire.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {[
                      { action: onView, icon: 'remove_red_eye', alt: 'View' },
                      { action: onDownload, icon: 'file_download', alt: 'Download' },
                      { action: onEdit, icon: 'edit_note', alt: 'Edit' },
                      { action: () => onDelete(questionnaire.id!), icon: 'delete_outline', alt: 'Delete' },
                    ].map(({ action, icon, alt }, index) => (
                      <NButton key={index} isIconOnly variant="bordered" color='primary' onPress={() => action(questionnaire)}>
                        <Image src={`/images/${icon}.png`} alt={alt} width={24} height={24} className='text-black-500 flex-shrink-0' />
                      </NButton>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
        <>Displaying {pagination?.totalPages} of {pagination?.totalRecords} rows</>
        <Pagination showControls total={pagination?.totalPages} initialPage={pagination?.pageNumber} />
      </div>
    </>
  );
};

export default ListView;