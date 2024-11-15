import React, { useMemo } from 'react';
import Image from 'next/image';
import { Questionnaire } from '@/api/questionnaire/model/questionnaire';
import {  Button, Tooltip, TitleIcon } from "ui-library";
import calendarToday from '../../../../public/images/calendar_today.png';
import factCheck from '../../../../public/images/fact_check.png';
import settingsSuggest from '../../../../public/images/settings_suggest.png';
import removeRedEye from '../../../../public/images/remove_red_eye.png';
import fileDownload from '../../../../public/images/file_download.png';
import editNote from '../../../../public/edit_note_view.png';
import deleteOutline from '../../../../public/images/delete_outline.png';

interface ListViewProps {
  questionnaires: Questionnaire[];
  onView: (questionnaire: Questionnaire) => void;
  onDownload: (questionnaire: Questionnaire) => void;
  onEdit: (questionnaire: Questionnaire) => void;
  onDelete: (id: string, title: string) => void;
  convertDate: (date: any) => string;
  pagination: {
    totalPages: number;
    totalRecords: number;
    pageSize: number;
  };

  onPageChange: (page: number) => void;
}

const ListView: React.FC<ListViewProps> = ({
  questionnaires,
  onView,
  onDownload,
  onEdit,
  onDelete,
  convertDate,
  pagination,
  onPageChange,
}) => {
  const tableHeaders = useMemo(() => [
    { icon: <TitleIcon className="w-6 h-6 mr-2 text-black-500 flex-shrink-0" />, label: 'Form Title' },
    { icon: <Image src={calendarToday.src} alt="Calendar" width={24} height={24} className='mr-2 text-black-500 flex-shrink-0' />, label: 'Last Updated' },
    { icon: <Image src={factCheck.src} alt="Upload" width={24} height={24} className='mr-2 text-black-500 flex-shrink-0' />, label: 'Status' },
    { icon: <Image src={settingsSuggest.src} alt="Settings" width={24} height={24} className='mr-2 text-black-500 flex-shrink-0' />, label: 'Actions' },
  ], []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'UNRECOGNIZED': return 'bg-yellow-500';
      case 'retired': return 'bg-gray-500';
      default: return 'bg-red-500';
    }
  };

  const paginationButtonStyle = {
    width: '24px',
    height: '24px',
    padding: '2px 0',
    borderRadius: '2px',
    fontSize: '14px',
    minWidth: '24px',
    border: '1px solid var(--colors-base-primary, #006FEE)',
  };

  const activeButtonStyle = {
    ...paginationButtonStyle,
    background: 'var(--colors-base-primary-50, #E6F1FE)',
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
                      { action: onView, icon: removeRedEye.src, alt: 'Preview JSON', dataTestId: 'preview-json'   },
                      { action: onDownload, icon: fileDownload.src, alt: 'Download JSON', dataTestId: 'download-json' },
                      { action: onEdit, icon: editNote.src, alt: 'Edit Form', dataTestId: 'edit-form' },
                      { action: () => onDelete(questionnaire.id!, questionnaire.title!), icon: deleteOutline.src, alt: 'Delete Form', dataTestId: 'delete-form' },
                    ].map(({ action, icon, alt ,dataTestId}, index) => (
                      <Tooltip content={alt} placement="top" classNames={{
                        base: "rounded-md",
                        content: "bg-gray-900 text-white text-sm max-w-xs break-words"
                      }}>
                        <Button key={index} isIconOnly variant="bordered" color='primary' onPress={() => action(questionnaire)} data-testid={dataTestId}>
                          <Image src={icon} alt={alt} width={24} height={24} className='text-black-500 flex-shrink-0' />
                      </Button>
                      </Tooltip>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center p-8 bg-white dark:bg-gray-800 dark:border-gray-700">
        <div>Displaying {pagination?.totalPages} of {pagination?.totalRecords} rows</div>
        <div className="flex">
          {[...Array(pagination?.totalPages || 0)].map((_, index) => (
            <Button
              key={index}
              variant="bordered"
              color="primary"
              onPress={() => onPageChange(index + 1)}
              className={`
                w-6 h-6 min-w-[24px] p-0.5 text-sm
                border border-[#006FEE] 
                ${1 === index + 1 ? 'bg-[#E6F1FE]' : 'bg-white'}
                ${index === 0 ? 'rounded-l-sm' : ''}
                ${index === pagination?.totalPages - 1 ? 'rounded-r-sm' : ''}
                ${index !== 0 ? '-ml-px' : ''}
              `}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListView;
