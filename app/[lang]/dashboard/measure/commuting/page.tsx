'use client'
import {usePathname} from "next/navigation";
import Link from "next/link";
import Loading from "@/components/loading/LoadingBlack";
import TabMenu from "@/components/measure/TabMenu";
import Modal from "@/components/measure/Modal";
import {useCommuting} from "@/hooks/measure/commuting/useCommuting";
import CommutingForm from "@/components/forms/measure/CommutingForm";

export default function CommutingPage() {
  const {
    dictionary,
    commute,
    loading,
    facilityOptions,
    onSubmit,
    items,
    cards,
    buttons,
    showModal,
    form,
    handleHideModal
  } = useCommuting()
  const path = usePathname()

  return (!dictionary) ? (
    <div className="flex items-center justify-center w-full h-full">
      <Loading/>
    </div>
  ) : (
    <>
      <div className="flex flex-col  gap-4 p-6 lg:ml-[205px] ml-0">
        <div>
          <h1 className="title-geometos font-[400] text-2xl text-neutral-900">
            <Link
              href={path.split('/').slice(0, -1).join('/')}
              className="text-neutral-300"
            >
              {dictionary?.measure.title}
            </Link> / {dictionary?.measure.all.commuting}
          </h1>
          <p className="font-light text-neutral-500">
            {dictionary?.measure.subtitle}
          </p>
        </div>
        <TabMenu items={items} cards={cards} iconButton={buttons}/>
      </div>
      {showModal && (
        <Modal title={commute ? dictionary.measure.modalc.title : dictionary.measure.modalc.create} handleOnCloseModal={handleHideModal} className="max-h-[80vh]">
          <CommutingForm
            loading={loading}
            commuting={commute}
            options={facilityOptions}
            dictionary={dictionary?.measure.modalc}
            form={form}
            onSubmit={onSubmit}
          />
        </Modal>
      )}
    </>
  )
}
