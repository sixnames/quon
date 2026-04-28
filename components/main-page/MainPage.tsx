'use client';
import { getQuestionariesList } from '@/collections/Questionnairies/actions';
import OdLink from '@/components/common/OdLink';
import OdQueryLoader from '@/components/common/OdQueryLoader';
import { alwaysArray } from '@/lib/commonUtils';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function MainPage() {
  const questionariesQuery = useQuery({
    queryKey: ['questionaries'],
    queryFn: () => getQuestionariesList(),
  });
  if (questionariesQuery.isLoading) {
    return <OdQueryLoader />;
  }
  return (
    <div className={'space-y-2'}>
      {alwaysArray(questionariesQuery.data).map((questionary) => {
        return (
          <div key={questionary.id}>
            <OdLink className={'underline hover:no-underline'} href={`questionaries/${questionary.id}`}>
              {questionary?.label}
            </OdLink>
          </div>
        );
      })}
    </div>
  );
}
