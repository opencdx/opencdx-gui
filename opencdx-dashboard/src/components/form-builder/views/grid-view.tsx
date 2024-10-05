import React, { useMemo } from 'react';
import { Card, CardBody, CardFooter, Button, Tooltip } from 'ui-library';
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
  const renderQuestionnaireCard = useMemo(() => {
    const actionButtons = [
      { text: "Preview JSON", icon: "/images/remove_red_eye.png", action: onView },
      { text: "Download JSON", icon: "/images/file_download.png", action: onDownload },
      { text: "Edit Form", icon: "/images/edit_note.png", action: onEdit },
      { text: "Delete Form", icon: "/images/delete_outline.png", action: (q: Questionnaire) => onDelete(q.id!) },
    ];

    return (questionnaire: Questionnaire) => (
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
              icon={<Image src="/images/calendar_today.png" alt="Calendar" width={24} height={24} className="mr-2 text-black-500 flex-shrink-0" />}
              title="Last Updated"
              value={convertDate(questionnaire.modified)}
            />
            <InfoItem
              icon={<Image src="/images/fact_check.png" alt="Status" width={24} height={24} className="mr-2 text-black-500 flex-shrink-0" />}
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
            {actionButtons.map(({ text, icon, action }) => (
              <ActionButton
                key={text}
                text={text}
                icon={icon}
                onClick={() => action(questionnaire)}
              />
            ))}
          </div>
        </CardFooter>
      </Card>
    );
  }, [onView, onDownload, onEdit, onDelete, convertDate]);

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
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, icon, onClick }) => (
  <Tooltip content={text} placement="top" classNames={{
    base: "rounded-md",
    content: "bg-gray-900 text-white text-sm max-w-xs break-words"
  }}>
    <Button isIconOnly variant="bordered" color="primary" onPress={onClick}>
      <Image src={icon} alt="Action" width={24} height={24} />
    </Button>
  </Tooltip>
);

export default React.memo(GridView);