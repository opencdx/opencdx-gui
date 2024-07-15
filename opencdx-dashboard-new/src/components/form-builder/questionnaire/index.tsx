'use client';

import React, { useEffect } from 'react';

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
  Select,
  SelectItem,
} from '@nextui-org/react';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { QuestionnaireItemWrapper } from './questionnaireItem';

const QuestionnaireWrapper = () => {
  const { control, register, handleSubmit, getValues, setValue } =
    useForm<Questionnaire>({
      defaultValues: async () => {
        return JSON.parse(
          localStorage.getItem('questionnaire-store') as string,
        );
      },
    });

  const { fields } = useFieldArray({
    control,
    name: 'item',
  });

  const [responseRule, setResponseRule] = React.useState([
    { name: '', ruleId: '' },
  ] as Array<{ name: string; ruleId: string }>);

  const [ruleset, setRuleSet] = React.useState([{ name: '', ruleId: '' }]);

  useEffect(() => {
    const fetchRules = async () => {
      Endpoints.rulesetList({
        organizationId: 'organizationId',
        workspaceId: 'workspaceId',
      })
        .then((response) => {
          setRuleSet(response.data.ruleSets);
          const rules = response.data.ruleSets.map((rule: { name: any }) => {
            return rule.name;
          });
          const resp = getValues('item')?.map((item: QuestionnaireItem) => {
            return {
              ruleId: item.linkId,
              label: item.text,
            };
          });
          setResponseRule(
            resp?.map((item) => ({
              name: item.label ?? '',
              ruleId: item.ruleId ?? '',
            })) || [],
          );
        })
        .catch((error) => {
          console.error('Error fetching Ruleset :', error);
        });
    };
    fetchRules();
  }, []);

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
          setValue={setValue}
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
                <div className=" flex items-center gap-4 w-full pt-2">
                  <label className="text w-[250px]">Select a rule</label>
                  <Controller
                    control={control}
                    {...register(`ruleId`)}
                    render={({ field }) => (
                      <Select
                        label="Select a rule"
                        className="max-w-xs mb-4 mt-2 mr-4 ml-4 w-full"
                        {...field}
                        defaultSelectedKeys={
                          field.value ? [field.value] : undefined
                        }
                      >
                        {ruleset.map((type) => (
                          <SelectItem key={type.ruleId}>{type.name}</SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                </div>
                <div className=" flex items-center gap-4 w-full">
                  <label className="text w-[250px]">
                    Select response for rule
                  </label>
                  <Controller
                    control={control}
                    {...register(`ruleQuestionId`)}
                    render={({ field }) => (
                      <Select
                        label="Select response for rule"
                        className="max-w-xs mb-4 mt-2 mr-4 ml-4 w-full"
                        {...field}
                        onChange={(e) => {
                          field.onChange([e.target.value]);
                        }}
                      >
                        {responseRule?.map((type) => (
                          <SelectItem key={type.ruleId ?? ''}>
                            {type.name}
                          </SelectItem>
                        )) ?? []}
                      </Select>
                    )}
                  />
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
