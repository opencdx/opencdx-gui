'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import { Button as NButton } from '@nextui-org/button';
import {
  BreadcrumbItem,
  Breadcrumbs,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from '@nextui-org/react';
import {
  Download,
  Eye,
  FilePenLine,
  Trash2,
  UploadIcon,
} from 'lucide-react';
import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';

import 'react-json-view-lite/dist/index.css';

import { Endpoints } from '@/axios/apiEndpoints';
import { Questionnaire, Timestamp } from '@/generated-api-ts/questionnaire/api';
import { useAnfFormStore } from '@/lib/useAnfFormStore';
import { toast, ToastContainer } from 'react-toastify';

export default function ListQuestionnaire() {
  const [isGrid, setIsGrid] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [json, setJson] = useState({} as any);
  const router = useRouter();

  const { setFormData } = useAnfFormStore() as { setFormData: any };

  const [questionnaires, setQuestionnaires] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      Endpoints.getQuestionnaireList({
        pagination: {
          pageSize: 300,
          sortAscending: true,
        },
        updateAnswers: true,
      })
        .then((response) => {
          const data = response.data.questionnaires;

          data.sort(
            (
              a: { modified: string | number | Date },
              b: { modified: string | number | Date },
            ) =>
              new Date(b.modified).getTime() - new Date(a.modified).getTime(),
          );
          setQuestionnaires(data);
        })
        .catch(() => {
          console.log('Error fetching data');
        });
    };

    fetchData();
  }, []);

  const handleViewToggle = () => {
    setIsGrid(!isGrid);
  };
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg sm:overflow-hidden dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg dark:text-white dark:border-gray-700 mt-4">
      
       <div className="flex flex-row justify-between items-center m-4">
              <div >
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Form Builder
                </h1>
                <Breadcrumbs>
                  <BreadcrumbItem href="/form-builder">
                    Dashboard
                  </BreadcrumbItem>
                  <BreadcrumbItem href="/form-builder">
                    Form Builder
                  </BreadcrumbItem>
                 
                </Breadcrumbs>
              </div>
              <div className="flex flex-row justify-between items-center">
              <div className="p-2">
          <Button
            color="primary"
            component="label"
            endIcon={<UploadIcon />}
            variant="contained"
            size="small"
            aria-label="Upload Form"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-48 h-10"
            onChange={handleChange}
            data-testid="upload-form"
    
          >
            Upload Form
            <input hidden type="file" />
          </Button>
        </div>
        <Tabs
          aria-label="Options"
          color="primary"
          variant="bordered"
          onSelectionChange={handleViewToggle}
        >
          <Tab
            key="list"
            title={
              <div className="flex items-center space-x-2">
                <span>Grid View</span>
              </div>
            }
          />
          <Tab
            key="grid"
            title={
              <div className="flex items-center space-x-2">
                <span>List View</span>
              </div>
            }
          />
        </Tabs>
              </div>
            </div>
            
      
      
      {!isGrid ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  dark:bg-gray-800 p-2 sm:p-4 md:p-4 lg:p-4 bg-gray-100"
          id="user-grid"
        >
          {questionnaires.map((questionnaire: Questionnaire) => (
            <div
              key={questionnaire.id}
              className="px-6 py-4 rounded-lg shadow-sm bg-white dark:bg-gray-800"
            >
              <div className="flex items-center mb-2">
                <div className="ml-4">
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {questionnaire.title}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {convertDate(questionnaire.modified)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <div
                    className={`h-2.5 w-2.5 rounded-full bg-${questionnaire.status} me-2`}
                  />
                  <span>
                    {questionnaire.status === 'active' ? 'Active' : 'Draft'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <NButton
                  className="py-2"
                  onPress={() => {
                    setJson(questionnaire);
                    onOpen();
                  }}
                >
                  View
                </NButton>
                <NButton
                  className="py-2"
                  onPress={() => {
                    setFormData(questionnaire);
                    localStorage.setItem(
                      'questionnaire-store',
                      JSON.stringify(questionnaire),
                    );

                    router.push(`/edit-questionnaire/${questionnaire.id}`);
                  }}
                >
                  Edit
                </NButton>
                <NButton
                  className="py-2"
                  onPress={() => {
                    setJson(questionnaire);
                    handleDownload(questionnaire);
                  }}
                >
                  Download
                </NButton>
                <NButton
                  className="py-2"
                  onPress={() => {
                    const params = {
                      id: questionnaire.id,
                    };
                    const fetchData = async () => {
                      Endpoints.deleteQuestionnaireById(params)
                        .then((response) => {
                          toast.success(response.data.message);
                          setQuestionnaires(
                            questionnaires.filter(
                              (item: any) => item.id !== questionnaire.id,
                            ),
                          );
                        })
                        .catch(() => {
                          console.log('Error fetching data');
                        });
                    };

                    fetchData();
                  }}
                >
                  Delete
                </NButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          id="user-table"
        >
          <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3" scope="col">
                Form Title
              </th>
              <th className="px-6 py-3" scope="col">
                Last Updated
              </th>
              <th className="px-6 py-3" scope="col">
                Status
              </th>
              <th className="px-6 py-3" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {questionnaires.map((questionnaire: Questionnaire) => (
              <tr
                key={questionnaire.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  scope="row"
                >
                  <div className="ps-3">
                    <div className="text-base font-semibold text-gray-900 dark:text-white dark:text-gray-400 dark:text-white text-wrap w-96">
                      {questionnaire.title}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {convertDate(questionnaire.modified)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full bg-${questionnaire.status} me-2`}
                    />
                    <span>
                      <span>
                        {questionnaire.status === 'active' ? 'Active' : 'Draft'}
                      </span>
                    </span>
                  </div>
                </td>
                <td className=" text-sm font-medium px-6 py-4 whitespace-nowrap space-x-2">
                  <NButton
                    isIconOnly
                    onPress={() => {
                      setJson(questionnaire);
                      onOpen();
                    }}
                  >
                    <Eye size={16} />
                  </NButton>
                  <NButton
                    isIconOnly
                    onPress={() => {
                      setFormData(questionnaire);
                      localStorage.setItem(
                        'questionnaire-store',
                        JSON.stringify(questionnaire),
                      );
                      router.push(`/edit-questionnaire/${questionnaire.id}`);
                    }}
                  >
                    <FilePenLine size={16} />
                  </NButton>
                  <NButton
                    isIconOnly
                    onPress={() => {
                      setJson(questionnaire);
                      handleDownload(questionnaire);
                    }}
                  >
                    <Download size={16} />
                  </NButton>
                  <NButton
                    isIconOnly
                    onPress={() => {
                      const params = {
                        id: questionnaire.id,
                      };
                      const fetchData = async () => {
                        Endpoints.deleteQuestionnaireById(params)
                          .then((response) => {
                            toast.success(response.data.message);
                            setQuestionnaires(
                              questionnaires.filter(
                                (item: any) => item.id !== questionnaire.id,
                              ),
                            );
                          })
                          .catch(() => {
                            console.log('Error fetching data');
                          });
                      };

                      fetchData();
                    }}
                  >
                    <Trash2 size={16} />
                  </NButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  );
}
