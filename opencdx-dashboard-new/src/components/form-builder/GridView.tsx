import React from 'react';
import { Card, CardBody, CardFooter } from 'ui-library';
import { Button as NButton } from '@nextui-org/button';
import Image from 'next/image';
import TitleIcon from '@mui/icons-material/Title';
import { Questionnaire } from '@/api/questionnaire/model/questionnaire';

interface GridViewProps {
  questionnaires: Questionnaire[];
  onView: (questionnaire: Questionnaire) => void;
  onDownload: (questionnaire: Questionnaire) => void;
  onEdit: (questionnaire: Questionnaire) => void;
  onDelete: (id: string) => void;
  convertDate: (date: any) => string;
}

const GridView: React.FC<GridViewProps> = ({
  questionnaires,
  onView,
  onDownload,
  onEdit,
  onDelete,
  convertDate,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 mr-4 ">
      {questionnaires?.map((questionnaire: Questionnaire) => (
        <Card
          key={questionnaire.id}
          className=" bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden "
        >
          <CardBody className="p-6 flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-2">
                  <TitleIcon className="w-6 h-6 mr-2 text-black-500 flex-shrink-0" />
                  <span className="text-sm font-semibold">Form Title</span>
                </div>
                <p className="text-sm font-sm ml-8" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{questionnaire.title}</p>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Image src="/images/calendar_today.png" alt="Upload" width={24} height={24} className=' mr-2 text-black-500 flex-shrink-0' />
                  <span className="text-sm font-semibold ">Last Updated</span>
                </div>
                <p className="text-sm font-sm ml-8">{convertDate(questionnaire.modified)}</p>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Image src="/images/fact_check.png" alt="Upload" width={24} height={24} className=' mr-2 text-black-500 flex-shrink-0' />
                  <span className="text-sm font-semibold ">Status</span>
                </div>
                <div className="flex items-center ml-8">
                  <div className={`h-2.5 w-2.5 rounded-full ${questionnaire.status === 'active' ? 'bg-green-500' : 'bg-gray-500'} mr-2`} />
                  <span className="text-sm font-sm capitalize">{questionnaire.status}</span>
                </div>
              </div>

            </div>

          </CardBody>
          <CardFooter className="justify-center px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex justify-center w-full gap-2">
              <NButton isIconOnly variant="bordered" color='primary' onPress={() => onView(questionnaire)} >
                <Image src="/images/remove_red_eye.png" alt="Upload" width={24} height={24} />
              </NButton>
              <NButton isIconOnly variant="bordered" color='primary' onPress={() => onDownload(questionnaire)}>
                <Image src="/images/file_download.png" alt="Upload" width={24} height={24} />
              </NButton>
              <NButton isIconOnly variant="bordered" color='primary' onPress={() => onEdit(questionnaire)}>
                <Image src="/images/edit_note.png" alt="Upload" width={24} height={24} />
              </NButton>
              <NButton isIconOnly variant="bordered" color='primary' onPress={() => onDelete(questionnaire.id!)} >
                <Image src="/images/delete_outline.png" alt="Upload" width={24} height={24} />
              </NButton>


            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default GridView;