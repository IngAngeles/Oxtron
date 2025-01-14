import {useDictionary} from "@/hooks/shared/useDictionary";
import {useTravelStore} from "@/store/measure/travels";
import {useModal} from "@/hooks/shared/useModal";
import {useEffect, useState} from "react";
import {Travel} from "@/lib/validation";
import {toast} from "@/components/ui/use-toast";

export const useTravels = () => {
  const {isLoading, dictionary} = useDictionary()
  const {
    loading,
    travels,
    travel,
    createTravel,
    fetchTravels,
    updateTravel,
    setLoading,
    setTravel,
  } = useTravelStore()
  const {showModal, handleShowModal, handleHideModal} = useModal()
  const [cards, setCards] = useState<Cards[]>([])

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
      onClick: () => {
        handleShowModal()
        setTravel(null)
      },
    },
  ]

  useEffect(() => {
    fetchTravels()
  }, [])

  useEffect(() => {
    setLoading(true)
    const cards: Cards[] = travels.map((travel) => ({
      id: travel.idControlTravel || 0,
      title: `${travel.idTravel}`,
      description: 'Mexico City, Mexico',
      icon: {
        src: '/assets/icons/black/Edit.png',
        position: 'head',
        onClick: () => {
          handleShowModal()
          setTravel(travel)
        },
      },
      link: `/${travel.idControlTravel}`,
      lastUpdated: new Date(2022, 10, 23),
    }))

    setCards(cards)
  }, [travels])

  const onSubmit = async (travel: Travel) => {
    try {
      if (travel.idControlTravel) {
        await updateTravel(travel);

        toast({
          title: dictionary?.measure.modal.toast.update.title,
          description: dictionary?.measure.modal.toast.update.description,
          className: 'bg-black',
        });
      } else {
        await createTravel(travel);

        toast({
          title: dictionary?.measure.modal.toast.create.title,
          description: dictionary?.measure.modal.toast.create.description,
          className: 'bg-black',
        });
      }

      setLoading(false)
      handleHideModal()
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: dictionary?.measure.modal.toast.error.title,
        description: dictionary?.measure.modal.toast.error.description,
      });
    }
  }

  return {
    travel,
    travels,
    dictionary,
    isLoading,
    showModal,
    handleShowModal,
    handleHideModal,
    cards,
    onSubmit,
    loading,
    items,
    buttons,
  }
}
