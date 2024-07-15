'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  Select,
  SelectItem,
  Switch,
} from '@nextui-org/react';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Endpoints } from '@/axios/apiEndpoints';
import { Report } from '@/components/form-builder/report';
import {
  Questionnaire,
  QuestionnaireItem,
} from '@/generated-api-ts/questionnaire/api';
import { ChevronLeft } from 'lucide-react';

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
  const router = useRouter();
  const [isSelected, setIsSelected] = React.useState(false);

  const { fields } = useFieldArray({
    control,
    name: 'item',
  });

  const [responseRule, setResponseRule] = React.useState([
    { label: '', ruleId: '' },
  ] as Array<{ label: string; ruleId: string }>);

  const [ruleset, setRuleSet] = React.useState([{ name: '', ruleId: '' }]);
  const [ruleSets, setRuleSets] = React.useState([]);
  const [defaultRule, setDefaultRule] = React.useState('');
  const [defaultId, setDefaultId] = React.useState('');

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

          setRuleSets(rules);
          const formData = getValues();

          const ruleQuestion = formData?.item?.map((rule) => {
            return {
              ruleId: rule.linkId,
              label: rule.text,
            };
          });

          setResponseRule(
            ruleQuestion?.map((rule) => ({
              label: rule.label || '',
              ruleId: rule.ruleId ?? '',
            })) || [],
          );
        })
        .catch((error) => {
          console.error('Error fetching Ruleset :', error);
        });
    };
    fetchRules();
  }, []);
  useEffect(() => {
    const formData = getValues();
    if (formData?.ruleId) {
      setDefaultId(formData.ruleId);
    }
    if (formData?.ruleQuestionId) {
      const ruleQuestionId = Array.isArray(formData?.ruleQuestionId)
        ? formData?.ruleQuestionId[0]
        : formData?.ruleQuestionId;
      if (ruleQuestionId) {
        setDefaultRule(ruleQuestionId);
      }
    }
  }, [ruleset]);

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
        <div className="flex flex-row justify-between">
          <Button
            className="mb-4 mt-4 ml-4"
            startContent={<ChevronLeft size={16} />}
            onPress={() => {
              router.push('/form-builder');
            }}
          >
            Back
          </Button>
          <Switch
            aria-label="Show Report"
            className="mr-4"
            isSelected={isSelected}
            onValueChange={setIsSelected}
          >
            Show Report
          </Switch>
        </div>
        {isSelected && <Report />}
        <FormProvider
          control={control}
          getValues={getValues}
          register={register}
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
                      <Autocomplete
                        className=" mb-4 mt-2 mr-4 ml-4"
                        selectedKey={defaultId}
                        onSelectionChange={(e) => {
                          if (e) {
                            setDefaultId(String(e));
                            field.onChange(e);
                          }
                          else{
                            setDefaultId('');
                            field.onChange('');
                          }
                        }}
                        id="controllable-states-demo1"                      
                        label="Select a rule"
                        items={ruleset.map((item) => ({
                          value: item.ruleId,
                          label: item.name,
                        }))}
                      >
                        {(item: { value: string; label: string }) => (
                          <AutocompleteItem key={item.value}>
                            {item.label}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
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
                      <Autocomplete
                        className=" mb-4 mt-2 mr-4 ml-4 "
                        id="controllable-states-demo1"
                        selectedKey={defaultRule}
                        {...field}
                        onSelectionChange={(e) => {
                          if (e) {
                            setDefaultRule(String(e));
                            field.onChange([e]);
                          }else{
                            setDefaultRule('');
                            field.onChange([]);
                          }
                          
                        }}
                        label="Select a rule"
                        items={responseRule.map((item) => ({
                          value: item.ruleId,
                          label: item.label,
                        }))}
                      >
                        {(item: { value: string; label: string }) => (
                          <AutocompleteItem key={item.value}>
                            {item.label}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
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
