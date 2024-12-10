'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import IconButton from '@/components/measure/IconButton'
import ScopeBadge from '@/components/measure/ScopeBadge'
import { cn, /* formatDateTime */ } from '@/lib/utils'
import { IMeasureContextType, IMeasureResponse } from '@/constants/types'
import { useContext } from 'react'
import { MeasureContext } from '@/context/measure'

declare global {
  interface IMeasureCard {
    id: string | number
    title?: string
    lastUpdated: Date
    description: string
    icon: {
      src: string
      position?: 'head' | 'body'
      onClick?: () => void
    }
    footerCard?: {
      scope: string[]
    }
    appendTitle: boolean,
    link?: string
    measure?: IMeasureResponse
  }
}

type Props = Readonly<IMeasureCard>

const MeasureCard = ({
  title = '',
  // lastUpdated,
  icon: { src, position = 'head', onClick },
  description,
  footerCard,
  appendTitle = false,
  link,
  measure,
}: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  // const { dateOnly } = formatDateTime(lastUpdated)
  const { setMeasure } = useContext(MeasureContext) as IMeasureContextType || {}

  return (
    <Card className="w-full text-neutral-500 rounded-[8px] shadow-custom">
      <CardHeader>
        <div className="flex items-center justify-between gap-2 ">
          <div>
            <h3
              className={ cn(
                'font-bold text-xl text-neutral-900',
                link ? 'cursor-pointer' : 'cursor-default',
              ) }
              onClick={ link ? () => router.push(`${ pathname }/${appendTitle ? title : ''}${ link }`) : undefined }
            >
              { title }
            </h3>
            {/* <span className="font-light text-neutral-500 text-xs">{ `Last Update: ${ dateOnly }` }</span> */ }
          </div>
          { position === 'head' &&
            <IconButton
              src={ src }
              alt="Edit icon"
              size="md"
              onClick={ () => {
                if (onClick) {
                  onClick()
                  setMeasure(measure)
                }
              } }
            />
          }
        </div>
        <hr/>
      </CardHeader>
      <CardContent className="flex flex-col items-start">
        <span className="text-sm">{ description }</span>
      </CardContent>
      <CardFooter className="flex items-center justify-between mt-4">
        { position === 'body' && footerCard &&
          <>
            <ScopeBadge scope={ footerCard.scope }/>
            <IconButton src={ src } alt={ src } size="xl"/>
          </>
        }
      </CardFooter>
    </Card>
  )
}

export default MeasureCard
