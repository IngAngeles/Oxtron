'use server'
import { BasicResponse, IGWP, IUser } from '@/constants/types'
import axiosInstance from '@/lib/axios-instance'
import { getUserBySession } from '@/actions/auth'
import { AxiosError } from 'axios'

export async function getUsersByCompanyId(): Promise<IUser[]> {
  try {
    const user = await getUserBySession()
    const response = await axiosInstance.get(`/UsersControl/Mostrar_Usuarios_IdCompany?idCompány=${ user.idCompany }`)

    return response.data as IUser[]
  } catch (error) {
    console.log({ error })
    throw error
  }
}

export async function getGWPDataset(): Promise<BasicResponse<IGWP[] | string>> {
  try {
    const response = await axiosInstance.get(`/GWPDataset/Mostrar_GWPDataset`)
    return { status: response.status, success: true, data: response.data }
  } catch (error) {
    const response = error as unknown as AxiosError
    console.error(error)
    return { status: response.status ?? 500, success: true, data: response.message }
  }
}
