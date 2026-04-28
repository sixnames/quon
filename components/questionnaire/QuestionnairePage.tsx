'use client';
import OdButton from '@/components/buttons/OdButton';
import { useToast } from '@/hooks/use-toast';
import { TOAST_SUCCESS } from '@/lib/constants';
import { fieldLabels } from '@/lib/fieldLabels';
import { Questionnairy } from '@/payload-types';
import copy from 'copy-to-clipboard';
import { usePathname } from 'next/navigation';

interface QuestionnairePageProps {
  questionnaire: Questionnairy;
}

export default function QuestionnairePage({ questionnaire }: QuestionnairePageProps) {
  const { toast } = useToast();
  const pathname = usePathname();

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
    </div>
  );
}
