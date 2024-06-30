import React from 'react';

import { QuestionnaireItem } from '@/generated-api-ts/questionnaire/api';
import { Input } from '@nextui-org/input';
import { Card, Radio, RadioGroup } from '@nextui-org/react';

const TimeWrapper = ({ item }: { item: QuestionnaireItem }) => {
  return (
    <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
        <Input type="text" label="Lower Bound" className="mb-4" />

        <RadioGroup
          orientation="horizontal"
          label="Include Lower Bound"
          className="mb-4"
        >
          <Radio value="true">Yes</Radio>
          <Radio value="false">No</Radio>
          <Radio value="d">Not Specified</Radio>
        </RadioGroup>
     
        <Input type="text" label="Upperr Bound" className="mb-4" />
        <RadioGroup
          orientation="horizontal"
          label="Include Upper Bound"
          className="mb-4"
        >
          <Radio value="true">Yes</Radio>
          <Radio value="false">No</Radio>
          <Radio value="d">Not Specified</Radio>
        </RadioGroup>
     
        <Input type="text" label="Sematic" className="mb-4" />
        <Input type="text" label="Resolution" className="mb-4" />
      
    </Card>
  );
};

export { TimeWrapper };
