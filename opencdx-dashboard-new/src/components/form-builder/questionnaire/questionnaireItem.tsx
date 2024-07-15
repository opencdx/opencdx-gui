import React, { useState } from 'react';

import { Button, Divider } from '@nextui-org/react';
import { Plus } from 'lucide-react';

import { ANFStatementWrapper } from './anfStatement';
import { ComponentTypeWrapper } from './componentType';
import { OperatorWrapper } from './operator';

import {
  AnfStatementConnector,
  AnfStatementConnectorAnfOperatorTypeEnum,
  AnfStatementConnectorAnfStatementTypeEnum,
  QuestionnaireItem,
} from '@/generated-api-ts/questionnaire/api';

import { useUpdateFormContext } from '@/lib/useSetContext';


const QuestionnaireItemWrapper = ({
  item,
  questionnaireItemId,
}: {
  item: QuestionnaireItem;
  questionnaireItemId: number;
}) => {
  const defaultAnfStatement = {};
  const updateForm = useUpdateFormContext();

  const [anfStatementConnectorLength, setAnfStatementConnectorLength] =
    React.useState(item?.anfStatementConnector?.length);

  const [currentComponentType, setCurrentComponentType] = useState('');
  const handlecurrentComponentTypeChange = (
    value: string,
    questionnaireItemId: number,
    id: number,
  ) => {
    updateForm(value, questionnaireItemId, id); // Pass relevant values
    setCurrentComponentType(value);
  };

  React.useEffect(() => {
    const newConnector: AnfStatementConnector = {
      anfStatementType:
        AnfStatementConnectorAnfStatementTypeEnum.AnfStatementTypeUnspecified,
      anfOperatorType:
        AnfStatementConnectorAnfOperatorTypeEnum.AnfOperatorTypeUnspecified,
      anfStatement: defaultAnfStatement,
    };

    if (!item.anfStatementConnector) {
      item.anfStatementConnector = [];
    }
    item.anfStatementConnector.push(newConnector);
    setAnfStatementConnectorLength(item.anfStatementConnector.length);
  }, []);

  const handleAddButtonClick = () => {
    const newConnector: AnfStatementConnector = {
      anfStatementType:
        AnfStatementConnectorAnfStatementTypeEnum.AnfStatementTypeUnspecified,
      anfOperatorType:
        AnfStatementConnectorAnfOperatorTypeEnum.AnfOperatorTypeUnspecified,
      anfStatement: defaultAnfStatement,
    };

    if (!item.anfStatementConnector) {
      item.anfStatementConnector = [];
    }
    item.anfStatementConnector.push(newConnector);
    setAnfStatementConnectorLength(item.anfStatementConnector.length);
  };

  return (
    <>
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
                <OperatorWrapper
                  anfStatementConnectorId={id}
                  item={item}
                  questionnaireItemId={questionnaireItemId}
                />
                <ANFStatementWrapper
                  anfStatement={connector.anfStatement ?? defaultAnfStatement}
                  anfStatementConnectorId={id}
                  questionnaireItemId={questionnaireItemId}
                />

                {id < (item.anfStatementConnector?.length ?? 0) - 1 && (
                  <Divider className="my-4 border-neutral-700 " />
                )}
              </React.Fragment>
            ),
          )
        ) : (
          <></>
        )}
        <Divider className="my-4 border-neutral-700 " />
        <div className="flex flex-row justify-end">
          <Button
            className="mb-4 p-4  rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 flex flex-row justify-center"
            color="primary"
            startContent={<Plus />}
            variant="solid"
            onClick={handleAddButtonClick}
          >
            Add ANF Statement
          </Button>
        </div>
      </>
    </>
  );
};

export { QuestionnaireItemWrapper };
