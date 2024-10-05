import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled
const ListQuestionaree = dynamic(
  () => import('@/components/form-builder/views/list-questionnaire'),
  { ssr: false, loading: () => <Loading /> }
);

// Loading component
const Loading = () => <div>Loading...</div>;

export default function FormBuilderPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ListQuestionaree />
    </Suspense>
  );
}
