'use client';
import React, { Suspense, useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/custom/loading';
import {
  BreadcrumbItem,
  Breadcrumbs,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Button as NButton,
  Tooltip
} from 'ui-library';
import { Link, Tab, Tabs } from 'ui-library';
import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button } from '@mui/material';
import 'react-json-view-lite/dist/index.css';
import Image from 'next/image';
import { Key } from 'react';

import { Questionnaire } from '@/api/questionnaire/model/questionnaire';
import { Timestamp } from '@/api/questionnaire/model/timestamp';
import {
  useCurrentUser,
  useDeleteQuestionnaire,
  useGetQuestionnaireList,
} from '@/hooks/iam-hooks';
import { useQuestionnaireStore } from '@/hooks/questionnaire';
import { toast, ToastContainer } from 'react-toastify';
import GridView from './grid-view';
import ListView from './list-view';

export default function ListQuestionnaire() {
  const { data: currentUser } = useCurrentUser();
  const { mutate: deleteQuestionnaire } = useDeleteQuestionnaire();
  const { mutate: getQuestionnaireDataList, error, data } = useGetQuestionnaireList();
  const router = useRouter();
  const { updateQuestionnaire } = useQuestionnaireStore();

  const [isGrid, setIsGrid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    content: null,
    footer: null,
    height: 'md:h-5/6 lg:h-5/6', // Add this line
  });

  useEffect(() => {
    if (currentUser?.data?.iamUser?.id) {
      localStorage.setItem('id', currentUser.data.iamUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        await getQuestionnaireDataList({
          pagination: { pageSize: 300, sortAscending: true },
          updateAnswers: true,
        });
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionnaires();
  }, [getQuestionnaireDataList]);

  const handleViewToggle = useCallback((key: Key) => setIsGrid(key === 'grid'), []);

  const convertDate = useCallback((date: Timestamp | undefined) => {
    if (!date) return '';
    const d = new Date(date as Date);
    return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}/${d.getFullYear()}`;
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.match('application/json')) {
      toast.error('Please select a valid JSON file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const formData = JSON.parse(event.target?.result as string);
        delete formData.id;
        updateQuestionnaire(formData);
        router.push('/edit-questionnaire/upload-questionnaire');
      } catch (error) {
        toast.error('Error parsing the selected file.');
      }
    };
    reader.readAsText(file);
  }, [updateQuestionnaire, router]);

  const handleDownload = useCallback((questionnaire: Questionnaire) => {
    const blob = new Blob([JSON.stringify(questionnaire)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${questionnaire.title}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  const openModal = useCallback((config: any) => {
    setModalConfig({ ...config, isOpen: true, height: config.height || 'md:h-5/6 lg:h-5/6' });
  }, []);

  const closeModal = useCallback(() => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handleView = useCallback((questionnaire: Questionnaire) => {
    openModal({
      title: `Preview JSON: ${questionnaire.title}`,
      content: <JsonView data={questionnaire} shouldExpandNode={allExpanded} style={defaultStyles} />,
      footer: <NButton color="primary" variant="solid" onPress={closeModal}>Close</NButton>,
    });
  }, [openModal]);

  const handleEdit = useCallback((questionnaire: Questionnaire) => {
    updateQuestionnaire(questionnaire);
    router.push(`/edit-questionnaire/${questionnaire.id}`);
  }, [updateQuestionnaire, router]);

  const handleDelete = useCallback((id: string) => {
    openModal({
      title: 'Delete this form?',
      height: 'md:h-2/8 lg:h-2/8',
      content: <p>Are you sure you want to delete this form? This action cannot be undone.</p>,
      footer: (
        <>
          <NButton color="primary" variant='bordered' onPress={closeModal} aria-label='Cancel' tabIndex={0} size='lg'>
            Cancel
          </NButton>
          <NButton
            color="danger"
            aria-label='Delete'
            tabIndex={0}
            size='lg'
            onPress={() => {
              closeModal();
              deleteQuestionnaire(id);
              if (data?.data?.questionnaires) {
                const index = data.data.questionnaires.findIndex((q: Questionnaire) => q.id === id);
                if (index !== -1) {
                  data.data.questionnaires.splice(index, 1);
                }
              }
            }}
          >
            Delete
          </NButton>
        </>
      ),
    });
  }, [openModal, deleteQuestionnaire]);

  const renderContent = useMemo(() => (
    <div className="p-4 md:p-8 lg:p-8">
      {/* Header and controls */}
      <div className="flex flex-row justify-between items-center bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center  justify-center space-x-4 align-center ">
          <Image src="/images/dynamic_form.png" alt="Dynamic Form" width={48} height={48} />
          <div className="flex flex-col space-y-1">
            <h1 className="text-base font-semibold">Forms Builder</h1>
            <Breadcrumbs className="mb-4" separator="/" >
              <BreadcrumbItem href="/form-builder" >Dashboard</BreadcrumbItem>
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
          <Tooltip content="Start New Form Builder" placement="top"
            classNames={{
              base: "rounded-md",
              content: "bg-gray-900 text-white text-sm max-w-xs break-words"
            }}
          >
            <NButton color="primary"
              onClick={() => {
                router.push('/edit-questionnaire/new-questionnaire');
              }}
            >Create New Form <Image src="/images/dynamic_form_transparent.png" alt="Upload" width={20} height={20} /></NButton>
          </Tooltip>
          <Tooltip content="Upload Form" placement="top"
            classNames={{
              base: "rounded-md",
              content: "bg-gray-900 text-white text-sm max-w-xs break-words"
            }}
          >
            <Button
              color="primary"
              component="label"
              endIcon={<Image src="/images/file_upload_transparent.png" alt="Upload" width={20} height={20} />}
              variant="contained"
              size="small"
              aria-label="Upload Form"
              style={{
                width: '175px',
                borderRadius: '12px',
                backgroundColor: 'hsl(var(--nextui-primary) / var(--nextui-primary-opacity, var(--tw-bg-opacity)))'
              }}
              className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover p-0 h-[40px]"
            >
              Upload Form
              <input
                hidden
                type="file"
                onChange={handleFileUpload}
                data-testid="upload-form"
              />
            </Button>
          </Tooltip>
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

      {/* Grid or List View */}
      {isGrid ? (
        <GridView
          questionnaires={data?.data?.questionnaires || []}
          onView={handleView}
          onDownload={handleDownload}
          onEdit={handleEdit}
          onDelete={handleDelete}
          convertDate={convertDate}
        />
      ) : (
        <ListView
          questionnaires={data?.data?.questionnaires || []}
          onView={handleView}
          onDownload={handleDownload}
          onEdit={handleEdit}
          onDelete={handleDelete}
          convertDate={convertDate}
          pagination={data?.data?.pagination}
        />
      )}

      {/* Modal */}
      <Modal 
        isOpen={modalConfig.isOpen} 
        placement="auto"
        onOpenChange={closeModal}
        hideCloseButton={true}
        radius="none"
        className={`w-full md:w-11/12 lg:w-4/5 ${modalConfig.height} overflow-auto`}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">{modalConfig.title}</ModalHeader>
              <ModalBody className="w-full overflow-auto bg-white">{modalConfig.content}</ModalBody>
              <ModalFooter>{modalConfig.footer}</ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <ToastContainer />
    </div>
  ), [isGrid, data, handleView, handleDownload, handleEdit, handleDelete, convertDate, modalConfig, closeModal]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loading />
      </div>
    );
  }

  return <Suspense fallback={<Loading />}>{renderContent}</Suspense>;
}