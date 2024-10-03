'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { QuestionnaireItem } from '@/api/questionnaire/model/questionnaire-item';
import { AnfStatementConnector } from '@/api/questionnaire/model/anf-statement-connector';

const Report = () => {
  const [groupedItems, setGroupedItems] = useState<Record<string, QuestionnaireItem[]>>({});

  useEffect(() => {
    const fetchData = () => {
      const formData = JSON.parse(localStorage.getItem('questionnaire-store') || '{}');
      const groupedItem: Record<string, QuestionnaireItem[]> = {};

      formData?.item?.forEach((item: QuestionnaireItem) => {
        const connector = item.anfStatementConnector?.[0];
        if (connector) {
          const type = connector.anfStatementType || 'UNRECOGNIZED';
          if (!groupedItem[type]) {
            groupedItem[type] = [];
          }
          groupedItem[type].push(item);
        }
      });

      setGroupedItems(groupedItem);
    };

    fetchData();
  }, []);

  const sortedEntries = useMemo(() => 
    Object.entries(groupedItems).sort(([a], [b]) => a.localeCompare(b)),
    [groupedItems]
  );

  return (
    <div className="flex flex-col p-4">
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody>
            {sortedEntries.map(([key, items]) => (
              <tr key={key}>
                <td className="px-4 py-2 border border-gray-300">
                  List of components [<strong>{key}</strong>]
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <ul className="list-disc pl-4 space-y-1">
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
  );
};

export { Report };
