import React from 'react';

import { AnfStatementConnectorAnfOperatorTypeEnum , QuestionnaireItem} from '@/generated-api-ts/questionnaire/api';
import { Input } from '@nextui-org/input';
import { Card } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/select';
import { Controller, useFormContext } from 'react-hook-form';

export const values = [
  { key: 'ANF_OPERATOR_TYPE_EQUAL', label: 'Equal' },
  { key: 'ANF_OPERATOR_TYPE_NOT_EQUAL', label: 'Not Equal' },
];



const OperatorWrapper = ({
  item,
  questionnaireItemId,
  anfStatementConnectorId,
}: {
  item: QuestionnaireItem,
  anfOperatorType: AnfStatementConnectorAnfOperatorTypeEnum;
  questionnaireItemId: number;
  anfStatementConnectorId: number;
}) => {
  const { register, control } = useFormContext();
  const { name } = register(
    `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfOperatorType`,
  );
  
  const getOptions = (type: string) => {
    const choices = [];
    switch (type) {
        case 'boolean':
            return ['Yes', 'No'];
        case 'choice':
            for (let i = 0; i < (item.answerOption?.length ?? 0); i++) {
              choices.push(item.answerOption?.[i]?.valueCoding?.display);
            }
            return choices;
        default:
            return [];
    }
};
  return (
    <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center gap-4 text-align-center justify-center">
        <div className="w-1/2 flex items-center gap-4">
          <label className="text-sm font-semibold">Operator</label>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <Select
                label="Select an operator"
                className="max-w-xs mb-4 mt-2 mr-4 ml-4"
                {...field}
                defaultSelectedKeys={[field.value]}
              >
                {values.map((type) => (
                  <SelectItem key={type.key}>{type.label}</SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
        <div className="w-1/2 flex items-center gap-4">
          <label className="text-sm font-semibold">Value</label>
          <Controller
            control={control}
            {...register(
              `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.operatorValue`,
            )}
            render={({ field }) => (
              item.type === 'boolean' || item.type === 'choice' ? (
                <Select
                  label="Select a Value"
                  className="max-w-xs mb-4 mt-2 mr-4 ml-4"
                  {...field}
                  defaultSelectedKeys={[field.value]}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    console.log( e.target.value);
                  }
                  }
                >
                  {getOptions(item.type).map((type, i) => (
                    <SelectItem key={i}>{type}</SelectItem>
                  ))}
                </Select>
              ) : (
                <Input
                  type="text"
                  label="Enter an answer"
                  className="max-w-xs mb-4 mt-2 mr-4 ml-4"
                  {...register(
                    `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.operatorValue`,
                  )}
                />
              )

            )
          }
          
          />
        </div>
      </div>
    </Card>
  );
};

export { OperatorWrapper };
