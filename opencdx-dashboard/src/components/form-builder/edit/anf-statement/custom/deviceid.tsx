import React from 'react';
import { Button } from 'ui-library';
import { ControlledInput } from './controlled-input';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface DeviceIdComponentProps {
    anfStatementConnectorId: number;
    questionnaireItemId: number;
    tabName: string;
}

export const DeviceIdComponent: React.FC<DeviceIdComponentProps> = ({
    anfStatementConnectorId,
    questionnaireItemId,
    tabName,
}) => {
    const { control } = useFormContext();
    const baseFieldName = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.${tabName}`;

    const { fields: deviceIdFields, append: appendDeviceId, remove: removeDeviceId } = useFieldArray({
        control,
        name: `${baseFieldName}.deviceid`,
    });

    return (
        <div className='p-4'>
            {deviceIdFields.map((field, index) => (
                <div key={field.id} className='flex flex-row items-center gap-2'>
                    <ControlledInput className='w-full'
                        size='md'
                        placeholder='Add Device ID'
                        name={`${baseFieldName}.deviceid.${index}`} />
                    <Button
                        className='rounded-lg mb-4'
                        color='danger'
                        variant='flat'
                        radius='sm'
                        endContent={<TrashIcon size={18} />}
                        onClick={() => removeDeviceId(index)}
                    />
                </div>
            ))}
            <Button className='w-fit'
                variant='flat'
                size='sm'
                color='primary'
                radius='sm' onClick={() => appendDeviceId('')} endContent={<PlusIcon size={18} />}>Add Device ID</Button>
        </div>
    );
};

