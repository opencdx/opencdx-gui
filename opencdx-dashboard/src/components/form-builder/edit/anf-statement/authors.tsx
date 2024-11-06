import React, { useState, useEffect } from 'react';
import { Divider, Button } from 'ui-library';
import { PlusIcon } from 'lucide-react';
import { Practitioner } from '@/api/questionnaire/model/practitioner';
import { ANFStatement } from '@/api/questionnaire/model/anfstatement';
import { ControlledInput } from '@/components/custom/controlled-input';

const AuthorsWrapper = ({
  anfStatementConnectorId,
  questionnaireItemId,
  anfStatement
}: {
  anfStatementConnectorId: number;
  questionnaireItemId: number;
  anfStatement: ANFStatement;
}) => {
  const [authors, setAuthors] = useState<Practitioner[]>([]);

  useEffect(() => {
    setAuthors(anfStatement.authors || []);
  }, [anfStatement]);
  useEffect(() => {
    if (authors.length === 0) {
      handleAddAuthor();
    }
  }, []);

  const handleAddAuthor = () => {
    setAuthors(prevAuthors => [...prevAuthors, {
      id: '',
      practitionerValue: { identifier: '', display: '', reference: '', uri: '' },
      code: { expression: '' },
    }]);
  };

  const renderAuthorFields = (author: Practitioner, index: number) => (
    <div key={index} className='border border-t-[#99C7FB] border-solid border-b-0 border-r-0 border-l-0'>
      {/* Author fields rendering */}
      <ControlledInput
        label="ID"
        className='p-4 pt-8'
        name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[${index}].id`}
      />
      <Divider className='bg-[#99C7FB]' />
      <div className='flex flex-col gap-4'>
        <div className='text-sm pl-4 pt-4'>Practitioner Value:</div>
        {['identifier', 'display', 'reference', 'URI'].map((field) => (
          <React.Fragment key={field}>
            <ControlledInput
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              className='p-4'
              name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[${index}].practitionerValue.${field}`}
            />
            <div className='px-4'>
              <Divider />
            </div>
          </React.Fragment>
        ))}
      </div>
      <ControlledInput
        label="Code"
        className='p-4'
        name={`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[${index}].code.expression`}
      />
      {index !== authors.length - 1 && (
        <>
          <Divider className='bg-[#99C7FB] h-[16px] my-4' />
        </>
      )}
    </div>
  );

  const AddAuthorButton = () => (
    <div className='p-4'>
      <Button
        variant='flat'
        color='primary'
        size='sm'
        onClick={handleAddAuthor}
        endContent={<PlusIcon size={16} />}
      >
        Add Author
      </Button>
    </div>
  );

  return (
    <>
      {authors.length > 0 ? authors.map(renderAuthorFields) : <AddAuthorButton />}
      {authors.length > 0 && <AddAuthorButton />}
    </>
  );
};

export { AuthorsWrapper };
