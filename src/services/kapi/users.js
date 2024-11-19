import packageJson from '@root/package.json'

const { version } = packageJson
const baseUrl = import.meta.env.VITE_KAPI_URL

export const getUserProfile = async (bearerToken) => {
  const response = await fetch(`${baseUrl}/v1/users/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearerToken,
      cav: version
    }
  })

  const data = await response.json()
  return data
}
