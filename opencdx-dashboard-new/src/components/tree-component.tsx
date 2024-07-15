'use client';

import { MouseEventHandler, useState } from 'react';

import { cn } from '@/lib/utils';

import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import { Tree } from 'primereact/tree';

export default function TreeComponent() {
  const [selectedKeys, setSelectedKeys] = useState(null);
  const togglerTemplate = (
    node: any,
    options: {
      expanded: any;
      onClick: MouseEventHandler<HTMLButtonElement> | undefined;
    },
  ) => {
    if (!node) {
      return;
    }

    const expanded = options.expanded;
    const iconClassName = cn('p-tree-toggler-icon pi pi-fw', {
      'pi-plus': !expanded,
      'pi-minus': expanded,
    });

    return (
      <button
        className="p-tree-toggler p-link"
        tabIndex={-1}
        type="button"
        onClick={options.onClick}
      >
        <span aria-hidden="true" className={iconClassName} />
      </button>
    );
  };
  const nodes = [
    {
      key: '0',
      label: 'Item 1',
      data: 'Documents Folder',
      //   icon: 'pi pi-fw pi-inbox',
      children: [
        {
          key: '0-0',
          label: 'Sub Item 1',
          data: 'Work Folder',
          //   icon: 'pi pi-fw pi-inbox',
          children: [
            {
              key: '0-0-0',
              label: 'Child Item 1',
              //   icon: 'pi pi-fw pi-inbox',
              data: 'Expenses Document',
            },
            {
              key: '0-0-1',
              label: 'Child Item 2',
              //   icon: 'pi pi-fw pi-inbox',
              data: 'Resume Document',
            },
          ],
        },
        {
          key: '0-1',
          label: 'Sub Item 2',
          data: 'Home Folder',
          //   icon: 'pi pi-fw pi-inbox',
          children: [
            {
              key: '0-1-0',
              label: 'Child Item 1',
              //   icon: 'pi pi-fw pi-inbox',
              data: 'Invoices for this month',
            },
          ],
        },
      ],
    },
    {
      key: '1',
      label: 'Item 2',
      data: 'Documents Folder',
      //   icon: 'pi pi-fw pi-inbox',
      children: [
        {
          key: '1-0',
          label: 'Work',
          data: 'Sub Item 1',
          //   icon: 'pi pi-fw pi-inbox',
          children: [
            {
              key: '1-0-0',
              label: 'Child Item 1',
              //   icon: 'pi pi-fw pi-inbox',
              data: 'Expenses Document',
            },
            {
              key: '1-0-1',
              label: 'Child Item 2',
              //   icon: 'pi pi-fw pi-inbox',
              data: 'Resume Document',
            },
          ],
        },
        {
          key: '1-1',
          label: 'Home',
          data: 'Sub Item 2',
          //   icon: 'pi pi-fw pi-inbox',
          children: [
            {
              key: '1-1-0',
              label: 'Child Item 1',
              //   icon: 'pi pi-fw pi-inbox',
              data: 'Invoices for this month',
            },
          ],
        },
      ],
    },
  ];

  return (
    <Tree
      filter
      className="w-full"
      dragdropScope="demo"
      filterMode="lenient"
      filterPlaceholder="Search"
      selectionKeys={selectedKeys}
      selectionMode="checkbox"
      value={nodes}
      togglerTemplate={togglerTemplate}
      //@ts-ignore
      onSelectionChange={(e) => setSelectedKeys(e.value)}
    />
  );
}
