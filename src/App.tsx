import { useRef, forwardRef, type RefObject } from 'react'
import { Button } from '@/components/ui/button'
import { CloudDownload, Mail } from 'lucide-react'
import { Projects } from '@/components/projects'
import { Menu } from './components/Menu'

function HeaderButtons() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" className="rounded-2xl" asChild>
        <a href="/files/my_cv.pdf" download="Max Harding CV.pdf">
          <CloudDownload />
          Download CV
        </a>
      </Button>
      <Button variant="default" className="rounded-2xl" asChild>
        <a href="mailto:maxharding01@gmail.com">
          <Mail />
          Contact Me
        </a>
      </Button>
    </div>
  )
}

const AboutMe = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="space-y-4">
      <p className="text-3xl">About me</p>
      Passionate & self-driven fullstack engineer with 4 years of experience
      building & scaling web applications using{' '}
      <span className="font-bold">React</span>,{' '}
      <span className="font-bold">Typescript</span>, and{' '}
      <span className="font-bold">Node.js</span>. Proficient in{' '}
      <span className="font-bold">Python</span> and{' '}
      <span className="font-bold">AWS</span> for cloud infrastructure and
      backend services. Passionate about writing clean code, creating seamless
      user experiences and solving complex problems across the stack. Currently
      searching for my next full-time role!
    </div>
  )
})

function App() {
  const mainRef = useRef<HTMLDivElement>(null)
  const aboutMeRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const scrollToRef = (ref: RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="h-screen min-w-3xl flex flex-col items-center py-4">
      <div className="w-full xl:w-4/5 2xl:w-2/3 grid grid-cols-3 z-10 pb-2 px-8">
        <div>
          <Button
            variant="link"
            className="text-md px-0 font-bold"
            onClick={scrollToTop}
          >
            maxhard.ing
          </Button>
        </div>
        <Menu
          onClickAboutMe={() => scrollToRef(aboutMeRef)}
          onClickProjects={() => scrollToRef(projectsRef)}
        />

        <div className="flex justify-end">
          <HeaderButtons />
        </div>
      </div>
      <div
        ref={mainRef}
        className="flex flex-1 overflow-y-auto justify-center p-8"
      >
        <div className="w-full xl:w-4/5 2xl:w-2/3 space-y-16">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-4xl">Hey, I'm Max Harding 👋</p>
              <p className="text-4xl">
                I'm a{' '}
                <span className="font-bold text-primary">
                  Fullstack Engineer
                </span>
              </p>
            </div>
            <div />

            <img
              className="rounded-full w-3xs hidden lg:block"
              src="/files/me.jpg"
            />
            <div />
          </div>
          <AboutMe ref={aboutMeRef} />
          <Projects ref={projectsRef} />
        </div>
      </div>
    </div>
  )
}

export default App
