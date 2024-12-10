import React from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Company, UpdateUser, UpdateUserValidation } from '@/lib/validation'
import { updateUser } from '@/actions/auth'
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import { roles } from '@/constants/auth'
import SubmitButton from '@/components/SubmitButton'

type Props = { user?: UpdateUser, company?: Company }

export const EditUserForm = ({ user }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { toast } = useToast()

  const form = useForm<UpdateUser>({
    resolver: zodResolver(UpdateUserValidation),
    defaultValues: {
      ...user,
      confirmPassword: user?.password,
    }
  })

  async function onSubmit(user: UpdateUser) {
    setIsLoading(true)

    console.log({ user })

    try {
      const response = await updateUser(user)
      if (response?.success){
        toast({
          title: 'Success',
          description: 'This user has been updated successfully',
        })
        form.reset()
      }
    } catch (error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6 flex-1 text-neutral-500 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            control={ form.control }
            placeholder="First Name"
            label="First Name"
            name="firstName"
          />
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            control={ form.control }
            placeholder="Last Name"
            label="Last Name"
            name="lastName"
          />
          <CustomFormField
            fieldType={ FormFieldType.SELECT }
            control={ form.control }
            placeholder="Role"
            label="Role"
            name="role"
            options={ roles }
          />
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            control={ form.control }
            placeholder="Email"
            label="Email"
            name="email"
          />
          <CustomFormField
            fieldType={ FormFieldType.PASSWORD }
            control={ form.control }
            placeholder="Password"
            label="Password"
            name="password"
          />
          <CustomFormField
            fieldType={ FormFieldType.PASSWORD }
            control={ form.control }
            placeholder="Confirm Password"
            label="Confirm Password"
            name="confirmPassword"
          />
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            control={ form.control }
            placeholder="Type of License"
            label="Type of License"
            name="typeLicense"
          />
          <CustomFormField
            fieldType={ FormFieldType.PHONE_INPUT }
            control={ form.control }
            placeholder="Telephone"
            label="Telephone"
            name="telephoneUser"
          />
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            control={ form.control }
            placeholder="Time Zone"
            label="Time Zone"
            name="timeZone"
          />
          <CustomFormField
            fieldType={ FormFieldType.INPUT }
            control={ form.control }
            placeholder="Language"
            label="Language"
            name="language"
          />
        </div>

        <SubmitButton isLoading={ isLoading } onClick={ () => onSubmit(form.getValues()) }>
          Update
        </SubmitButton>
      </form>
    </Form>
  )
}