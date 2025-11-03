import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu'
import { MY_GITHUB } from '@/pages'
import { Menu as MenuIcon } from 'lucide-react'

interface NavigationButtonProps {
  minimized?: boolean
  onClick?: () => void
  asChild?: boolean
}

function NavigationButton(
  props: React.PropsWithChildren<NavigationButtonProps>
) {
  const { minimized, onClick, asChild, children } = props
  const className = minimized ? '' : 'hidden lg:block'

  return (
    <NavigationMenuItem onClick={onClick} className={className}>
      <NavigationMenuLink
        asChild={asChild}
        className="text-md font-normal cursor-pointer"
      >
        {children}
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

interface MenuProps {
  onClickAboutMe: () => void
  onClickProjects: () => void
}

export function Menu(props: MenuProps) {
  const { onClickAboutMe, onClickProjects } = props

  return (
    <div className="flex justify-center">
      <NavigationMenu>
        <NavigationMenuList className="flex-wrap">
          <NavigationButton onClick={onClickAboutMe}>About Me</NavigationButton>
          <NavigationButton onClick={onClickProjects}>
            Projects
          </NavigationButton>
          <NavigationButton asChild>
            <a href={MY_GITHUB}>Github</a>
          </NavigationButton>
        </NavigationMenuList>
        <NavigationMenuItem className="block lg:hidden">
          <NavigationMenuTrigger>
            <MenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationButton minimized asChild onClick={onClickAboutMe}>
                  <div>About Me</div>
                </NavigationButton>
                <NavigationButton minimized asChild onClick={onClickProjects}>
                  <div>Projects</div>
                </NavigationButton>
                <NavigationButton minimized asChild>
                  <a href={MY_GITHUB}>Github</a>
                </NavigationButton>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  )
}
