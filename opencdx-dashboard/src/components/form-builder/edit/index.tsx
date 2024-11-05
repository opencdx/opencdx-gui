'use client';

import React, { useEffect, useState } from 'react';

import { Modal, Input, Button, ModalHeader, ModalBody, ModalFooter, ModalContent } from 'ui-library';
import { useQuestionnaireStore } from '@/hooks/questionnaire';
import { QuestionnaireWrapper } from '@/components/form-builder/edit/edit-questionnaire-wrapper';
import { Questionnaire } from '@/api/questionnaire/model/questionnaire';
import { useForm, FormProvider } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Edit: React.FC<{ questionnaireId: string }> = ({ questionnaireId }) => {
  const { questionnaire: questionnaireData, updateQuestionnaireTitle } = useQuestionnaireStore();
  
  // Initialize form with empty object if questionnaireData is undefined
  const methods = useForm<Questionnaire>({
    defaultValues: async () => questionnaireData || { title: '', questions: [] },
  });
  const { setValue } = methods;
  
  const [formName, setFormName] = useState('');
  const [showModal, setShowModal] = useState(questionnaireId === 'new-questionnaire');

  
  useEffect(() => {
    return () => {
      // Cleanup state when component unmounts
      setFormName('');
      setShowModal(false);
    };
  }, []);
  const notify = () => toast.error("Form successfully created! Begin adding questions.");

  const handleContinue = () => {
    //notify();
    setValue('title', formName);
    updateQuestionnaireTitle(formName);
  };

  const handleFormNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormName(e.target.value);
  };

  return (
    <>
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
              <ModalHeader className="flex flex-col gap-1">Create New Form</ModalHeader>
              <ModalBody>
                <p>Please name your form</p>
                <Input
                  type="text"
                  variant="bordered"
                  size="lg"
                  label="Form Name*"
                  onChange={handleFormNameChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="bordered" onPress={onClose} aria-label="Cancel" tabIndex={0} size="lg">
                  Cancel
                </Button>
                <Button
                  color={formName.length > 0 ? 'primary' : 'default'}
                  aria-label="Continue to reset password" 
                  tabIndex={0}
                  size="lg"
                  isDisabled={formName.length === 0}
                  onPress={() => {
                    onClose();
                    handleContinue();
                  }}
                >
                  Continue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <FormProvider {...methods}>
        <QuestionnaireWrapper questionnaire={questionnaireData as Questionnaire} />
      </FormProvider>
      
     
    </>
  );
};

export default Edit;
