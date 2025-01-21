'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { socialPreviewerData } from '@/actions/social-previewer-data'

import { Container } from '@/components/theme-ui/Container'
import useMetaDataStore from '@/store/metaDataStore'
import CodeResult from './CodeResult'
import EditResult from './EditResult'
import FAQResult from './FAQResult'
import PreviewResult from './PreviewResult'
import ReportResult from './ReportResult'
import SearchComponent from './SearchComponent'
import Spinner from './Spinner'
import WebsiteReportResult from './WebsiteReportResult'

interface MetaData {
  previewerImage: string
  previewerFavicon: string
  previewerTitle: string
  previewerDescription: string
  suggestionsNumber: number
  reportStats: {
    twitter: number
    searchEngine: number
    searchEngineWarning: number
    favicon: number
  }
  domain?: string
  url?: string
  title?: string
  titleTexts?: string[]
  metaTitle?: string
  metaDescription?: string
  ogImageAlt?: string
  ogImageWidth?: string
  ogImageHeight?: string
  ogImageType?: string
  ogImageSecureUrl?: string
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
  ogUrl?: string
  favicon?: string
  twitterImage?: string
  appleTouchIcon?: string
  msApplicationTileImage?: string
  twitterCard?: string
  twitterSite?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImageAlt?: string
  twitterCreator?: string
  twitterUrl?: string
  canonicalLink?: string
  keywords?: string
  faviconType?: string
  faviconSizes?: string
  appleTouchIconSizes?: string
  androidManifest?: string
  serverDetails?: string
  date?: string
  lastModified?: string
  xPoweredBy?: string
  isIndexable?: boolean
  h1Content?: string | string[] | any
  hasMultipleH1?: number
}

function isValidUrl(url: string): boolean {
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

const ResultComponent = () => {
  const [error, setError] = useState<boolean | null>(false)
  const [loading, setLoading] = useState<boolean | null>(false)

  let metaData = useMetaDataStore((state) => state.metaData)
  const { setMetaData } = useMetaDataStore()

  const searchParams = useSearchParams()
  const encodedUrl = searchParams.get('url')
  let url = decodeURIComponent(encodedUrl as string)

  const router = useRouter()

  //check if the url is valid
  if (!isValidUrl(url)) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }

    router.push('/')
  }

  //Add current search to previous searches local storage
  const savePreviousSearch = async (encodedUrl: string) => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('PreviousSearches')
      if (data && JSON.parse(data).length > 0) {
        const previousSearches = JSON.parse(data)
        if (!previousSearches.includes(encodedUrl)) {
          const newSearches = [...previousSearches, encodedUrl]
          // Only keep the last 3 searches
          const slicedSearches = newSearches.slice(Math.max(newSearches.length - 3, 0))
          localStorage.setItem('PreviousSearches', JSON.stringify(slicedSearches))
        }
      } else {
        // If there's no previous data, create a new array with the current search
        localStorage.setItem('PreviousSearches', JSON.stringify([encodedUrl]))
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      // setMetaData({})
      socialPreviewerData(url)
        .then((data) => {
          setMetaData(data)
          setLoading(true)
          savePreviousSearch(url)
          // console.log(url, data);
        })
        .catch((error) => {
          setError(true)
          setLoading(false)
          // console.log(url, error);
        })
    }
    setError(false)
    fetchData()
  }, [url])

  useEffect(() => {
    const saveSearch = async () => {
      // Fetch the IP address
      const response = await fetch('https://api.ipify.org?format=json')
      const ipData = await response.json()
      const ip = ipData.ip

      const data = {
        url: encodedUrl,
        ip: ip,
      }

      // Save the search to the database
      // saveSearchToDB(data).then((data) => {
      //   console.log(data);
      // });
    }
    saveSearch()
  }, [url])

  return (
    <>
      <div className="min-h-[70vh] pt-10">
        <Container>
          <div className="mb-5 mt-10">
            <div className="">
              <SearchComponent urlLink={url.toString()} isPending={loading ?? false} />
              {metaData?.suggestionsNumber > 0 && loading && (
                <div className="mt-3 flex justify-center">
                  <span
                    className="inline-flex cursor-pointer items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
                    onClick={() => {
                      const element = document.getElementById('report-scroll')
                      if (element) element.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    {metaData?.suggestionsNumber} Improvement Suggestion
                    {metaData?.suggestionsNumber > 1 && 's'}
                  </span>
                </div>
              )}
            </div>
          </div>
          {loading ? (
            <div className="flex flex-col gap-5">
              <div className="mt-0 flex h-full flex-row gap-5">
                <div className="relative h-auto w-2/4 flex-grow rounded-xl bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                  <EditResult />
                </div>
                <div className="relative h-auto w-2/4 flex-grow rounded-xl bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                  <PreviewResult url={url} />
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <div
                  id="report"
                  className="relative h-auto w-[65%] flex-grow rounded-xl bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline"
                >
                  <ReportResult url={url} />
                </div>
                <div
                  id="website-report"
                  className="relative h-auto w-[35%] flex-grow rounded-xl bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline"
                >
                  <WebsiteReportResult url={url} />
                </div>
              </div>
              <div
                id="code"
                className="relative h-full w-full rounded-xl bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline"
              >
                <CodeResult url={url} />
              </div>
              <div
                id="faq"
                className="relative h-auto w-full flex-grow rounded-xl bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline"
              >
                <FAQResult />
              </div>
            </div>
          ) : (
            <div>
              {error ? (
                <div className="m-3 flex justify-center">
                  <span className="text-red-500">
                    Unable to access the provided URL. Please ensure it&apos;s valid.
                  </span>
                </div>
              ) : (
                <div className="m-3 flex justify-center">
                  <Spinner />
                </div>
              )}
            </div>
          )}
        </Container>
      </div>
    </>
  )
}

export default ResultComponent
