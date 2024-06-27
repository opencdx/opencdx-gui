import React from 'react';



import { AnfStatementConnectorAnfOperatorTypeEnum, QuestionnaireItem } from '@/config/interface';
import { Card } from '@nextui-org/react';
import { Select, SelectItem, SelectSection } from '@nextui-org/select';

export const values = [
  { key: 'equal', label: 'Equal' },
  { key: 'not', label: 'Not Equal' },
  
];
export const answers = [
  { key: 'ans', label: 'Any Value' },
  { key: 'val', label: 'Value' },

  
];


const OperatorWrapper = ({
  item,
}: {
  item: QuestionnaireItem;
}) => {
  return (
    <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center gap-4 text-align-center justify-center">
        <div className="w-1/2">
          <label className="text-sm font-semibold">Operator</label>
          <Select 
        label="Select an operator" 
        className="max-w-xs mb-4 mt-2 mr-4 ml-4"
      >
        {values.map((animal) => (
          <SelectItem key={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
        </div>
        <div className="w-1/2">
          <label className="text-sm font-semibold">Answer</label>
          <Select 
        label="Select an answer" 
        className="max-w-xs mb-4 mt-2 mr-4 ml-4"
      >
        {answers.map((animal) => (
          <SelectItem key={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
        </div>
        

      </div>
    </Card>
  );
};

export { OperatorWrapper };