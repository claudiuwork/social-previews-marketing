import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import useMetaDataStore from '@/store/metaDataStore'
import React from 'react'

function DefaultIcon() {
  return (
    <div className="pr-1 text-yellow-400">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M10 1a6 6 0 0 0-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 0 0 .572.729 6.016 6.016 0 0 0 2.856 0A.75.75 0 0 0 12 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0 0 10 1ZM8.863 17.414a.75.75 0 0 0-.226 1.483 9.066 9.066 0 0 0 2.726 0 .75.75 0 0 0-.226-1.483 7.553 7.553 0 0 1-2.274 0Z" />
      </svg>
    </div>
  )
}

function CheckedIcon() {
  return (
    <div className="pr-1 text-green-700">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-[18px] w-[18px]">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}
function UncheckedIcon() {
  return (
    <div className="pr-1 text-red-600">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-[18px] w-[18px]">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}

function WarningIcon() {
  return (
    <div className="pr-1 text-yellow-500">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-[18px] w-[18px]">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}

const DownloadImage = ({ imageSrc }: { imageSrc: string }) => {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()

    const response = await fetch(imageSrc)
    const blob = await response.blob()

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'favicon.ico')
    document.body.appendChild(link)
    link.click()
    if (link.parentNode) {
      link.parentNode.removeChild(link)
    }
  }

  return (
    <a href={imageSrc} onClick={handleClick}>
      <img src={imageSrc} className="w-6" alt="Favicon" />
    </a>
  )
}

const WebsiteReportResult = ({ url }: { url: any }) => {
  let metaData = useMetaDataStore((state) => state.metaData)
  const { setMetaData } = useMetaDataStore()

  return (
    <div className="flex flex-col items-start justify-start px-7 py-10">
      <div className="mb-4 text-[20px] font-semibold text-[#0056d2]">Website Report</div>
      <div className="w-full">
        <Accordion type="single" collapsible>
          <AccordionItem value="website-1">
            <AccordionTrigger>
              <div className="flex justify-start gap-2">
                <div>Favicon</div>
                {metaData.reportStats?.favicon > 0 && (
                  <div>
                    <span className="inline-flex items-center rounded-md bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
                      {metaData.reportStats.favicon} missing
                    </span>
                  </div>
                )}
                {metaData.reportStats?.faviconWarning > 0 && (
                  <div>
                    <span className="inline-flex items-center rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                      {metaData.reportStats.faviconWarning}{' '}
                      {metaData.reportStats.faviconWarning > 1 ? 'warnings' : 'warning'}
                    </span>
                  </div>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1">
                {metaData.previewerFavicon && (
                  <div className="flex flex-col">
                    <div className="relative mb-1 h-[100%] w-[30px] max-w-[30px]">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="hover:opacity-60">
                            <DownloadImage imageSrc={metaData.previewerFavicon} />
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <div>Click to download</div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                )}

                <div className="font-semibold">
                  {metaData.favicon ? (
                    <div className="flex">
                      <CheckedIcon />
                      Favicon found.
                    </div>
                  ) : (
                    <div className="flex">
                      <UncheckedIcon />
                      No favicon found.
                    </div>
                  )}

                  {metaData.appleTouchIcon ? (
                    <div className="flex">
                      <CheckedIcon />
                      Apple Touch Icon found.
                    </div>
                  ) : (
                    <div className="flex">
                      <UncheckedIcon />
                      No Apple Touch Icon found.
                    </div>
                  )}

                  {metaData.androidManifest ? (
                    <div className="flex">
                      <CheckedIcon />
                      Android Manifest Icon found.
                    </div>
                  ) : (
                    <div className="flex">
                      <UncheckedIcon /> No Android Manifest Icon found.
                    </div>
                  )}

                  {metaData.msApplicationTileImage ? (
                    <div className="flex">
                      <CheckedIcon />
                      MS Application Tile Image found.
                    </div>
                  ) : (
                    <div className="flex">
                      <UncheckedIcon /> No MS Application Tile Image found.
                    </div>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {(metaData.xPoweredBy || metaData.serverDetails) && (
            <AccordionItem value="website-2">
              <AccordionTrigger>
                <div className="flex justify-start gap-2">
                  <div>Server</div>
                  {metaData.reportStats?.server > 0 && (
                    <div>
                      <span className="inline-flex items-center rounded-md bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
                        {metaData.reportStats.server} missing
                      </span>
                    </div>
                  )}
                  {metaData.reportStats?.serverWarning > 0 && (
                    <div>
                      <span className="inline-flex items-center rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                        {metaData.reportStats.serverWarning}{' '}
                        {metaData.reportStats.serverWarning > 1 ? 'warnings' : 'warning'}
                      </span>
                    </div>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  {metaData.xPoweredBy && (
                    <div className="flex">
                      <DefaultIcon />
                      <span className="pr-1 font-semibold">The website is hosted on:</span>
                      {metaData.xPoweredBy}
                    </div>
                  )}
                  {metaData.serverDetails && metaData.serverDetails.toLowerCase() !== 'server' && (
                    <div className="flex">
                      <DefaultIcon />
                      <span className="pr-1 font-semibold">The page is served by:</span>
                      {metaData.serverDetails.charAt(0).toUpperCase() + metaData.serverDetails.slice(1)}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </div>
  )
}

export default WebsiteReportResult
