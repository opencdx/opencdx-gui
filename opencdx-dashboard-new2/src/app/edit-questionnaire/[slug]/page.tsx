'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { EditQuestionnaire } from '@/components/form-builder/edit-questionnaire';
import { Button } from '@nextui-org/button';
import { ChevronLeft } from 'lucide-react';

export default function EditQuestionareePage({
  params,
}: {
  params: { slug: string; questionnaire: any };
}) {
  const id = params.slug;
  const router = useRouter();
  return (
    <div>
      <Button
        className="mb-4 mt-4 ml-4"
        onPress={() => {
          router.push('/form-builder');
        }}
        startContent={<ChevronLeft size={16} />}
      >
        Back
      </Button>
      <EditQuestionnaire  />
    </div>
  );
}
