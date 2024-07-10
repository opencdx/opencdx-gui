'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { EditQuestionnaire } from '@/components/form-builder/edit-questionnaire';
import { Report } from '@/components/form-builder/report';
import { Button } from '@nextui-org/button';
import { Switch } from '@nextui-org/react';
import { ChevronLeft } from 'lucide-react';

export default function EditQuestionareePage({
  params,
}: {
  params: { slug: string; questionnaire: any };
}) {
  const id = params.slug;
  const router = useRouter();
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <Button
          className="mb-4 mt-4 ml-4"
          onPress={() => {
            router.push('/form-builder');
          }}
          startContent={<ChevronLeft size={16} />}
        >
          Back
        </Button>
        <Switch aria-label="Show Report" isSelected={isSelected} onValueChange={setIsSelected} className='mr-4'>
          Show Report
        </Switch>
      </div>
      {isSelected &&<Report />}
      <EditQuestionnaire />
    </div>
  );
}
