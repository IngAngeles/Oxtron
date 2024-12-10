import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogPortal,
  } from '@/components/ui/dialog'
  import { BiSend } from "react-icons/bi";
  type Props = {
    children: React.ReactNode,
    title: string,
    description?: string,
    open: boolean,
    onClose: () => void,
  }
  export const Modal = ({ children, title, description, open, onClose }: Props) => {
    return (
      <Dialog open={ open } onOpenChange={ onClose } modal>
        <DialogTrigger>Open</DialogTrigger>
        <DialogPortal>
          <DialogContent className="h-[64vh] w-[360px] overflow-y-scroll bg-white border-0 text-black no-scrollbar">
          <DialogHeader>
            <div className="flex items-center justify-center space-x-2"> 
              <BiSend className="text-xl" /> 
              <DialogTitle className="text-black font-bold">{title}</DialogTitle>
            </div>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
            { children }
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )
  }
  