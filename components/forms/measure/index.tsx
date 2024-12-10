import { FormFieldType } from '@/components/forms/LoginForm'
import React from 'react'

declare global {
  interface MeasureForm {
    title: string
    fields: IFormFieldProps[]
  }

  interface IFormFieldProps {
    fieldType: FormFieldType
    name: string
    label?: string
    placeholder?: string
    type?: string
    iconSrc?: string
    iconAlt?: string
    disabled?: boolean
    dateFormat?: string
    showTimeSelect?: boolean
    options?: { value: string, label: string }[]
    children?: React.ReactNode
    renderSkeleton?: (field: any) => React.ReactNode
  }
}
