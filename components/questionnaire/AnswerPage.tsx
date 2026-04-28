'use client';
import { createAnswer } from '@/collections/Answers/actions';
import { answerFieldConfig } from '@/collections/Answers/fieldConfig';
import { Question } from '@/collections/Questionnairies/types';
import FkButton from '@/components/formik/FkButton';
import FkInput from '@/components/formik/FkInput';
import FkTextarea from '@/components/formik/FkTextarea';
import OdSelect from '@/components/forms/OdSelect';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useOdMutation } from '@/hooks/useOdMutation';
import { alwaysArray, alwaysString } from '@/lib/commonUtils';
import { fieldLabels } from '@/lib/fieldLabels';
import { Answer, Questionnairy } from '@/payload-types';
import { Form, Formik, useFormikContext } from 'formik';
import get from 'lodash/get';
import { nanoid } from 'nanoid';

interface AnswerItemProps {
  question: Question;
  questionIndex: number;
}
function AnswerItem({ question, questionIndex }: AnswerItemProps) {
  const { setFieldValue, values } = useFormikContext();
  const variant = question.variant;
  const fieldNameBase = `${answerFieldConfig.questionAnswers}[${questionIndex}]`;
  if (variant === 'number') {
    return (
      <FkInput
        name={`${fieldNameBase}.number`}
        type={'number'}
        label={{ label: fieldLabels.number.singular, required: true }}
      />
    );
  }

  if (variant === 'text') {
    return <FkTextarea name={`${fieldNameBase}.text`} label={{ label: fieldLabels.text.singular, required: true }} />;
  }

  if (variant === 'select') {
    const selectName = `${fieldNameBase}.select`;
    const value = get(values, selectName);
    return (
      <OdSelect
        value={value}
        name={selectName}
        label={{ label: fieldLabels.choseOption.singular, required: true }}
        options={alwaysArray(question.options).map((item) => {
          return {
            value: alwaysString(item.id),
            label: item.label,
          };
        })}
        setValue={async (value) => {
          await setFieldValue(selectName, value?.value);
        }}
      />
    );
  }

  if (variant === 'boolean') {
    return (
      <RadioGroup
        className='w-fit mb-6 mt-4 flex flex-col gap-4'
        onValueChange={async (e) => {
          if (e === 'true') {
            await setFieldValue(`${fieldNameBase}.boolean`, true);
          } else {
            await setFieldValue(`${fieldNameBase}.boolean`, false);
          }
        }}
      >
        <div className='flex items-center gap-4 cursor-pointer'>
          <RadioGroupItem value='true' id='r1' className={'cursor-pointer'} />
          <Label htmlFor='r1' className={'cursor-pointer'}>
            {fieldLabels.yes.singular}
          </Label>
        </div>
        <div className='flex items-center gap-4 cursor-pointer'>
          <RadioGroupItem value='false' id='r2' className={'cursor-pointer'} />
          <Label htmlFor='r2' className={'cursor-pointer'}>
            {fieldLabels.no.singular}
          </Label>
        </div>
      </RadioGroup>
    );
  }
  return <></>;
}

interface AnswerPageProps {
  questionnaire: Questionnairy;
}

export default function AnswerPage({ questionnaire }: AnswerPageProps) {
  const createAnswerMutation = useOdMutation({
    action: createAnswer,
    redirectTo: () => {
      return '/questionaries/success';
    },
  });
  return (
    <>
      {questionnaire.description ? (
        <div className={'mb-6 text-muted-foreground'}>{questionnaire.description}</div>
      ) : null}
      <Formik<Answer>
        initialValues={{
          id: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          questionnaireId: questionnaire.id,
          userName: '',
          questionAnswers: alwaysArray(questionnaire.questions).map((question) => {
            return {
              id: nanoid(),
              questionId: question.id,
              text: '',
              boolean: false,
              number: 0,
              select: '',
            };
          }),
        }}
        onSubmit={async (values) => {
          await createAnswerMutation.mutateAsync(values);
        }}
      >
        {({ values }) => {
          return (
            <Form>
              <FkInput
                name={answerFieldConfig.userName}
                label={{ label: fieldLabels.userName.singular, required: true }}
              />

              <div>
                {alwaysArray(values.questionAnswers).map((item, questionIndex) => {
                  const question = alwaysArray(questionnaire.questions)[questionIndex];
                  if (!question) {
                    return null;
                  }
                  return (
                    <div key={item.id}>
                      <div className={'text-lg mb-2'}>{`${questionIndex + 1}) ${question.questionText}`}</div>
                      {question.description ? (
                        <div className={'mb-2 text-muted-foreground'}>{question.description}</div>
                      ) : null}
                      <AnswerItem question={question} questionIndex={questionIndex} />
                      <Separator className={'mb-6 pt-1'} />
                    </div>
                  );
                })}
              </div>

              <FkButton>{fieldLabels.save.action}</FkButton>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
