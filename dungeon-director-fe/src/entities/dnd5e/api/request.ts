import { z } from 'zod'

const apiBaseUrl = 'https://www.dnd5eapi.co/api/2014/'

export async function dnd5eRequest<T>(
  path: string,
  schema: z.ZodType<T>,
): Promise<T> {
  const response = await fetch(new URL(path, apiBaseUrl), {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok)
    throw new Error(`D&D 5e API returned an error: ${response.status}.`)

  return schema.parse((await response.json()) as unknown)
}
