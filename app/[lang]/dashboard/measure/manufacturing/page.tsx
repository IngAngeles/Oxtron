'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import Loading from "@/components/loading/LoadingBlack";
import Modal from "@/components/measure/Modal";
import TabMenu from "@/components/measure/TabMenu";
import ManufacturingForm from "@/components/forms/measure/ManufacturingForm";
import {useManufacturing} from "@/hooks/measure/manufacturing/useManufaturing";

export default function ManufacturingPage() {
  const {
    dictionary,
    items,
    cards,
    buttons,
    manufacture,
    showModal,
    handleHideModal,
    facilityOptions,
    fuelOptions,
    equipmentOptions,
    onSubmit,
  } = useManufacturing();
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
            </Link> / {dictionary?.measure.all.manufacturing}
          </h1>
          <p className="font-light text-neutral-500">
            {dictionary?.measure.subtitle}
          </p>
        </div>
        <TabMenu items={items} cards={cards} iconButton={buttons}/>
      </div>
      {showModal && (
        <Modal title={dictionary.measure.modal.create} handleOnCloseModal={handleHideModal} className="max-h-[80vh]">
          <ManufacturingForm
            manufacturing={manufacture}
            equipmentOptions={equipmentOptions}
            facilityOptions={facilityOptions}
            fuelOptions={fuelOptions}
            dictionary={dictionary?.measure.modalc}
            onSubmit={onSubmit}
          />
        </Modal>
      )}
    </>
  )
}
