import { useEffect, useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { systemVariables } from '@/lib/constant';
import { AnfStatementType } from '@/api/questionnaire';

export interface FormValueUpdater {
  (
    newComponentType: string,
    newQuestionnaireItemId: any,
    newAnfStatementConnectorId: any,
  ): void;
}

export const useUpdateFormContext = (): FormValueUpdater => {
  const formContext = useFormContext<FieldValues>();
  const { setValue } = formContext;

  const [currentComponentType, setCurrentComponentType] = useState<string>('');
  const [questionnaireItemId, setQuestionnaireItemId] = useState<any>(null);
  const [anfStatementConnectorId, setAnfStatementConnectorId] = useState<any>(null);

  useEffect(() => {
    const updateForm = () => {
      const paths = [
        `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time`,
        `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfInformation`,
        `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord`,
        `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0]`,
        `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.topic`,
        `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance`,
        `item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance[0].healthRisk`,
      ];

      if (
        currentComponentType === AnfStatementType.AnfStatementTypeMain ||
        currentComponentType === AnfStatementType.AnfStatementTypeAssociated
      ) {
        paths.forEach((path) => {
          setValue(`${path}.lowerBound`, systemVariables?.time.lowerBound);
          setValue(`${path}.upperBound`, systemVariables?.time.upperBound);
          setValue(`${path}.semantic`, systemVariables?.time.semantic);
          setValue(`${path}.resolution`, systemVariables?.time.resolution);
          setValue(`${path}.includeUpperBound`, systemVariables?.time.includeUpperBound);
          setValue(`${path}.includeLowerBound`, systemVariables?.time.includeLowerBound);
        });

        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfInformation`, systemVariables?.subjectOfInformation?.subjectOfRecord);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord`, systemVariables?.subjectOfRecord);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].id`, systemVariables?.authors?.id);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].practitionerValue`, systemVariables?.authors?.practitionerValue);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].code`, systemVariables?.authors?.code);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.topic`, systemVariables?.topic);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.status`, systemVariables?.status);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.healthRisk`, systemVariables?.performanceCircumstance[0]?.healthRisk);
      } else {
        paths.forEach((path) => {
          setValue(`${path}.lowerBound`, '');
          setValue(`${path}.upperBound`, '');
          setValue(`${path}.semantic`, '');
          setValue(`${path}.resolution`, '');
          setValue(`${path}.includeUpperBound`, '');
          setValue(`${path}.includeLowerBound`, '');
        });

        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfInformation`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].id`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].practitionerValue`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].code`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.topic`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.status`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.healthRisk`, '');
      }

      if (currentComponentType === AnfStatementType.AnfStatementTypeNotApplicable) {
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.includeUpperBound`, 'not');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.time.includeLowerBound`, 'not');
      }
    };

    if (currentComponentType || questionnaireItemId || anfStatementConnectorId) {
      updateForm();
    }
  }, [currentComponentType, questionnaireItemId, anfStatementConnectorId, setValue]);

  const updateState: FormValueUpdater = (
    newComponentType,
    newQuestionnaireItemId,
    newAnfStatementConnectorId,
  ) => {
    setCurrentComponentType(newComponentType);
    setQuestionnaireItemId(newQuestionnaireItemId);
    setAnfStatementConnectorId(newAnfStatementConnectorId);
  };

  return updateState;
};
