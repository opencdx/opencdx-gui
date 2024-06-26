import React from 'react';

import {
  QuestionnaireItem
} from '@/config/interface';
import { ComponentIDWrapper } from './componentID';
import { ComponentTypeWrapper } from './componentType';
import { OperatorWrapper } from './operator';
import { ANFStatementWrapper } from './anfStatement';


const QuestionnaireItemWrapper = ({ item }: { item: QuestionnaireItem }) => {
  return (
    <>
     <ComponentIDWrapper item={item} />
     <ComponentTypeWrapper item={item}  />
     <OperatorWrapper item={item}  />
     <ANFStatementWrapper item={item}  />

    </>
  );
};
export { QuestionnaireItemWrapper };
