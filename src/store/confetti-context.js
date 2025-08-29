import { create } from 'zustand'

const useConfettiContext = create(set => ({
  run: false,
  setRunStart: () => set(() => ({ run: true })),
  setRunEnd: () => set(() => ({ run: false })),
}))

export default useConfettiContext
