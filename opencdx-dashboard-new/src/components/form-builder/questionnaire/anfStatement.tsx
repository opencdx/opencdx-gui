import React from 'react';
import {
  ANFStatement,
  QuestionnaireItem,
} from '@/generated-api-ts/questionnaire/api';
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Snippet,
  Tab,
  Tabs,
  useDisclosure,
} from '@nextui-org/react';
import { Code, Monitor } from 'lucide-react';

import { AuthorsWrapper } from './anfComponents/authors';
import { PerformanceCircumstanceWrapper } from './anfComponents/performance-circumstance';
import { SubjectOfInformationWrapper } from './anfComponents/subject-of-information';
import { SubjectOfRecordWrapper } from './anfComponents/subject-of-record';
import { TimeWrapper } from './anfComponents/time';
import { TopicWrapper } from './anfComponents/topic';
import { TypeWrapper } from './anfComponents/type';

const TestResultsTable: React.FC = () => {
  const formData = JSON.parse(
    localStorage.getItem('questionnaire-store') as string,
  );

  return (
    <div style={{ height: '300px', overflow: 'auto', width: 'auto' }}>
      <table className="w-full table-auto mb-4 text-left">
        <thead className="border-b border-gray-200">
          <tr className="text-left">
            <th className="w-1/2">Question</th>
            <th className="w-1/2">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {formData?.item.map((item: QuestionnaireItem, index: number) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-4">{item.text}</td>
              <td className="py-4">
                <Snippet color="primary">{`{{REPLACE_${item.linkId})}}`}</Snippet>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestResultsTable;
const ANFStatementWrapper = ({
  questionnaireItemId,
  anfStatementConnectorId,
}: {
  anfStatement: ANFStatement;
  questionnaireItemId: number;
  anfStatementConnectorId: number;
}) => {
  let tabs = [
    {
      id: 'time',
      label: 'Time',
      content: (
        <TimeWrapper
          anfStatementConnectorId={anfStatementConnectorId}
          questionnaireItemId={questionnaireItemId}
        />
      ),
    },
    {
      id: 'subjectOfRecord',
      label: 'Subject of Record',
      content: (
        <SubjectOfRecordWrapper
          anfStatementConnectorId={anfStatementConnectorId}
          questionnaireItemId={questionnaireItemId}
        />
      ),
    },
    {
      id: 'authors',
      label: 'Authors',
      content: (
        <AuthorsWrapper
          anfStatementConnectorId={anfStatementConnectorId}
          questionnaireItemId={questionnaireItemId}
        />
      ),
    },
    {
      id: 'subjectOfInformation',
      label: 'Subject of Information',
      content: (
        <SubjectOfInformationWrapper
          anfStatementConnectorId={anfStatementConnectorId}
          questionnaireItemId={questionnaireItemId}
        />
      ),
    },
    {
      id: 'topic',
      label: 'Topic',
      content: (
        <TopicWrapper
          anfStatementConnectorId={anfStatementConnectorId}
          questionnaireItemId={questionnaireItemId}
        />
      ),
    },
    {
      id: 'type',
      label: 'Type',
      content: (
        <TypeWrapper
          anfStatementConnectorId={anfStatementConnectorId}
          questionnaireItemId={questionnaireItemId}
        />
      ),
    },
    {
      id: 'performanceCircumstance',
      label: 'Circumstance Choice',
      content: (
        <PerformanceCircumstanceWrapper
          anfStatementConnectorId={anfStatementConnectorId}
          questionnaireItemId={questionnaireItemId}
        />
      ),
    },
  ];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Accordion variant="splitted">
        <AccordionItem title={'Anf Statement'}>
          <div className="flex justify-end">
            <Button
              className="mr-2"
              color="warning"
              startContent={<Monitor />}
              variant="solid"
              onPress={onOpen}
            >
              System Variables
            </Button>
            <Button
              className="mr-2"
              color="warning"
              startContent={<Code />}
              variant="solid"
              onPress={onOpen}
            >
              Code Lookup
            </Button>
          </div>
          <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    System Variables
                  </ModalHeader>
                  <ModalBody className="flex flex-col w-full">
                    <TestResultsTable />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <div className="flex w-full flex-col">
            <Tabs aria-label="Dynamic tabs" items={tabs}>
              {(item) => (
                <Tab key={item.id} title={item.label}>
                  <Card>
                    <CardBody>{item.content}</CardBody>
                  </Card>
                </Tab>
              )}
            </Tabs>
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export { ANFStatementWrapper };
