import OdTitle from '@/components/common/OdTitle';
import type { Metadata } from 'next';

const title = 'Дякую! Вашу відповідь збережено.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
  };
}

export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <>
      <OdTitle hideBackButton testId={'success-page'} breadcrumbs={[]}>
        {title}
      </OdTitle>
    </>
  );
}
