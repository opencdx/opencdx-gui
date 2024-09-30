'use client';

import React, { useEffect, useState } from 'react';

import { Modal, Input, Button, ModalHeader, ModalBody, ModalFooter, ModalContent } from 'ui-library';
import { useGetQuestionnaire } from '@/hooks/iam-hooks';
import { useQuestionnaireStore } from '@/hooks/questionnaire';
import { QuestionnaireWrapper } from '@/components/form-builder/edit/edit-questionnaire-wrapper';
import { Questionnaire } from '@/api/questionnaire/model/questionnaire';
import { useForm, FormProvider } from 'react-hook-form';

const Edit: React.FC<{ questionnaireId: string }> = ({ questionnaireId }) => {
  // const { setValue } = useFormContext();

  const { control, register, handleSubmit, getValues, setValue } = useForm<Questionnaire>({
    defaultValues: async () => questionnaireData,
  });
  const { mutate: getQuestionnaire } = useGetQuestionnaire();
  const { questionnaire: questionnaireData, updateQuestionnaireTitle } = useQuestionnaireStore();
  const [formName, setFormName] = useState('');
  const [showModal, setShowModal] = useState(questionnaireId === 'new-questionnaire');

  useEffect(() => {
    getQuestionnaire({ id: questionnaireId });
  }, [questionnaireId, getQuestionnaire]);

  const handleContinue = () => {
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
                <p>Please name your form.</p>
                <Input
                  type="text"
                  variant="bordered"
                  size="lg"
                  placeholder="Form Name*"
                  onChange={handleFormNameChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="bordered" onPress={onClose} aria-label="Cancel" tabIndex={0} size="lg">
                  Cancel
                </Button>
                <Button
                  color="primary"
                  aria-label="Continue to reset password" 
                  tabIndex={0}
                  size="lg"
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
      <FormProvider
          register={register}
          setValue={setValue}
          control={control}
          getValues={getValues}
          handleSubmit={handleSubmit}
        >
      <QuestionnaireWrapper questionnaire={questionnaireData as Questionnaire} />
      </FormProvider>

    </>
  );
};

export default Edit;
