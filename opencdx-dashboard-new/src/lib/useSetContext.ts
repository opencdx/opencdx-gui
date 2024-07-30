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
      ];

      if (
        currentComponentType === AnfStatementType.AnfStatementTypeMain ||
        currentComponentType === AnfStatementType.AnfStatementTypeAssociated
      ) {
        paths.forEach((path) => {
          setValue(`${path}.lowerBound`, systemVariables?.time.lowerBound);
          setValue(`${path}.upperBound`, systemVariables?.time.upperBound);
          setValue(`${path}.semantic.expression`, systemVariables?.time.semantic);
          setValue(`${path}.resolution`, systemVariables?.time.resolution);
          setValue(`${path}.includeUpperBound`, systemVariables?.time.includeUpperBound);
          setValue(`${path}.includeLowerBound`, systemVariables?.time.includeLowerBound);
        });

        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfInformation.expression`, systemVariables?.subjectOfInformation?.subjectOfRecord);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord.code.expression`, systemVariables?.subjectOfRecord.code);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord.practitionerValue.identifier`, systemVariables?.subjectOfRecord.practitionerValue);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord.id`, systemVariables?.subjectOfRecord.id);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].id`, systemVariables?.authors?.id);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].practitionerValue.identifier`, systemVariables?.authors?.practitionerValue);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].code.expression`, systemVariables?.authors?.code);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.topic.expression`, systemVariables?.topic);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.type.expression`, systemVariables?.type);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.status.expression`, systemVariables?.status);
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.healthRisk.expression`, systemVariables?.performanceCircumstance[0]?.healthRisk);
      } else {
        paths.forEach((path) => {
          setValue(`${path}.lowerBound`, '');
          setValue(`${path}.upperBound`, '');
          setValue(`${path}.semantic`, '');
          setValue(`${path}.resolution`, '');
          setValue(`${path}.includeUpperBound`, '');
          setValue(`${path}.includeLowerBound`, '');
        });

        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfInformation.expression`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord.code.expression`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord.practitionerValue.identifier`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.subjectOfRecord.id`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].id`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].practitionerValue.identifier`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.authors[0].code.expression`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.topic.expression`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.type.expression`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.status.expression`, '');
        setValue(`item.${questionnaireItemId}.anfStatementConnector.${anfStatementConnectorId}.anfStatement.performanceCircumstance.healthRisk.expression`, '');
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
