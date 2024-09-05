import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Select,
  SelectItem,
} from 'ui-library';
import { Controller, useFormContext } from 'react-hook-form';

import { ControlledInput } from './Custom/ControlledInput';
import { ControlledRadio } from './Custom/ControlledRadio';

export const values = [
  { key: 'performance', label: 'Performance Circumstance' },
  { key: 'request', label: 'Request Circumstance' },
  { key: 'narrative', label: 'Narrative Circumstance' },
];

const PerformanceCircumstanceWrapper = ({
  anfStatementConnectorId,
  questionnaireItemId,
}: {
  anfStatementConnectorId: number;
  questionnaireItemId: number;
}) => {
  const { register, control } = useFormContext();

  return (
    <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
      <div className=" flex items-center gap-4 w-full">
        <label className="text w-[250px]">Circumstance Type</label>
        <Controller
          control={control}
          {...register(
            `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.type`,
          )}
          render={({ field }) => (
            <Select
              className="mb-4 mt-2 "
              label="Circumstance Type"
              {...field}
              defaultSelectedKeys={['performance']}
            >
              {values.map((type) => (
                <SelectItem key={type.key}>{type.label}</SelectItem>
              ))}
            </Select>
          )}
        />
      </div>

      <ControlledInput
        label="Status"
        name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.status.expression`}
      />
      <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
        <CardHeader className="flex gap-3">
          <h4 className="text-lg font-semibold">Result</h4>
        </CardHeader>
        <Divider />

        <CardBody>
          <ControlledInput
            label="Lower Bound"
            type="text"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.result.lowerBoundConfig`}
          />
          <ControlledRadio
            label="Include Lower Bound"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.result.includeLowerBound`}
          />

          <ControlledInput
            label="Upper Bound"
            type="text"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.result.upperBoundConfig`}
          />
          <ControlledRadio
            label="Include Upper Bound"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.result.includeUpperBound`}
          />
          <ControlledInput
            label="Sematic"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.result.semantic.expression`}
          />
          <ControlledInput
            label="Resolution"
            type='number'
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.result.resolution`}
          />
        </CardBody>
      </Card>

      <ControlledInput
        label="Health Risk"
        name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.healthRisk.expression`}
      />

      <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
        <CardHeader className="flex gap-3">
          <h4 className="text-lg font-semibold">Normal Range</h4>
        </CardHeader>
        <Divider />

        <CardBody>
          <ControlledInput
            label="Lower Bound"
            type="text"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.normalRange.lowerBoundConfig`}
          />
          <ControlledRadio
            label="Include Lower Bound"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.normalRange.includeLowerBound`}
          />
          <ControlledInput
            label="Upper Bound"
            type="text"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.normalRange.upperBoundConfig`}
          />
          <ControlledRadio
            label="Include Upper Bound"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.normalRange.includeUpperBound`}
          />
          <ControlledInput
            label="Sematic"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.normalRange.semantic.expression`}
          />
          <ControlledInput
            label="Resolution"
            type='number'
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.normalRange.resolution`}
          />
        </CardBody>
      </Card>

      <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
        <CardHeader className="flex gap-3">
          <h4 className="text-lg font-semibold">Timing</h4>
        </CardHeader>
        <Divider />

        <CardBody>
          <ControlledInput
            label="Lower Bound"
            type="text"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.timing.lowerBoundConfig`}
          />
          <ControlledRadio
            label="Include Lower Bound"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.timing.includeLowerBound`}
          />
          <ControlledInput
            label="Upper Bound"
            type="text"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.timing.upperBoundConfig`}
          />
          <ControlledRadio
            label="Include Upper Bound"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.timing.includeUpperBound`}
          />
          <ControlledInput
            label="Sematic"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.timing.semantic.expression`}
          />
          <ControlledInput
            label="Resolution"
            type='number'
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.timing.resolution`}
          />
        </CardBody>
      </Card>

      <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
        <CardHeader className="flex gap-3">
          <h4 className="text-lg font-semibold">Participant</h4>
        </CardHeader>
        <Divider />

        <CardBody>
          <ControlledInput
            label="ID"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.participant[0].id`}
          />
          <ControlledInput
            label="Practitioner Value"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.participant[0].practitionerValue.identifier`}
          />
          <ControlledInput
            label="Code"
            name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.participant[0].code.expression`}
          />
        </CardBody>
      </Card>
    </Card>
  );
};

export { PerformanceCircumstanceWrapper };
