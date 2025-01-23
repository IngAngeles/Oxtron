'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import Loading from "@/components/loading/LoadingBlack";
import TabMenu from "@/components/measure/TabMenu";
import Modal from "@/components/measure/Modal";
import FacilitiesForm from "@/components/forms/measure/FacilitiesForm";
import {useFacilities} from "@/hooks/measure";

export default function FacilitiesPage() {
  const {
    loading,
    dictionary,
    items,
    cards,
    buttons,
    showModal,
    handleHideModal,
    facility,
    options,
    onSubmit,
    form
  } = useFacilities();
  const path = usePathname();

  return (loading || !dictionary) ? (
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
        <Modal title={!facility ? dictionary.measure.modal.create : dictionary.measure.modal.title} handleOnCloseModal={handleHideModal} className="max-h-[80vh]">
          <FacilitiesForm
            loading={loading}
            facility={facility}
            options={options}
            dictionary={dictionary}
            form={form}
            onSubmit={onSubmit}
          />
        </Modal>
      )}
    </>
  )
}
