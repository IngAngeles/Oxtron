import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getUserBySession, registerByCompanyId } from '@/actions/auth'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import SubmitButton from '@/components/SubmitButton'
import { roles } from '@/constants/auth'
import { UserRegisterByCompanyId, UserRegisterByCompanyIdValidation } from '@/lib/validation'

const UserByCompanyIdForm = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const { toast } = useToast()

  const form = useForm<UserRegisterByCompanyId>({
    resolver: zodResolver(UserRegisterByCompanyIdValidation),
    defaultValues: {
      idCompany: 0,
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      password: '',
      confirmPassword: '',
      telephoneUser: '',
      timeZone: '',
      language: '',
    }
  })


  // TODO: check user registration by company - status 500
  async function onSubmit(user: UserRegisterByCompanyId) {
    setIsLoading(true)

    try {
      const session = await getUserBySession()

      console.log({ ...user, idCompany: session.idCompany })

      await registerByCompanyId({ ...user, idCompany: session.idCompany })
      toast({
        title: 'Success',
        description: 'This user has been created successfully',
      })
      form.reset()
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
            showPassword={ showPassword }
            onPasswordToggle={ () => setShowPassword(!showPassword) }
            showPasswordToggle
          />
          <CustomFormField
            fieldType={ FormFieldType.PASSWORD }
            control={ form.control }
            placeholder="Confirm Password"
            label="Confirm Password"
            name="confirmPassword"
            showPassword={ showConfirmPassword }
            onPasswordToggle={ () => setShowConfirmPassword(!showConfirmPassword) }
            showPasswordToggle
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
        <SubmitButton isLoading={ isLoading } onClick={ () => onSubmit(form.getValues()) }>Add</SubmitButton>
      </form>
    </Form>
  )
}

export default UserByCompanyIdForm
