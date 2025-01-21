import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import useMetaDataStore from '@/store/metaDataStore'

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

const ReportResult = ({ url }: { url: any }) => {
  let metaData = useMetaDataStore((state) => state.metaData)
  const { setMetaData } = useMetaDataStore()

  return (
    <div className="px-7 py-10">
      <div id="report-scroll" className="absolute -mt-24"></div>
      <div className="mb-4 text-[20px] font-semibold text-[#0056d2]">Page Report</div>
      <div className="my-3">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex justify-start gap-2">
                <div>Facebook Meta Tags</div>
                {metaData.reportStats?.facebook > 0 && (
                  <div>
                    <span className="inline-flex items-center rounded-md bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
                      {metaData.reportStats.facebook} missing
                    </span>
                  </div>
                )}
                {metaData.reportStats?.facebookWarning > 0 && (
                  <div>
                    <span className="inline-flex items-center rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                      {metaData.reportStats.facebookWarning}{' '}
                      {metaData.reportStats.facebookWarning > 1 ? 'warnings' : 'warning'}
                    </span>
                  </div>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1">
                {metaData.ogTitle !== undefined ? (
                  <div>
                    <div className="flex">
                      <div className="flex-none">
                        <CheckedIcon />
                      </div>
                      <div className="flex-grow">
                        <span className="font-semibold">OG Title:</span> {`${metaData.ogTitle}`}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="flex-none">
                      <UncheckedIcon />
                    </div>
                    <div className="flex-grow font-semibold">No OG Title found.</div>
                  </div>
                )}

                {metaData.ogDescription !== undefined ? (
                  <div>
                    <div className="flex">
                      <div className="flex-none">
                        <CheckedIcon />
                      </div>
                      <div className="flex-grow">
                        <span className="font-semibold">OG Description:</span> {` ${metaData.ogDescription}`}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="flex-none">
                      <UncheckedIcon />
                    </div>
                    <div className="flex-grow font-semibold">No OG Description found.</div>
                  </div>
                )}

                {metaData.ogUrl !== undefined ? (
                  <div>
                    <div className="flex">
                      <div className="flex-none">
                        <CheckedIcon />
                      </div>
                      <div className="flex-grow">
                        <span className="font-semibold">OG Url:</span> {`${metaData.ogUrl}`}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="flex-none">
                      <UncheckedIcon />
                    </div>
                    <div className="flex-grow font-semibold">No OG Url found.</div>
                  </div>
                )}

                {metaData.ogType !== undefined ? (
                  <div>
                    <div className="flex">
                      <div className="flex-none">
                        <CheckedIcon />
                      </div>
                      <div className="flex-grow">
                        <span className="font-semibold">OG Type:</span> {`${metaData.ogType}`}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="flex-none">
                      <UncheckedIcon />
                    </div>
                    <div className="flex-grow font-semibold">No OG Type found.</div>
                  </div>
                )}

                {metaData.ogImage !== undefined ? (
                  <div>
                    <div className="flex">
                      <div className="flex-none">
                        <CheckedIcon />
                      </div>
                      <div className="flex-grow font-semibold">OG Image</div>
                    </div>
                    <div className="mt-2">
                      <div>
                        <div
                          className="relative flex h-[150px] w-[286px] justify-center rounded-xl border border-solid border-[#dadde1] bg-slate-100 bg-cover bg-center align-middle"
                          style={{
                            backgroundImage: `url(${metaData.ogImage})`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="flex-none">
                      <UncheckedIcon />
                    </div>
                    <div className="flex-grow font-semibold">No OG Image found.</div>
                  </div>
                )}

                {/*  og:title metatag found, The length of your title (46 characters) is great */}
                {/* og:image can't be found at the defined URL,  The ratio of your og:image isn't optimal,  Image size is optimal (<8mb) */}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex justify-start gap-2">
                <div>Twitter Meta Tags</div>
                {metaData.reportStats?.twitter > 0 && (
                  <div>
                    <span className="inline-flex items-center rounded-md bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
                      {metaData.reportStats.twitter} missing
                    </span>
                  </div>
                )}
                {metaData.reportStats?.twitterWarning > 0 && (
                  <div>
                    <span className="inline-flex items-center rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                      {metaData.reportStats.twitterWarning}{' '}
                      {metaData.reportStats.twitterWarning > 1 ? 'warnings' : 'warning'}
                    </span>
                  </div>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1">
                {metaData.twitterTitle !== undefined ? (
                  <div>
                    <div className="flex">
                      <div className="flex-none">
                        <CheckedIcon />
                      </div>
                      <div className="flex-grow">
                        <span className="font-semibold">Twitter Title:</span> {`${metaData.twitterTitle}`}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="flex-none">
                      <UncheckedIcon />
                    </div>
                    <div className="flex-grow font-semibold">No Twitter Title found.</div>
                  </div>
                )}

                {metaData.twitterDescription !== undefined ? (
                  <div>
                    <div className="flex">
                      <div className="flex-none">
                        <CheckedIcon />
                      </div>
                      <div className="flex-grow">
                        <span className="font-semibold">Twitter Description:</span> {`${metaData.twitterDescription}`}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="flex-none">
                      <UncheckedIcon />
                    </div>
                    <div className="flex-grow font-semibold">No Twitter Description found.</div>
                  </div>
                )}

                {metaData.twitterUrl !== undefined ? (
                  <div>
                    <div className="flex">
                      <div className="flex-none">
                        <CheckedIcon />
                      </div>
                      <div className="flex-grow">
                        <span className="font-semibold">Twitter Url:</span> {`${metaData.twitterUrl}`}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="flex-none">
                      <UncheckedIcon />
                    </div>
                    <div className="flex-grow font-semibold">No Twitter Url found.</div>
                  </div>
                )}

                {metaData.twitterCard !== undefined ? (
                  <div>
                    <div className="flex">
                      <div className="flex-none">
                        <CheckedIcon />
                      </div>
                      <div className="flex-grow">
                        <span className="font-semibold">Twitter Card:</span> {`${metaData.twitterCard}`}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="flex-none">
                      <UncheckedIcon />
                    </div>
                    <div className="flex-grow font-semibold">No Twitter Card found.</div>
                  </div>
                )}

                {metaData.twitterImage !== undefined ? (
                  <div>
                    <div className="flex">
                      <div className="flex-none">
                        <CheckedIcon />
                      </div>
                      <div className="flex-grow font-semibold">Twitter Image </div>
                    </div>
                    <div className="mt-2">
                      <div>
                        <div
                          className="relative flex h-[150px] w-[286px] justify-center rounded-xl border border-solid border-[#dadde1] bg-slate-100 bg-cover bg-center align-middle"
                          style={{
                            backgroundImage: `url(${metaData.twitterImage})`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="flex-none">
                      <UncheckedIcon />
                    </div>
                    <div className="flex-grow font-semibold">No Twitter Image found.</div>
                  </div>
                )}

                {/* You set your twitter:card metatag to summary_large_image. */}
                {/* The twitter:title metatag is missing (Falling back to title tag) ,The length of your title (46 characters) is great  */}
                {/*  The twitter:description metatag is missing (falling back to description) The length of your description (138 characters) is great  */}
                {/* There's no Twitter Card image defined (falling back to og:image) The ratio of your twitter:image isn't optimal Image size is optimal (<1mb) */}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex justify-start gap-2">
                <div>Search Engines Meta Tags</div>
                {metaData.reportStats?.searchEngine > 0 && (
                  <div>
                    <span className="inline-flex items-center rounded-md bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
                      {metaData.reportStats.searchEngine} missing
                    </span>
                  </div>
                )}
                {metaData.reportStats?.searchEngineWarning > 0 && (
                  <div>
                    <span className="inline-flex items-center rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                      {metaData.reportStats.searchEngineWarning}{' '}
                      {metaData.reportStats.searchEngineWarning > 1 ? 'warnings' : 'warning'}
                    </span>
                  </div>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1">
                <span className="font-bold">Meta Tags</span>
                {metaData.title !== undefined && metaData.titleTexts.length < 2 && (
                  <div>
                    <div className="flex">
                      <div className="flex-none">
                        <CheckedIcon />
                      </div>
                      <div className="flex-grow">
                        <span className="font-semibold">Title:</span> {`${metaData.title}`}
                      </div>
                    </div>
                  </div>
                )}
                {metaData.title !== undefined && metaData.titleTexts.length > 1 && (
                  <div className="flex">
                    <div className="flex-none">
                      <WarningIcon />
                    </div>
                    <div className="flex-grow">
                      <span className="font-semibold">Multiple Title Tags Found:</span>{' '}
                      {`${metaData.titleTexts.join(', ')}`}
                    </div>
                  </div>
                )}

                {metaData.title === undefined && (
                  <div className="flex">
                    <div className="flex-none">
                      <UncheckedIcon />
                    </div>
                    <div className="flex-grow font-semibold">No Title found.</div>
                  </div>
                )}
                {metaData.metaDescription !== undefined ? (
                  <div>
                    <div className="flex">
                      <div className="flex-none">
                        <CheckedIcon />
                      </div>
                      <div className="flex-grow">
                        <span className="font-semibold">Meta Description:</span> {`${metaData.metaDescription}`}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="flex-none">
                      <UncheckedIcon />
                    </div>
                    <div className="flex-grow font-semibold">No Meta Description found.</div>
                  </div>
                )}
                {metaData.keywords ? (
                  <div>
                    <div className="flex">
                      <div className="flex-none">
                        <CheckedIcon />
                      </div>
                      <div className="flex-grow">
                        <span className="font-semibold">Keywords:</span> {`${metaData.keywords}`}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="flex-none">
                      <DefaultIcon />
                    </div>
                    <span className="font-semibold">No Keywords found.</span>{' '}
                  </div>
                )}
                <div className="mt-5">
                  <div className="font-bold">Indexing</div>

                  {(() => {
                    const canonicalLink = metaData.canonicalLink
                    const urlLink = `https://${url}`

                    if (!canonicalLink) {
                      return (
                        <div className="flex font-semibold">
                          <div className="flex-none">
                            <WarningIcon />
                          </div>
                          {`The page does not have a canonical link.`}
                        </div>
                      )
                    }

                    const canonicalUrl = new URL(canonicalLink)
                    const pageUrl = new URL(urlLink)

                    if (
                      canonicalUrl.hostname.replace(/^www\./, '') === pageUrl.hostname.replace(/^www\./, '') &&
                      canonicalUrl.pathname.replace(/\/$/, '') === pageUrl.pathname.replace(/\/$/, '')
                    ) {
                      return (
                        <div className="flex font-semibold">
                          <div className="flex-none">
                            <CheckedIcon />
                          </div>
                          {`The page's canonical link is the same as the page URL.`}
                        </div>
                      )
                    }

                    metaData.reportStats.searchEngineWarning += 1

                    return (
                      <div className="flex">
                        <div className="flex-none">
                          <WarningIcon />
                        </div>
                        {`The page's canonical link differs from the page's URL: ${canonicalLink}`}
                      </div>
                    )
                  })()}
                  {metaData.isIndexable !== undefined && (
                    <div>
                      {metaData.isIndexable ? (
                        <div className="flex font-semibold">
                          <div className="flex-none">
                            <CheckedIcon />
                          </div>
                          {`The page is correctly configured for search engine indexing. This helps improve its visibility on search engine results.`}
                        </div>
                      ) : (
                        <div className="flex font-semibold">
                          <div className="flex-none">
                            <WarningIcon />
                          </div>
                          {`The page is currently configured to be excluded from search engine indexing. This may impact its visibility in search engine results. Consider changing this if you want the page to be discoverable.`}
                        </div>
                      )}
                    </div>
                  )}

                  {metaData.hasMultipleH1 !== undefined && (
                    <div>
                      {metaData.hasMultipleH1 === 0 && (
                        <div className="flex font-semibold">
                          <div className="flex-none">
                            <WarningIcon />
                          </div>
                          <span className="font-semibold">
                            The page does not contain any H1 tags. It&apos;s recommended to include at least one H1 tag
                            for better SEO.
                          </span>
                        </div>
                      )}
                      {metaData.hasMultipleH1 === 1 && (
                        <div className="flex font-semibold">
                          <div className="flex-none">
                            <CheckedIcon />
                          </div>
                          {`The page contains a single H1 tag. This is the recommended number of H1 tags for a page.`}
                        </div>
                      )}
                      {metaData.hasMultipleH1 > 1 && (
                        <div className="flex font-semibold">
                          <div className="flex-none">
                            <WarningIcon />
                          </div>
                          <span className="font-semibold">The page contains multiple H1 tags:</span>
                          {metaData.h1Content.join(', ')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default ReportResult
