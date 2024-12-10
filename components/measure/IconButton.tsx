import Image from 'next/image'
import { cn } from '@/lib/utils'

declare global {
  interface IIconButton {
    src: string
    alt: string
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    text?: string
    onClick?: () => void
  }
}

type Props = Readonly<IIconButton>;

const IconButton = ({ src, alt, size, text, onClick }: Props) => {
  return (
    <div
      className={ cn(
        'flex w-auto items-center justify-center gap-2',
        onClick ? 'cursor-pointer' : 'cursor-default',
      ) }
      onClick={ onClick }
    >
      <Image
        src={ src }
        alt={ alt }
        width={ 96 }
        height={ 96 }
        className={ cn(
          'object-contain',
          size === 'xs' ? 'h-4 w-fit' :
            size === 'sm' ? 'h-6 w-fit' :
              size === 'md' ? 'h-8 w-fit' :
                size === 'lg' ? 'h-10 w-fit' :
                  size === 'xl' ? 'h-12 w-fit' : 'h-16 w-fit',
        ) }
      />
      { text &&
        <span className="text-neutral-500 text-sm font-extralight">
          { text }
        </span>
      }
    </div>
  )
}

export default IconButton
