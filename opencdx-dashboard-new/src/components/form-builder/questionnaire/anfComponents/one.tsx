import React from 'react';

import { QuestionnaireItem } from '@/generated-api-ts/questionnaire/api';
import { Input } from '@nextui-org/input';
import { Card, Radio, RadioGroup } from '@nextui-org/react';

const OneWrapper = ({ item }: { item: QuestionnaireItem }) => {
  return (
    <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
        <Input type="text" label="ID" className="mb-4" />

       
      
    </Card>
  );
};

export { OneWrapper };
