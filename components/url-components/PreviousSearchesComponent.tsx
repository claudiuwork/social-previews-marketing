'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { XMarkIcon } from '@heroicons/react/20/solid'
import React, { useEffect, useState } from 'react'

const PreviousSearchesComponent = () => {
  const [previousSearches, setPreviousSearches] = useState<string[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('PreviousSearches')
      if (data && JSON.parse(data).length > 0) {
        setPreviousSearches(JSON.parse(data))
      }
    }
  }, [])

  const deletePreviousSearch = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()

    const search = e.currentTarget.parentElement?.parentElement?.textContent
    if (search) {
      const newSearches = previousSearches.filter((previousSearch) => previousSearch !== search)
      setPreviousSearches(newSearches)
      localStorage.setItem('PreviousSearches', JSON.stringify(newSearches))
    }
  }

  const exampleCompanies = [
    {
      companyUrl: 'booking.com',
      companyName: 'Booking',
      companyFavicon: 'https://cf.bstatic.com/static/img/favicon/40749a316c45e239a7149b6711ea4c48d10f8d89.ico',
    },
    {
      companyUrl: 'monday.com',
      companyName: 'Monday.com',
      companyFavicon: 'https://monday.com/static/img/favicons/favicon.ico',
    },
    {
      companyUrl: 'proton.me',
      companyName: 'Proton',
      companyFavicon: 'https://proton.me/favicons/favicon-32x32.png',
    },
    {
      companyUrl: 'ahrefs.com',
      companyName: 'Ahrefs.com',
      companyFavicon: 'https://static.ahrefs.com/favicon.ico?v=2',
    },
    {
      companyUrl: 'theverge.com',
      companyName: 'The Verge',
      companyFavicon: 'https://theverge.com/icons/favicon_32x32.png',
    },
    {
      companyUrl: 'asana.com',
      companyName: 'Asana',
      companyFavicon: 'https://asana.com/assets/img/brand/asana-logo-favicon.ico',
    },
    {
      companyUrl: 'klarna.com',
      companyName: 'Klarna.com',
      companyFavicon: 'https://klarna.com/static/img/favicon-32x32.png',
    },
    {
      companyUrl: 'slack.com',
      companyName: 'Slack',
      companyFavicon: 'https://a.slack-edge.com/80588/marketing/img/meta/favicon-32.png',
    },
  ]

  return (
    <div className="flex w-full justify-center">
      {previousSearches.length > 0 ? (
        <div className="mt-10 flex flex-col items-center">
          Your latest searches:
          <div className="mt-2 flex gap-3">
            {previousSearches.map((previousSearch) => {
              const decodedSearch = decodeURIComponent(previousSearch)
              return (
                <div key={previousSearch}>
                  <div className="group relative">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <a
                            className="relative flex min-h-[35px] w-full min-w-[160px] items-center justify-end overflow-hidden rounded-lg border border-neutral-200 bg-gray-50 bg-transparent px-0 py-[5px] text-center text-[14px] leading-5 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                            href={`/previewer?url=${previousSearch}`}
                            style={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                            }}
                          >
                            <div
                              className={`absolute h-full w-full px-2 py-1.5 leading-[1.7em] ${
                                decodedSearch.length > 20 ? '' : ''
                              }`}
                            >
                              {decodedSearch}
                            </div>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-96 p-1">
                          <p className="text-center">{previousSearch}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <XMarkIcon
                      onClick={deletePreviousSearch}
                      className="absolute right-0 top-0 z-10 -mr-1 -mt-1 hidden h-4 w-4 cursor-pointer rounded-full bg-slate-800 text-white group-hover:block"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center">
          <div className="max-w-[350px] pb-3 text-center leading-[1.3em]">
            Explore how leading corporations implement social media previews:
          </div>
          <div className="mt-2 flex max-w-[700px] flex-wrap gap-3">
            {exampleCompanies.map((exampleCompany) => {
              return (
                <div key={exampleCompany.companyName}>
                  <a
                    className="flex min-h-[35px] w-full min-w-[160px] items-center justify-center gap-2 overflow-hidden rounded-lg border border-neutral-200 bg-gray-50 bg-transparent px-0 py-[5px] text-center text-[14px] font-semibold leading-5 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                    href={`/previewer?url=${exampleCompany.companyUrl}`}
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    <img src={exampleCompany.companyFavicon} className="w-5" />
                    {exampleCompany.companyName}
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default PreviousSearchesComponent
