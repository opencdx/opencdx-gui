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
  Button ,
  Tooltip,
  LeftChevronIcon
} from 'ui-library';
import { Link, Tab, Tabs } from 'ui-library';
import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';
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

import dynamicForm from '../../../../public/images/dynamic_form.png';
import dynamicFormTransparent from '../../../../public/images/dynamic_form_transparent.png';
import fileUploadTransparent from '../../../../public/images/file_upload_transparent.png';

export default function ListQuestionnaire() {
  const { data: currentUser } = useCurrentUser();
  const { mutate: deleteQuestionnaire } = useDeleteQuestionnaire();
  const { mutate: getQuestionnaireDataList, error, data } = useGetQuestionnaireList();
  const router = useRouter();
  const { updateQuestionnaire } = useQuestionnaireStore();

  const [isGrid, setIsGrid] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedIsGrid = localStorage.getItem('isGrid');
      return storedIsGrid ? JSON.parse(storedIsGrid) : true;
    }
    return true;
  });

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
    localStorage.setItem('isGrid', JSON.stringify(isGrid));
  }, [isGrid]);

  const fetchQuestionnaires = useCallback(async () => {
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
  }, [getQuestionnaireDataList]);

  useEffect(() => {
    fetchQuestionnaires();
  }, [fetchQuestionnaires]);

  const handleViewToggle = useCallback((key: Key) => {
    const newIsGrid = key === 'grid';
    setIsGrid(newIsGrid);
    localStorage.setItem('isGrid', JSON.stringify(newIsGrid));
  }, []);

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
        router.push('/pages/edit-questionnaire/upload-questionnaire');
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

  const modalActions = useMemo(() => ({
    openModal: (config: any) => {
      setModalConfig({ ...config, isOpen: true, height: config.height || 'md:h-5/6 lg:h-5/6' });
    },
    closeModal: () => {
      setModalConfig((prev) => ({ ...prev, isOpen: false }));
    },
  }), []);

  const handleView = useCallback((questionnaire: Questionnaire) => {
    modalActions.openModal({
      title: `Preview JSON: ${questionnaire.title}`,
      content: <JsonView data={questionnaire} shouldExpandNode={allExpanded} style={defaultStyles} />,
      footer: <Button color="primary" variant="solid" onPress={modalActions.closeModal}>Close</Button>,
    });
  }, [modalActions]);

  const handleEdit = useCallback((questionnaire: Questionnaire) => {
    updateQuestionnaire(questionnaire);
    router.push(`/pages/edit-questionnaire/${questionnaire.id}`);
  }, [updateQuestionnaire, router]);

  const handleDelete = useCallback((id: string) => {
    modalActions.openModal({
      title: 'Delete this form?',
      height: 'md:h-2/8 lg:h-2/8',
      content: <p>Are you sure you want to delete this form? This action cannot be undone.</p>,
      footer: (
        <>
          <Button color="primary" variant='bordered' onPress={modalActions.closeModal} aria-label='Cancel' tabIndex={0} size='lg'>
            Cancel
          </Button>
          <Button
            color="danger"
            aria-label='Delete'
            tabIndex={0}
            size='lg'
            onPress={() => {
              modalActions.closeModal();
              deleteQuestionnaire(id);
              if (data?.data?.questionnaires) {
                const updatedQuestionnaires = data.data.questionnaires.filter((q: Questionnaire) => q.id !== id);
                
              }
            }}
          >
            Delete
          </Button>
        </>
      ),
    });
  }, [modalActions, deleteQuestionnaire, data]);

  const renderHeader = useMemo(() => (
    <div className="flex flex-row justify-between items-center bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center  justify-center space-x-4 align-center ">
        <Image src={dynamicForm.src} alt="Dynamic Form" width={48} height={48} priority />
        <div className="flex flex-col space-y-1">
          <h1 className="text-base font-semibold">Forms Builder</h1>
          <Breadcrumbs className="mb-4" separator="/" >
            <BreadcrumbItem href="/dashboard/pages/form-builder" >Dashboard</BreadcrumbItem>
            <BreadcrumbItem>Forms Builder</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Link href="/dashboard/pages/form-builder" aria-label="Back to Dashboard">
          <Button
            className="mr-4"
            color="primary"
            variant="bordered"
          >
            <LeftChevronIcon />
            Back
          </Button>
        </Link>
        <Tooltip content="Start a new Form Builder" placement="top"
          classNames={{
            base: "rounded-md",
            content: "bg-gray-900 text-white text-sm max-w-xs break-words"
          }}
        >
          <Button color="primary"
            onClick={() => {
              router.push('/pages/edit-questionnaire/new-questionnaire');
            }}
          >Create New Form <Image src={dynamicFormTransparent.src} alt="Upload" width={20} height={20} priority /></Button>
        </Tooltip>
        <Tooltip content="Upload Form" placement="top"
          classNames={{
            base: "rounded-md",
            content: "bg-gray-900 text-white text-sm max-w-xs break-words"
          }}
        >
          <label             className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover p-0 h-[40px]"
          >  
            
            <input
              hidden
              type="file"
              onChange={handleFileUpload}
              data-testid="upload-form"
            />
            Upload Form
            <Image src={fileUploadTransparent.src} alt="Upload" width={20} height={20} priority />

          </label>
         
        </Tooltip>
        <Tabs
          color="primary"
          variant='solid'
          onSelectionChange={handleViewToggle}
          selectedKey={isGrid ? 'grid' : 'list'}
        >
          <Tab key="list" title="List View" />
          <Tab key="grid" title="Grid View" />
        </Tabs>
      </div>
    </div>
  ), [router, handleFileUpload, handleViewToggle, isGrid]);

  const renderContent = useMemo(() => (
    <div className="p-4 md:p-8 lg:p-8">
      {renderHeader}
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
          pagination={{
            totalPages: data?.data?.pagination?.totalPages ?? 0,
            totalRecords: data?.data?.pagination?.totalRecords ?? 0,
            pageSize: data?.data?.pagination?.pageSize ?? 0
          }}
          onPageChange={(page) => {
            console.log('Page changed to:', page);
          }}
        />
      )}
      <Modal 
        isOpen={modalConfig.isOpen} 
        placement="auto"
        onOpenChange={modalActions.closeModal}
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
  ), [isGrid, data, handleView, handleDownload, handleEdit, handleDelete, convertDate, modalConfig, modalActions]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loading />
      </div>
    );
  }

  return <Suspense fallback={<Loading />}>{renderContent}</Suspense>;
}
