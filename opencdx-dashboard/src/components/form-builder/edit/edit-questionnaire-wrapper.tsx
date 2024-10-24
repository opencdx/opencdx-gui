'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Autocomplete, AutocompleteItem } from 'ui-library';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Questionnaire } from '@/api/questionnaire/model/questionnaire';
import { QuestionnaireItem } from '@/api/questionnaire/model/questionnaire-item';
import { useCreateQuestionnaire, useUpdateQuestionnaire, useGetRuleSets } from '@/hooks/iam-hooks';
import { RuleSet } from '@/api/classification';
import { Header } from './header';
import QuestionsWrapper from './questions-list';
import { useFormContext } from 'react-hook-form';



const QuestionnaireWrapper = ({ questionnaire }: { questionnaire: Questionnaire }) => {
  const { getValues, setValue, control, register, handleSubmit } = useFormContext();
  const router = useRouter();
  const { mutate: createQuestionnaire, data: isCreated, error: isCreateError } = useCreateQuestionnaire();
  const { mutate: updateQuestionnaire, data: isUpdated, error: isUpdateError } = useUpdateQuestionnaire();
  const { mutate: getRuleSets, data: ruleSetData } = useGetRuleSets();

  const [isSelected, setIsSelected] = useState(false);
  const [responseRule, setResponseRule] = useState<Array<{ label: string; ruleId: string }>>([]);
  const [defaultRule, setDefaultRule] = useState('');
  const [defaultId, setDefaultId] = useState('');
  const [activeTab, setActiveTab] = useState<{ item: QuestionnaireItem; idx: number } | null>(null);



  const { fields } = useFieldArray({ control, name: 'item' });

  const fetchRules = useCallback(async () => {
    await getRuleSets({ organizationId: "organizationId", workspaceId: "workspaceId" });
    const formData = getValues();
    if (formData?.item && formData.item.length > 0) {
      setActiveTab({ item: formData.item[0], idx: 0 });
    }

    const ruleQuestion = formData?.item?.map((rule: QuestionnaireItem) => ({
      ruleId: rule.linkId,
      label: rule.text,
    }));

    setResponseRule(ruleQuestion?.map((rule: { label: string; ruleId: string }) => ({
      label: rule.label || '',
      ruleId: rule.ruleId || '',
    })) || []);
  }, [getRuleSets, getValues]);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const formData = getValues();
      setDefaultId(formData?.ruleId || '');
      const ruleQuestionId = Array.isArray(formData?.ruleQuestionId)
        ? formData?.ruleQuestionId[0]
        : formData?.ruleQuestionId;
      setDefaultRule(ruleQuestionId || '');
    }, 2000);

    return () => clearTimeout(timer);
  }, [getValues]);

  useEffect(() => {
    if (isCreated || isUpdated) {
      toast.success('Successfully saved', { position: 'top-right', autoClose: 500 });
      const timer = setTimeout(() => {
        localStorage.removeItem('questionnaire-store');
        router.push('/pages/form-builder');
      }, 500);
      return () => clearTimeout(timer);
    }
    if (isCreateError || isUpdateError) {
      toast.error('An error occurred', { position: 'top-center', autoClose: 2000 });
    }
  }, [isCreated, isUpdated, isCreateError, isUpdateError, router]);

  const filteredItems = ruleSetData?.data?.ruleSets?.map((item: RuleSet) => ({
    value: item.ruleId,
    label: item.name,
  })) || [];

  const onSubmit = async (updatedData: Questionnaire) => {
    try {
      if (updatedData?.id) {
        await updateQuestionnaire({ questionnaire: updatedData });
      } else {
        await createQuestionnaire({ questionnaire: updatedData });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred', { position: 'top-center', autoClose: 2000 });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col h-full px-4'>
        <Header formTitle={questionnaire.title || ''} />

       
          <div className="flex flex-col h-full">
          <QuestionsWrapper />
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
                    } else {
                      setDefaultId('');
                      field.onChange('');
                    }
                  }}
                  id="controllable-states-demo1"
                  label="Select a rule"
                  items={filteredItems}
                // items={ruleSetData?.data?.ruleSets}  
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
                    } else {
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

        <ToastContainer />
      </div>
    </form>
  );
};

export { QuestionnaireWrapper };
