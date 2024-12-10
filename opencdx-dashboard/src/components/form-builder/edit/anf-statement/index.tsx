import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { QuestionnaireItem, AnfStatementConnector, AnfStatementType, AnfOperatorType } from '@/api/questionnaire/model';
import { Button, Divider, Accordion, AccordionItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, DeleteIcon, AddIcon, Input } from 'ui-library';
import { ANFStatementWrapper } from './anf-statement';
import ControlledAccordion from '@/components/custom/controlled-accordian';
import { ComponentTypeWrapper } from './component-type';
import { OperatorTypeWrapper } from './operator-type';
import { AnswerWrapper } from './answer';
import { useFormContext } from 'react-hook-form';
import Question from './question';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslations } from 'next-intl';
import CustomModal from '@/components/custom/CustomModal';
import { useModal } from '@/hooks/useModal';
const QuestionnaireItemWrapper: React.FC<{
  item: QuestionnaireItem;
  questionnaireItemId: number;
  onDelete?: () => void;
}> = ({ item, questionnaireItemId, onDelete }) => {
  const [anfStatementConnectorLength, setAnfStatementConnectorLength] = useState(item?.anfStatementConnector?.length ?? 0);
  const [currentComponentType, setCurrentComponentType] = useState<AnfStatementType>(AnfStatementType.AnfStatementTypeUnspecified);
  const { getValues, setValue } = useFormContext();
  const [anfStatementName, setAnfStatementName] = useState('');
  const [deleteQuestionnaireItemId, setDeleteQuestionnaireItemId] = useState(0);
  const [deleteQuestionnaireANFTitle, setDeleteQuestionnaireANFTitle] = useState('');

  const defaultAnfStatement = useMemo(() => ({}), []);
  const t = useTranslations('common');

  const deleteModal = useModal();
  const deleteItemModal = useModal();
  const addModal = useModal();

  const handleComponentTypeChange = useCallback((value: AnfStatementType) => {
    setCurrentComponentType(value);
  }, []);
  useEffect(() => {
    const currentItems = getValues(`item[${questionnaireItemId}].anfStatementConnector`) || [];
    if (currentItems.length > 0 && currentItems[0]) {
      setCurrentComponentType(currentItems[0].anfStatementType);
    }
  }, [getValues, questionnaireItemId]);
  React.useEffect(() => {
    if (item && (!item.anfStatementConnector || item.anfStatementConnector.length === 0)) {
      const newConnector: AnfStatementConnector = {
        anfStatementType:
          AnfStatementType.AnfStatementTypeUnspecified,
        anfOperatorType:
          AnfOperatorType.AnfOperatorTypeUnspecified,
        anfStatement: defaultAnfStatement,
        name: '',
      };
      setAnfStatementConnectorLength(1);
    }

  }, []);


  const handleAddANFName =  (e: any) => {
    setAnfStatementName(e.target.value);
  };

  const handleAdd = useCallback(() => {

    addModal.openModal();
  }, []);

  const handleContinue = useCallback(() => {
    addModal.closeModal();
    const newConnector: AnfStatementConnector = {
      anfStatementType: AnfStatementType.AnfStatementTypeUnspecified,
      anfOperatorType: AnfOperatorType.AnfOperatorTypeUnspecified,
      anfStatement: defaultAnfStatement,
      name: anfStatementName,
    };

    // Get the current items for the specific questionnaireItem
    const currentItems = getValues(`item[${questionnaireItemId}].anfStatementConnector`) || [];
    // Update the form values with the new connector
    setValue(`item[${questionnaireItemId}].anfStatementConnector`, [...currentItems, newConnector]);

      setAnfStatementConnectorLength(prev => prev + 1);  }, [anfStatementName, anfStatementConnectorLength, questionnaireItemId, setValue]);

  const handleDeleteANFButtonClick = useCallback((questionnaireItemId: number) => {
    deleteModal.openModal();
    setDeleteQuestionnaireItemId(questionnaireItemId);
    setDeleteQuestionnaireANFTitle(item?.anfStatementConnector?.[questionnaireItemId]?.name ?? '');

  }, []);

  const handleDeleteButtonClick = useCallback(() => {
    deleteItemModal.openModal();
    setDeleteQuestionnaireItemId(questionnaireItemId);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    const currentItems = getValues(`item[${questionnaireItemId}].anfStatementConnector`) || [];
    const updatedItems = currentItems.filter((_: any, index: number) => index !== deleteQuestionnaireItemId);
    setValue(`item[${questionnaireItemId}].anfStatementConnector`, updatedItems);
    deleteModal.closeModal();
  }, [getValues, setValue, deleteQuestionnaireItemId]);

  const deleteQuestion = useCallback(() => {

    const currentItems = getValues(`item`) || [];
    const updatedItems = currentItems.filter((_: any, index: number) => index !== deleteQuestionnaireItemId);
    setValue(`item`, updatedItems);
    deleteItemModal.closeModal();
    
    
    if (onDelete) {
      onDelete();

    }
  }, [getValues, setValue, deleteQuestionnaireItemId, onDelete]);

  return (
    <div>
      {/* Question display */}
      <ToastContainer 
          position={"top-right"}
          icon={false}
          autoClose={2000}
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme={"colored"}
          closeButton={false} 
          className="toast-custom" 
      />

      <Accordion >
        <AccordionItem
          className=' bg-white px-6 mb-4'
          title={<><strong>Question {questionnaireItemId + 1}: </strong>{item?.text ?? ''}</>}
        >
          <Question
            item={item}
            questionnaireItemId={questionnaireItemId}
          />
          <div className='flex justify-end'>
            <Button
              className='rounded-lg m-8'
              color='danger'
              size='sm'
              variant='flat'
              endContent={<DeleteIcon />}
              onClick={() => handleDeleteButtonClick()}
            >
              Delete Question
            </Button>
          </div>
        </AccordionItem>
      </Accordion>

      <CustomModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.closeModal}
        title="Delete this question?"
        body={<p>Delete <strong>{deleteQuestionnaireANFTitle}</strong>? This cannot be undone.</p>}
        onConfirm={handleConfirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
        toastMessage="ANF Statement successfully deleted!"
      />

      <CustomModal
        isOpen={deleteItemModal.isOpen}
        onClose={deleteItemModal.closeModal}
        title="Delete this question?"
        body={<p>Delete <strong>{item?.text ?? ''}</strong>? This will also delete the associated ANF Statement. This cannot be undone.</p>}
        onConfirm={deleteQuestion}
        confirmText="Delete"
        cancelText="Cancel"
        toastMessage="Question successfully deleted!"
      />

      {/* ANF Definition buttons */}
      <div className=' bg-white  h-20 flex flex-row p-8 gap-3 items-center ml-2 mr-2'>
        <div className='font-medium text-lg flex-shrink-0 mr-auto'>ANF Definition</div>

        {currentComponentType !== AnfStatementType.AnfStatementUserQuestion && (
          <Button
            className="rounded-lg"
            color="primary" 
            endContent={<AddIcon />}
            variant='flat'
            onClick={handleAdd}
          >
            Add ANF Statement
          </Button>
        )}
      </div>

      {/* ANF Statements */}

      {item?.anfStatementConnector?.map((connector: AnfStatementConnector, id: number) => (

        <div key={id} className='mx-2 bg-white border border-grey-700 border-r-0 border-l-0 '>
          <ControlledAccordion title={connector?.name ?? 'ANF Statement ' + (id + 1)} isTitleBold={false} className='p-8'>
            <Divider className=" border-neutral-700 mb-4" />
          <ComponentTypeWrapper
                anfStatementConnectorId={id}
                currentComponentType={currentComponentType}
                questionnaireItemId={questionnaireItemId}
                onValueChange={handleComponentTypeChange}
              />
              <Divider className="my-4 border-neutral-700" />
              <OperatorTypeWrapper
                anfStatementConnectorId={id}
                questionnaireItemId={questionnaireItemId}
                currentComponentType={currentComponentType}
              />
              <Divider className="my-4 border-neutral-700" />
              <AnswerWrapper
                anfStatementConnectorId={id}
                questionnaireItemId={questionnaireItemId}
                currentComponentType={currentComponentType}
              />
              {currentComponentType !== 'ANF_STATEMENT_USER_QUESTION' && (
                <>
                  <Divider className="my-4 border-neutral-700" />
                  <ANFStatementWrapper
                    anfStatement={connector?.anfStatement ?? defaultAnfStatement}
                    anfStatementConnectorId={id}
                    questionnaireItemId={questionnaireItemId}
                  />
                </>
              )}
              <div className='flex justify-end'>
                <Button
                  className='rounded-lg m-8'
                  color='danger'
                  variant='flat'
                  size='sm'
                  endContent={<DeleteIcon />}
                  onClick={() => handleDeleteANFButtonClick(id)}
                >
                  Delete ANF
                </Button>
              </div>
              {item.anfStatementConnector && id < item.anfStatementConnector.length - 1 && (
                <Divider className="my-4 border-neutral-700" />
              )}
          </ControlledAccordion>
         
         
        </div>
      ))}
      <CustomModal
        isOpen={addModal.isOpen}
        onClose={addModal.closeModal}
        title="Add ANF Statement"
        body={
          <>
            <p>Please name your ANF Statement</p>
            <Input
              type="text"
              variant="bordered"
              size="lg"
              label="ANF Statement Name*"
              onChange={handleAddANFName}
            />
          </>
        }
        onConfirm={handleContinue}
        confirmText="Done"
        cancelText="Cancel"
        toastMessage={t('anf_statement_added')}
      />
    </div>
  );
};

export { QuestionnaireItemWrapper };
