import React, { useEffect } from 'react';

import { systemVariables } from '@/lib/constant';
import { Input } from '@nextui-org/input';
import { Card, Radio, RadioGroup } from '@nextui-org/react';
import { Controller, useFormContext } from 'react-hook-form';

const TimeWrapper = ({
  anfStatementConnectorId,
  questionnaireItemId,
  currentComponentType,
}: {
  anfStatementConnectorId: number;
  questionnaireItemId: number;
  currentComponentType: string;
}) => {
  const { control, setValue, getValues } = useFormContext();

  useEffect(() => {
    const lowerBoundPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.lowerBound`;
    const upperBoundPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.upperBound`;
    const semanticPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.semantic`;
    const resolutionPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.resolution`;
    const includeUpperBoundPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.includeUpperBound`;
    const includeLowerBoundPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.includeLowerBound`;

    
    // Update form value only when currentComponentType changes and is relevant
    if (
      currentComponentType === 'ANF_STATEMENT_TYPE_MAIN' ||
      currentComponentType === 'ANF_STATEMENT_TYPE_ASSOCIATED'
    ) {
      setValue(lowerBoundPath, systemVariables?.time.lowerBound);
      setValue(upperBoundPath, systemVariables?.time.upperBound);
      setValue(semanticPath, systemVariables?.time.semantic);
      setValue(resolutionPath, systemVariables?.time.resolution);
      setValue(includeUpperBoundPath, systemVariables?.time.includeUpperBound===true?'true':'false');
      setValue(includeLowerBoundPath, systemVariables?.time.includeLowerBound===true?'true':'false');
    }  else {
      setValue(lowerBoundPath, getValues(lowerBoundPath));
      setValue(upperBoundPath, getValues(upperBoundPath));
      setValue(semanticPath, getValues(semanticPath));
      setValue(resolutionPath, getValues(resolutionPath));
      setValue(includeUpperBoundPath, getValues(includeUpperBoundPath));
      setValue(includeLowerBoundPath, getValues(includeLowerBoundPath));
    }
  }, [
    currentComponentType,
    questionnaireItemId,
    anfStatementConnectorId,
    setValue,
    getValues,
  ]);

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
