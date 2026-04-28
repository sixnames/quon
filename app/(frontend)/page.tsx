import OdTitle from '@/components/common/OdTitle';
import MainPage from '@/components/main-page/MainPage';
import { fieldLabels } from '@/lib/fieldLabels';
import type { Metadata } from 'next';
import ProtectedRoute from '../../components/common/ProtectedRoute';

export const metadata: Metadata = {
  title: fieldLabels.questionnaire.plural.nominative,
};

export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <ProtectedRoute>
      <OdTitle testId={'main-page'} breadcrumbs={[]}>
        {fieldLabels.questionnaire.plural.nominative}
      </OdTitle>
      <MainPage />
    </ProtectedRoute>
  );
}
