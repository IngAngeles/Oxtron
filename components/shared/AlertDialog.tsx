import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

type Props = {
  title: string
  description?: string
  cancelText?: string
  continueText?: string
  children: React.ReactNode
  onAcceptHandler: () => void
}

export function Dialog({ title, description, cancelText = 'cancel', continueText = 'continue', onAcceptHandler, children }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        { children }
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{ title }</AlertDialogTitle>
          { description ?? (
            <AlertDialogDescription>
              { description }
            </AlertDialogDescription>
          ) }
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{ cancelText }</AlertDialogCancel>
          <AlertDialogAction onClick={ onAcceptHandler }>{ continueText }</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
