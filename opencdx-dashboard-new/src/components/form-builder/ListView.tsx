import React from 'react';
import { Button as NButton } from '@nextui-org/button';
import TitleIcon from '@mui/icons-material/Title';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import StatusIcon from '@mui/icons-material/FactCheckOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SettingsIcon from '@mui/icons-material/SettingsSuggest';
import { Questionnaire } from '@/api/questionnaire/model/questionnaire';
import {Pagination} from "ui-library";

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
  return (
    <>
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 bg-blue-50 dark:bg-gray-700 dark:text-gray-400" style={{ backgroundColor: 'var(--colors-base-primary-100, #CCE3FD)' }}>
          <tr>
            <th className="px-6 py-3" scope="col">
              <div className="flex items-center">
                <TitleIcon className="w-4 h-4 mr-2" />
                Form Title
              </div>
            </th>
            <th className="px-6 py-3" scope="col">
              <div className="flex items-center ">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Last Updated
              </div>
            </th>
            <th className="px-6 py-3" scope="col">
              <div className="flex items-center ">
                <StatusIcon className="w-4 h-4 mr-2" />
                Status
              </div>
            </th>
            <th className="px-6 py-3" scope="col">
              <div className="flex items-center">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Actions
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
        {questionnaires?.map((questionnaire: Questionnaire, index: number) => (
            <tr
              key={questionnaire.id}
              className={`bg-${index % 2 === 0 ? 'white' : 'blue-50'} border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {questionnaire.title}
              </td>
              <td className="px-6 py-4">
                {convertDate(questionnaire.modified)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div
                    className={`h-3 w-3 rounded-full mr-2 ${
                      questionnaire.status === 'active'
                        ? 'bg-green-500'
                        : questionnaire.status === 'UNRECOGNIZED'
                        ? 'bg-yellow-500'
                        : questionnaire.status === 'retired'
                        ? 'bg-gray-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <span className="capitalize">
                    {questionnaire.status}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <NButton isIconOnly variant="bordered"color='primary' onPress={() => onView(questionnaire)}>
                    <RemoveRedEyeIcon />
                  </NButton>
                  <NButton isIconOnly variant="bordered" color='primary' onPress={() => onDownload(questionnaire)}>
                    <FileDownloadIcon />
                  </NButton>
                  <NButton isIconOnly variant="bordered" color='primary' onPress={() => onEdit(questionnaire)}>
                    <EditNoteIcon />
                  </NButton>
                  <NButton isIconOnly variant="bordered" color='primary' onPress={() => onDelete(questionnaire.id!)}>
                    <DeleteIcon />
                  </NButton>
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