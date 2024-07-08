import React from 'react';

import {
  AnfStatementConnector,
  AnfStatementConnectorAnfOperatorTypeEnum,
  AnfStatementConnectorAnfStatementTypeEnum,
  QuestionnaireItem,
} from '@/generated-api-ts/questionnaire/api';
import { Button, Divider } from '@nextui-org/react';
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
  const [anfStatementConnectorLength, setAnfStatementConnectorLength] =
    React.useState(item.anfStatementConnector.length);

  const handleAddButtonClick = () => {
    const newConnector: AnfStatementConnector = {
      anfStatementType:
        AnfStatementConnectorAnfStatementTypeEnum.AnfStatementTypeUnspecified,
      anfOperatorType:
        AnfStatementConnectorAnfOperatorTypeEnum.AnfOperatorTypeUnspecified,
      anfStatement: defaultAnfStatement,
    };

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
                  questionnaireItemId={questionnaireItemId}
                  anfStatementConnectorId={id}
                  anfStatementType={
                    connector.anfStatementType ||
                    AnfStatementConnectorAnfStatementTypeEnum.AnfStatementTypeUnspecified
                  }
                />
                <OperatorWrapper
                  questionnaireItemId={questionnaireItemId}
                  anfStatementConnectorId={id}
                  anfOperatorType={
                    connector.anfOperatorType ??
                    AnfStatementConnectorAnfOperatorTypeEnum.AnfOperatorTypeUnspecified
                  }
                />
                <ANFStatementWrapper
                  questionnaireItemId={questionnaireItemId}
                  anfStatementConnectorId={id}
                  anfStatement={connector.anfStatement ?? defaultAnfStatement}
                />

                {id < item.anfStatementConnector.length - 1 && (
                  <Divider className="my-4 border-neutral-700 " />
                )}
              </React.Fragment>
            ),
          )
        ) : (
          <>
             <ComponentTypeWrapper
              questionnaireItemId={questionnaireItemId}
              anfStatementConnectorId={0}
              anfStatementType={
                AnfStatementConnectorAnfStatementTypeEnum.AnfStatementTypeUnspecified
              }
            />
            <OperatorWrapper
              questionnaireItemId={questionnaireItemId}
              anfStatementConnectorId={0}
              anfOperatorType={
                AnfStatementConnectorAnfOperatorTypeEnum.AnfOperatorTypeUnspecified
              }
            />

            <ANFStatementWrapper
              questionnaireItemId={questionnaireItemId}
              anfStatementConnectorId={0}
              anfStatement={defaultAnfStatement}
            /> 
          </>
        )}
        <Divider className="my-4 border-neutral-700 " />
        <div className="flex flex-row justify-end">
          <Button
            variant="solid"
            className="mb-4 p-4  rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 flex flex-row justify-center"
            onClick={handleAddButtonClick}
            color="primary"
            startContent={<Plus />}
          >
            Add ANF Statement
          </Button>
        </div>
      </>
    </>
  );
};

export { QuestionnaireItemWrapper };
