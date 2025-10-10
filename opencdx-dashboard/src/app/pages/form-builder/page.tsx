import React from 'react';

import ListQuestionaree from '@/components/form-builder/views/list-questionnaire'
import { PageErrorBoundary } from '@/components/custom/page-error-boundary';

export default function FormBuilderPage() {
  return (
    <PageErrorBoundary componentName="Form Builder">
      <ListQuestionaree />
    </PageErrorBoundary>
  );
}
