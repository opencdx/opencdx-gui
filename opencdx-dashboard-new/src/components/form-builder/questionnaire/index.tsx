import React from 'react';

import { QuestionnaireItem } from '@/config/interface';
import { useAnfFormStore } from '@/lib/useAnfFormStore';
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
} from '@nextui-org/react';

import { QuestionnaireItemWrapper } from './questionnaireItem';

const QuestionnaireWrapper = () => {
  const { formData } = useAnfFormStore();

  return (
    <>
      <div className="flex flex-col px-4">
          <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
            <CardBody>
              <div className="flex flex-col">
                
                <Accordion variant="splitted">
                  {formData?.item?.map(
                    (item: QuestionnaireItem, idx: number) => {
                      return (
                        <AccordionItem
                          key={idx}
                          aria-label={item.linkId}
                          title={idx+1+'. '+item.text}
                        >
                          <QuestionnaireItemWrapper item={item} />
                        </AccordionItem>
                      );
                    },
                  )}
                </Accordion>
              </div>
            </CardBody>
          </Card>
        </div>
    </>
  );
};
export { QuestionnaireWrapper };
