'use client';

import React from 'react';

import { EditQuestionnaire } from '@/components/form-builder/edit-questionnaire';

export default function EditQuestionareePage({
  params,
}: {
  params: { slug: string; questionnaire: any };
}) {
  const id = params.slug;

  return (
    <div>
      <EditQuestionnaire />
    </div>
  );
}
