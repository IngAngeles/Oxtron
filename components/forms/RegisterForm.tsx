'use client'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {Form} from '@/components/ui/form'
import CustomFormField, {FormFieldType} from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {UserRegisterValidation} from '@/lib/validation'
import Link from 'next/link'
import {toast} from '@/components/ui/use-toast'
import {register} from '@/actions/auth'
import {Button} from '../ui/button'

const RegisterForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [timeZone, setTimeZone] = useState('UTC')

  useEffect(() => {
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    console.log({browserTimeZone})
    setTimeZone(browserTimeZone || 'UTC')
  }, [])

  const form = useForm<z.infer<typeof UserRegisterValidation>>({
    resolver: zodResolver(UserRegisterValidation),
    defaultValues: {
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      password: '',
      confirmPassword: '',
      organisationName: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      typeLicense: 1,
      telephoneUser: '0000000000',
      timeZone: timeZone,
      language: 'Por definir',
    },
  })

  const [arePasswordsMatch, setArePasswordMatch] = useState<boolean>(true)

  const nextStep = async () => {
    const isFormValid = await form.trigger(["firstName", "lastName", "password", "confirmPassword"])
    const {password, confirmPassword} = form.getValues()
    setArePasswordMatch(password === confirmPassword)

    if (!isFormValid || password !== confirmPassword) return

    setCurrentStep(2)
  }

  async function onSubmit(data: z.infer<typeof UserRegisterValidation>) {
    setIsLoading(true)
    try {
      const response = await register(data)
      if (response?.success) {
        toast({
          title: 'Success',
          description: 'You have been registered successfully',
          className: 'bg-black',
        })
      }
      form.reset()
      router.push(`/register-success`)
    } catch (error) {
      console.error({error})
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        className: 'bg-[#7f1d1d]',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 w-[28rem]">
        <section className="mb-12 space-y-4 text-center">
          <h1 className="font-bold text-[24px] text-black title-century-gothic-bold">Sign Up</h1>
          <p className="text-[#9FA2B4] title-century-gothic-regular text-[14px]">Enter your administrator info
            below</p>
        </section>
        {currentStep === 1 && (
          <>
            <div className="flex space-x-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
              />
            </div>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="role"
              label="Role"
              placeholder="Enter your role"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email address"
            />
            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              placeholder="Password"
              label="Password"
              name="password"
              showPassword={showPassword}
              onPasswordToggle={() => setShowPassword(!showPassword)}
              showPasswordToggle
            />
            {!arePasswordsMatch && (
              <p className="text-sm font-medium text-destructive shad-error">Passwords don&apos;t
                match</p>
            )}
            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              placeholder="Confirm Password"
              label="Confirm Password"
              name="confirmPassword"
              showPassword={showConfirmPassword}
              onPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              showPasswordToggle
            />
            {!arePasswordsMatch && (
              <p className="text-sm font-medium text-destructive shad-error">Passwords don&apos;t
                match</p>
            )}
          </>
        )}
        {currentStep > 1 && (
          <>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="organisationName"
              label="Organisation Name"
              placeholder="Enter your organisation name"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="city"
              label="City"
              placeholder="Enter your city"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="state"
              label="State"
              placeholder="Enter your state"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="country"
              label="Country"
              placeholder="Enter your country"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="postalCode"
              label="Postal Code"
              placeholder="Enter your postal code"
            />
          </>
        )}
        {currentStep > 1 ? (
          <SubmitButton isLoading={isLoading} onClick={() => onSubmit(form.getValues())}>
            Sign up
          </SubmitButton>
        ) : (
          <Button
            type="button"
            disabled={isLoading}
            className="shad-primary-btn w-full py-6 hover:scale-95 transition duration-300"
            onClick={nextStep}
          >
            Next
          </Button>
        )}

        <Link href="/" className="text-black text-sm w-full font-extralight">
          <p className="mt-4">
            ¿Already have an account? <b>Log In</b>
          </p>
        </Link>
      </form>
    </Form>
  )
}

export default RegisterForm
