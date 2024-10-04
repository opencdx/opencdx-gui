import React from 'react';
import { QuestionnaireItem } from '@/api/questionnaire/model/questionnaire-item';
import { Input } from '@nextui-org/input';
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
  const { control } = useFormContext();
  const basePath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}`;

  const getOptions = (type: string) => {
    switch (type) {
      case 'boolean':
        return ['Yes', 'No'];
      case 'choice':
        return item.answerOption?.map(option => option?.valueCoding?.display) || [];
      default:
        return [];
    }
  };

  return (
    <div className="flex items-center gap-4 text-align-center justify-center p-8">
      <FormField
        label="Operator"
        name={`${basePath}.anfOperatorType`}
        control={control}
        render={({ field }: { field: any }) => (
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
      <FormField
        label="Value"
        name={`${basePath}.operatorValue`}
        control={control}
        render={({ field }: { field: any }) =>
          item.type === 'boolean' || item.type === 'choice' ? (
            <Select
              className="max-w-xs mb-4 mt-2 mr-4 ml-4"
              label="Select a Value"
              {...field}
              defaultSelectedKeys={[field.value]}
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
              {...field}
            />
          )
        }
      />
    </div>
  );
};

const FormField = ({ label, name, control, render }: { label: string, name: string, control: any, render: any }) => (
  <div className="w-1/2 flex items-center gap-4">
    <label className="text-sm font-semibold">{label}</label>
    <Controller
      control={control}
      name={name}
      render={render}
    />
  </div>
);

export { OperatorWrapper };
