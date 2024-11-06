import React, { useMemo } from 'react';
import { Card, CardBody, CardFooter, Button, Tooltip } from 'ui-library';
import Image from 'next/image';
import { Questionnaire } from '@/api/questionnaire/model/questionnaire';
import { TitleIcon } from 'ui-library';
import calendarToday from '../../../../public/images/calendar_today.png';
import factCheck from '../../../../public/images/fact_check.png';
import removeRedEye from '../../../../public/images/remove_red_eye.png';
import fileDownload from '../../../../public/images/file_download.png';
import editNote from '../../../../public/edit_note_view.png';
import deleteOutline from '../../../../public/images/delete_outline.png';

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
  const actionButtons = useMemo(() => [
    { text: "Preview JSON", icon: removeRedEye.src, action: onView, dataTestId: "preview-json" },
    { text: "Download JSON", icon: fileDownload.src, action: onDownload, dataTestId: "download-json" },
    { text: "Edit Form", icon: editNote.src, action: onEdit, dataTestId: "edit-form" },
    { text: "Delete Form", icon: deleteOutline.src, action: (q: Questionnaire) => onDelete(q.id!), dataTestId: "delete-form" },
  ], [onView, onDownload, onEdit, onDelete]);

  const renderQuestionnaireCard = useMemo(() => (questionnaire: Questionnaire) => (
    <Card
      key={questionnaire.id}
      className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden"
    >
      <CardBody className="p-6 flex flex-col justify-between h-full">
        <div className="space-y-6">
          <InfoItem
            icon={<TitleIcon className="w-6 h-6 mr-2 text-black-500 flex-shrink-0" />}
            title="Form Title"
            value={questionnaire.title}
            isEllipsis
          />
          <InfoItem
            icon={<Image src={calendarToday.src} alt="Calendar" width={24} height={24} className="mr-2 text-black-500 flex-shrink-0" />}
            title="Last Updated"
            value={convertDate(questionnaire.modified)}
          />
          <InfoItem
            icon={<Image src={factCheck.src} alt="Status" width={24} height={24} className="mr-2 text-black-500 flex-shrink-0" />}
            title="Status"
            value={
              <div className="flex items-center">
                <div className={`h-2.5 w-2.5 rounded-full ${questionnaire.status === 'active' ? 'bg-green-500' : 'bg-gray-500'} mr-2`} />
                <span className="capitalize">{questionnaire.status}</span>
              </div>
            }
          />
        </div>
      </CardBody>
      <CardFooter className="justify-center px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex justify-center w-full gap-2">
          {actionButtons.map(({ text, icon, action, dataTestId }) => (
            <ActionButton
              key={text}
              text={text}
              icon={icon}
              onClick={() => action(questionnaire)}
              dataTestId={dataTestId}
            />
          ))}
        </div>
      </CardFooter>
    </Card>
  ), [actionButtons, convertDate]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 mr-4">
      {questionnaires?.map(renderQuestionnaireCard)}
    </div>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
  isEllipsis?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, title, value, isEllipsis }) => (
  <div>
    <div className="flex items-center mb-2">
      {icon}
      <span className="text-sm font-semibold">{title}</span>
    </div>
    <p className={`text-sm font-sm ml-8 ${isEllipsis ? 'truncate' : ''}`}>
      {value}
    </p>
  </div>
);

interface ActionButtonProps {
  icon: string;
  onClick: () => void;
  text: string;
  dataTestId: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, icon, onClick, dataTestId }) => (
  <Tooltip content={text} placement="top" classNames={{
    base: "rounded-md",
    content: "bg-gray-900 text-white text-sm max-w-xs break-words"
  }}>
    <Button isIconOnly variant="bordered" color="primary" onPress={onClick} data-testid={dataTestId}>
      <Image src={icon} alt="Action" width={24} height={24} />
    </Button>
  </Tooltip>
);

export default React.memo(GridView);
