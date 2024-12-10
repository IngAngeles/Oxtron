import React, { useEffect, useState } from 'react'
import { AdminAccountContext, IAdminAccountContext } from '@/context/setting/admin-account'
import { useToast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Company, UpdateUser, UpdateUserValidation } from '@/lib/validation'
import { getUserBySession, updateUser } from '@/actions/auth'
import { getCompanyById } from '@/actions/company'
import { Form } from '@/components/ui/form'
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import { roles } from '@/constants/auth'
import SubmitButton from '@/components/SubmitButton'

export const EditUserForm = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [_, setCompany] = useState<Company>()
  const { user } = React.useContext(AdminAccountContext) as IAdminAccountContext
  const { toast } = useToast()

  console.log('admin->EditUser', { user })

  const form = useForm<UpdateUser>({
    resolver: zodResolver(UpdateUserValidation),
    defaultValues: {
      active: user?.active,
      confirmPassword: user?.password,
      email: user?.email,
      firstName: user?.firstName,
      idCompany: user?.idCompany,
      idUSerControl: user?.idUSerControl,
      idUSerType: user?.idUSerType,
      language: user?.language,
      lastName: user?.lastName,
      password: user?.password,
      role: user?.role,
      telephoneUser: user?.telephoneUser,
      timeZone: user?.timeZone,

    }
  })

  const loadData = async () => {
    const user = await getUserBySession()
    const company = await getCompanyById(user.idCompany)

    setCompany(company)
  }

  useEffect(() => {
    loadData()
  }, [])

  async function onSubmit(user: UpdateUser) {
    setIsLoading(true)

    try {
      const response = await updateUser(user)
      if (response?.success) {
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