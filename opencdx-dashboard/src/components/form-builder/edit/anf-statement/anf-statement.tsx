import React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

import {
  ANFStatement
} from '@/api/questionnaire/model/anfstatement';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from 'ui-library';
import { CodeIcon, MonitorIcon } from 'ui-library'
import { AuthorsWrapper } from './authors';
import { CircumstanceChoice } from './circumstance-choice/index';
import { SubjectOfInformationWrapper } from './subject-of-information';
import { SubjectOfRecordWrapper } from './subject-of-record';
import { TimeWrapper } from './time';
import { TopicWrapper } from './topic';
import { TypeWrapper } from './type';
import { ModalWrapper } from './modal-wrapper';
const ANFStatementWrapper = ({
  questionnaireItemId,
  anfStatementConnectorId,
  anfStatement
}: {
  anfStatement: ANFStatement;
  questionnaireItemId: number;
  anfStatementConnectorId: number;
}) => {
  const [activeTab, setActiveTab] = useState('time');
  const { isOpen, onOpen, onOpenChange , } = useDisclosure();
  const [codes, setCodes] = useState('');
  const tabs = [
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
          anfStatement={anfStatement}
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
      id: 'circumstanceChoice',
      label: 'Circumstance Choice',
      content: (
        <CircumstanceChoice
          anfStatementConnectorId={anfStatementConnectorId}
          questionnaireItemId={questionnaireItemId}
          anfStatement={anfStatement}
        />
      ),
    },
  ];

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>, tabId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveTab(tabId);
  };

  return (
    <>
      <div className="flex  gap-4 w-full space-x-4 p-8">
        <div className="flex items-start gap-4 w-full flex-col">
          <h2 className="text font-semibold">Anf Statement</h2>
          <div className="flex justify-start gap-2">
            <h3 className="text-sm font-medium">
            Descriptive sentence of what this section is for goes here.
            </h3>
          </div>
        </div>
        <div className="flex justify-start gap-2">
          <Button
            className="mr-2"
            color="primary"
            size='sm'
            endContent={<MonitorIcon />}
            variant='flat'
            onPress={() => {
              onOpen();
              setCodes('systemVariables');
            }}
          >
            System Variables
          </Button>
          <Button
            className="mr-2"
            color="primary"
            size='sm'
            endContent={<CodeIcon />}
            variant="flat"
            onPress={() => {
              onOpen();
              setCodes('codeLookup');
            }}
          >
            Code Lookup
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} size='5xl' hideCloseButton = {true}
        radius='none'
       onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
              <div className="">{codes === 'systemVariables' ? <div className='text-primary'>System Variables</div> : <div className='flex gap-2 justify-between'><div className=''>Code Lookup</div> <Input size='sm' label='Search' variant='bordered' className='w-1/3' /></div>}</div>
              </ModalHeader>
              <ModalBody className="">
                  <ModalWrapper />
              </ModalBody>
              <ModalFooter>
                <Button color="primary"  variant="solid" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
      <div className="flex w-full flex-col px-8 ">
        <div className="flex bg-[#99C7FB] px-2 ">
          {tabs.map((item) => (
            <button
              key={item.id}
              className={cn(
                'font-small text-sm focus:outline-none transition-colors text-black',
                activeTab === item.id
                  ? 'm-1 p-1.5 bg-[#006FEE] text-white'
                  : 'm-1 p-1.5 text-black hover:bg-blue-100'
              )}
              onClick={(e) => handleTabClick(e, item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="border border-[#99C7FB]">
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>
      </div>
    </>
  );
};

export { ANFStatementWrapper };
