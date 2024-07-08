import React from 'react';

import { Measure } from '@/generated-api-ts/questionnaire/api';
import { Input } from '@nextui-org/input';
import { Card, Radio, RadioGroup } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';
import { systemVariables } from '@/lib/constant';


const TimeWrapper = ({ measure , anfStatementConnectorId,questionnaireItemId }: { measure: Measure, anfStatementConnectorId: number, questionnaireItemId: number }) => {
  const { register } = useFormContext();
  return (
    <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
      <div className=" flex items-center gap-4 w-full">
        <label className="text w-[250px]">Lower Bound</label>
        <Input type="text" label="Lower Bound" className="mb-4" 
        defaultValue={systemVariables?.time.lowerBound}
        {...register(
          `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.lowerBound`,
        )}
        />
      </div>
      <div className=" flex items-center gap-4">
        <label className="text w-[200px]">Include Lower Bound</label>
        <RadioGroup orientation="horizontal" className="mb-4">
          <Radio value="true">Yes</Radio>
          <Radio value="false">No</Radio>
          <Radio value="d">Not Specified</Radio>
        </RadioGroup>
      </div>

      <div className=" flex items-center gap-4">
        <label className="text w-[250px]">Upper Bound</label>
        <Input type="text" label="Upper Bound" className="mb-4" 
        {...register(
          `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.upperBound`,
        )}
        />
      </div>
      <div className=" flex items-center gap-4">
        <label className="text w-[200px]">Include Upper Bound</label>
        <RadioGroup orientation="horizontal" className="mb-4">
          <Radio value="true">Yes</Radio>
          <Radio value="false">No</Radio>
          <Radio value="">Not Specified</Radio>
        </RadioGroup>
      </div>

      <div className=" flex items-center gap-4">
        <label className="text w-[250px]">Sematic</label>
        <Input type="text" label="Sematic" className="mb-4" 
        {...register(
          `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.semantic`,
        )}  
        />
      </div>
      <div className=" flex items-center gap-4">
        <label className="text w-[250px]">Resolution</label>
        <Input type="text" label="Resolution" className="mb-4" 
        {...register(
          `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.resolution`,
        )}
        />
      </div>
    </Card>
  );
};

export { TimeWrapper };
