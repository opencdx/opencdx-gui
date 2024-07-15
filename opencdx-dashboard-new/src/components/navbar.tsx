'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from '@nextui-org/navbar';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from '@nextui-org/react';
import { ChevronDown, LogOut } from 'lucide-react';

export const Navbar = () => {
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState(new Set(['english']));

  const descriptionsMap: LabelsMapType = {
    english: 'English',
    spanish: 'Spanish',
  };

  // Define a type for the labelsMap object
  type LabelsMapType = {
    [key: string]: string;
  };
  // Define the labelsMap object with the correct type
  const labelsMap: LabelsMapType = {
    english: 'En',
    spanish: 'Es',
  };

  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0];

  return (
    <NextUINavbar maxWidth="full" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              alt="nextui logo"
              height={40}
              src="/opencdx.png"
              width={100}
            />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex">
          <ButtonGroup variant="flat">
            <Button className="w-max-[20px]">
              {labelsMap[selectedOptionValue]}
            </Button>
            <Dropdown placement="bottom-end">
              <DropdownTrigger className="max-w-[30px]">
                <Button isIconOnly>
                  <ChevronDown />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="English options"
                className="max-w-[300px]"
                selectedKeys={selectedOption}
                selectionMode="single"
              >
                <DropdownItem
                  key="english"
                  description={descriptionsMap['english']}
                >
                  {labelsMap['english']}
                </DropdownItem>
                <DropdownItem
                  key="spanish"
                  description={descriptionsMap['spanish']}
                >
                  {labelsMap['spanish']}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            className="text-sm font-normal text-default-600 bg-default-100"
            variant="flat"
            onPress={() => router.push('/')}
          >
            <LogOut className="text-default-500" />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
