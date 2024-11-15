'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Questionnaire } from '@/api/questionnaire/model/questionnaire';
import { useCreateQuestionnaire, useUpdateQuestionnaire } from '@/hooks/iam-hooks';
import { Header } from './header';
import QuestionsWrapper from './questions-list';
import { useFormContext } from 'react-hook-form';



const QuestionnaireWrapper = ({ questionnaire }: { questionnaire: Questionnaire }) => {
  const { control, handleSubmit } = useFormContext();
  const router = useRouter();
  const { mutate: createQuestionnaire, data: isCreated, error: isCreateError } = useCreateQuestionnaire();
  const { mutate: updateQuestionnaire, data: isUpdated, error: isUpdateError } = useUpdateQuestionnaire();


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
      toast.error('An error occurred', { position: 'top-right', autoClose: 2000 });
    }
  }, [isCreated, isUpdated, isCreateError, isUpdateError, router]);


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
        <Header formTitle={questionnaire.title || ''} control={control} />
          <div className="flex flex-col h-full">
          <QuestionsWrapper />
          </div>
        <ToastContainer
          position={"top-right"}
          icon={false}
          autoClose={2000}
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme={"colored"}
          closeButton={false} 
        />
      </div>
    </form>
  );
};

export { QuestionnaireWrapper };
