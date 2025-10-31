import { z } from 'zod'

const projectAssetSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export type ProjectAsset = z.infer<typeof projectAssetSchema>

const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().array(),
  assets: projectAssetSchema.array(),
  url: z.string().optional(),
  github: z.string().optional(),
  technologies: z.string().array().optional(),
})

export type Project = z.infer<typeof projectSchema>

export const projectsSchema = z.object({
  projects: projectSchema.array(),
})

export type Projects = z.infer<typeof projectsSchema>
