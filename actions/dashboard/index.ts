'use server'

import {auth} from "@/auth"
import {ControlData} from "@/constants/types"
import axiosInstance from "@/lib/axios-instance"


export async function fetchDash(): Promise<ControlData[]> {
    try {
        const session = await auth()
        const idUserControl: number = Number(session?.user?.id) ?? 0

        console.log({idUserControl})
    
        const response = await axiosInstance.get(`/Dashboard/Mostrar_Dashboard_User?idUser=${idUserControl}`);

        // @ts-ignore
        return response.data as ControlData[]
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