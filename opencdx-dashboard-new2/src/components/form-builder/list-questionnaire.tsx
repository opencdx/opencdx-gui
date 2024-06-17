'use client';

import React, { useEffect, useState } from 'react';



import { useRouter } from 'next/navigation';



import { Endpoints } from '@/axios/apiEndpoints';
import { useAnfFormStore } from '@/lib/useAnfFormStore';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { Download, Eye, FilePenLine, LayoutGrid, LayoutList, Trash2 } from 'lucide-react';
import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';






import 'react-json-view-lite/dist/index.css';



import { toast } from 'react-toastify';





export default function ListQuestionnaire() {
  const [isGrid, setIsGrid] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [json, setJson] = useState({} as any);
  const router = useRouter();

  const { setFormData } = useAnfFormStore();

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
      <div
        className="flex items-center mb-2 justify-end px-3 py-2"
        id="view-toggle"
        role="group"
        aria-labelledby="view-toggle-label"
        aria-orientation="horizontal"
        aria-label="View Toggle"
      >
        <Button
          id="grid-view-btn"
          className={`focus:outline-none px-4 py-2 rounded-md text-sm font-medium ${
            isGrid
              ? 'text-gray-700 bg-white hover:bg-gray-100'
              : 'text-gray-500'
          } dark:text-gray-400 dark:bg-gray-700`}
          onClick={handleViewToggle}
          startContent={<LayoutGrid size={16} />}
        >
          Grid
        </Button>
        <Button
          id="list-view-btn"
          className={`focus:outline-none mx-2 px-4 py-2 rounded-md text-sm font-medium ${
            !isGrid
              ? 'text-gray-700 bg-white hover:bg-gray-100'
              : 'text-gray-500'
          } dark:text-gray-400 dark:bg-gray-700`}
          onClick={handleViewToggle}
          startContent={<LayoutList size={16} />}
        >
          List
        </Button>
      </div>

      {!isGrid ? (
        <div
          id="user-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  dark:bg-gray-800 p-2 sm:p-4 md:p-4 lg:p-4 bg-gray-100"
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
                    ></div>
                    <span>
                      {questionnaire.status === 'active' ? 'Active' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Button
                    onPress={() => {
                      setJson(questionnaire);
                      onOpen();
                    }}
                    className="py-2"
                  >
                    View
                  </Button>
                  <Button
                    onPress={() => {
                      setFormData(questionnaire);
                            localStorage.setItem(
                              'questionnaire-store',
                              JSON.stringify(questionnaire),
                            );

                      router.push(`/edit-questionnaire/${questionnaire.id}`);
                    }}
                    className="py-2"
                  >
                    Edit
                  </Button>
                  <Button
                    onPress={() => {
                      setJson(questionnaire);
                      handleDownload();
                    }}
                    className="py-2"
                  >
                    Download
                  </Button>
                  <Button
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
                    className="py-2"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ),
          )}
        </div>
      ) : (
        <table
          id="user-table"
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Last Updated
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
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
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
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
                      ></div>
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
                    <Button
                      isIconOnly
                      onPress={() => {
                        setJson(questionnaire);
                        onOpen();
                      }}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
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
                    </Button>
                    <Button
                      isIconOnly
                      onPress={() => {
                        setJson(questionnaire);
                        handleDownload();
                      }}
                    >
                      <Download size={16} />
                    </Button>
                    <Button
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
                    </Button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
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
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}