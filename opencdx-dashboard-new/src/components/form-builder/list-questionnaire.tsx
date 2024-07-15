'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import { Button as NButton } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import {
  Download,
  Eye,
  FilePenLine,
  LayoutGrid,
  LayoutList,
  Trash2,
  UploadIcon,
} from 'lucide-react';
import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';

import 'react-json-view-lite/dist/index.css';

import { Endpoints } from '@/axios/apiEndpoints';
import { useAnfFormStore } from '@/lib/useAnfFormStore';
import { toast } from 'react-toastify';

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
  const convertDate = (
    date:
      | string
      | number
      | bigint
      | boolean
      | Date
      | Promise<React.AwaitedReactNode>
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | null
      | undefined,
  ) => {
    //@ts-ignore
    return new Date(date).toLocaleDateString();
  };
  const handleChange = (e: any) => {
    const fileReader = new FileReader();

    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = (e) => {
      const formData = e.target?.result
        ? JSON.parse(e.target.result as string)
        : null;

      delete formData.id;
      setFormData(formData);
      localStorage.setItem('questionnaire-store', JSON.stringify(formData));
      const newQuestionnaire = 'new-questionnaire';

      router.push(`/edit-questionnaire/${newQuestionnaire}`);
    };
  };
  const handleDownload = () => {
    const data = JSON.stringify(json);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'anf.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg sm:overflow-hidden dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg dark:text-white dark:border-gray-700 mt-4">
      <div className="flex items-center justify-between px-3 py-2">
        <div
          aria-label="View Toggle"
          aria-labelledby="view-toggle-label"
          aria-orientation="horizontal"
          className="flex items-center mb-2 justify-start px-3 py-2"
          id="upload"
          role="group"
        >
          <Button
            color="primary"
            component="label"
            startIcon={<UploadIcon />}
            variant="contained"
            onChange={handleChange}
          >
            <input hidden type="file" />
          </Button>
        </div>
        <div
          aria-label="View Toggle"
          aria-labelledby="view-toggle-label"
          aria-orientation="horizontal"
          className="flex items-center mb-2 justify-end px-3 py-2"
          id="view-toggle"
          role="group"
        >
          <NButton
            className={`focus:outline-none px-4 py-2 rounded-md text-sm font-medium ${
              isGrid
                ? 'text-gray-700 bg-white hover:bg-gray-100'
                : 'text-gray-500'
            } dark:text-gray-400 dark:bg-gray-700`}
            id="grid-view-btn"
            startContent={<LayoutGrid size={16} />}
            onClick={handleViewToggle}
          >
            Grid
          </NButton>
          <NButton
            className={`focus:outline-none mx-2 px-4 py-2 rounded-md text-sm font-medium ${
              !isGrid
                ? 'text-gray-700 bg-white hover:bg-gray-100'
                : 'text-gray-500'
            } dark:text-gray-400 dark:bg-gray-700`}
            id="list-view-btn"
            startContent={<LayoutList size={16} />}
            onClick={handleViewToggle}
          >
            List
          </NButton>
        </div>
      </div>
      {!isGrid ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  dark:bg-gray-800 p-2 sm:p-4 md:p-4 lg:p-4 bg-gray-100"
          id="user-grid"
        >
          {questionnaires.map(
            (questionnaire: {
              id: React.Key | null | undefined;
              title:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
              modified:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
              status: string;
            }) => (
              <div
                key={questionnaire.id}
                className="px-6 py-4 rounded-lg shadow-sm bg-white dark:bg-gray-800"
              >
                <div className="flex items-center mb-2">
                  <div className="ml-4">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {questionnaire.title}
                    </h3>
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
                      handleDownload();
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
            ),
          )}
        </div>
      ) : (
        <table
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          id="user-table"
        >
          <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3" scope="col">
                Title
              </th>
              <th className="px-6 py-3" scope="col">
                Last Updated
              </th>
              <th className="px-6 py-3" scope="col">
                Status
              </th>
              <th className="px-6 py-3" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {questionnaires.map(
              (questionnaire: {
                id: React.Key | null | undefined;
                title:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
                modified:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
                status: string;
              }) => (
                <tr
                  key={questionnaire.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    scope="row"
                  >
                    <div className="ps-3">
                      <div className="text-base font-semibold">
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
                          {questionnaire.status === 'active'
                            ? 'Active'
                            : 'Draft'}
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
                        handleDownload();
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
              ),
            )}
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
    </div>
  );
}
