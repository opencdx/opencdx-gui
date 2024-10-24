import React, { useEffect } from 'react';
import { Button } from 'ui-library';
import { ControlledInput } from './controlled-input';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface PurposeComponentProps {
    anfStatementConnectorId: number;
    questionnaireItemId: number;
    tabName: string;
}
export const PurposeComponent: React.FC<PurposeComponentProps> = ({
    anfStatementConnectorId,
    questionnaireItemId,
    tabName,
}) => {
    const { control } = useFormContext();
    const baseFieldName = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.${tabName}`;

    const { fields: purposeFields, append: appendPurpose, remove: removePurpose } = useFieldArray({
        control,
        name: `${baseFieldName}.purpose`,
    });
    useEffect(() => {
        if (purposeFields.length === 0) {
            appendPurpose('');
        }
    }, [purposeFields]);

    return (
        <div className=''>
            {purposeFields.map((field, index) => (
                <div key={field.id} className='flex flex-row items-center gap-2 mb-4'>
                    <ControlledInput className='w-full'
                        placeholder='Add Purpose'
                        name={`${baseFieldName}.purpose.${index}`} />
                    <Button
                        className='rounded-lg'
                        color='danger'
                        variant='flat'
                        radius='sm'
                        size='lg'
                        endContent={<TrashIcon size={18} />}
                        onClick={() => removePurpose(index)}
                    />
                </div>
            ))}
            <Button className='w-fit'
                variant='flat'
                size='sm'
                color='primary'
                radius='sm' onClick={() => appendPurpose('')} endContent={<PlusIcon size={18} />}>Add Purpose</Button>
        </div>
    );
};
