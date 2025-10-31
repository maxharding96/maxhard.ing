import { forwardRef } from 'react'
import projects from './projects.json'
import * as schema from './schema'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { SiGithub } from 'react-icons/si'
import { MY_GITHUB } from '@/pages'

type ProjectAssetProps = {
  projectId: string
} & schema.ProjectAsset

function ProjectAsset(props: ProjectAssetProps) {
  const { projectId, name, description } = props

  const url = getAssetUrl({ projectId, name })

  return (
    <CarouselItem className="basis-1/2">
      <img src={url} alt={description} />
    </CarouselItem>
  )
}

type ProjectProps = {
  id: string
} & schema.Project

function Project(props: ProjectProps) {
  const { id, title, description, assets, technologies, github, url } = props
  return (
    <Card className="bg-slate-50">
      <CardHeader className="gap-4">
        <CardTitle className="text-xl">
          <a href={url}>{title}</a>
        </CardTitle>
        {technologies && (
          <div className="flex gap-1">
            {technologies?.map((t) => (
              <Badge key={t} variant="secondary" className="text-sm">
                {t}
              </Badge>
            ))}
          </div>
        )}
        <p>{description.join(' ')}</p>
        {github && (
          <CardAction>
            <a href={MY_GITHUB + github}>
              <SiGithub size={24} />
            </a>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex justify-center px-18">
        <Carousel className="min-w-xl" opts={{ loop: true }}>
          <CarouselContent>
            {assets.map((props, i) => (
              <ProjectAsset key={i} projectId={id} {...props} />
            ))}
          </CarouselContent>
          {assets.length > 2 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      </CardContent>
    </Card>
  )
}

export const Projects = forwardRef<HTMLDivElement>((_, ref) => {
  const data = readProjectData()

  return (
    <div ref={ref} className="flex flex-col gap-y-2">
      <p className="text-3xl">Projects</p>
      <p className="text-lg font-light">
        Independent projects I've worked on over the years.
      </p>
      <div className="flex flex-col gap-y-6">
        {data.projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </div>
  )
})

function readProjectData(): schema.Projects {
  const data = schema.projectsSchema.parse(projects)
  return data
}

function getAssetUrl({ projectId, name }: { projectId: string; name: string }) {
  return `/projects/${projectId}/${name}`
}
