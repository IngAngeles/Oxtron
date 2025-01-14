'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import TravelsForm from "@/components/forms/measure/TravelsForm";
import Loading from "@/components/loading/LoadingBlack";
import Modal from "@/components/measure/Modal";
import TabMenu from "@/components/measure/TabMenu";
import {useTravels} from "@/hooks/measure/travels/useTravels";

export default function TravelsPage() {
  const {dictionary, items, cards, buttons, showModal, handleHideModal, onSubmit, travel} = useTravels()
  const path = usePathname()

  return (!dictionary) ? (
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
            </Link> / {dictionary?.measure.all.travels}
          </h1>
          <p className="font-light text-neutral-500">
            {dictionary?.measure.subtitle}
          </p>
        </div>
        <TabMenu items={items} cards={cards} iconButton={buttons}/>
      </div>
      {showModal && (
        <Modal title={dictionary.measure.modal.create} handleOnCloseModal={handleHideModal} className="max-h-[80vh]">
          <TravelsForm travel={travel} onSubmit={onSubmit}/>
        </Modal>
      )}
    </>
  )
}
