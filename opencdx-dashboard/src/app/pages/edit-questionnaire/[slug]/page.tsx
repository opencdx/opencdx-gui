'use client';

import { use } from 'react';
import Edit from '@/components/form-builder/edit';
import { PageErrorBoundary } from '@/components/custom/page-error-boundary';

export default function EditQuestionnairePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  return (
    <PageErrorBoundary componentName="Questionnaire Editor">
      <Edit questionnaireId={slug} />
    </PageErrorBoundary>
  );
}
