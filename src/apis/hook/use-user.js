import { axs } from '@/utils/axios'

const prefix = '/user'

async function loginWithInvitationCodeAPI(payload) {
  const data = await axs(`${prefix}/loginWithInvitationCode`, payload)

  return data
}

export { loginWithInvitationCodeAPI }
