import React, { useState, useEffect, useCallback, useMemo } from 'react';

import {
  Divider,
  Button,
  Input
} from 'ui-library';
import { ANFStatement } from '@/api/questionnaire/model/anfstatement';
import { ControlledInput } from '../custom/controlled-input';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { MeasureComponent } from '../custom/measure';
import { ParticipantComponent } from '../custom/participant';
import { useFormContext } from 'react-hook-form';

export const values = [
  { key: 'performance', label: 'Performance Circumstance' },
  { key: 'request', label: 'Request Circumstance' },
  { key: 'narrative', label: 'Narrative Circumstance' },
];

const PerformanceCircumstance: React.FC<{
  anfStatementConnectorId: number;
  questionnaireItemId: number;
  anfStatement: ANFStatement;
}> = ({ anfStatementConnectorId, questionnaireItemId, anfStatement }) => {
  const [deviceIds, setDeviceIds] = useState<string[]>([]);
  const { setValue } = useFormContext();
  const tabName = 'performanceCircumstance';

  useEffect(() => {
    setDeviceIds(anfStatement.performanceCircumstance?.deviceid || []);
  }, [anfStatement]);

  const baseFieldName = useMemo(() => 
    `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.${tabName}`,
    [questionnaireItemId, anfStatementConnectorId, tabName]
  );

  const handleDeviceIdChange = useCallback((index: number, value: string) => {
    setDeviceIds(prevIds => {
      const newIds = [...prevIds];
      newIds[index] = value;
      setValue(`${baseFieldName}.deviceid`, newIds);
      return newIds;
    });
  }, [setValue, baseFieldName]);

  const handleAddDeviceId = useCallback(() => {
    setDeviceIds(prevIds => [...prevIds, '']);
  }, []);

  const handleRemoveDeviceId = useCallback((index: number) => {
    setDeviceIds(prevIds => {
      const newIds = prevIds.filter((_, i) => i !== index);
      setValue(`${baseFieldName}.deviceid`, newIds);
      return newIds;
    });
  }, [setValue, baseFieldName]);

  const renderDeviceIdInputs = useCallback(() => (
    <>
      <label className='text-sm font-normal text-black'>Device ID:</label>
      {deviceIds.map((id, index) => (
        <div key={index} className='flex items-center gap-2'>
          <Input
            className='w-full'
            placeholder='Add Device ID'
            variant="bordered"
            radius='sm'
            value={id}
            onChange={(e) => handleDeviceIdChange(index, e.target.value)}
          />
          <Button
            variant='flat'
            color='danger'
            radius='sm'
            onClick={() => handleRemoveDeviceId(index)}
            endContent={<TrashIcon size={18} />}
          />
        </div>
      ))}
      <Button
        className='w-fit'
        variant='flat'
        size='sm'
        color='primary'
        radius='sm'
        onClick={handleAddDeviceId}
        endContent={<PlusIcon size={18} />}
      >
        Add Device ID
      </Button>
    </>
  ), [deviceIds, handleDeviceIdChange, handleRemoveDeviceId, handleAddDeviceId]);

  return (
    <>
      <Divider className='bg-[#99C7FB]' />
      <div className='p-4'>
        <ControlledInput label="Status" name={`${baseFieldName}.status.expression`} />
      </div>
      <Divider className='bg-[#99C7FB]' />
      <div className='p-4 flex flex-col gap-4'>
        {renderDeviceIdInputs()}
      </div>
      <Divider className='bg-[#99C7FB]' />
      <MeasureComponent label='Results' anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={`${tabName}.result`} />
      <Divider className='bg-[#99C7FB]' />
      <ControlledInput className='p-4' label="Health Risk" name={`${baseFieldName}.healthRisk.expression`} />
      <Divider className='bg-[#99C7FB]' />
      <MeasureComponent label='Normal Range' anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={`${tabName}.normalRange`} />
      <Divider className='bg-[#99C7FB]' />
      <MeasureComponent label='Timing' anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} tabName={`${tabName}.timing`} />
      <Divider className='bg-[#99C7FB]' />
      <ParticipantComponent label='Participant' anfStatementConnectorId={anfStatementConnectorId} questionnaireItemId={questionnaireItemId} anfStatement={anfStatement} tabName={tabName} />

    </>

  );
};

export { PerformanceCircumstance };
