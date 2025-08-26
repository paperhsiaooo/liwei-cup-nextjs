import { create } from 'zustand'

const useUserContext = create((set, get) => ({
  user: {
    isLogin: false,
    name: '',
    isParticipating: 1,
    address: '',
    nickName: '',
    role: null,
    shirtSize: null,
    team: null,
    messageToOrganizer: '',
  },
  loginSuccess: data =>
    set(() => ({
      user: {
        isLogin: true,
        name: data.name,
        nickName: data.nickName,
        role: data.role,
        shirtSize: data.shirtSize,
        team: data.team,
        messageToOrganizer: data.messageToOrganizer,
      },
    })),
  setPlayerInfo: data =>
    set(() => ({
      user: {
        ...get().user,
        nickName: data.nickName,
        isParticipating: data.isParticipating,
        address: data.address,
        shirtSize: data.shirtSize,
      },
    })),
}))

export default useUserContext
