'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

function CustomDialogView({
  isOpen,
  onOpenChange,
  onClose,
  title,
  description,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className={'p-6'}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <button
              type="button"
              className="bg-green-primary text-blue-primary rounded-md py-2 font-bold cursor-pointer duration-200 hover:bg-green-primary/50 active:bg-green-primary/50"
              onClick={onClose}
            >
              關閉
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialogView
