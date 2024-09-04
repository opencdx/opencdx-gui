'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/custom/loading';
import { Button as NButton } from '@nextui-org/button';
import {
  BreadcrumbItem,
  Breadcrumbs,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from 'ui-library';
import { Link, Tab, Tabs } from 'ui-library';
import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArrowBackIcon  from '@mui/icons-material/ArrowBack'
import { Button } from '@mui/material';
import 'react-json-view-lite/dist/index.css';
import Image from 'next/image';
import { Key } from 'react'; // Add this import at the top of the file

import { Questionnaire } from '@/api/questionnaire/model/questionnaire';
import { Timestamp } from '@/api/questionnaire/model/timestamp';
import {
  useCurrentUser,
  useDeleteQuestionnaire,
  useGetQuestionnaireList,
} from '@/hooks/iam-hooks';
import { useAnfFormStore } from '@/lib/useAnfFormStore';
import { toast, ToastContainer } from 'react-toastify';
import GridView from './GridView';
import ListView from './ListView';

export default function ListQuestionnaire() {
  const { data: currentUser } = useCurrentUser();
  const { mutate: deleteQuestionnaire } = useDeleteQuestionnaire();

  const {
    mutate: getQuestionnaireDataList,
    error,
    data,
  } = useGetQuestionnaireList();

  const [isGrid, setIsGrid] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [json, setJson] = useState({} as any);
  const router = useRouter();

  const { setFormData } = useAnfFormStore() as { setFormData: any };
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const id = currentUser?.data?.iamUser?.id;
    localStorage.setItem('id', id || '');
  }, [currentUser]);

  useEffect(() => {
    const getQuestionnaire = async () => {
      const params = {
        pagination: {
          pageSize: 300,
          sortAscending: true,
        },
        updateAnswers: true,
      };
      await getQuestionnaireDataList(params);

      setIsLoading(false);
    };
    getQuestionnaire();
    if (error) {
      setIsLoading(false);

      console.log('Error fetching data');
    }
  }, []);

  const handleViewToggle = (key: Key) => {
    setIsGrid(key === 'grid');
  }
  const convertDate = (date: Timestamp | undefined) => {
    if (!date) return ''; // Handle missing dates
    return new Date(date as Date).toLocaleDateString(); // Assert as Date
  };
  const handleChange = (e: any) => {
    const file = e.target.files[0];

    if (!file) {
      return; // Handle no file selected case
    }
    // Check file type using MIME type
    if (!file.type.match('application/json')) {
      toast.error('Please select a valid JSON file.');
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsText(file, 'UTF-8');
    fileReader.onload = (e) => {
      const formData = e.target?.result
        ? JSON.parse(e.target.result as string)
        : null;

      if (!formData) {
        toast.error('Error parsing the selected file.');

        return;
      }

      // Rest of your code to process the parsed JSON data
      delete formData.id;
      setFormData(formData);
      localStorage.setItem('questionnaire-store', JSON.stringify(formData));
      const newQuestionnaire = 'new-questionnaire';
      router.push(`/edit-questionnaire/${newQuestionnaire}`);
    };
  };

  const handleDownload = (questionnaire: Questionnaire) => {
    const data = JSON.stringify(questionnaire);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${questionnaire.title}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Suspense fallback={<Loading />}>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loading />
        </div>
      ) : (
        <div className="p-4 md:p-8 lg:p-8">
          <div className="flex flex-row justify-between items-center bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center  justify-center space-x-4 align-center ">
              <Image src="/images/dynamic_form.png" alt="Dynamic Form" width={48} height={48} />
              <div className="flex flex-col space-y-1">
                <h1 className="text-base font-semibold">Forms Builder</h1>
                <Breadcrumbs className="mb-4">
                  <BreadcrumbItem href="/form-builder">Dashboard</BreadcrumbItem>
                  <BreadcrumbItem>Forms Builder</BreadcrumbItem>
                </Breadcrumbs>
              </div>

            </div>
            <div className="flex items-center space-x-2">
              <Link href="/form-builder">
              <NButton
                    className="mr-4"
                    color="primary"
                    variant="bordered"
                  >
                    <ArrowBackIcon className="w-4 h-4 inline" />
                    Back

                  </NButton>
               
              </Link>
              <NButton color="primary">Create New Form <Image src="/images/dynamic_form_transparent.png" alt="Upload" width={20} height={20} /></NButton>

                <Button
                  color="primary"
                  component="label"
                  endIcon={<Image src="/images/file_upload_transparent.png" alt="Upload" width={20} height={20} />}
                  variant="contained"
                  size="small"
                  aria-label="Upload Form"
                  style={{ textTransform: 'unset' }}

                  className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover p-0 h-[40px]"
                  onChange={handleChange}
                  data-testid="upload-form"
                >
                  Upload Form
                  <input hidden type="file" />
                </Button>

              <Tabs
                aria-label="View options"
                color="primary"
                variant='solid'
                onSelectionChange={handleViewToggle}
              >
                <Tab key="list" title="List View" />
                <Tab key="grid" title="Grid View" />
              </Tabs>
            </div>
          </div>


          {!isGrid ? (
            <GridView
              questionnaires={data?.data?.questionnaires || []} // Provide default empty array
              onView={(questionnaire) => { setJson(questionnaire); onOpen(); }}
              onDownload={handleDownload}
              onEdit={(questionnaire) => {
                console.log('questionnaire', questionnaire);
               // setFormData(questionnaire);
                //localStorage.setItem('questionnaire-store', JSON.stringify(questionnaire));
                router.push(`/edit-questionnaire/${questionnaire.id}`);
              }}
              onDelete={(id) => {
                deleteQuestionnaire(id);
                if (data?.data?.questionnaires) { // Check if questionnaires exist
                  data.data.questionnaires = data.data.questionnaires.filter(
                    (item: Questionnaire) => item.id !== id
                  );
                }
              }}
              convertDate={convertDate}
            />
          ) : (
            <ListView
              questionnaires={data?.data?.questionnaires || []} // Provide default empty array
              onView={(questionnaire) => { setJson(questionnaire); onOpen(); }}
              onDownload={handleDownload}
              onEdit={(questionnaire) => {
                setFormData(questionnaire);
                localStorage.setItem('questionnaire-store', JSON.stringify(questionnaire));
                router.push(`/edit-questionnaire/${questionnaire.id}`);
              }}
              onDelete={(id) => {
                deleteQuestionnaire(id);
                if (data?.data?.questionnaires) { // Check if questionnaires exist
                  data.data.questionnaires = data.data.questionnaires.filter(
                    (item: Questionnaire) => item.id !== id
                  );
                }
              }}
              convertDate={convertDate}
              pagination={data?.data?.pagination}
            />
          )}

          <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
            <ModalContent className="w-[100%] md:w-[100%] lg:w-[100%] h-[100%] md:h-[90%] lg:h-[90%] max-h-[90%] md:max-h-[90%] lg:max-h-[90%] overflow-auto">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Preview JSON
                  </ModalHeader>
                  <ModalBody className="w-[100%] md:w-[100%] lg:w-[100%] h-[100%] md:h-[0%] lg:h-[100%] max-h-[100%] md:max-h-[100%] lg:max-h-[100%] overflow-auto">
                    <JsonView
                      data={json}
                      shouldExpandNode={allExpanded}
                      style={defaultStyles}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <NButton color="danger" variant="light" onPress={onClose}>
                      Close
                    </NButton>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <ToastContainer />
        </div>
      )}
    </Suspense>
  );
}
