import {  useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldValues } from 'react-hook-form'; // Import FieldValues interface
import { systemVariables } from '@/lib/constant';

export interface FormValueUpdater {
  (newComponentType: string, newQuestionnaireItemId: any, newAnfStatementConnectorId: any): void;
}

export const useUpdateFormContext = (): FormValueUpdater => {
  const formContext = useFormContext<FieldValues>(); // Specify generic type for form values
  const { setValue, getValues } = formContext;

  const [currentComponentType, setCurrentComponentType] = useState<string>('');
  const [questionnaireItemId, setQuestionnaireItemId] = useState<any>(null);
  const [anfStatementConnectorId, setAnfStatementConnectorId] = useState<any>(null);

  // Update form value based on component type and relevance
  useEffect(() => {
    const updateForm = () => {
      const lowerBoundPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.lowerBound`;
      const upperBoundPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.upperBound`;
      const semanticPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.semantic`;
      const resolutionPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.resolution`;
      const includeUpperBoundPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.includeUpperBound`;
      const includeLowerBoundPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.includeLowerBound`;

      const subjectOfInformationPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfInformation`;
      const subjectOfRecordPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord`;

      const authorIDPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].id`;
      const authorPractitionerValuePath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].practitionerValue`;
      const authorCodePath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].code`;

      const topicPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.topic`;

      const statusPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.status`;

      const healthRiskPath = `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.healthRisk`;
      

  
      if (
        currentComponentType === 'ANF_STATEMENT_TYPE_MAIN' ||
        currentComponentType === 'ANF_STATEMENT_TYPE_ASSOCIATED'
      ) {
        //Time
        setValue(lowerBoundPath, systemVariables?.time.lowerBound);
        setValue(upperBoundPath, systemVariables?.time.upperBound);
        setValue(semanticPath, systemVariables?.time.semantic);
        setValue(resolutionPath, systemVariables?.time.resolution);
        setValue(includeUpperBoundPath, systemVariables?.time.includeUpperBound===true?'true':'false');
        setValue(includeLowerBoundPath, systemVariables?.time.includeLowerBound===true?'true':'false');

        //Subject of Information
        setValue(subjectOfInformationPath, systemVariables?.subjectOfInformation?.subjectOfRecord);

        //  Subject of Record
        setValue(subjectOfRecordPath, systemVariables?.subjectOfRecord);

        //Authors
        setValue(authorIDPath, systemVariables?.authors?.id);
        setValue(authorPractitionerValuePath, systemVariables?.authors?.practitionerValue);
        setValue(authorCodePath, systemVariables?.authors?.code);

        //Topic
        setValue(topicPath, systemVariables?.topic);

        //Performance Circumstance
        setValue(statusPath, systemVariables?.status);

        //Health Risk
        setValue(healthRiskPath, systemVariables?.performanceCircumstance[0]?.healthRisk);



        
      } 
    };

    if (currentComponentType || questionnaireItemId || anfStatementConnectorId) {
      updateForm();
    }
  }, [currentComponentType, questionnaireItemId, anfStatementConnectorId]);

  // Function to update state from functional component
  const updateState: FormValueUpdater = (newComponentType, newQuestionnaireItemId, newAnfStatementConnectorId) => {
    setCurrentComponentType(newComponentType);
    setQuestionnaireItemId(newQuestionnaireItemId);
    setAnfStatementConnectorId(newAnfStatementConnectorId);
  };

  return updateState;
};