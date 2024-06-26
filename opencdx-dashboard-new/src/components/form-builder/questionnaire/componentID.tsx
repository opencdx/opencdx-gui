import React from 'react';



import { Code, QuestionnaireItem } from '@/config/interface';
import { generateUUID } from '@/lib/utils';
import { Input } from '@nextui-org/input';
import { Card } from '@nextui-org/react';

const ComponentIDWrapper = ({
  item,
}: {
  item: QuestionnaireItem;
}) => {
  return (
    <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label className="text-sm font-semibold">Component ID</label>
        </div>
        <Input type="text" value={generateUUID()} disabled />
      </div>
    </Card>
  );
};

export { ComponentIDWrapper };