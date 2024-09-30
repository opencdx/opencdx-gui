import { QuestionnaireItem } from '@/api/questionnaire/model/questionnaire-item';
import { Snippet } from "@nextui-org/react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useQuestionnaireStore } from '@/hooks/questionnaire';

const SnippetItem: React.FC<{ item: QuestionnaireItem }> = ({ item }) => (
  <div key={item.linkId} className="p-4 flex flex-col">
    <div className="py-4">{item.text}</div>
    <div className="py-4">
      <Snippet
        color="primary"
        size="lg"
        copyIcon={<ContentCopyIcon />}
        variant="flat"
        radius="sm"
      >
        {`{{REPLACE_${item.linkId}}}`}
      </Snippet>
    </div>
  </div>
);

const ModalWrapper: React.FC = () => {
  const { questionnaire: questionnaireData } = useQuestionnaireStore();
  
  return (
    <div className="divide-y divide-gray-200 border border-gray-200 h-[400px] overflow-auto">
      {questionnaireData?.item?.map((item: QuestionnaireItem) => (
        <SnippetItem key={item.linkId} item={item} />
      ))}
    </div>
  );
};

export { ModalWrapper };