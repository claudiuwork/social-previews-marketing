'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import useMetaDataStore from '@/store/metaDataStore'
import { InformationCircleIcon } from '@heroicons/react/16/solid'
import { useEffect, useState } from 'react'
import type { Key } from 'react-aria-components'
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components'
import DropZone from './DropZone'

const EditResult = () => {
  let metaData = useMetaDataStore((state) => state.metaData)
  const { setMetaData } = useMetaDataStore()

  const [uploadImage, setUploadImage] = useState(metaData.previewerImage)
  const [urlImage, setUrlImage] = useState(metaData.previewerImage)

  let [imageTab, setImageTab] = useState<Key>('tab-upload')

  useEffect(() => {
    if (imageTab == 'tab-upload') {
      setMetaData({ ...metaData, previewerImage: uploadImage })
    }
    if (imageTab == 'tab-url') {
      setMetaData({ ...metaData, previewerImage: urlImage })
    }
  }, [imageTab, uploadImage, urlImage])

  useEffect(() => {
    if (imageTab == 'tab-upload') {
      setUploadImage(metaData.previewerImage)
    }
    if (imageTab == 'tab-url') {
      setUrlImage(metaData.previewerImage)
    }
  }, [metaData.previewerImage])

  return (
    <div className="flex flex-col gap-5 px-7 py-10">
      <div className="mb-0 text-[20px] font-semibold text-[#0056d2]">Edit</div>

      <div>
        <div className="flex justify-between">
          <div className="text-sm text-gray-700">Title</div>
          <div className="flex items-start justify-center">
            <div
              className={`pt-0.5 text-xs ${
                metaData && metaData.previewerTitle && metaData.previewerTitle.length > 60
                  ? 'text-red-500'
                  : 'text-gray-700'
              }`}
            >
              {metaData && metaData.previewerTitle ? metaData.previewerTitle.length : 0}
              /60 characters
            </div>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InformationCircleIcon className="ml-1 w-3.5 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-[250px] text-center">
                      Limiting the title to under 60 characters ensures it displays fully on social media previews,
                      avoiding truncation.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div>
          <input
            type="text"
            className="block w-full resize-none rounded-md border border-neutral-300 bg-transparent py-2 pl-2 pr-5 text-[14px] text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-300/5"
            value={metaData.previewerTitle ? metaData.previewerTitle : ''}
            onChange={(e) => setMetaData({ ...metaData, previewerTitle: e.target.value })}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between">
          <div className="text-sm text-gray-700">Description</div>
          <div className="flex items-start justify-center">
            <div
              className={`pt-0.5 text-xs ${
                metaData && metaData.previewerDescription && metaData.previewerDescription.length > 160
                  ? 'text-red-500'
                  : 'text-gray-700'
              }`}
            >
              {metaData && metaData.previewerDescription ? metaData.previewerDescription.length : 0}
              /160 characters
            </div>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InformationCircleIcon className="ml-1 w-3.5 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-[250px] text-center">
                      Limiting the description to under 160 characters ensures it displays fully on social media
                      previews, avoiding truncation.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div>
          <textarea
            className="block w-full resize-none rounded-md border border-neutral-300 bg-transparent py-2 pl-2 pr-5 text-[14px] text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-300/5"
            value={metaData.previewerDescription ? metaData.previewerDescription : ''}
            onChange={(e) =>
              setMetaData({
                ...metaData,
                previewerDescription: e.target.value,
              })
            }
            rows={3}
          />
        </div>
      </div>

      <div className="min-h-[180px]">
        <Tabs selectedKey={imageTab} onSelectionChange={setImageTab}>
          <div className="flex justify-between">
            <div className="flex">
              <div className="text-sm text-gray-700">Image</div>
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InformationCircleIcon className="ml-1 w-3.5 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-[250px] text-center">
                        For the best display on social media, please use an image size of 1200 x 630 pixels.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div>
              <TabList className="flex gap-3 pb-3" aria-label="Tabs">
                <Tab
                  id="tab-upload"
                  className={() =>
                    `cursor-pointer text-xs text-gray-700 outline-none ${imageTab === 'tab-upload' ? 'underline' : ''}`
                  }
                >
                  Upload
                </Tab>
                <Tab
                  id="tab-url"
                  className={() =>
                    `cursor-pointer text-xs text-gray-700 outline-none ${imageTab === 'tab-url' ? 'underline' : ''}`
                  }
                >
                  URL
                </Tab>
                <Tab
                  id="tab-template"
                  className={() =>
                    `cursor-pointer text-xs text-gray-700 outline-none ${
                      imageTab === 'tab-template' ? 'underline' : ''
                    }`
                  }
                >
                  Template
                </Tab>
              </TabList>
            </div>
          </div>
          <TabPanel id="tab-upload" className="flex flex-col">
            <DropZone uploadImage={uploadImage} setUploadImage={setUploadImage} />
          </TabPanel>
          <TabPanel id="tab-url" className="flex flex-col">
            <div className="w-full">
              <input
                className="block w-full rounded-lg border border-neutral-300 bg-transparent py-2 pl-2 pr-5 text-sm text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-300/5"
                value={urlImage}
                onChange={(e) => setUrlImage(e.target.value)}
              />
            </div>
          </TabPanel>
          <TabPanel id="tab-template" className="flex flex-col">
            <div className="w-full">
              Create template <span className="rounded-sm bg-slate-200 px-0.5 py-1 text-[10px]">AVAILABLE SOON</span>
            </div>
          </TabPanel>
        </Tabs>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-x-1.5 rounded-full bg-black px-3 py-4 text-sm font-semibold text-white shadow-sm hover:bg-[#0056d2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => {
            const element = document.getElementById('code-scroll')
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M6.28 5.22a.75.75 0 010 1.06L2.56 10l3.72 3.72a.75.75 0 01-1.06 1.06L.97 10.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0zm7.44 0a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 010-1.06zM11.377 2.011a.75.75 0 01.612.867l-2.5 14.5a.75.75 0 01-1.478-.255l2.5-14.5a.75.75 0 01.866-.612z"
              clipRule="evenodd"
            />
          </svg>
          Get code
        </button>
      </div>
    </div>
  )
}

export default EditResult
