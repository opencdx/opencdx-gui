import React from 'react';

import { Input } from '@nextui-org/input';
import { Card, Radio, RadioGroup } from '@nextui-org/react';
import { Controller, useFormContext } from 'react-hook-form';

const TimeWrapper = ({
  anfStatementConnectorId,
  questionnaireItemId,
}: {
  anfStatementConnectorId: number;
  questionnaireItemId: number;
  currentComponentType: string;
}) => {
  const { control } = useFormContext();

  return (
    <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
      <div className=" flex items-center gap-4 w-full">
        <label className="text w-[250px]">Lower Bound</label>
        <Controller
          control={control}
          name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.lowerBound`}
          render={({ field }) => (
            <Input
              type="text"
              label="Lower Bound"
              value={field.value}
              onChange={field.onChange}
              className="mb-4"
            />
          )}
        />
      </div>
      <div className=" flex items-center gap-4">
        <label className="text w-[200px]">Include Lower Bound</label>
        <Controller
          control={control}
          name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.includeLowerBound`}
          render={({ field }) => (
            <RadioGroup 
            value={field.value}
            onChange={field.onChange}
            orientation="horizontal" className="mb-4">
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
            <Radio value="not">Not Specified</Radio>
          </RadioGroup>
          )}
        />
        
      </div>

      <div className=" flex items-center gap-4">
        <label className="text w-[250px]">Upper Bound</label>
        <Controller
          control={control}
          name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.upperBound`}
          render={({ field }) => (
            <Input
              type="text"
              label="Upper Bound"
              value={field.value}
              onChange={field.onChange}
              className="mb-4"
            />
          )}
        />
      </div>
      <div className=" flex items-center gap-4">
        <label className="text w-[200px]">Include Upper Bound</label>
        <Controller
          control={control}
          name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.includeUpperBound`}
          render={({ field }) => (
            <RadioGroup 
            value={field.value}
            onChange={field.onChange}
            orientation="horizontal" className="mb-4">
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
            <Radio value="not">Not Specified</Radio>
          </RadioGroup>
          )}
        />
      </div>

      <div className=" flex items-center gap-4">
        <label className="text w-[250px]">Sematic</label>
        <Controller
          control={control}
          name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.semantic`}
          render={({ field }) => (
            <Input
              type="text"
              label="Sematic"
              value={field.value}
              onChange={field.onChange}
              className="mb-4"
            />
          )}
        />
      </div>
      <div className=" flex items-center gap-4">
        <label className="text w-[250px]">Resolution</label>
        <Controller
          control={control}
          name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.resolution`}
          render={({ field }) => (
            <Input
              type="text"
              label="Resolution"
              value={field.value}
              onChange={field.onChange}
              className="mb-4"
            />
          )}
        />
      </div>
    </Card>
  );
};

export { TimeWrapper };
