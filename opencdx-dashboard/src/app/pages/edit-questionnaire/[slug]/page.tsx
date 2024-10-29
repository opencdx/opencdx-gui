'use client';

import Edit from '@/components/form-builder/edit';

export default function EditQuestionnairePage({ params }: { params: { slug: string } }) {
  return <Edit questionnaireId={params.slug} />;
}
