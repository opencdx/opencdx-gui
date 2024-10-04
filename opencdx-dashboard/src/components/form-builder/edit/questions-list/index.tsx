import { useState, useEffect, useCallback } from 'react';
import { QuestionnaireItem } from '@/api/questionnaire/model/questionnaire-item';

import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
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

    return (
        <div className="flex flex-row h-full  w-full space-x-4">
            {/*Left Side Questionnaire Items */}
            <div className='w-3/12 p-7 bg-white rounded-lg h-full'>
                <><h2 className="text-lg font-medium mb-2">Questions:</h2>
                    <p className="text-sm text-gray-600 mb-4">Select a question below to view its details, you can edit or add a question here.</p>

                    <Button
                        color="primary"
                        className="w-full mb-4"
                        onPress={() => setShowModal(true)}
                    >
                        Add Question
                    </Button>

                    <div className="space-y-2 border-dotted border-2 border-[#99C7FB] p-3 rounded-lg h-screen overflow-auto">
                        {fields.map((item: QuestionnaireItem, idx: number) => (
                            <div
                                key={item.linkId}
                                className={cn(
                                    'flex items-center p-3 rounded-lg border cursor-pointer transition-colors',
                                    activeTab?.idx === idx
                                        ? 'bg-[#99C7FB] border-[#99C7FB]'
                                        : 'bg-white border-gray-200 hover:bg-gray-50'
                                )}
                                onClick={() => setActiveTab({ item, idx })}
                            >
                                <div className={cn(
                                    "w-6 h-6 flex items-center justify-center rounded-full mr-3 text-sm font-medium",
                                    activeTab?.idx === idx ? "bg-[#006FEE] text-white" : "bg-black text-white"
                                )}>
                                    {idx + 1}
                                </div>
                                <span className="flex-grow">
                                    {item.text && item.text.length > 15 ? `${item.text.substring(0, 15)}...` : item.text}
                                </span>
                                {activeTab?.idx === idx && (
                                    <ChevronRight className="text-blue-500" size={20} />
                                )}
                            </div>
                        ))}
                    </div>
                </>
            </div>
            <div className=' w-9/12'>
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