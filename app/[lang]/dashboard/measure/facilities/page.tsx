'use client'
import {useEffect, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import Loading from "@/components/loading/LoadingBlack";
import TabMenu from "@/components/measure/TabMenu";
import {useDictionary} from "@/hooks/shared/useDictionary";
import {useModal} from "@/hooks/shared/useModal";
import {Facility} from "@/lib/validation";
import {useFacilityStore} from "@/store/measure/facilities";
import Modal from "@/components/measure/Modal";
import FacilitiesForm from "@/components/forms/measure/FacilitiesForm";
import {useStatusStore} from "@/store/shared/combos/Status";
import {Status} from "@/constants/types";
import {useFacilities} from "@/hooks/measure";

export default function FacilitiesPage() {
  const {isLoading, dictionary} = useDictionary()
  const {showModal, handleShowModal, handleHideModal} = useModal()
  const {onSubmit} = useFacilities()
  const {
    facilities,
    facility,
    fetchFacilities,
    setFacility,
    setLoading,
  } = useFacilityStore()
  const {statuses, fetchStatuses} = useStatusStore()
  const [options, setOptions] = useState<Option[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const path = usePathname()

  const items: string[] = [dictionary?.measure.bar[0]]

  const buttons: IIconButton[] = [
    {
      src: '/assets/icons/black/Search.png',
      alt: 'Search icon',
      size: 'xs',
      text: dictionary?.measure.search,
      onClick: () => {
      },
    },
    {
      src: '/assets/icons/black/Add New-1.png',
      alt: 'Add icon',
      size: 'xs',
      text: dictionary?.measure.add,
      onClick: handleShowModal,
    },
  ]

  useEffect(() => {
    fetchFacilities()
    fetchStatuses()
  }, [])

  useEffect(() => {
    setLoading(true)

    const cards: Card[] = facilities.map((facility: Facility) => (
      {
        id: facility.idControlFacility || 0,
        title: facility?.idFacility,
        description: facility?.description || '',
        icon: {
          src: '/assets/icons/black/Edit.png',
          position: 'head',
          onClick: () => {
            setFacility(facility)
            handleShowModal()
          },
        },
        link: `/${facility.idControlFacility}`,
        lastUpdated: new Date(2022, 10, 23),
        onClick: () => setFacility(facility),
      }
    ))
    setCards(cards)

    setLoading(false)
  }, [facilities]);

  useEffect(() => {
    setLoading(true)

    const options: Option[] = statuses.map((status: Status) => (
      {
        value: status.idStatus.toString(),
        label: status.description,
      }
    ))
    setOptions(options)

    setLoading(false)
  }, [statuses]);

  return (isLoading || !dictionary) ? (
    <div className="flex items-center justify-center w-full h-full">
      <Loading/>
    </div>
  ) : (
    <>
      <div className="flex flex-col  gap-4 p-6 lg:ml-64 ml-0">
        <div>
          <h1 className="title-geometos font-[400] text-2xl text-neutral-900">
            <Link
              href={path.split('/').slice(0, -1).join('/')}
              className="text-neutral-300"
            >
              {dictionary?.measure.title}
            </Link> / {dictionary?.measure.all.facilities}
          </h1>
          <p className="font-light text-neutral-500">
            {dictionary?.measure.subtitle}
          </p>
        </div>
        <TabMenu items={items} cards={cards} iconButton={buttons}/>
      </div>
      {showModal && (
        <Modal title={dictionary.measure.modal.create} handleOnCloseModal={handleHideModal} className="max-h-[80vh]">
          <FacilitiesForm
            facility={facility}
            options={options}
            onSubmit={onSubmit}
          />
        </Modal>
      )}
    </>
  )
}
