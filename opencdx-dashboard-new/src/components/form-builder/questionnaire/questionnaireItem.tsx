import React, { useState } from 'react';

import {
  QuestionnaireItem,
} from '@/api/questionnaire/model/questionnaire-item';
import { AnfStatementConnector } from '@/api/questionnaire/model/anf-statement-connector';

import { AnfStatementType } from '@/api/questionnaire/model/anf-statement-connector';
import { AnfOperatorType } from '@/api/questionnaire/model/anf-statement-connector';
// import { useUpdateFormContext } from '@/lib/useSetContext';
import { Button, Card, CardBody, Divider } from 'ui-library';
import { Plus } from 'lucide-react';

import { ANFStatementWrapper } from './anfStatement';
import { ComponentTypeWrapper } from './componentType';
import { OperatorWrapper } from './operator';

const QuestionnaireItemWrapper = ({
  item,
  questionnaireItemId,
}: {
  item: QuestionnaireItem;
  questionnaireItemId: number;
}) => {
  const defaultAnfStatement = {};
  //const updateForm = useUpdateFormContext();

  const [anfStatementConnectorLength, setAnfStatementConnectorLength] =
    React.useState(item?.anfStatementConnector?.length);

  const [currentComponentType, setCurrentComponentType] = useState('');
  const handlecurrentComponentTypeChange = (
    value: string,
    questionnaireItemId: number,
    id: number,
  ) => {
   // updateForm(value, questionnaireItemId, id); // Pass relevant values
    setCurrentComponentType(value);
  };

  React.useEffect(() => {
    if(item && (!item.anfStatementConnector || item.anfStatementConnector.length === 0)) {
      const newConnector: AnfStatementConnector = {
        anfStatementType:
          AnfStatementType.AnfStatementTypeUnspecified,
        anfOperatorType:
          AnfOperatorType.AnfOperatorTypeUnspecified,
        anfStatement: defaultAnfStatement,
      };
      if (!item.anfStatementConnector) {
        item.anfStatementConnector = [];
      }
      item.anfStatementConnector.push(newConnector);
      setAnfStatementConnectorLength(item.anfStatementConnector.length);
    }
   
  }, []);
  
  const handleAddButtonClick = () => {
    const newConnector: AnfStatementConnector = {
      anfStatementType:
        AnfStatementType.AnfStatementTypeUnspecified,
      anfOperatorType:
        AnfOperatorType.AnfOperatorTypeUnspecified,
      anfStatement: defaultAnfStatement,
    };

    if (!item.anfStatementConnector) {
      item.anfStatementConnector = [];
    }
    item.anfStatementConnector.push(newConnector);
    setAnfStatementConnectorLength(item.anfStatementConnector.length);
  };

  return (
    <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
        <CardBody>
    <>
      
          <div className="flex flex-row justify-between">
            <p>{questionnaireItemId + 1 + '. ' + item.text}</p>
            {currentComponentType !== AnfStatementType.AnfStatementUserQuestion &&
            <Button
              className="rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 flex flex-row justify-center"
              color="primary"
              startContent={<Plus />}
              variant="solid"
              onClick={handleAddButtonClick}
            >
              Add ANF Statement
            </Button>}
          </div>
       <Divider className="my-4 border-neutral-700 " />
      <>
        {item?.anfStatementConnector &&
        item.anfStatementConnector.length > 0 ? (
          item.anfStatementConnector.map(
            (connector: AnfStatementConnector, id: number) => (
              <React.Fragment key={id}>
                <ComponentTypeWrapper
                  anfStatementConnectorId={id}
                  currentComponentType={currentComponentType}
                  questionnaireItemId={questionnaireItemId}
                  onValueChange={(value) => {
                    handlecurrentComponentTypeChange(
                      value,
                      questionnaireItemId,
                      id,
                    );
                  }}
                />
                       <Divider className="my-4 border-neutral-700 " />

                <OperatorWrapper
                  anfStatementConnectorId={id}
                  item={item}
                  questionnaireItemId={questionnaireItemId}
                />
              {currentComponentType!=='ANF_STATEMENT_USER_QUESTION' && (
                <>
                                       <Divider className="my-4 border-neutral-700 " />
                                       <ANFStatementWrapper
                  anfStatement={connector.anfStatement ?? defaultAnfStatement}
                  anfStatementConnectorId={id}
                  questionnaireItemId={questionnaireItemId}
                />
</>
               )}

                {id < (item.anfStatementConnector?.length ?? 0) - 1 && (
                  <Divider className="my-4 border-neutral-700 " />
                )}
              </React.Fragment>
            ),
          )
        ) : (
          <></>
        )}
      </>
    </>
    </CardBody>
      </Card>
  );
};

export { QuestionnaireItemWrapper };
