import React, { useState, useCallback, useMemo } from 'react';
import { QuestionnaireItem, AnfStatementConnector, AnfStatementType, AnfOperatorType } from '@/api/questionnaire/model';
import { Button, Divider, Accordion, AccordionItem } from 'ui-library';
import { Plus, Trash } from 'lucide-react';
import { ANFStatementWrapper } from './anf-statement';
import { ComponentTypeWrapper } from './component-type';
import { OperatorWrapper } from './operator';
import { useFormContext } from 'react-hook-form';
const QuestionnaireItemWrapper: React.FC<{
  item: QuestionnaireItem;
  questionnaireItemId: number;
}> = ({ item, questionnaireItemId }) => {
  const [anfStatementConnectorLength, setAnfStatementConnectorLength] = useState(item?.anfStatementConnector?.length ?? 0);
  const [currentComponentType, setCurrentComponentType] = useState<AnfStatementType>(AnfStatementType.AnfStatementTypeUnspecified);
  const { getValues, setValue } = useFormContext();

  const defaultAnfStatement = useMemo(() => ({}), []);

  const handleComponentTypeChange = useCallback((value: AnfStatementType) => {
    setCurrentComponentType(value);
  }, []);
  React.useEffect(() => {
    if(item && (!item.anfStatementConnector || item.anfStatementConnector.length === 0)) {
      const newConnector: AnfStatementConnector = {
        anfStatementType:
          AnfStatementType.AnfStatementTypeUnspecified,
        anfOperatorType:
          AnfOperatorType.AnfOperatorTypeUnspecified,
        anfStatement: defaultAnfStatement,
      };
      setAnfStatementConnectorLength(1);
    }
   
  }, []);

  const handleAddButtonClick = useCallback(() => {
    const newConnector: AnfStatementConnector = {
      anfStatementType: AnfStatementType.AnfStatementTypeUnspecified,
      anfOperatorType: AnfOperatorType.AnfOperatorTypeUnspecified,
      anfStatement: defaultAnfStatement,
    };
    
    // Get the current items for the specific questionnaireItem
    const currentItems = getValues(`item[${questionnaireItemId}].anfStatementConnector`) || [];

    // Update the form values with the new connector
    setValue(`item[${questionnaireItemId}].anfStatementConnector`, [...currentItems, newConnector]);

    setAnfStatementConnectorLength(prev => prev + 1);
  }, [questionnaireItemId, defaultAnfStatement, getValues, setValue]);

  const handleDeleteButtonClick = useCallback((anfStatementConnectorIndex: number) => {
    const currentItems = getValues(`item[${questionnaireItemId}].anfStatementConnector`) || [];
    if (currentItems.length > 0) {
      const updatedItems = currentItems.filter((_: any, index: number) => index !== anfStatementConnectorIndex);
      setValue(`item[${questionnaireItemId}].anfStatementConnector`, updatedItems);
      setAnfStatementConnectorLength(prev => prev - 1);
    }
  }, [getValues, setValue, questionnaireItemId]);

  const deleteQuestion = useCallback(() => {
    const currentItems = getValues(`item`) || [];
    const updatedItems = currentItems.filter((_: any, index: number) => index !== questionnaireItemId);
    setValue(`item`, updatedItems);
  }, [getValues, setValue, questionnaireItemId]);

  return (
    <div>
      {/* Question display */}
      <div className='mb-4 bg-white rounded-lg h-20 flex flex-grow items-center p-8'>
        <div><span className='font-medium text-lg'>Question: </span> {`${questionnaireItemId + 1}. ${item.text}`}</div>
        <div className='flex justify-end'>
                <Button
                  className='rounded-lg m-8'
                  color='danger'
                  variant='flat'
                  endContent={<Trash />}
                  onClick={() => deleteQuestion()}
                >
                  Delete Question
                </Button>
              </div>
      </div>

      {/* ANF Definition buttons */}
      <div className='border-b border-grey-700 bg-white rounded-lg h-20 flex flex-row p-8 gap-3 items-center'>
        <div className='font-medium text-lg flex-shrink-0 mr-auto'>ANF Definition</div>
        <Button className="rounded-lg justify-content-end" color="primary" variant='bordered'>
          Select a Rule
        </Button>
        <Button className="rounded-lg justify-content-end" color="primary" variant='bordered'>
          Select a Rule Response
        </Button>
        {currentComponentType !== AnfStatementType.AnfStatementUserQuestion && (
          <Button
            className="rounded-lg"
            color="primary"
            endContent={<Plus />}
            variant='flat'
            onClick={handleAddButtonClick}
          >
            Add ANF Statement
          </Button>
        )}
      </div>

      {/* ANF Statements */}
     
          {item?.anfStatementConnector?.map((connector: AnfStatementConnector, id: number) => (
            
            <React.Fragment key={id}>
               <Accordion  >
               <AccordionItem  
               className='shadow-none bg-white px-6' title={id+1+'.'+'ANF Statement'}>
              <ComponentTypeWrapper
                anfStatementConnectorId={id}
                currentComponentType={currentComponentType}
                questionnaireItemId={questionnaireItemId}
                onValueChange={handleComponentTypeChange}
              />
              <Divider className="my-4 border-neutral-700" />
              <OperatorWrapper
                anfStatementConnectorId={id}
                item={item}
                questionnaireItemId={questionnaireItemId}
              />
              {currentComponentType !== 'ANF_STATEMENT_USER_QUESTION' && (
                <>
                  <Divider className="my-4 border-neutral-700" />
                  <ANFStatementWrapper
                    anfStatement={connector.anfStatement ?? defaultAnfStatement}
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
                  endContent={<Trash />}
                  onClick={() => handleDeleteButtonClick(id)}
                >
                  Delete ANF
                </Button>
              </div>
              {item.anfStatementConnector && id < item.anfStatementConnector.length - 1 && (
                <Divider className="my-4 border-neutral-700" />
              )}
              </AccordionItem>
              </Accordion>
            </React.Fragment>
          ))}
       
    </div>
  );
};

export { QuestionnaireItemWrapper };