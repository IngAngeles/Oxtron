import { createContext, useState } from 'react'
import { IUser } from '@/constants/types'

export interface IAdminAccountContext {
  isLoading: boolean
  isRegisterUserModalOpen: boolean
  isUpdateUserModalOpen: boolean
  searchTerm: string
  handleOpenRegisterUserModal: () => void
  handleCloseRegisterUserModal: () => void
  handleOpenUpdateUserModal: () => void
  handleCloseUpdateUserModal: () => void
  setIsLoading: (isLoading: boolean) => void
  setSearchTerm: (term: string) => void
  user?: IUser
  setUser: (user: IUser) => void
}

export const AdminAccountContext = createContext<IAdminAccountContext | null>(null)

export const AdminAccountProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRegisterUserModalOpen, setIsRegisterUserModalOpen] = useState(false)
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [user, setUser] = useState<IUser | undefined>()

  const handleOpenRegisterUserModal = () => setIsRegisterUserModalOpen(true)
  const handleCloseRegisterUserModal = () => setIsRegisterUserModalOpen(false)

  const handleOpenUpdateUserModal = () => setIsUpdateUserModalOpen(true)
  const handleCloseUpdateUserModal = () => setIsUpdateUserModalOpen(false)

  return (
    <AdminAccountContext.Provider
      value={ {
        isLoading,
        isRegisterUserModalOpen,
        isUpdateUserModalOpen,
        searchTerm,
        user,
        setIsLoading,
        handleCloseRegisterUserModal,
        handleOpenRegisterUserModal,
        handleOpenUpdateUserModal,
        handleCloseUpdateUserModal,
        setSearchTerm,
        setUser,
      } }
    >
      { children }
    </AdminAccountContext.Provider>
  )
}
