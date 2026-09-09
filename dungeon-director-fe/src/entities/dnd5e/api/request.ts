import { z } from 'zod'

const dnd5eApiBaseUrl = 'https://www.dnd5eapi.co/api/2014/'

export const dnd5eWebsiteUrl = 'https://www.dnd5eapi.co'

export async function dnd5eRequest<T>(
  path: string,
  schema: z.ZodType<T>,
): Promise<T> {
  const response = await fetch(new URL(path, dnd5eApiBaseUrl), {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`D&D 5e API request failed: ${response.status}`)
  }

  const responseData: unknown = await response.json()

  return schema.parse(responseData)
}

export function getDnd5eResourceUrl(path: string) {
  return new URL(path, dnd5eWebsiteUrl).toString()
}
