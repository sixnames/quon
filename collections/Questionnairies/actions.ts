'use server';

import { answersSlug, questionnairiesSlug } from '@/lib/collectionNames';
import { odSafeQuery } from '@/lib/safeAction';
import { Answer, Questionnairy } from '@/payload-types';

export const getQuestionariesList = odSafeQuery<Pick<Questionnairy, 'label' | 'id'>[], void>({
  key: 'getQuestionariesList',
  action: async ({ payload, params }) => {
    const data = await payload.find({
      pagination: false,
      collection: questionnairiesSlug,
      select: {
        label: true,
        id: true,
      },
    });

    return data.docs;
  },
});

export const getQuestionnaireById = odSafeQuery<Questionnairy, string>({
  key: 'getQuestionnaireById',
  action: async ({ payload, params }) => {
    return payload.findByID({
      collection: questionnairiesSlug,
      id: params,
    });
  },
});

export const getQuestionnaireAnswersList = odSafeQuery<Answer[], string>({
  key: 'getQuestionnaireAnswersList',
  action: async ({ payload, params }) => {
    const data = await payload.find({
      pagination: false,
      collection: answersSlug,
      where: {
        questionnaireId: {
          equals: params,
        },
      },
    });

    return data.docs;
  },
});
