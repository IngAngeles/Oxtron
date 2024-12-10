'use server'
import { AxiosError } from 'axios'
import { ILicenseType } from '@/constants/types'
import axiosInstance from '@/lib/axios-instance'

export async function getLicenseTypes() {
  try {
    const { status, data } = await axiosInstance.get('/TypesLicenses/Mostrar_Types_Licenses')
    return { status: status, success: true, data: data as ILicenseType[] }
  } catch (error) {
    const axiosError = error as unknown as AxiosError

    console.error({ error })

    return { status: axiosError.response?.status, success: false, data: axiosError.response?.data }
  }
}
