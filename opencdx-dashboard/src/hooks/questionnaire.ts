import { produce } from 'immer';
import { createWithEqualityFn as create } from 'zustand/traditional';
import { Questionnaire } from '@/api/questionnaire/model/questionnaire';
import { QuestionnaireItem } from '@/api/questionnaire/model/questionnaire-item';
import { AnfStatementConnector } from '@/api/questionnaire/model/anf-statement-connector';

interface QuestionnaireStore {
    questionnaire: Questionnaire;
    addQuestion: (data: QuestionnaireItem) => void;
    updateQuestionnaire: (data: Questionnaire) => void;
    updateQuestionnaireItem: (data: QuestionnaireItem) => void;
    updateQuestionnaireTitle: (data: string) => void;
    addAnfStatementConnector: (data: AnfStatementConnector, index: number) => void;
    removeAnfStatementConnector: ( index: number,removeIndex: number) => void;
}


export const useQuestionnaireStore = create<QuestionnaireStore>((set) => ({
    questionnaire: {
        item: [],
        title: '',
    } as Questionnaire,
    updateQuestionnaire: (data: Questionnaire) => set(
        produce((draft) => {
            draft.questionnaire = { ...data };
        })
    ),
    reset: () => set(
        produce((draft) => {
            draft.questionnaire = { item: [], title: '' };
        })
    ),
    updateQuestionnaireTitle: (data: string) => set(
        produce((draft) => {
            draft.questionnaire.title = data;
        })
    ),
    updateQuestionnaireItem: (data: QuestionnaireItem) => set(
        produce((draft) => {
            draft.questionnaire.item = { ...data };
        })
    ),
    addQuestion: (data: QuestionnaireItem) => set(
        produce((draft) => {
            if (!Array.isArray(draft.questionnaire.item)) {
                draft.questionnaire.item = [];
            }
            draft.questionnaire.item.push(data);
        })
    ),
    addAnfStatementConnector: (data: AnfStatementConnector, index: number) => set(
        produce((draft) => {
            draft.questionnaire.item[index].anfStatementConnector.push(data);
        })
    ),
    removeAnfStatementConnector: (   index: number,removeIndex: number) => set(
        produce((draft) => {
            draft.questionnaire.item[index].anfStatementConnector.splice(removeIndex, 1);
        })
    ),
  
}));

