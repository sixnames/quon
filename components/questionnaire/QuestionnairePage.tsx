'use client';
import { getQuestionnaireAnswersList } from '@/collections/Questionnairies/actions';
import OdButton from '@/components/buttons/OdButton';
import OdQueryLoader from '@/components/common/OdQueryLoader';
import DnDTable from '@/components/table/DnDTable';
import { useToast } from '@/hooks/use-toast';
import { alwaysArray, alwaysNumber } from '@/lib/commonUtils';
import { TOAST_SUCCESS } from '@/lib/constants';
import { getReadableDate } from '@/lib/dateUtils';
import { fieldLabels } from '@/lib/fieldLabels';
import { Answer, Questionnairy } from '@/payload-types';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import copy from 'copy-to-clipboard';
import { usePathname } from 'next/navigation';

interface QuestionnairePageProps {
  questionnaire: Questionnairy;
}

export default function QuestionnairePage({ questionnaire }: QuestionnairePageProps) {
  const { toast } = useToast();
  const pathname = usePathname();
  const answersQuery = useQuery({
    queryKey: ['answers', questionnaire.id],
    queryFn: async () => getQuestionnaireAnswersList(questionnaire.id),
  });

  const columns: ColumnDef<Answer>[] = [
    {
      id: fieldLabels.userName.singular,
      header: fieldLabels.userName.singular,
      enableHiding: false,
      size: 60,
      cell: ({ row }) => {
        return row.original.userName;
      },
    },
    {
      id: fieldLabels.createdAt.singular,
      header: fieldLabels.createdAt.singular,
      enableHiding: false,
      size: 40,
      cell: ({ row }) => {
        return getReadableDate({ date: row.original.createdAt }).readableDate;
      },
    },
  ];

  if (answersQuery.isLoading) {
    return <OdQueryLoader />;
  }

  return (
    <div>
      <OdButton
        onClick={() => {
          const origin = window.location.origin;
          copy(`${origin}${pathname}/answer`, {
            format: 'text/plain',
            onCopy: () => {
              toast({
                variant: TOAST_SUCCESS,
                title: fieldLabels.copy.done,
              });
            },
          });
        }}
      >{`${fieldLabels.copy.action} ${fieldLabels.link.singular.toLowerCase()}`}</OdButton>
      <div
        className={'my-6'}
      >{`${fieldLabels.answer.plural.genitive}: ${alwaysNumber(answersQuery.data?.length)}`}</div>
      <div>
        <DnDTable
          disableDrag
          initialData={alwaysArray(answersQuery.data)}
          initialColumns={columns}
          isLoading={answersQuery.isLoading}
          onDragEnd={async () => {
            return;
          }}
        />
      </div>
    </div>
  );
}
