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
              className="mb-4"
              label="Lower Bound"
              type="number"
              value={field.value}
              onChange={field.onChange}
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
              className="mb-4"
              orientation="horizontal"
              defaultValue={
                field.value === true
                  ? 'true'
                  : field.value === false
                    ? 'false'
                    : 'not'
              }
              onChange={(event) => {
                if (
                  event.target.value === 'true' ||
                  event.target.value === 'false'
                ) {
                  field.onChange(event.target.value === 'true' ? true : false);
                }
              }}
            >
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
              className="mb-4"
              label="Upper Bound"
              type="number"
              value={field.value}
              onChange={field.onChange}
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
              className="mb-4"
              orientation="horizontal"
              defaultValue={
                field.value === true
                  ? 'true'
                  : field.value === false
                    ? 'false'
                    : 'not'
              }
              onChange={(event) => {
                if (
                  event.target.value === 'true' ||
                  event.target.value === 'false'
                ) {
                  field.onChange(event.target.value === 'true' ? true : false);
                }
              }}
            >
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
              <Radio value="not">Not Specified</Radio>
            </RadioGroup>
          )}
        />
      </div>

      <div className=" flex items-center gap-4">
        <label className="text w-[250px]">Semantic</label>
        <Controller
          control={control}
          name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.semantic.expression`}
          render={({ field }) => (
            <Input
              className="mb-4"
              label="Sematic"
              type="text"
              value={field.value}
              onChange={field.onChange}
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
              className="mb-4"
              label="Resolution"
              type="number"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </Card>
  );
};

export { TimeWrapper };
