'use client';

import React from 'react';
import { QuestionnaireItem } from '@/api/questionnaire/model/questionnaire-item';
import { AnfStatementConnector } from '@/api/questionnaire/model/anf-statement-connector';
const Report = () => {
  const [groupedItems, setGroupedItems] = React.useState<
    Record<string, QuestionnaireItem[]>
  >({});

  React.useEffect(() => {
    const fetchData = async () => {
      const formData = JSON.parse(
        localStorage.getItem('questionnaire-store') as string,
      );
      const groupedItem: Record<string, QuestionnaireItem[]> = {};

      if (formData?.item) {
        formData?.item?.forEach((item: QuestionnaireItem) => {
          const connectors = item.anfStatementConnector;

          if (connectors) {
            connectors.slice(0, 1).forEach((connector: AnfStatementConnector, index) => {
              const type = connector.anfStatementType || 'UNRECOGNIZED';

              if (!groupedItem[type]) {
                groupedItem[type] = [];
              }
              if (!groupedItem[type].includes(item)) {
                groupedItem[type].push(item);
              }
            });
          }
        });
        setGroupedItems(groupedItem);
      }
    };

    fetchData();
  }, [localStorage.getItem('questionnaire-store')]);

  return (
    <>
      <div className="flex flex-col p-4 ">
        <div className="overflow-x-auto rounded-lg shadow-md">
          {/* Added rounded corners and shadow */}
          <table className="min-w-full divide-y divide-gray-200">
            {/* Set minimum width and divider */}
            <tbody>
              {Object.entries(groupedItems).map(([key, items]) => (
                <tr key={key}>
                  <td className="px-4 py-2 border border-gray-300">
                    {/* Truncate long text */}
                    List of components [<strong>{key}</strong>]
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <ul className="list-disc pl-4 space-y-1">
                      {/* Added spacing between list items */}
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
