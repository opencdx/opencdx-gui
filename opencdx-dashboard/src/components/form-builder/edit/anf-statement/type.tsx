import React from 'react';
import { Select, SelectItem } from 'ui-library';
import { Controller, useFormContext } from 'react-hook-form';

// Move this to a separate constants file if used across multiple components
const TYPE_VALUES = [
  { key: 'performance', label: 'Performance' },
  { key: 'request', label: 'Request' },
] as const;

// Use interface for better type checking
interface TypeWrapperProps {
  anfStatementConnectorId: number;
  questionnaireItemId: number;
}

const TypeWrapper: React.FC<TypeWrapperProps> = ({
  anfStatementConnectorId,
  questionnaireItemId,
}) => {
  const { control } = useFormContext();
  const name = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.type.expression`;

  return (
    <div className="px-4 py-8">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            className="w-full"
            label="Type:"
            classNames={{
              label: "text-black text-sm",
            }}
            {...field}
            defaultSelectedKeys={field.value ? [field.value] : undefined}
            labelPlacement="outside"
            placeholder="Type"
            size="lg"
            fullWidth
            variant="bordered"
            radius="sm"
          >
            {TYPE_VALUES.map(({ key, label }) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </Select>
        )}
      />
    </div>
  );
};

export { TypeWrapper, TYPE_VALUES };
