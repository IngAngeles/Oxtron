'use server'

import { auth } from "@/auth"
import { ControlData } from "@/constants/types"
import axiosInstance from "@/lib/axios-instance"


export async function fetchDash(): Promise<ControlData[]> {
    try {
        const session = await auth()
        const idUserControl: number = Number(session?.user?.id) ?? 0
    
        const response = await axiosInstance.get(`/Dashboard/Mostrar_Dashboard_User?idUser=${idUserControl}`);

        const data: ControlData[] = response.data as ControlData[]
  
        // @ts-ignore
        return data
    } catch (error) {
        throw error
    }
}

export async function fetchHeader(){
    try {
        const session = await auth()
        const name = session?.user?.name || 'User'    
        // @ts-ignore
        return name
    } catch (error) {
        throw error
    }
}