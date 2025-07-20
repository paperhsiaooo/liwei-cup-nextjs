import { create } from 'zustand'

const useUserContext = create(set => ({
  user: {
    isLogin: false,
    name: '',
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
}))

export default useUserContext
