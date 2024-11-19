import packageJson from '@root/package.json'

const { version } = packageJson
const baseUrl = import.meta.env.VITE_KAPI_URL

const imageUrlToDataUrl = async (url) => {
  const response = await fetch(url)
  const blob = await response.blob()
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

const predictionsText = async (bearerToken, contentText) => {
  const response = await fetch(`${baseUrl}/v1/predictions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearerToken,
      cav: version
    },
    body: JSON.stringify({ content_text: contentText })
  })

  const data = await response.json()
  return data?.prompt
}

const predictionsImage = async (bearerToken, contentText, imageUrl) => {
  const dataUrl = await imageUrlToDataUrl(imageUrl)
  const response = await fetch(`${baseUrl}/v1/predictions/image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearerToken,
      cav: version
    },
    body: JSON.stringify({ content_text: contentText, data_url: dataUrl })
  })

  const data = await response.json()
  return data?.prompt
}

export { predictionsText, predictionsImage }
