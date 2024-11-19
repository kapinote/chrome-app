import packageJson from '@root/package.json'

const { version } = packageJson
const baseUrl = import.meta.env.VITE_KAPI_URL

export const getOauthToken = async (googleToken) => {
  const body = {
    grant_type: 'password',
    google_token: googleToken
  }

  const response = await fetch(`${baseUrl}/v1/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cav: version
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()
  return data
}
