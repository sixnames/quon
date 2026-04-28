import { getQuestionnaireById } from '@/collections/Questionnairies/actions';
import OdNotFound from '@/components/common/OdNotFound';
import OdTitle from '@/components/common/OdTitle';
import AnswerPage from '@/components/questionnaire/AnswerPage';
import { alwaysString } from '@/lib/commonUtils';
import type { Metadata } from 'next';
import { cache } from 'react';

const getPageData = cache((id: string) => {
  return getQuestionnaireById(id);
});

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const questionnaire = await getPageData(id);

  return {
    title: alwaysString(questionnaire?.label),
  };
}

export const dynamic = 'force-dynamic';

export default async function Page({ params }: Props) {
  const { id } = await params;
  const questionnaire = await getPageData(id);

  if (!questionnaire) {
    return <OdNotFound />;
  }

  return (
    <>
      <OdTitle testId={'questionnaire-page'} breadcrumbs={[]}>
        {questionnaire.label}
      </OdTitle>
      <AnswerPage questionnaire={questionnaire} />
    </>
  );
}
