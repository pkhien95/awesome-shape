import { request } from './request'
import { GET_COLOR_API_URL, GET_IMAGE_API_URL } from '../constants'

export const getBackgroundColor = async () => {
  const json = await request(GET_COLOR_API_URL)
  return `#${json[0].hex}`
}

export const getBackgroundImage = async () => {
  const json = await request(GET_IMAGE_API_URL)
  return json[0].imageUrl
}
