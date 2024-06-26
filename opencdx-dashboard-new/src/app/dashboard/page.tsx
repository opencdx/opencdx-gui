'use client';

import React from 'react';



import { Button } from '@/components/ui/Button';
import { Accordion, AccordionItem, Checkbox, CheckboxGroup, Divider, Radio, RadioGroup, Select, SelectItem, Switch } from '@nextui-org/react';





export const cities = [
  { key: 'buenosaires', label: 'Buenos Aires' },
  { key: 'sydney', label: 'Sydney' },
  { key: 'sanfrancisco', label: 'San Francisco' },
  { key: 'london', label: 'London' },
  { key: 'tokyo', label: 'Tokyo' },
];
const defaultContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export default function DashboardPage() {
  return (
    <>
      <div className="flex py-4">
        <div className="w-1/5">
          <p className="text-md">Button</p>
        </div>
        <div className="w-4/5">
          <div className="flex gap-4 items-center">
            <Button size="sm" variant='solid' color='primary'>Small</Button>
            <Button size="md" variant='bordered' color='secondary'>Medium</Button>
            <Button size="lg" variant='shadow' color='success'>Large</Button>
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
              label="Select cities"
              defaultValue={['buenos-aires', 'london']}
              orientation="horizontal"
            >
              <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
              <Checkbox value="sydney">Sydney</Checkbox>
              <Checkbox value="san-francisco">San Francisco</Checkbox>
              <Checkbox value="london">London</Checkbox>
              <Checkbox value="tokyo">Tokyo</Checkbox>
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
              label="Select your favorite city"
              orientation="horizontal"
            >
              <Radio value="buenos-aires">Buenos Aires</Radio>
              <Radio value="sydney">Sydney</Radio>
              <Radio value="san-francisco">San Francisco</Radio>
              <Radio value="london">London</Radio>
              <Radio value="tokyo">Tokyo</Radio>
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
            <Select label="Select a city" className="max-w-xs">
              {cities.map((city) => (
                <SelectItem key={city.key} aria-describedby={city.key}
                >{city.label}</SelectItem>
              ))}
            </Select>
            <Select
              label="Favorite Cities"
              placeholder="Select a city"
              className="max-w-xs"
              selectionMode="multiple"
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
              <Switch defaultSelected size="sm">
                Small
              </Switch>
              <Switch defaultSelected size="md">
                Medium
              </Switch>
              <Switch defaultSelected size="lg">
                Large
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
      <AccordionItem key="1" aria-label="Hello-World Project" title="Hello-World Project">
        This project serves as a foundational example for building user-friendly web applications using the React ecosystem.
      </AccordionItem>
      <AccordionItem key="2" aria-label="508 Compliance" title="508 Compliance">
        To do business with federal agencies, create, buy, and use Information and Communication Technology (ICT) that is accessible to people with disabilities.
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion Usage" title="Accordion Usage">
        This design pattern is ideal for breaking down longform or complex content into digestible chunks
      </AccordionItem>
    </Accordion>
          </div>
        </div>
        
      </div>
    </>
  );
}