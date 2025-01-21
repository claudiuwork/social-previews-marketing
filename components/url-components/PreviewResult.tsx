'use client'

import { cn } from '@/lib/utils'
import useMetaDataStore from '@/store/metaDataStore'
import Image from 'next/image'
import React from 'react'
import type { Key } from 'react-aria-components'
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components'
import FacebookIcon from '../../public/icons/facebook-f.svg'
import GoogleIcon from '../../public/icons/google.svg'
import LinkedInIcon from '../../public/icons/linkedin-in.svg'
import PinterestIcon from '../../public/icons/pinterest-p.svg'
import SlackIcon from '../../public/icons/slack.svg'
import TwitterIcon from '../../public/icons/x-twitter.svg'

const PreviewResult = ({ url }: { url: any }) => {
  let modifiedUrl = encodeURIComponent(url)
  let modifiedUrlHttps = encodeURIComponent('https://' + url)
  let [socialTab, setSocialTab] = React.useState<Key>('facebook')

  let metaData = useMetaDataStore((state) => state.metaData)
  const { setMetaData } = useMetaDataStore()

  return (
    <div className="relative px-7 py-10" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="absolute -top-8 right-10 mt-px flex h-8 items-end overflow-hidden">
        <div className="-mb-px flex h-[2px] w-80 -scale-x-100">
          <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
          <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
        </div>
      </div>
      <div className="mb-4 text-[20px] font-semibold text-[#0056d2]">Preview</div>
      <div>
        <Tabs selectedKey={socialTab} onSelectionChange={setSocialTab}>
          <TabList className="flex gap-2 pb-3">
            <Tab
              id="facebook"
              className={() =>
                `flex h-14 w-14 cursor-pointer justify-center rounded-full bg-[#f7f7f7] align-middle outline-none ${
                  socialTab === 'facebook' ? 'border-2 border-black text-black' : ''
                }`
              }
            >
              <Image
                src={FacebookIcon}
                alt="Facebook"
                className={cn('w-3', socialTab !== 'facebook' && 'opacity-60')}
              />
            </Tab>
            <Tab
              id="twitter"
              className={() =>
                `flex h-14 w-14 cursor-pointer justify-center rounded-full bg-[#f7f7f7] align-middle outline-none ${
                  socialTab === 'twitter' ? 'border-2 border-black' : ''
                }`
              }
            >
              <Image
                src={TwitterIcon}
                alt="Twitter"
                className={cn('w-[18px]', socialTab !== 'twitter' && 'opacity-70')}
              />
            </Tab>
            <Tab
              id="linkedin"
              className={() =>
                `flex h-14 w-14 cursor-pointer justify-center rounded-full bg-[#f7f7f7] align-middle outline-none ${
                  socialTab === 'linkedin' ? 'border-2 border-black' : ''
                }`
              }
            >
              <Image
                src={LinkedInIcon}
                alt="LinkedIn"
                className={cn('w-[18px]', socialTab !== 'linkedin' && 'opacity-70')}
              />
            </Tab>
            <Tab
              id="slack"
              className={() =>
                `flex h-14 w-14 cursor-pointer justify-center rounded-full bg-[#f7f7f7] align-middle outline-none ${
                  socialTab === 'slack' ? 'border-2 border-black' : ''
                }`
              }
            >
              <Image
                src={SlackIcon}
                alt="SlackIcon"
                className={cn('w-[18px]', socialTab !== 'slack' && 'opacity-50')}
              />
            </Tab>
            <Tab
              id="pinterest"
              className={() =>
                `flex h-14 w-14 cursor-pointer justify-center rounded-full bg-[#f7f7f7] align-middle outline-none ${
                  socialTab === 'pinterest' ? 'border-2 border-black' : ''
                }`
              }
            >
              <Image
                src={PinterestIcon}
                alt="Pinterest"
                className={cn('w-[18px]', socialTab !== 'pinterest' && 'opacity-70')}
              />
            </Tab>
            <Tab
              id="google"
              className={() =>
                `flex h-14 w-14 cursor-pointer justify-center rounded-full bg-[#f7f7f7] align-middle outline-none ${
                  socialTab === 'google' ? 'border-2 border-black' : ''
                }`
              }
            >
              <Image src={GoogleIcon} alt="Google" className={cn('w-[18px]', socialTab !== 'google' && 'opacity-70')} />
            </Tab>
          </TabList>
          <TabPanel id="facebook" className="flex flex-col">
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="w-[500px]">
                <div className="w-100 h-[261px]">
                  {metaData.previewerImage ? (
                    <div
                      className="w-100 h-[261px] border border-solid border-[#dadde1] bg-white bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${metaData.previewerImage})`,
                      }}
                    ></div>
                  ) : (
                    <div className="w-100 flex h-[261px] items-center justify-center border border-solid border-[#dadde1] bg-gray-200 bg-cover bg-center">
                      No Open Graph Image
                    </div>
                  )}
                </div>
                <div className="border border-t-0 border-solid border-[#dadde1] bg-[#f2f3f5] px-[10px] py-[12px]">
                  <div className="pb-1 text-[12px] uppercase leading-[11px] text-[#606770]">{metaData.domain}</div>
                  <div className="pb-1 text-[16px] font-[600] leading-[20px] text-[#1d2129]">
                    {metaData.previewerTitle ? (
                      <div>
                        {metaData.previewerTitle.length > 60
                          ? metaData.previewerTitle.substring(0, 60) + '...'
                          : metaData.previewerTitle}
                      </div>
                    ) : (
                      <div className="text-gray-400">No Title</div>
                    )}
                  </div>
                  <div className="text-[14px] leading-[20px] text-[#606770]">
                    {metaData.previewerDescription ? (
                      <div>
                        {metaData.previewerDescription.length > 160
                          ? metaData.previewerDescription.substring(0, 160) + '...'
                          : metaData.previewerDescription}
                      </div>
                    ) : (
                      <div className="text-gray-400">No Description</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center align-middle">
              <a
                className="text-xs text-gray-400"
                href={`https://developers.facebook.com/tools/debug/?q=https%3A%2F%2F${modifiedUrl}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook Sharing Debugger
              </a>
            </div>
          </TabPanel>
          <TabPanel id="twitter" className="flex flex-col">
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="w-[500px] rounded-[14px]">
                <div className="w-100 h-[250px] rounded-r-[14px] rounded-t-[14px]">
                  {metaData.previewerImage ? (
                    <div
                      className="w-100 h-[250px] rounded-t-[14px] border border-solid border-[#e1e8ed] bg-white bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${metaData.previewerImage})`,
                      }}
                    ></div>
                  ) : (
                    <div className="w-100 flex h-[250px] items-center justify-center rounded-t-[14px] border border-solid border-[#e1e8ed] bg-gray-200 bg-cover bg-center">
                      No Open Graph Image
                    </div>
                  )}
                </div>
                <div className="rounded-b-[14px] border border-t-0 border-solid border-[#e1e8ed] bg-white px-[1em] py-[0.75em]">
                  <div className="text-[1em] font-[600] leading-[1.3em] text-[#1d2129]">
                    {metaData.previewerTitle ? (
                      <div>
                        {metaData.previewerTitle.length > 55
                          ? metaData.previewerTitle.substring(0, 55) + '...'
                          : metaData.previewerTitle}
                      </div>
                    ) : (
                      <div className="text-gray-400">No Title</div>
                    )}
                  </div>
                  <div className="mb-[0.32em] mt-[0.47em] text-[14px] leading-[1.3em] text-[#18283e]">
                    {metaData.previewerDescription ? (
                      <div>
                        {metaData.previewerDescription.length > 140
                          ? metaData.previewerDescription.substring(0, 140) + '...'
                          : metaData.previewerDescription}
                      </div>
                    ) : (
                      <div className="text-gray-400">No Description</div>
                    )}
                  </div>
                  <div className="pt-1 text-[14px] lowercase leading-[1.3em] text-[#8899a6]">{metaData.domain}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center align-middle">
              <a
                className="text-xs text-gray-400"
                href={`https://devcommunity.x.com/t/card-validator-preview-removal/175006`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter Card Validator has moved to Tweet Composer. Read more {'->'}
              </a>
            </div>
          </TabPanel>
          <TabPanel id="linkedin" className="flex flex-col">
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="w-[500px]">
                <div className="w-100 h-[259px]">
                  {metaData.previewerImage ? (
                    <div
                      className="w-100 h-[259px] border border-solid border-[#e6e9ec] bg-white bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${metaData.previewerImage})`,
                      }}
                    ></div>
                  ) : (
                    <div className="w-100 flex h-[259px] items-center justify-center border border-solid border-[#e6e9ec] bg-gray-200 bg-cover bg-center">
                      No Open Graph Image
                    </div>
                  )}
                </div>
                <div className="border border-t-0 border-solid border-[#e6e9ec] bg-[#f3f6f8] px-[10px] py-[12px]">
                  <div className="text-[14px] font-[600] leading-[20px] text-[rgba(0,0,0,.9)]">
                    {metaData.previewerTitle ? (
                      <div>
                        {metaData.previewerTitle.length > 120
                          ? metaData.previewerTitle.substring(0, 120) + '...'
                          : metaData.previewerTitle}
                      </div>
                    ) : (
                      <div className="text-gray-400">No Title</div>
                    )}
                  </div>
                  <div className="text-[12px] lowercase leading-[16px] text-[rgba(0,0,0,.6)]">{metaData.domain}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center align-middle">
              <a
                className="text-xs text-gray-400"
                href={`https://www.linkedin.com/post-inspector/inspect/https:%2F%2F${modifiedUrl}%2F`}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Post Inspector
              </a>
            </div>
          </TabPanel>
          <TabPanel id="slack" className="flex h-full min-h-[417px] items-center justify-center">
            <div className="flex min-h-[330px] items-stretch justify-center gap-3">
              <div className="h-auto w-1 rounded-lg bg-[#E8E8E8]"></div>
              <div className="w-[450px]">
                <div className="flex items-center gap-1">
                  <div>
                    <img src={metaData.previewerFavicon} className="w-[18px]" />
                  </div>
                  <div className="text-[16px] font-bold">
                    {metaData.previewerTitle ? metaData.previewerTitle.split(' ')[0] : ''}
                  </div>
                </div>
                <div className="mt-0.5 text-[15px] font-[500] leading-[20px] text-[rgba(0,0,0,.9)]">
                  {metaData.previewerTitle ? (
                    <div>
                      {metaData.previewerTitle.length > 120
                        ? metaData.previewerTitle.substring(0, 120) + '...'
                        : metaData.previewerTitle}
                    </div>
                  ) : (
                    <div className="text-gray-400">No Title</div>
                  )}
                </div>
                <div className="my-1 text-[14px] leading-[1.3em] text-[#18283e]">
                  {metaData.previewerDescription ? (
                    <div>
                      {metaData.previewerDescription.length > 130
                        ? metaData.previewerDescription.substring(0, 130) + '...'
                        : metaData.previewerDescription}
                    </div>
                  ) : (
                    <div className="text-gray-400">No Description</div>
                  )}
                </div>
                <div className="w-100 h-[240px]">
                  {metaData.previewerImage ? (
                    <div
                      className="w-100 h-[240px] rounded-xl border border-solid border-[#e6e9ec] bg-white bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${metaData.previewerImage})`,
                      }}
                    ></div>
                  ) : (
                    <div className="w-100 flex h-[259px] items-center justify-center border border-solid border-[#e6e9ec] bg-gray-200 bg-cover bg-center">
                      No Open Graph Image
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel id="pinterest" className="flex flex-col">
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="w-[236px]">
                <div className="w-100 h-[177px] rounded-[8px]">
                  {metaData.previewerImage ? (
                    <div
                      className="w-100 h-[177px] rounded-[8px] bg-white bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${metaData.previewerImage})`,
                      }}
                    ></div>
                  ) : (
                    <div className="w-100 flex h-[177px] items-center justify-center bg-gray-200 bg-cover bg-center">
                      No Open Graph Image
                    </div>
                  )}
                </div>
                <div className="flex px-[8px] py-[4px]">
                  <div className="pr-1 text-[14px] font-[600] leading-[16px] tracking-[-0.4px] text-[#333333]">
                    {metaData.previewerTitle ? (
                      <div>
                        {metaData.previewerTitle.length > 120
                          ? metaData.previewerTitle.substring(0, 120) + '...'
                          : metaData.previewerTitle}
                      </div>
                    ) : (
                      <div className="text-gray-400">No Title</div>
                    )}
                  </div>
                  <div className="mt-[6px] flex gap-[2px]">
                    <div className="h-[3px] w-[3px] rounded-[50%] bg-[#8e8e8e]"></div>
                    <div className="h-[3px] w-[3px] rounded-[50%] bg-[#8e8e8e]"></div>
                    <div className="h-[3px] w-[3px] rounded-[50%] bg-[#8e8e8e]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center align-middle">
              <a
                className="text-xs text-gray-400"
                href={`https://developers.pinterest.com/tools/url-debugger/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pinterest Rich Pins Validator
              </a>
            </div>
          </TabPanel>
          <TabPanel id="google" className="flex flex-col">
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="w-full" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400 }}>
                <div className="">
                  <div className="text-[18px] leading-[1.3em] text-[#1a0dab]">
                    {metaData.previewerTitle ? (
                      <div>
                        {metaData.previewerTitle.length > 70
                          ? metaData.previewerTitle.substring(0, 70) + '...'
                          : metaData.previewerTitle}
                      </div>
                    ) : (
                      <div className="text-gray-400">No Title</div>
                    )}
                  </div>
                  <div className="text-[14px] lowercase leading-[16px] text-[#006621]">{`${url}/`}</div>
                  <div className="text-[13px] leading-[18px] text-[#545454]">
                    {metaData.previewerDescription ? (
                      <div>
                        {metaData.previewerDescription.length > 140
                          ? metaData.previewerDescription.substring(0, 140) + '...'
                          : metaData.previewerDescription}
                      </div>
                    ) : (
                      <div className="text-gray-400">No Description</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center align-middle">
              <a
                className="text-xs text-gray-400"
                href={`https://search.google.com/test/rich-results?url=${modifiedUrlHttps}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Rich Results Test
              </a>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export default PreviewResult
