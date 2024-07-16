import React from 'react';
import { QuestionnaireItem } from '@/generated-api-ts/questionnaire/api';
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
  item: QuestionnaireItem;
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
      <div className="flex items-center gap-4 text-align-center justify-center">
        <div className="w-1/2 flex items-center gap-4">
          <label className="text-sm font-semibold">Operator</label>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <Select
                className="max-w-xs mb-4 mt-2 mr-4 ml-4"
                label="Select an operator"
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
            render={({ field }) =>
              item.type === 'boolean' || item.type === 'choice' ? (
                <Select
                  className="max-w-xs mb-4 mt-2 mr-4 ml-4"
                  label="Select a Value"
                  {...field}
                  defaultSelectedKeys={[field.value]}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  {getOptions(item.type).map((type, i) => (
                    <SelectItem key={i}>{type}</SelectItem>
                  ))}
                </Select>
              ) : (
                <Input
                  className="max-w-xs mb-4 mt-2 mr-4 ml-4"
                  label="Enter an answer"
                  type="text"
                  {...register(
                    `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.operatorValue`,
                  )}
                />
              )
            }
          />
        </div>
      </div>
  );
};

export { OperatorWrapper };
