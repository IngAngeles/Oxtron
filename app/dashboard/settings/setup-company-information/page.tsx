'use client'
import TitleHandler from '@/components/TitleHandler'
import { SquarePen } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getCompanyById } from '@/actions/company'
import { getUserBySession } from '@/actions/auth'
import { Modal } from '@/components/shared/Modal'
import { EditCompanyForm } from '@/components/forms/settings/setup/EditCompanyForm'
import { EditUserForm } from '@/components/forms/settings/setup/EditUserForm'
import { Company, UpdateUser } from '@/lib/validation'

const Setup = () => {
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [companyData, setCompanyData] = useState<Company>()
  const [userData, setUserData] = useState<UpdateUser>()
  const router = useRouter()

  const handleCompanyEditClick = () => {
    setIsCompanyModalOpen(true)
  }

  const handleUserEditClick = () => {
    setIsUserModalOpen(true)
  }

  const handleCloseCompanyModal = () => {
    setIsCompanyModalOpen(false)
  }

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false)
  }

  const loadData = async () => {
    try {
      const user = await getUserBySession()
      const company = await getCompanyById(user.idCompany)

      setCompanyData(company)
      setUserData(user as unknown as UpdateUser)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="p-6 lg:ml-6 ml-0 min-h-screen flex flex-col pb-10 md:pl-64">
      <div className="flex items-center mb-4 gap-2">
        <button onClick={ () => router.back() } className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-6 h-6"/>
        </button>
        <TitleHandler title="Company Information" text="Manage your user and account information"/>
      </div>
      <div className="flex flex-col md:flex-row gap-10 mt-4 flex-1 w-full pb-9">
        {/* Contenedor 1 */ }
        <div className="relative bg-white shadow-xl w-full md:w-1/2 px-7 py-5 grid rounded-xl">
          <div className="absolute top-2 right-2">
            <SquarePen size={ 15 } className="text-neutral-500 cursor-pointer" onClick={ handleCompanyEditClick }/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex flex-col items-center md:items-start">
                <p className="text-neutral-400 text-xs mb-1">Business Name</p>
                <h2 className="font-bold text-neutral-700 text-h1">{ companyData?.organisatioName }</h2>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-400 text-xs mb-1">Industry</p>
              <h2 className="font-bold text-neutral-700 text-h1">{ companyData?.role }</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-400 text-xs mb-1">Country</p>
              <h2 className="font-bold text-neutral-700 text-h1">{ companyData?.country }</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-400 text-xs mb-1">State</p>
              <h2 className="font-bold text-neutral-700 text-h1">{ companyData?.state }</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-400 text-xs mb-1">City</p>
              <h2 className="font-bold text-neutral-700 text-h1">{ companyData?.city }</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-400 text-xs mb-1">Zip Code</p>
              <h2 className="font-bold text-neutral-700 text-h1">{ companyData?.postalCode }</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-400 text-xs mb-1">Address</p>
              <h2 className="font-bold text-neutral-700 text-h1">{ companyData?.address }</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-400 text-xs mb-1">Telephone (Optional)</p>
              <h2 className="font-bold text-neutral-700 text-h1">{ companyData?.telephoneCompany }</h2>
            </div>
          </div>
        </div>
        {/* Contenedor 2 */ }
        <div className="relative bg-white shadow-xl w-full md:w-1/2 px-7 py-5 grid rounded-xl">
          <div className="absolute top-2 right-2">
            <SquarePen size={ 15 } className="text-neutral-500 cursor-pointer" onClick={ handleUserEditClick }/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex flex-col items-center md:items-start">
                <p className="text-neutral-400 text-xs mb-1">Name</p>
                <h2 className="font-bold text-neutral-700 text-h1">{ userData?.firstName }</h2>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-400 text-xs mb-1">Surname</p>
              <h2 className="font-bold text-neutral-700 text-h1">{ userData?.lastName }</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-400 text-xs mb-1">User Type</p>
              <h2 className="font-bold text-neutral-700 text-h1">{ userData?.idUSerType }</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-400 text-xs mb-1">Email</p>
              <h2 className="font-bold text-neutral-700 text-h1">{ userData?.email }</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-400 text-xs mb-1">Role</p>
              <h2 className="font-bold text-neutral-700 text-h1">{ userData?.role }</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-400 text-xs mb-1">Password</p>
              <h2 className="font-bold text-neutral-700 text-h1">{ userData?.password }</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-400 text-xs mb-1">Phone</p>
              <h2 className="font-bold text-neutral-700 text-h1">{ userData?.role }</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-400 text-xs mb-1">Time Zone</p>
              <h2 className="font-bold text-neutral-700 text-h1">{ userData?.timeZone }</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-400 text-xs mb-1">Language</p>
              <h2 className="font-bold text-neutral-700 text-h1">{ userData?.language }</h2>
            </div>
          </div>
        </div>
      </div>
      <Modal open={ isCompanyModalOpen } onClose={ handleCloseCompanyModal }>
        <EditCompanyForm company={ companyData }/>
      </Modal>
      <Modal open={ isUserModalOpen } onClose={ handleCloseUserModal }>
        <EditUserForm user={ userData } company={ companyData }/>
      </Modal>
    </div>
  )
}

export default Setup
