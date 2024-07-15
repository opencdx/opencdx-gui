'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { Checkbox, CheckboxGroup } from '@nextui-org/checkbox';
import {
  Accordion,
  AccordionItem,
  Divider,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Switch,
} from '@nextui-org/react';

export const cities = [
  { key: 'sydney', label: 'Sydney' },
  { key: 'sanfrancisco', label: 'San Francisco' },
  { key: 'london', label: 'London' },
];

export default function DashboardPage() {
  return (
    <>
      <div className="flex py-4">
        <div className="w-1/5">
          <p className="text-md">Button</p>
        </div>
        <div className="w-4/5">
          <div className="flex gap-4 items-center">
            <Button color="primary" size="sm" variant="solid">
              Small
            </Button>
            <Button color="secondary" size="md" variant="bordered">
              Medium
            </Button>
            <Button color="success" size="lg" variant="shadow">
              Large
            </Button>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex py-4">
        <div className="w-1/5">
          <p className="text-md">Checkboxes</p>
        </div>
        <div className="w-4/5">
          <div className="flex gap-4 items-center">
            <CheckboxGroup
              defaultValue={['buenos-aires', 'london']}
              label="Select cities"
              orientation="horizontal"
              radius="sm"
            >
              <Checkbox tabIndex={0} value="sydney">
                Sydney
              </Checkbox>
              <Checkbox tabIndex={0} value="san-francisco">
                San Francisco
              </Checkbox>
              <Checkbox tabIndex={0} value="london">
                London
              </Checkbox>
            </CheckboxGroup>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex py-4">
        <div className="w-1/5">
          <p className="text-md">Radio</p>
        </div>
        <div className="w-4/5">
          <div className="flex gap-4 items-center">
            <RadioGroup
              defaultValue="london"
              label="Select your favorite city"
              orientation="horizontal"
            >
              <Radio value="sydney">Sydney</Radio>
              <Radio value="san-francisco">San Francisco</Radio>
              <Radio value="london">London</Radio>
            </RadioGroup>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex py-4">
        <div className="w-1/5">
          <p className="text-md">Select</p>
        </div>
        <div className="w-4/5">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Select className="max-w-xs" label="Select a city" tabIndex={0}>
              {cities.map((city) => (
                <SelectItem key={city.key}>{city.label}</SelectItem>
              ))}
            </Select>
            <Select
              className="max-w-xs"
              label="Favorite Cities"
              placeholder="Select cities"
              selectionMode="multiple"
              tabIndex={0}
            >
              {cities.map((city) => (
                <SelectItem key={city.key}>{city.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex py-4">
        <div className="w-1/5">
          <p className="text-md">Language</p>
        </div>
        <div className="w-4/5">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <div className="flex gap-4">
              <Switch defaultSelected id="switch1" size="sm">
                <label>Small</label>
              </Switch>
              <Switch defaultSelected size="md">
                <label>Medium</label>
              </Switch>
              <Switch defaultSelected size="lg">
                <label>Large</label>
              </Switch>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex py-4">
        <div className="w-1/5">
          <p className="text-md">About</p>
        </div>
        <div className="w-4/5">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Accordion variant="splitted">
              <AccordionItem
                key="1"
                aria-label="OpenCDx Project"
                title="OpenCDx Project"
              >
                This project serves as a foundational example for building
                user-friendly web applications using the React ecosystem.
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="508 Compliance"
                title="508 Compliance"
              >
                To do business with federal agencies, create, buy, and use
                Information and Communication Technology (ICT) that is
                accessible to people with disabilities.
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Accordion Usage"
                title="Accordion Usage"
              >
                This design pattern is ideal for breaking down longform or
                complex content into digestible chunks
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
