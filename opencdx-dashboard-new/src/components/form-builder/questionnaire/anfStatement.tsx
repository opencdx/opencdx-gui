import React from 'react';



import { QuestionnaireItem } from '@/generated-api-ts/questionnaire/api';
import { Accordion, AccordionItem, Card, CardBody, CardHeader, Tab, Tabs } from '@nextui-org/react';



import { OneWrapper } from './anfComponents/one';
import { PraWrapper } from './anfComponents/pra';
import { TimeWrapper } from './anfComponents/time';


const ANFStatementWrapper = ({ item }: { item: QuestionnaireItem }) => {
  let tabs = [
    {
      id: 'time',
      label: 'Time',
      content: <TimeWrapper item={item} />,
    },
    {
      id: 'music',
      label: 'Subject of Record',
      content: <PraWrapper item={item} />,
    },
    {
      id: 'videos',
      label: 'Authors',
      content: <PraWrapper item={item} />,
    },
    {
      id: 'documents',
      label: 'Subject of Information',
      content: <OneWrapper item={item} />,
    },
    {
      id: 'documentss',
      label: 'Topic',
      content: <OneWrapper item={item} />,
    },
    {
      id: 'documentsssssss',
      label: 'Type',
      content: <OneWrapper item={item} />,
    },
    {
      id: 'documentssssssss',
      label: 'Circumstance Choice',
      content: <TimeWrapper item={item} />,
    },
  ];
  return (
    <>
      <Accordion variant="splitted">
        <AccordionItem aria-label={item.linkId} title={'Anf Statement'}>
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