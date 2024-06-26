'use client';
import { Fragment } from 'react';
import { NavItems } from '@/configs';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { Maximize, Minimize } from 'lucide-react';

import TreeComponent from './tree-component';

export default function TreeView() {
  const navItems = NavItems();

  return (
    <div className="pr-4">
      <div
        className={
          'w-[400px] border-r transition-all duration-300 ease-in-out transform hidden sm:flex h-full  bg-accent'
        }
      >
        <aside className="flex h-full flex-col w-full break-words px-4   overflow-x-hidden columns-1">
          {/* Top */}
          <div className="mt-4 relative pb-2 ">
            <div className="flex flex-col space-y-1">
              {navItems.map((item, idx) => {
                if (item.position === 'top') {
                  return (
                    <Fragment key={idx}>
                      <div>
                        <Accordion
                          variant="splitted"
                          key={idx}
                          selectionBehavior="toggle"
                          isCompact={true}
                          defaultExpandedKeys={['1']}
                          className="min-h-[100px]"
                        >
                          <AccordionItem
                            key="1"
                            aria-label="Accordion 1"
                            title="Section 1"
                            id='section1'
                            indicator={({ isOpen }) =>
                              isOpen ? <Maximize /> : <Minimize />
                            }
                          >
                            <TreeComponent />
                          </AccordionItem>
                          <AccordionItem
                            key="2"
                            aria-label="Accordion 2"
                            title="Section 2"
                            id='section2'
                            indicator={({ isOpen }) =>
                              isOpen ? <Maximize /> : <Minimize />
                            }
                          >
                            <TreeComponent />
                          </AccordionItem>
                          <AccordionItem
                            key="3"
                            aria-label="Accordion 3"
                            title="Section 3"
                            id='section3'
                            indicator={({ isOpen }) =>
                              isOpen ? <Maximize /> : <Minimize />
                            }
                          >
                            <TreeComponent />
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </Fragment>
                  );
                }
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
