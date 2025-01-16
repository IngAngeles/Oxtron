"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import SubmitButton from "../SubmitButton"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { updatePassword } from '@/actions/auth'
import { useFormValidation } from '@/lib/validation'
import CustomFormField from '../CustomFormField'
import Lottie from 'lottie-react'
import animationData from "@/public/assets/lotties/success.json"
import { Button } from '../ui/button'

export enum FormFieldType {
    INPUT = 'input',
    PASSWORD = "password",
    TEXTAREA = 'textarea',
    PHONE_INPUT= 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}



const UpdatePassword = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showValidatePassword, setShowValidatePassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const { UpdatePasswordValidation } = useFormValidation();

    const form = useForm<UpdatePasswordFormValues>({
        resolver: zodResolver(UpdatePasswordValidation),
        defaultValues: {
            email: "",
            passwordOld: "",
            passwordNew: "",
            confirmPassword: ""
        },
    });
    
    type UpdatePasswordFormValues = z.infer<typeof UpdatePasswordValidation>;
  
    async function onSubmit({ email, passwordOld, passwordNew }: z.infer<typeof UpdatePasswordValidation>) {
        setIsLoading(true);
        try {
            await updatePassword({ email, passwordOld, passwordNew });
            setSuccess(true)
        } catch (e) {
            setError(true)
            console.error(e);
        }
        setIsLoading(false)
    }

    return (
        <div>
            { success ?
                <div className="flex flex-col gap-4 h-screen md:my-20">
                    <Lottie
                        animationData={animationData}
                        className="flex justify-center items-center h-32"
                        loop={true}
                    />
                    <p className="text-dark-600 text-center">Your password <br /> has been successfully updated.</p>
                    <SubmitButton isLoading={isLoading} onClick={() => router.push('/')}>
                        Go back to Login
                    </SubmitButton>
                </div>
                :
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                        <section className="mb-12 space-y-4 text-center">
                            <h1 className="font-bold text-[24px] text-black title-century-gothic-bold">Update Password</h1>
                            <p className="text-[#9FA2B4] title-century-gothic-regular text-[14px]">Please enter your email, current password and new password below</p>
                        </section>
                        { error ?
                            <div className="space-y-6 flex-1">
                                <p className="text-[#9FA2B4] title-century-gothic-regular text-[14px] text-center">Please check your data,<br />there was an error in your request.</p>
                                <Button
                                    type='button'
                                    className={"shad-primary-btn w-full py-6 hover:scale-95 transition duration-300"}
                                    onClick={() => setError(false)}
                                >
                                    Try again
                                </Button>
                            </div>
                            :
                            <div className="space-y-6 flex-1">
                                <CustomFormField
                                    fieldType={FormFieldType.INPUT}
                                    control={form.control}
                                    name="email"
                                    label="Email"
                                    placeholder="Email address"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.PASSWORD}
                                    control={form.control}
                                    name="passwordOld"
                                    label="Current Password"
                                    placeholder="Current Password"
                                    showPassword={showPassword}
                                    showPasswordToggle={true}
                                    onPasswordToggle={() => setShowPassword(!showPassword)}
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.PASSWORD}
                                    control={form.control}
                                    name="passwordNew"
                                    label="New Password"
                                    placeholder="New Password"
                                    showPassword={showNewPassword}
                                    showPasswordToggle={true}
                                    onPasswordToggle={() => setShowNewPassword(!showPassword)}
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.PASSWORD}
                                    control={form.control}
                                    name="confirmPassword"
                                    label="Confirm New Password"
                                    placeholder="Confirm New Password"
                                    showPassword={showValidatePassword}
                                    showPasswordToggle={true}
                                    onPasswordToggle={() => setShowValidatePassword(!showPassword)}
                                />
                                <SubmitButton isLoading={isLoading}>
                                    Update Password
                                </SubmitButton>
                                <Link href="/" className="text-dark-600 text-sm w-full font-extralight mb-20">
                                    <p className="mt-4">Return to <b>Log In</b></p>
                                </Link>
                            </div>
                        }
                    </form>
                </Form>
            }
        </div>
    )
}

export default UpdatePassword