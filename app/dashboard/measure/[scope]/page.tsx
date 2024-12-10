'use client'
import { useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import TabMenu from '@/components/measure/TabMenu'
import ModalMeasureForm from '@/components/measure/ModalMeasureForm'
import { MeasureContext } from '@/context/measure'
import { IMeasureContextType } from '@/constants/types'
import Loading from '@/components/loading/LoadingBlack'  

const items: string[] = ['All']

export default function Page() {
  const {
    measure,
    setMeasure,
    scope,
    showModal,
    handleShowModal,
    handleHideModal,
    error,
    cards,
    title,
    loading,
  } = useContext(MeasureContext) as IMeasureContextType
  const path = usePathname()

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-6 gap-4 h-full">
        <Loading />  
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center mt-6 gap-4 md:ml-64 h-full">
        <p className="text-neutral-500">
          { error.toString() }
        </p>
      </div>
    )
  }

  const buttons: IIconButton[] = [
    {
      src: '/assets/icons/black/Search.png',
      alt: 'Search icon',
      size: 'xs',
      text: 'Search',
      onClick: () => {
      },
    },
    {
      src: '/assets/icons/black/Add New-1.png',
      alt: 'Add icon',
      size: 'xs',
      text: 'Add',
      onClick: handleShowModal,
    },
  ]

  return (
    <>
      { showModal &&
        <ModalMeasureForm
          title={ title }
          scope={ scope }
          handleOnCloseModal={ () => {
            handleHideModal()
            setMeasure(undefined)
          } }
          measure={ measure }
        />
      }
      <div className="flex flex-col  gap-4 p-6 lg:ml-64 ml-0">
        <div>
          <h1 className="title-geometos font-[400] text-2xl text-neutral-900">
            <Link
              href={ path.split('/').slice(0, -1).join('/') }
              className="text-neutral-300"
            >
              Measure
            </Link> / { scope }
          </h1>
          <p className="font-light text-neutral-500">
            Measure your company emissions and identify hotspots
          </p>
        </div>
        <TabMenu items={ items } cards={ cards } iconButton={ buttons } appendTitle={ true }/>
      </div>
    </>
  )
}
