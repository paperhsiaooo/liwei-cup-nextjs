import { create } from 'zustand'

const useUserContext = create((set, get) => ({
  user: {
    isLogin: false,
    name: '',
    address: '',
    nickName: '',
    role: null,
    shirtSize: null,
    team: null,
    messageToOrganizer: '',
    isParticipating: 1,
    isCheckedIn: false,
  },
  loginSuccess: data =>
    set(() => ({
      user: {
        isLogin: true,
        name: data.name,
        address: data.address,
        nickName: data.nick_name,
        role: data.role,
        shirtSize: data.shirt_size,
        team: data.team,
        messageToOrganizer: data.message_to_organizer,
        battleDeclaration: data.battle_declaration_data,
        isParticipating: data.is_participating,
        isCheckedIn: data.is_checked_in,
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
