import { Questions } from '@/payload-types';

export type QuestionsList = NonNullable<Questions>;
export type Question = QuestionsList[number];
