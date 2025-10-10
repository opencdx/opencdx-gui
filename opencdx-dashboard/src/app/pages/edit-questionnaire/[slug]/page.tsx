'use client';

import Edit from '@/components/form-builder/edit';
import { PageErrorBoundary } from '@/components/custom/page-error-boundary';

export default function EditQuestionnairePage({ params }: { params: { slug: string } }) {
  return (
    <PageErrorBoundary componentName="Questionnaire Editor">
      <Edit questionnaireId={params.slug} />
    </PageErrorBoundary>
  );
}
