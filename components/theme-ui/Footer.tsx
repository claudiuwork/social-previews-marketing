'use client'

import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import CookieConsent from 'react-cookie-consent'

import { cn } from '@/lib/utils'
import { Container } from './Container'
import { Logo } from './Logo'
import { socialMediaProfiles } from './SocialMedia'

const navigation = [
  {
    title: 'Work',
    links: [
      { title: 'FamilyFund', href: '/' },
      { title: 'Unseal', href: '/' },
      { title: 'Phobia', href: '/' },
      {
        title: (
          <>
            See all <span aria-hidden="true">&rarr;</span>
          </>
        ),
        href: '/work',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About', href: '/' },
      { title: 'Process', href: '/' },
      { title: 'Blog', href: '/' },
      { title: 'Contact us', href: '/' },
    ],
  },
  {
    title: 'Connect',
    links: socialMediaProfiles,
  },
]

function Navigation() {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">{section.title}</div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link href={link.href} className="transition hover:text-neutral-950">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M16 3 10 .5v2H0v1h10v2L16 3Z" />
    </svg>
  )
}

function NewsletterForm() {
  const [email, setEmail] = React.useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await axios.post('/api/newsletterSubmission', {
        email,
      })

      if (response.status === 200) {
        console.log('Successfully subscribed')
      } else {
        console.log('An error occurred')
      }
    } catch (error) {}
  }

  return (
    <form className="max-w-sm" onSubmit={handleSubmit}>
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">Sign up for our newsletter</h2>
      <p className="mt-4 text-sm text-neutral-700">
        Subscribe to get the latest design news, articles, resources and inspiration.
      </p>
      <div className="relative mt-6">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
    </form>
  )
}

export function Footer({ isPreviewerPath }: { isPreviewerPath?: boolean }) {
  const handleDecline = () => {
    if ((window as any).gtag) {
      ;(window as any).gtag('set', 'allow_google_signals', false)
      ;(window as any).gtag('set', 'allow_ad_personalization_signals', false)
    }
  }

  const handleAccept = () => {
    if ((window as any).gtag) {
      ;(window as any).gtag('set', 'allow_google_signals', true)
      ;(window as any).gtag('set', 'allow_ad_personalization_signals', true)
    }
  }

  return (
    <div className={cn('w-full', isPreviewerPath && 'bg-[#f5f5f7] bg-opacity-50')}>
      <Container as="footer" className={'mt-24 w-full'}>
        {/* <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation />
          <div className="flex lg:justify-end"><NewsletterForm /></div>
        </div> */}
        <div className="mb-20 mt-2 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="Home">
            <Logo className="h-8" fillOnHover />
          </Link>
          <div className="flex gap-5 text-sm text-neutral-500">
            <Link href="/privacy-policy">Terms of Service</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <div>Copyright © {new Date().getFullYear()} WebKit.AI</div>
          </div>
        </div>

        <CookieConsent
          location="bottom"
          buttonText="Accept"
          style={{
            background: '#fff',
            color: '#000',
            width: '270px',
            border: '1px solid rgb(228, 231, 236)',
            borderRadius: '1rem',
            boxShadow: '0 6px 24px rgba(34,42,53,0.12)',
            marginBottom: '1rem',
            marginLeft: '1rem',
            fontSize: '14px',
            fontWeight: '500',
            padding: '10px',
          }}
          onAccept={handleAccept}
          onDecline={handleDecline}
          enableDeclineButton
          declineButtonText="Decline"
          declineButtonStyle={{
            color: '#000',
            fontSize: '13px',
            background: '#fff',
            borderRadius: '10px',
            padding: '0.5rem 1rem',
            border: '1px solid #000',
          }}
          buttonStyle={{
            color: '#fff',
            fontSize: '13px',
            background: '#000',
            borderRadius: '10px',
            padding: '0.5rem 1rem',
            border: '1px solid #000',
          }}
          flipButtons
        >
          <div
            style={{
              width: '230px',
              marginBottom: '-10px',
              lineHeight: '1.4em',
            }}
          >
            We use cookies on this site to improve your user experience.
          </div>
        </CookieConsent>
      </Container>
    </div>
  )
}
