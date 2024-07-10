'use client';

import React from 'react';

import {
  AnfStatementConnector,
  QuestionnaireItem,
} from '@/generated-api-ts/questionnaire/api';

const Report = () => {
  const [groupedItems, setGroupedItems] = React.useState<
    Record<string, QuestionnaireItem[]>
  >({});

  React.useEffect(() => {
    const fetchData = async () => {
      const local = await localStorage.getItem('questionnaire-store');
      const formData = JSON.parse(local as string);
      const groupedItem: Record<string, QuestionnaireItem[]> = {};

      if (formData?.item) {
        formData?.item?.forEach((item: QuestionnaireItem) => {
          const connectors = item.anfStatementConnector;
          if (connectors) {
            connectors.forEach((connector: AnfStatementConnector) => {
              const type = connector.anfStatementType || 'UNRECOGNIZED';
              if (!groupedItem[type]) {
                groupedItem[type] = [];
              }
              groupedItem[type].push(item);
            });
          }
        });
        setGroupedItems(groupedItem);
      }
    };

    fetchData();
  }, []);

  return (
    <>
     <div className="flex flex-col p-4 ">
        <div className="overflow-x-auto rounded-lg shadow-md"> {/* Added rounded corners and shadow */}
          <table className="min-w-full divide-y divide-gray-200"> {/* Set minimum width and divider */}
            <thead>
              <tr className="bg-gray-500 text-white"> {/* Darker header background */}
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Text</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedItems).map(([key, items]) => (
                <tr key={key}>
                  <td className="px-4 py-2 border border-gray-300"> {/* Truncate long text */}
                    List of components [<strong>{key}</strong>]
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <ul className="list-disc pl-4 space-y-1"> {/* Added spacing between list items */}
                      {items.map((item, i) => (
                        <li key={i}>{item.text}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export { Report };

