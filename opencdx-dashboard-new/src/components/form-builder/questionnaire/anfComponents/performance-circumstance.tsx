import React from 'react';

import { Input } from '@nextui-org/input';
import {
  Card,
  CardBody,
  CardHeader,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { Controller, useFormContext } from 'react-hook-form';
import { Divider } from '@nextui-org/react';

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
          {
            ...register(
              `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.type`,
            )
          }
          render={({ field }) => (
            <Select
              label="Circumstance Type"
              className="mb-4 mt-2 ml-4"
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

      <div className=" flex items-center gap-4 w-full">
        <label className="text w-[270px]">Status</label>
        <Input
          type="text"
          label="status"
          className="mb-4"
          {...register(
            `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.status`,
          )}
        />
      </div>
      <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
        <CardHeader className="flex gap-3">
          <h4 className="text-lg font-semibold">Result</h4>
        </CardHeader>
        <Divider/>

        <CardBody>
          <div className=" flex items-center gap-4 w-full">
            <label className="text w-[250px]">Lower Bound</label>
            <Input
              type="text"
              label="Lower Bound"
              className="mb-4"
              {...register(
                `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.result.lowerBound`,
              )}
            />
          </div>
          <div className=" flex items-center gap-4">
            <label className="text w-[210px]">Include Lower Bound</label>
            <RadioGroup orientation="horizontal" className="mb-4">
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
              <Radio value="d">Not Specified</Radio>
            </RadioGroup>
          </div>

          <div className=" flex items-center gap-4">
            <label className="text w-[250px]">Upper Bound</label>
            <Input
              type="text"
              label="Upper Bound"
              className="mb-4"
              {...register(
                `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.result.upperBound`,
              )}
            />
          </div>
          <div className=" flex items-center gap-4">
            <label className="text w-[210px]">Include Upper Bound</label>
            <RadioGroup orientation="horizontal" className="mb-4">
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
              <Radio value="">Not Specified</Radio>
            </RadioGroup>
          </div>

          <div className=" flex items-center gap-4">
            <label className="text w-[250px]">Sematic</label>
            <Input
              type="text"
              label="Sematic"
              className="mb-4"
              {...register(
                `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.result.semantic`,
              )}
            />
          </div>
          <div className=" flex items-center gap-4">
            <label className="text w-[250px]">Resolution</label>
            <Input
              type="text"
              label="Resolution"
              className="mb-4"
              {...register(
                `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.result.resolution`,
              )}
            />
          </div>
        </CardBody>
      </Card>

      <div className=" flex items-center gap-4 w-full mb-4">
        <label className="text w-[270px]">Health Risk</label>
        <Input
          type="text"
          label="Health Risk"
          className="mb-4"
          {...register(
            `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.healthRisk`,
          )}
        />
      </div>

      <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
        <CardHeader className="flex gap-3">
          <h4 className="text-lg font-semibold">Normal Range</h4>
        </CardHeader>
        <Divider/>

        <CardBody>
          <div className=" flex items-center gap-4 w-full">
            <label className="text w-[250px]">Lower Bound</label>
            <Input
              type="text"
              label="Lower Bound"
              className="mb-4"
              {...register(
                `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.normalRange.lowerBound`,
              )}
            />
          </div>
          <div className=" flex items-center gap-4">
            <label className="text w-[210px]">Include Lower Bound</label>
            <RadioGroup orientation="horizontal" className="mb-4">
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
              <Radio value="d">Not Specified</Radio>
            </RadioGroup>
          </div>

          <div className=" flex items-center gap-4">
            <label className="text w-[250px]">Upper Bound</label>
            <Input
              type="text"
              label="Upper Bound"
              className="mb-4"
              {...register(
                `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.normalRange.upperBound`,
              )}
            />
          </div>
          <div className=" flex items-center gap-4">
            <label className="text w-[210px]">Include Upper Bound</label>
            <RadioGroup orientation="horizontal" className="mb-4">
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
              <Radio value="">Not Specified</Radio>
            </RadioGroup>
          </div>

          <div className=" flex items-center gap-4">
            <label className="text w-[250px]">Sematic</label>
            <Input
              type="text"
              label="Sematic"
              className="mb-4"
              {...register(
                `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.normalRange.semantic`,
              )}
            />
          </div>
          <div className=" flex items-center gap-4">
            <label className="text w-[250px]">Resolution</label>
            <Input
              type="text"
              label="Resolution"
              className="mb-4"
              {...register(
                `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.normalRange.resolution`,
              )}
            />
          </div>
        </CardBody>
      </Card>

      <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
        <CardHeader className="flex gap-3">
          <h4 className="text-lg font-semibold">Timing</h4>
        </CardHeader>
        <Divider/>

        <CardBody>
          <div className=" flex items-center gap-4 w-full">
            <label className="text w-[250px]">Lower Bound</label>
            <Input
              type="text"
              label="Lower Bound"
              className="mb-4"
              {...register(
                `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.timing.lowerBound`,
              )}
            />
          </div>
          <div className=" flex items-center gap-4">
            <label className="text w-[210px]">Include Lower Bound</label>
            <RadioGroup orientation="horizontal" className="mb-4">
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
              <Radio value="d">Not Specified</Radio>
            </RadioGroup>
          </div>

          <div className=" flex items-center gap-4">
            <label className="text w-[250px]">Upper Bound</label>
            <Input
              type="text"
              label="Upper Bound"
              className="mb-4"
              {...register(
                `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.timing.upperBound`,
              )}
            />
          </div>
          <div className=" flex items-center gap-4">
            <label className="text w-[210px]">Include Upper Bound</label>
            <RadioGroup orientation="horizontal" className="mb-4">
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
              <Radio value="">Not Specified</Radio>
            </RadioGroup>
          </div>

          <div className=" flex items-center gap-4">
            <label className="text w-[250px]">Sematic</label>
            <Input
              type="text"
              label="Sematic"
              className="mb-4"
              {...register(
                `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.timing.semantic`,
              )}
            />
          </div>
          <div className=" flex items-center gap-4">
            <label className="text w-[250px]">Resolution</label>
            <Input
              type="text"
              label="Resolution"
              className="mb-4"
              {...register(
                `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.timing.resolution`,
              )}
            />
          </div>
        </CardBody>
      </Card>


      <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 ">
        <CardHeader className="flex gap-3">
          <h4 className="text-lg font-semibold">Participant</h4>
        </CardHeader>
        <Divider/>

        <CardBody>
        <div className=" flex items-center gap-4 w-full">
        <label className="text w-[250px]">ID</label>
        <Input
          type="text"
          label="ID"
          className="mb-4"
          {...register(
            `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.participant[0].id`,
          )}
        />
      </div>
      <div className=" flex items-center gap-4 w-full">
        <label className="text w-[250px]">Practitioner Value</label>
        <Input
          type="text"
          label="Practitioner Value"
          className="mb-4"
          {...register(
            `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.participant[0].practitionerValue`,
          )}
        />
      </div>

      <div className=" flex items-center gap-4 w-full">
        <label className="text w-[250px]">Code</label>
        <Input
          type="text"
          label="Code"
          className="mb-4"
          {...register(
            `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.participant[0].code`,
          )}
        />
      </div>
        </CardBody>
      </Card>
    </Card>
  );
};

export { PerformanceCircumstanceWrapper };
