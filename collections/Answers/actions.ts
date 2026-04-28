'use server';

import { answersSlug } from '@/lib/collectionNames';
import { TOAST_SUCCESS } from '@/lib/constants';
import { fieldLabels } from '@/lib/fieldLabels';
import { odSafeMutation } from '@/lib/safeAction';
import { Answer } from '@/payload-types';

export const createAnswer = odSafeMutation<undefined, Answer>({
  permissionPath: 'allow',
  key: 'createAnswer',
  action: async (params, { messages, payload }) => {
    const answer = await payload.create({
      collection: answersSlug,
      data: params,
    });

    console.log(answer);

    return {
      status: TOAST_SUCCESS,
      message: messages.create.success(fieldLabels.answer.singular.nominative),
      data: undefined,
    };
  },
});
