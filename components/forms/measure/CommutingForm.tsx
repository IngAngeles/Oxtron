import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {Form} from '@/components/ui/form'
import CustomFormField from '@/components/CustomFormField'
import {FormFieldType} from '@/components/forms/LoginForm'
import SubmitButton from '@/components/SubmitButton'
import {Commuting, CommutingValidation} from '@/lib/validation'
import {useCommuting} from "@/hooks/measure/commuting/useCommuting";
import Loading from "@/components/loading/LoadingBlack";

type Props = {
  commuting: Commuting | null;
  options: Option[],
  dictionary: any,
  onSubmit: (commuting: Commuting) => void
};

const CommutingForm = ({commuting, options, dictionary, onSubmit}: Props) => {
  const {loading} = useCommuting()
  const form = useForm<Commuting>({
    resolver: zodResolver(CommutingValidation),
    defaultValues: {
      idControlCommuting: commuting?.idControlCommuting ?? 0,
      idUserControl: commuting?.idUserControl ?? 0,
      description: commuting?.description ?? '',
      idControlFacility: commuting?.idControlFacility ?? 0,
      active: commuting?.active ?? 1,
    },
  })

  return (!dictionary || loading) ? (
    <div className="flex items-center justify-center w-full h-full">
      <Loading/>
    </div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 text-neutral-500 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            name="idControlFacility"
            label={dictionary.label}
            placeholder={dictionary.faci}
            options={options}
            control={form.control}
          />
          <div className="col-span-2">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              name="description"
              label={dictionary.label1}
              placeholder={dictionary.des}
              control={form.control}
            />
          </div>
        </div>
        <SubmitButton isLoading={loading} className="flex items-center justify-center w-32 float-end">
          {!commuting ? dictionary.add : dictionary.up}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default CommutingForm
