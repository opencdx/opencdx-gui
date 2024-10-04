import { useState, useEffect, useCallback } from 'react';
import { QuestionnaireItem } from '@/api/questionnaire/model/questionnaire-item';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd'

import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { QuestionnaireItemWrapper } from '../anf-statement'
import { Modal, Input, Button, ModalHeader, ModalBody, ModalFooter, ModalContent } from 'ui-library';

const Questions = () => {
  const [activeTab, setActiveTab] = useState<{ item: QuestionnaireItem; idx: number } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState('');
  const { setValue, getValues } = useFormContext();

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
    };

    setValue('item', [...fields, newQuestion]);
    setShowModal(false);
    setQuestion('');
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

  return (
    <div className="flex flex-row h-full w-full space-x-4">
      {/*Left Side Questionnaire Items */}
      <div className='w-3/12 p-7 bg-white rounded-lg h-full'>
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
                className="space-y-2 border-dotted border-2 border-[#99C7FB] p-3 rounded-lg h-screen overflow-auto"
              >
                {fields.map((item: QuestionnaireItem, idx: number) => (
                  <Draggable key={item.linkId || idx.toString()} draggableId={item.linkId || idx.toString()} index={idx}>
                    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={cn(
                          'flex items-center py-3 px-4 rounded-lg cursor-pointer transition-colors relative overflow-hidden',
                          activeTab?.idx === idx
                            ? 'bg-[#E6F1FE]'
                            : 'bg-white border border-[#E6F1FE]'
                        )}
                        onClick={() => setActiveTab({ item, idx })}
                      >
                        <div className={cn(
                          "w-8 h-8 flex items-center justify-center rounded-full mr-3 text-base font-medium",
                          activeTab?.idx === idx ? "bg-[#006FEE] text-white" : "bg-black text-white"
                        )}>
                          {idx + 1}
                        </div>
                        <span className={cn(
                          "flex-grow text-lg font-medium",
                          activeTab?.idx === idx ? "text-[#006FEE]" : "text-black"
                        )}>
                          {item.text && item.text.length > 20 ? `${item.text.substring(0, 20)}...` : item.text}
                        </span>
                        {activeTab?.idx === idx && (
                          <div className="absolute right-0 top-0 bottom-0 w-8 bg-[#006FEE] flex items-center justify-center">
                            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-white border-b-[6px] border-b-transparent" />
                          </div>
                        )}
                      </div>
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
                  placeholder="Question*"
                  onChange={handleAddQuestion}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="bordered" onPress={onClose} aria-label="Cancel" tabIndex={0} size="lg">
                  Cancel
                </Button>
                <Button
                  color='default'
                  aria-label="Done to Add Question"
                  tabIndex={0}
                  size="lg"
                  onPress={() => {
                    onClose();
                    handleSubmit();
                  }}
                >
                  Done
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