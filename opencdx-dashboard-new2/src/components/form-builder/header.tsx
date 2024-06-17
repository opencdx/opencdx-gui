'use client';

import React from 'react';



import Image from 'next/image';
import { useRouter } from 'next/navigation';



import { useAnfFormStore } from '@/lib/useAnfFormStore';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Upload } from 'lucide-react';





export default function BuilderHeader() {
  const { setFormData } = useAnfFormStore();
  const router = useRouter();

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    overflow: 'hidden',
    position: 'absolute',
  });

  const handleChange = (e: { target: { files: Blob[] } }) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = (e) => {
      const formData = e.target?.result
        ? JSON.parse(e.target.result as string)
        : null;
      setFormData(formData);
      localStorage.setItem('questionnaire-store', JSON.stringify(formData));
      const newQuestionnaire = 'new-questionnaire';
      router.push(`/edit-questionnaire/${newQuestionnaire}`);
    };
  };
  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 justify-between">
      <Image alt="nextui logo" height={40} src="/opencdx.png" width={100} />
      <div className="ml-4 flex items-center gap-3">
        <div className="flex items-center gap-3">
          <Button
            // @ts-ignore: Unreachable code error
            onChange={handleChange}
            component="label"
            variant="contained"
            startIcon={<Upload size={16} />}
          >
            <VisuallyHiddenInput type="file" />
          </Button>
        </div>
      </div>
    </header>
  );
}