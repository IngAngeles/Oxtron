import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TrashIcon, UserIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { IUser } from '@/constants/types'
import { getUsersByCompanyId } from '@/actions/settings'
import { ActivityIcon } from 'lucide-react'
import { Dialog } from '@/components/shared/AlertDialog'
import { deleteUserById, disableUserById, getUserBySession } from '@/actions/auth'
import { useToast } from '@/components/ui/use-toast'
import { getCompanyById } from '@/actions/company'
import { AdminAccountContext, IAdminAccountContext } from '@/context/setting/admin-account'
import { Company } from '@/lib/validation'

interface TableAdminProps {}

const TableField: React.FC<TableAdminProps> = () => {
  const [data, setData] = useState<IUser[]>([])
  const [_, setLoading] = useState(true)
  const [__, setError] = useState<AxiosError | null>(null)
  const [company, setCompany] = useState<Company | null>(null)
  const { setUser, searchTerm, handleOpenUpdateUserModal } = React.useContext(AdminAccountContext) as IAdminAccountContext
  const { toast } = useToast()

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await getUsersByCompanyId()
      const user = await getUserBySession()
      const company = await getCompanyById(user.idCompany)

      setData(response)
      setCompany(company)
    } catch (error) {
      console.error({ error })
      setError(error as AxiosError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const filteredData = data.filter(user =>
    `${ user.firstName } ${ user.lastName }`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const deleteUser = async (idUserControl: number) => {
    try {
      const response = await deleteUserById(idUserControl)
      if (response.success) {
        toast({
          title: 'Success',
          description: 'This user has been inserted successfully',
        })
      }
    } catch (error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      })
      console.error({ error })
    }
  }

  const disableUser = async (idUserControl: number) => {
    try {
      const response = await disableUserById(idUserControl)
      if (response.success) {
        toast({
          title: 'Success',
          description: 'This user has been disabled successfully',
        })
      }
    } catch (error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      })
      console.error({ error })
    }
  }

  const editUser = (user: IUser) => {
    handleOpenUpdateUserModal()
    setUser(user)
  }

  return (
    <div className="mt-7">
      <Table style={ { color: '#9FA2B4' } }>
        <TableHeader>
          <TableRow style={ { color: '#9FA2B4', fontSize: '11px' } }>
            <TableHead>Organization</TableHead>
            <TableHead className="hidden md:table-cell">Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { filteredData.map((user, index) => (
            <TableRow key={ index }>
              <TableCell className="font-medium">{ company?.organisatioName }</TableCell>
              <TableCell className="hidden md:table-cell">{ `${ user.firstName } ${ user.lastName }` }</TableCell>
              <TableCell className="hidden md:table-cell">{ user.email }</TableCell>
              <TableCell className="hidden md:table-cell">{ user.active ? 'Active' : 'Inactive' }</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <UserIcon className="w-4 h-4 text-ce cursor-pointer" onClick={ () => editUser(user) }/>
                  <Dialog title="Are you sure to delete this user?" onAcceptHandler={ () => deleteUser(user.idUSerControl) }>
                    <TrashIcon className="w-4 h-4 text-ce cursor-pointer"/>
                  </Dialog>
                  <Dialog title="Are you sure to disable this user?" onAcceptHandler={ () => disableUser(user.idUSerControl) }>
                    <ActivityIcon className="w-4 h-4 text-ce cursor-pointer"/>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </div>
  )
}

export default TableField
