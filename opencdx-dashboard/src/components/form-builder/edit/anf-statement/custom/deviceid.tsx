import React, { useEffect } from 'react';
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
    useEffect(() => {
        if (deviceIdFields.length === 0) {
            appendDeviceId('');
        }
    }, [deviceIdFields]);

    return (
        <div className=''>
            {deviceIdFields.map((field, index) => (
                <div key={field.id} className='flex flex-row items-center gap-2 mb-4'>
                    <ControlledInput className='w-full'
                        placeholder='Add Device ID'
                        name={`${baseFieldName}.deviceid.${index}`} />
                    <Button
                        className='rounded-lg'
                        color='danger'
                        variant='flat'
                        radius='sm'
                        size='lg'
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
