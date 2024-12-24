import { useState, useEffect, useCallback } from 'react';
import { QuestionnaireItem } from '@/api/questionnaire/model/questionnaire-item';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd'
import {Tooltip} from "@nextui-org/tooltip";
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { QuestionnaireItemWrapper } from '../anf-statement'
import { Modal, Input, Button, ModalHeader, ModalBody, ModalFooter, ModalContent } from 'ui-library';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Questions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<{ item: QuestionnaireItem; idx: number } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState('');
  const { setValue, getValues } = useFormContext();
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const fields = getValues('item') || [];

  useEffect(() => {
    if (fields.length > 0) {
      setActiveTab({ item: fields[0], idx: 0 });
    } else {
      setActiveTab(null);
    }
  }, [fields]);

  const handleAddQuestion = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    const newQuestion: QuestionnaireItem = {
      text: question,
      linkId: crypto.randomUUID(),
    };
    setValue('item', [...fields, newQuestion]);
    setShowModal(false);
    setQuestion('');
    toast.success('Question added!');
  }, [question, fields, setValue]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setValue('item', items);
    if (activeTab) {
      const destinationItem = items[result.destination.index];
      if (destinationItem) {
        setActiveTab({
          item: destinationItem as QuestionnaireItem,
          idx: result.destination.index
        });
      }
    }
  };
  // Helper function to render the draggable item
  const renderDraggableItem = (provided: DraggableProvided, item: QuestionnaireItem, idx: number) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={cn(
        'flex items-center py-3 px-3 rounded-lg cursor-pointer transition-colors relative overflow-hidden',
        'hover:border-[#006FEE] hover:border-2 hover:cursor-pointer',
        activeTab?.idx === idx
          ? 'bg-[#99C7FB]'
          : 'bg-white border border-[#E6F1FE]'
      )}
      onClick={() => setActiveTab({ item, idx })}
    >
      <div className={cn(
        "w-7 h-6 flex items-center justify-center rounded-full mr-3 text-base font-sm",
        activeTab?.idx === idx ? "bg-[#006FEE] text-white" : "bg-black text-white",
        "group-hover:bg-[#006FEE] group-hover:text-white"
      )}>
        {idx + 1}
      </div>
      <span className={cn(
        "w-full flex flex-row justify-between text-sm font-small",
        activeTab?.idx === idx ? "text-[#004499]" : "text-black",
        "group-hover:text-[#006FEE]"
      )}>
        {item.text && item.text.length > 40 ? `${item.text.substring(0, 40)}...` : item.text}
      </span>
      {activeTab?.idx === idx && (
        <>
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-[#006FEE] flex items-center justify-center">
            <div className="absolute w-4 border-t-[6px] border-t-transparent border-l-[8px] border-l-[#99C7FB] border-b-[6px] border-b-transparent" />
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="flex flex-row h-full w-full space-x-4">
      {/*Left Side Questionnaire Items */}
      <div className='w-3/12 p-4 bg-white rounded-lg h-full'>
        <h2 className="text-lg font-medium mb-2">Questions:</h2>
        <p className="text-sm text-gray-600 mb-4">Select a question below to view its details, you can edit or add a question here.</p>

        <Button
          color="primary"
          className="w-full mb-4"
          onPress={() => setShowModal(true)}
        >
          Add Question
        </Button>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questions">
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2 border-dotted border-2 border-[#99C7FB] p-2 rounded-lg h-screen overflow-auto"
              >
                {fields.map((item: QuestionnaireItem, idx: number) => (
                  <Draggable key={item.linkId || idx.toString()} draggableId={item.linkId || idx.toString()} index={idx}>
                    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                      item.text && item.text.length > 40 ? (
                        <Tooltip 
                          content={`${idx + 1}. ${item.text}`} 
                          placement="top"
                          classNames={{
                            base: "rounded-md",
                            content: "bg-gray-900 text-white text-sm max-w-xs break-words"
                          }}
                        >
                          {renderDraggableItem(provided, item, idx)}
                        </Tooltip>
                      ) : (
                        renderDraggableItem(provided, item, idx)
                      )
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className='w-9/12'>
        {activeTab && (
          <QuestionnaireItemWrapper
            key={`${activeTab.item.linkId}-${activeTab.idx}`}
            item={activeTab.item}
            questionnaireItemId={activeTab.idx}
            onDelete={() => setUpdateTrigger(prev => prev + 1)}
            />
         
        )}
      </div>
      <Modal
        isOpen={showModal}
        placement="center"
        onOpenChange={setShowModal}
        hideCloseButton
        radius="none"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Question</ModalHeader>
              <ModalBody>
                <p>Please add your question.</p>
                <Input
                  type="text"
                  variant="bordered"
                  size="lg"
                  label="Question"
                  onChange={handleAddQuestion}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="bordered" onPress={onClose} aria-label="Cancel" tabIndex={0} size="lg">
                  Cancel
                </Button>
                <Button
                  tabIndex={0}
                  color={question.length > 0 ? 'primary' : 'default'}
                  aria-label="Continue to add Question"
                  size="lg"
                  isDisabled={question.length === 0}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  Add Question
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
    </div>
  );
};


export default Questions;