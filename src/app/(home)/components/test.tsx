'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const sections = [
  {
    id: 'lipstick',
    title: 'Son',
    thumbnail: '/images/categories/son.svg',
  },
  { id: 'ke', title: 'Kẻ', thumbnail: '/images/categories/phanma.svg', },
  { id: 'phan', title: 'Phấn', thumbnail: '/images/categories/ke.svg', },
]

export const productCategories: { name: string; thumbnail: string, href: string }[] = [
  {
    href: '#',
    name: 'Son',
    thumbnail: '/images/categories/son.svg',
  },
  {
    href: '#',
    name: 'Mascara',
    thumbnail: '/images/categories/mascara.svg',
  },
  {
    href: '#',
    name: 'Phấn mắt',
    thumbnail: '/images/categories/phanmat.svg',
  },
  {
    href: '#',
    name: 'Phấn má',
    thumbnail: '/images/categories/phanma.svg',
  },
  {
    href: '#',
    name: 'Phấn phủ',
    thumbnail: '/images/categories/phanphu.svg',
  },
  {
    href: '#',
    name: 'Kẻ mắt, chân mày, môi',
    thumbnail: '/images/categories/ke.svg',
  },
  {
    href: '#',
    name: 'Kem nền',
    thumbnail: '/images/categories/kemnen.svg',
  },
  {
    href: '#',
    name: 'Kem lót',
    thumbnail: '/images/categories/kemlot.svg',
  },
  {
    href: '#',
    name: 'Kem chống nắng',
    thumbnail: '/images/categories/kemchongnang.svg',
  },
  {
    href: '#',
    name: 'Kẹp mi',
    thumbnail: '/images/categories/kepmi.svg',
  },
  {
    href: '#',
    name: 'Khác',
    thumbnail: '/images/categories/more.svg',
  },
];

export function NavBar() {
  let navBarRef = useRef<HTMLDivElement>(null)
  let [activeIndex, setActiveIndex] = useState<number>(0)
  let mobileActiveIndex = activeIndex === null ? 0 : activeIndex

  useEffect(() => {
    function updateActiveIndex() {
      const navEle = navBarRef.current
      let newActiveIndex: number = 0;
      let elements = sections.map(({ id }) => document.getElementById(id)).filter((element) => element !== null) as HTMLElement[];
      let bodyRect = document.body.getBoundingClientRect()
      if (navEle && elements !== null) {

        let offset = bodyRect.top + navEle.offsetHeight + 1

        if (window.scrollY >= Math.floor(bodyRect.height) - window.innerHeight) {
          setActiveIndex(sections.length - 1)
          return
        }

        for (let index = 0; index < elements.length; index++) {
          if (
            window.scrollY >=
            elements[index].getBoundingClientRect().top - offset
          ) {
            newActiveIndex = index
          } else {
            break
          }
        }

        setActiveIndex(newActiveIndex)
      }

    }

    updateActiveIndex()

    window.addEventListener('resize', updateActiveIndex)
    window.addEventListener('scroll', updateActiveIndex, { passive: true })

    return () => {
      window.removeEventListener('resize', updateActiveIndex)
      window.removeEventListener('scroll', updateActiveIndex)
    }
  }, [])

  return (
    <div ref={navBarRef} className="sticky top-0 z-50">
      <div className="hidden sm:flex h-10 hover:h-24 sm:justify-center sm:border-b sm:border-slate-200 sm:bg-white/95 sm:[@supports(backdrop-filter:blur(0))]:bg-white/80 sm:[@supports(backdrop-filter:blur(0))]:backdrop-blur transition-all duration-200">
        <ol
          role="list"
          className="mb-[-2px] grid auto-cols-[minmax(0,15rem)] grid-flow-col text-base font-medium text-slate-900 [counter-reset:section]"
        >
          {sections.map((section, sectionIndex) => (
            <li key={section.id} className="flex">
              <Link
                href={`#${section.id}`}
                className={cn(
                  'flex w-full flex-col items-center justify-center border-b-2 before:mb-2 before:font-mono before:text-sm',
                  sectionIndex === activeIndex
                    ? 'border-blue-600 bg-blue-50 text-blue-600 before:text-blue-600'
                    : 'border-transparent before:text-slate-500 hover:bg-blue-50/40 hover:before:text-slate-900'
                )}
              >
                {section.title}
              </Link>
            </li>
          ))}
        </ol>
      </div>

    </div>
  )
}
