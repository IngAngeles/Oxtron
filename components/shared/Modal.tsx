import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogPortal,
  DialogClose,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import React from 'react'
import { CircleX } from 'lucide-react'
import Facility from '@/public/assets/icons/black/Facility.png'
import Image from 'next/image'

type Props = {
  children: React.ReactNode,
  className?: string,
  title?: string,
  icon?: boolean,
  description?: string,
  open: boolean,
  onClose: () => void,
  customClose?: boolean
}

export const Modal = ({ children, className, title, icon = false, description, open, onClose }: Props) => {
  return (
    <Dialog open={ open } onOpenChange={ onClose } modal>
      <DialogTrigger>Open</DialogTrigger>
      <DialogPortal>
        <DialogContent className={ cn('overflow-y-scroll bg-white border-0 text-black no-scrollbar', className) }>
          <DialogHeader>
            <div className="flex items-center justify-start space-x-2">
              { icon && <Image src={ Facility.src } alt="Facility" width="96" height="96" className="w-12 h-12"/> }
              <DialogTitle className="text-black font-bold">{ title }</DialogTitle>
            </div>
            <DialogDescription>{ description }</DialogDescription>
          </DialogHeader>
        { children }
      </DialogContent>
      </DialogPortal>
        <DialogClose asChild className="flex items-center justify-center">
          <CircleX className="w-16 h-16"/>
        </DialogClose>
    </Dialog>
  )
}