import { create } from 'zustand'

const useDialogContext = create(set => ({
  isOpen: false,
  setIsOpen: isOpen => set(() => ({ isOpen })),
}))

export default useDialogContext
