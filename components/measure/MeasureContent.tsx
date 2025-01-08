import { TabsContent } from '@/components/ui/tabs'
import MeasureCard from '@/components/measure/MeasureCard'

type Props = { cards: IMeasureCard[]; scope: string; appendTitle: boolean };

const MeasureContent = ({ scope, cards, appendTitle = false }: Props) => {
  const filterCards = (cards: IMeasureCard[], scope: string): IMeasureCard[] => {
    if (scope === 'All') {
      return cards;
    }
    return cards.filter(card => card.footerCard?.scope.includes(scope));
  };

  return (
    <TabsContent value={ scope }>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-12">
        { cards.length !== 0 ? filterCards(cards, scope).map((card) => (
          <MeasureCard
            { ...card }
            appendTitle={ appendTitle }
            key={ card.id }/>
        )): <p className="text-black">No data available</p> }
      </div>
    </TabsContent>
  )
}

export default MeasureContent
