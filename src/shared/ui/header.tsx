'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, Github, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const navigationItems = [
    { title: 'Home', href: '/' },
    {
      title: 'Posts',
      href: '/posts',
      items: [
        { title: 'All Posts', href: '/posts' },
        { title: 'JavaScript', href: '/posts/javascript' },
        { title: 'React', href: '/posts/react' },
        { title: 'Next.js', href: '/posts/nextjs' },
        { title: 'Backend', href: '/posts/backend' },
      ],
    },
    {
      title: 'Projects',
      href: '/projects',
      items: [
        { title: 'All Projects', href: '/projects' },
        { title: 'Web Apps', href: '/projects/web' },
        { title: 'Mobile Apps', href: '/projects/mobile' },
        { title: 'Open Source', href: '/projects/opensource' },
      ],
    },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ]

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // 실제 다크모드 토글 로직 구현
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DevBlog
              </span>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.items ? (
                    <>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.items.map((subItem) => (
                            <li key={subItem.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {subItem.title}
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* 검색 및 액션 버튼들 */}
          <div className="flex items-center space-x-4">
            {/* 검색 */}
            <div className="hidden md:flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Search posts..."
                className="w-64"
              />
              <Button size="sm" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" asChild>
                <Link href="https://github.com/yourusername" target="_blank">
                  <Github className="h-4 w-4" />
                  <span className="ml-2 hidden sm:inline">GitHub</span>
                </Link>
              </Button>

              <Button size="sm" variant="ghost" onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* 모바일 검색 */}
              <div className="flex items-center space-x-2 px-3 py-2">
                <Input
                  type="search"
                  placeholder="Search posts..."
                  className="flex-1"
                />
                <Button size="sm" variant="ghost">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* 모바일 네비게이션 */}
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                  {item.items && (
                    <div className="pl-4 space-y-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* 모바일 액션 버튼들 */}
              <div className="pt-4 border-t space-y-2">
                <Link
                  href="https://github.com/yourusername"
                  target="_blank"
                  className="flex items-center px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
