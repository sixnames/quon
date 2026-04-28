import { QuestionAnswers } from '@/payload-types';

export type QuestionAnswersList = NonNullable<QuestionAnswers>;
export type QuestionAnswersListItem = QuestionAnswersList[number];
