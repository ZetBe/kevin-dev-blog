import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, Heart, Coffee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  const footerLinks = {
    blog: {
      title: 'Blog',
      links: [
        { title: 'All Posts', href: '/posts' },
        { title: 'JavaScript', href: '/posts/javascript' },
        { title: 'React', href: '/posts/react' },
        { title: 'Backend', href: '/posts/backend' },
      ],
    },
    projects: {
      title: 'Projects',
      links: [
        { title: 'Web Apps', href: '/projects/web' },
        { title: 'Mobile Apps', href: '/projects/mobile' },
        { title: 'Open Source', href: '/projects/opensource' },
        { title: 'GitHub', href: 'https://github.com/yourusername' },
      ],
    },
    connect: {
      title: 'Connect',
      links: [
        { title: 'About Me', href: '/about' },
        { title: 'Contact', href: '/contact' },
        { title: 'Resume', href: '/resume' },
        { title: 'LinkedIn', href: 'https://linkedin.com/in/yourprofile' },
      ],
    },
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    {
      icon: Twitter,
      href: 'https://twitter.com/yourusername',
      label: 'Twitter',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/yourprofile',
      label: 'LinkedIn',
    },
    { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 메인 푸터 콘텐츠 */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 개인 소개 섹션 */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  DevBlog
                </span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                안녕하세요! 프론트엔드 개발자입니다. JavaScript, React,
                Next.js를 주로 다루며, 새로운 기술을 배우고 공유하는 것을
                좋아합니다.
              </p>

              {/* 뉴스레터 구독 */}
              <div className="space-y-2">
                <h4 className="font-semibold">뉴스레터 구독</h4>
                <p className="text-sm text-muted-foreground">
                  새로운 포스트 알림을 받아보세요
                </p>
                <div className="flex space-x-2 max-w-md">
                  <Input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    className="flex-1"
                  />
                  <Button type="submit">구독</Button>
                </div>
              </div>
            </div>

            {/* 링크 섹션들 */}
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                        target={
                          link.href.startsWith('http') ? '_blank' : undefined
                        }
                        rel={
                          link.href.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* 하단 푸터 */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} DevBlog. All rights reserved.
            </p>
            <div className="hidden sm:flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>and</span>
              <Coffee className="h-4 w-4 text-amber-600" />
            </div>
          </div>

          {/* 소셜 링크 */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Follow me:
            </span>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-9 w-9 p-0"
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="py-4 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground space-y-2 sm:space-y-0">
            <div className="flex space-x-4">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="hover:text-foreground transition-colors"
              >
                Sitemap
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <span>Powered by</span>
              <Link
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors font-medium"
              >
                Next.js
              </Link>
              <span>&</span>
              <Link
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors font-medium"
              >
                Vercel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
