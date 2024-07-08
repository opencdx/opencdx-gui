'use client';

import React from 'react';

import { Endpoints } from '@/axios/apiEndpoints';
import {
  Questionnaire,
  QuestionnaireItem,
} from '@/generated-api-ts/questionnaire/api';
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
} from '@nextui-org/react';
import {
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { QuestionnaireItemWrapper } from './questionnaireItem';

const QuestionnaireWrapper = () => {
  const { control, register, handleSubmit, getValues } = useForm<Questionnaire>(
    {
      defaultValues: async () => {
        return JSON.parse(localStorage.getItem('questionnaire-store') as string);
      },
    },
  );

  const { fields } = useFieldArray(
    {
      control,
      name: 'item',
    },
  );
  const onSubmit = async (data: Questionnaire) => {
    try {
      let response;
      if (data && data?.id) {
        response = await Endpoints.updateQuestionnaire({
          questionnaire: data,
        });
      } else {
        response = await Endpoints.submitQuestionnaire({
          questionnaire: data,
        });
      }
      localStorage.setItem(
        'questionnaire-store',
        JSON.stringify(response.data),
      );
      toast.success('Successfully saved', {
        position: 'top-right',
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.error('An error occurred', {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col px-4">
        <FormProvider
          register={register}
          control={control}
          getValues={getValues}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="mb-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
              <CardBody>
                <div className="flex flex-col">
                  <Accordion variant="splitted">
                    {fields?.map((item: QuestionnaireItem, idx: number) => {
                      return (
                        <AccordionItem
                          key={item.linkId}
                          aria-label={item.linkId}
                          title={idx + 1 + '. ' + item.text}
                        >
                          <QuestionnaireItemWrapper
                            item={item}
                            questionnaireItemId={idx}
                          />
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              </CardBody>
            </Card>
            <Button
              type="submit"
              variant="solid"
              onClick={() => console.log('submit')}
            >
              Submit
            </Button>
          </form>
        </FormProvider>
        <ToastContainer />
      </div>
    </>
  );
};
export { QuestionnaireWrapper };
