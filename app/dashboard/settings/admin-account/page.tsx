'use client'
import { useContext } from 'react'
import { useRouter } from 'next/navigation';
import { SearchIcon, ArrowLeft } from 'lucide-react';
import DashboardButton from '@/components/DashboardButton';
import UserByCompanyIdForm from '@/components/forms/settings/admin/UserByCompanyIdForm';
import { EditUserForm } from '@/components/forms/settings/admin/EditUserForm';
import TableAdmin from '@/components/TableAdmin';
import TitleHandler from '@/components/TitleHandler';
import { Modal } from '@/components/shared/Modal'
import { AdminAccountContext, IAdminAccountContext } from '@/context/setting/admin-account'

const AdminPage: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    isLoading,
    handleOpenRegisterUserModal,
    handleCloseRegisterUserModal,
    isRegisterUserModalOpen,
    isUpdateUserModalOpen,
    handleCloseUpdateUserModal,
  } = useContext(AdminAccountContext) as IAdminAccountContext
  const router = useRouter();

  return (
    <div className='p-6 lg:ml-64 ml-0 min-h-screen pb-10 mt-6 md:ml-64 flex flex-col'>
      <div className='flex items-center mb-4 gap-2'>
        <button onClick={() => router.back()} className='flex items-center gap-2 text-blue-600 hover:text-blue-800'>
          <ArrowLeft className='w-6 h-6' />
        </button>
        <TitleHandler title="Administrator" text='Share your positive impact and download your information' />
      </div>
      <div className='flex flex-1 gap-10 md:flex-nowrap flex-wrap mt-4 w-full'>
        <div className='bg-white shadow-xl w-full px-7 py-8 flex flex-col rounded-xl max-h-[550px]'>
          <h2 className='font-bold text-neutral-700 text-xl'>Account Manager</h2>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='relative mt-7'>
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='border border-gray-300 rounded-md px-3 py-2 pl-10 pr-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              </div>
            </div>
            <div className='hidden md:block md:mt-7'>
              <DashboardButton
                isLoading={isLoading}
                style={{
                  background: 'linear-gradient(to top, #2A8CFE, #03133A)',
                  fontFamily: 'font-sans, sans-serif',
                  padding: '23px',
                  textTransform: 'none',
                }}
                onClick={handleOpenRegisterUserModal}
              >
                <h2 className='font-bold text-white text-md'>
                  New User
                </h2>
              </DashboardButton>
            </div>
          </div>
          <TableAdmin/>
        </div>
      </div>

      {/* Renderiza el Modal */}
      <Modal open={ isRegisterUserModalOpen } onClose={ handleCloseRegisterUserModal } title="Add New User" className="h-[80vh]">
        <UserByCompanyIdForm/>
      </Modal>
      <Modal open={ isUpdateUserModalOpen } onClose={ handleCloseUpdateUserModal } title="Update User">
        <EditUserForm/>
      </Modal>
    </div>
  );
}

export default AdminPage;
