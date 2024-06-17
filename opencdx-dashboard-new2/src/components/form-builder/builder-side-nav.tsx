'use client';

import { Fragment, Key } from 'react';

import Link from 'next/link';

import { useAnfFormStore } from '@/lib/useAnfFormStore';
import { cn } from '@/lib/utils';

export default function SideNav() {
  const { formData } = useAnfFormStore();
  

  return (
    <div className="pr-4">
      <div
        className={cn(
          'border-r transition-all duration-300 ease-in-out transform hidden sm:flex h-full  w-72 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-accents-3 scrollbar-track-accents-1 dark:scrollbar-thumb-neutral-700 dark:scrollbar-track-neutral-800 dark:scrollbar-thin dark:scrollbar-thumb-rounded-full dark:scrollbar-track-neutral-900',
        )}
      >
        <aside className="flex h-full flex-col break-words px-4   overflow-x-hidden columns-1">
          <div className="mt-4 relative pb-2 ">
            <div className="flex flex-col space-y-1">
              {formData?.item?.map(
                (
                  item: {
                    [x: string]: string;
                    linkId: string;
                  },
                  idx: Key | null | undefined,
                ) => {
                  return (
                    <Fragment key={idx}>
                      <div className="space-y-1">
                        <SideNavItem label={item.linkId + '-' + item.text} />
                      </div>
                    </Fragment>
                  );
                },
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export const SideNavItem: React.FC<{
  label: string;
}> = ({ label }) => {
  return (
    <>
      <Link
        href="#"
        className={`h-full relative flex items-center whitespace-nowrap rounded-md hover:bg-neutral-200  hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white`}
      >
        <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
          <span>{label}</span>
        </div>
      </Link>
    </>
  );
};
