import React from 'react';



import { QuestionnaireItem } from '@/generated-api-ts/questionnaire/api'
import { Accordion, AccordionItem, Card, CardBody, CardHeader, Tab, Tabs } from '@nextui-org/react';



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
      content:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      id: 'videos',
      label: 'Authors',
      content:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 'documents',
      label: 'Subject of Information',
      content:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    },
    {
      id: 'documentss',
      label: 'Topic',
      content:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    },
    {
      id: 'documentsssssss',
      label: 'Type',
      content:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    },
    {
      id: 'documentssssssss',
      label: 'Circumstance Choice',
      content:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
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