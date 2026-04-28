import { questionnaireFieldConfig } from '@/collections/Questionnairies/fieldConfig';
import { getCreateAccess, getDeleteAccess, getReadAccess, getUpdateAccess } from '@/collections/Roles/utils';
import { userFieldConfig } from '@/collections/Users/fieldConfig';
import { questionnairiesSlug } from '@/lib/collectionNames';
import { fieldLabels } from '@/lib/fieldLabels';
import type { CollectionConfig } from 'payload';

export const Questionnairies: CollectionConfig = {
  slug: questionnairiesSlug,
  labels: {
    singular: fieldLabels.questionnaire.singular.nominative,
    plural: fieldLabels.questionnaire.plural.nominative,
  },
  access: {
    create: getCreateAccess(questionnairiesSlug),
    read: getReadAccess(questionnairiesSlug),
    update: getUpdateAccess(questionnairiesSlug),
    delete: getDeleteAccess(questionnairiesSlug),
  },
  admin: {
    useAsTitle: questionnaireFieldConfig.label,
    defaultColumns: [
      userFieldConfig.username,
      userFieldConfig.createdAt,
      userFieldConfig.updatedAt,
      userFieldConfig.isAdmin,
    ],
  },
  fields: [
    {
      name: questionnaireFieldConfig.label,
      label: fieldLabels.label.singular,
      type: 'text',
      required: true,
    },
    {
      type: 'array',
      name: questionnaireFieldConfig.questions,
      label: {
        singular: fieldLabels.question.singular,
        plural: fieldLabels.question.plural,
      },
      interfaceName: 'Questions',
      admin: {
        components: {
          RowLabel: {
            path: '/components/admin/ArrayFieldRowLabel',
            clientProps: {
              itemLabel: fieldLabels.question.singular,
            },
          },
        },
      },
      fields: [
        {
          type: 'textarea',
          name: questionnaireFieldConfig.questionText,
          label: fieldLabels.question.singular,
          required: true,
        },
        {
          type: 'textarea',
          name: questionnaireFieldConfig.description,
          label: fieldLabels.description.singular,
        },
        {
          type: 'select',
          name: questionnaireFieldConfig.variant,
          label: fieldLabels.questionVariant,
          options: [
            {
              value: 'boolean',
              label: fieldLabels.yesOrNo.singular,
            },
            {
              value: 'text',
              label: fieldLabels.text.singular,
            },
            {
              value: 'select',
              label: fieldLabels.select.singular,
            },
            {
              value: 'number',
              label: fieldLabels.number.singular,
            },
          ],
        },
        {
          type: 'array',
          name: questionnaireFieldConfig.options,
          label: {
            singular: fieldLabels.answerVariant.singular,
            plural: fieldLabels.answerVariant.plural,
          },
          admin: {
            condition: (_data, siblingData) => {
              return siblingData?.variant === 'select';
            },
          },
          fields: [
            {
              name: questionnaireFieldConfig.label,
              label: fieldLabels.label.singular,
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
