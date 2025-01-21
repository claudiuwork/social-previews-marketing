'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import Spinner from './Spinner'

interface SearchForm {
  url: string
}

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M16 3 10 .5v2H0v1h10v2L16 3Z" />
    </svg>
  )
}

function isValidUrl(url: string): boolean {
  // console.log("validate url", url);
  if (!url || url.trim() === '') {
    return false
  }

  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  return !!pattern.test(url)
}

const SearchComponent = ({ urlLink, isPending }: { urlLink: string; isPending: boolean }) => {
  const router = useRouter()
  const [urlLinkState, setUrlLinkState] = useState(urlLink !== 'false' ? `https://${urlLink}` : '')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>()
  const [isSubmitting, setSubmitting] = useState(isPending)

  const submitForm = (data: SearchForm) => {
    setSubmitting(true)
    let url = data.url

    if (isValidUrl(url)) {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url
      }

      const urlObject = new URL(url)
      let cleanUrl = urlObject.origin + urlObject.pathname
      cleanUrl = cleanUrl
        .replace(/(^\s+|\s+$)/g, '')
        .replace(/^(http:\/\/|https:\/\/)/, '')
        .replace(/\/$/, '')

      //TODO: may be useful to keep the trailing slash

      // Encode the URL before including it in your URL
      const encodedUrl = encodeURIComponent(cleanUrl)

      router.push(`/previewer?url=${encodedUrl}`)
      setSubmitting(false)
    } else {
      // setError("Invalid URL");
      setSubmitting(false)
      return
    }
  }

  return (
    <div className="flex items-center justify-center">
      <form className="w-full max-w-md bg-white" onSubmit={handleSubmit(submitForm)}>
        <div className="relative">
          <input
            {...register('url')}
            type="text"
            value={urlLinkState}
            onChange={(e) => setUrlLinkState(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                submitForm({ url: e.currentTarget.value })
              }
            }}
            placeholder="Website URL"
            aria-label="Website URL"
            className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
          />
          <div className="absolute inset-y-1 right-1 flex justify-end">
            <button
              type="submit"
              aria-label="Submit"
              disabled={isSubmitting}
              className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
            >
              {isSubmitting ? <Spinner /> : <ArrowIcon className="w-4" />}
            </button>
          </div>
        </div>
        {errors.url && <div>{errors.url.message}</div>}
      </form>
    </div>
  )
}

export default SearchComponent
