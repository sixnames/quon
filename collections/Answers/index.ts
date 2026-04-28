import { answerFieldConfig } from '@/collections/Answers/fieldConfig';
import { answersSlug } from '@/lib/collectionNames';
import { fieldLabels } from '@/lib/fieldLabels';
import type { CollectionConfig } from 'payload';

export const Answers: CollectionConfig = {
  slug: answersSlug,
  labels: {
    singular: fieldLabels.answer.singular.nominative,
    plural: fieldLabels.answer.plural.nominative,
  },
  admin: {
    useAsTitle: answerFieldConfig.userName,
  },
  fields: [
    {
      name: answerFieldConfig.userName,
      label: fieldLabels.userName.singular,
      type: 'text',
      required: true,
    },
    {
      name: answerFieldConfig.questionnaireId,
      label: `${fieldLabels.id.singular} ${fieldLabels.questionnaire.singular.genitive.toLowerCase()}`,
      type: 'text',
      required: true,
    },
    {
      type: 'array',
      name: answerFieldConfig.questionAnswers,
      label: {
        singular: fieldLabels.questionAnswer.singular.nominative,
        plural: fieldLabels.questionAnswer.plural.nominative,
      },
      interfaceName: 'QuestionAnswers',
      admin: {
        components: {
          RowLabel: {
            path: '/components/admin/ArrayFieldRowLabel',
            clientProps: {
              itemLabel: fieldLabels.questionAnswer.singular.nominative,
            },
          },
        },
      },
      fields: [
        {
          type: 'text',
          name: answerFieldConfig.questionId,
          label: `${fieldLabels.id.singular} ${fieldLabels.question.singular.toLowerCase()}`,
        },
        {
          type: 'checkbox',
          name: 'boolean',
        },
        {
          type: 'text',
          name: 'text',
        },
        {
          type: 'text',
          name: 'select',
        },
        {
          type: 'number',
          name: 'number',
        },
      ],
    },
  ],
};
