'use client'

import useMetaDataStore from '@/store/metaDataStore'
import { useState } from 'react'

function WarningIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const CodeResult = ({ url }: { url: any }) => {
  const [isClicked, setIsClicked] = useState(false)

  let metaData = useMetaDataStore((state: any) => state.metaData)
  const { setMetaData } = useMetaDataStore()

  return (
    <div className="px-7 py-10">
      <div id="code-scroll" className="absolute -mt-24"></div>
      <div className="mb-2 text-[20px] font-semibold text-[#4e98ff]">Code</div>
      <div className="mb-2 text-[14px] text-white text-opacity-90">
        Copy the following HTML meta tags and insert them into the head section of your website. This will enhance your
        site&apos;s social sharing capabilities and SEO performance.
      </div>
      <div id="code-container" className="rounded-md bg-[#222326] p-2 text-sm text-white">
        <pre className="overflow-x-auto p-2">
          <div>
            <code className="font-medium italic text-gray-500">&lt;!-- HTML Meta Tags --&gt;</code>
          </div>
          <div>
            <code className="text-gray-400">&lt;</code>
            <code className="text-[#F070B2]">title</code>
            <code className="text-gray-400">&gt;</code>
            <code className="text-[#7DD3FC]">{metaData.previewerTitle}</code>
            <code className="text-gray-400">&lt;/</code>
            <code className="text-[#F070B2]">title</code>
            <code className="text-gray-400">&gt;</code>
          </div>
          <div>
            <code className="text-gray-400">&lt;</code>
            <code className="text-[#F070B2]">meta</code> <code className="text-[#CBD5E1]">name</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">description</code>
            <code className="text-gray-400">&quot;</code> <code className="text-[#CBD5E1]">content</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">{metaData.previewerDescription}</code>
            <code className="text-gray-400">&quot;</code> <code className="text-gray-400">/&gt;</code>
          </div>
          <div className="mb-4"></div>
          <div>
            <code className="italic text-gray-500">&lt;!-- Open Graph / Facebook --&gt;</code>
          </div>
          <div>
            <code className="text-gray-400">&lt;</code>
            <code className="text-[#F070B2]">meta</code> <code className="text-[#CBD5E1]">property</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">og:type</code>
            <code className="text-gray-400">&quot;</code> <code className="text-[#CBD5E1]">content</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">website</code>
            <code className="text-gray-400">&quot;</code> <code className="text-gray-400">/&gt;</code>
          </div>
          <div>
            <code className="text-gray-400">&lt;</code>
            <code className="text-[#F070B2]">meta</code> <code className="text-[#CBD5E1]">property</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">og:url</code>
            <code className="text-gray-400">&quot;</code> <code className="text-[#CBD5E1]">content</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">{`https://${url.toString()}`}</code>
            <code className="text-gray-400">&quot;</code> <code className="text-gray-400">/&gt;</code>
          </div>
          <div>
            <code className="text-gray-400">&lt;</code>
            <code className="text-[#F070B2]">meta</code> <code className="text-[#CBD5E1]">property</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">og:title</code>
            <code className="text-gray-400">&quot;</code> <code className="text-[#CBD5E1]">content</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">{metaData.previewerTitle}</code>
            <code className="text-gray-400">&quot;</code> <code className="text-gray-400">/&gt;</code>
          </div>
          <div>
            <code className="text-gray-400">&lt;</code>
            <code className="text-[#F070B2]">meta</code> <code className="text-[#CBD5E1]">property</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">og:description</code>
            <code className="text-gray-400">&quot;</code> <code className="text-[#CBD5E1]">content</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">{metaData.previewerDescription}</code>
            <code className="text-gray-400">&quot;</code> <code className="text-gray-400">/&gt;</code>
          </div>
          <div>
            <code className="text-gray-400">&lt;</code>
            <code className="text-[#F070B2]">meta</code> <code className="text-[#CBD5E1]">property</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">og:image</code>
            <code className="text-gray-400">&quot;</code> <code className="text-[#CBD5E1]">content</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">
              {metaData && metaData.previewerImage && metaData.previewerImage.startsWith('http') ? (
                <span>{metaData.previewerImage}</span>
              ) : (
                <span>https://website.ai/social-media-previewer.jpg</span>
              )}
            </code>
            <code className="text-gray-400">&quot;</code> <code className="text-gray-400">/&gt;</code>
          </div>
          <div className="mb-4"></div>
          <div>
            <code className="italic text-gray-500">&lt;!-- Twitter --&gt;</code>
          </div>
          <div>
            <code className="text-gray-400">&lt;</code>
            <code className="text-[#F070B2]">meta</code> <code className="text-[#CBD5E1]">property</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">twitter:card</code>
            <code className="text-gray-400">&quot;</code> <code className="text-[#CBD5E1]">content</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">summary_large_image</code>
            <code className="text-gray-400">&quot;</code> <code className="text-gray-400">/&gt;</code>
          </div>
          <div>
            <code className="text-gray-400">&lt;</code>
            <code className="text-[#F070B2]">meta</code> <code className="text-[#CBD5E1]">property</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">twitter:url</code>
            <code className="text-gray-400">&quot;</code> <code className="text-[#CBD5E1]">content</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">{`https://${url.toString()}`}</code>
            <code className="text-gray-400">&quot;</code> <code className="text-gray-400">/&gt;</code>
          </div>
          <div>
            <code className="text-gray-400">&lt;</code>
            <code className="text-[#F070B2]">meta</code> <code className="text-[#CBD5E1]">property</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">twitter:title</code>
            <code className="text-gray-400">&quot;</code> <code className="text-[#CBD5E1]">content</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">{metaData.previewerTitle}</code>
            <code className="text-gray-400">&quot;</code> <code className="text-gray-400">/&gt;</code>
          </div>
          <div>
            <code className="text-gray-400">&lt;</code>
            <code className="text-[#F070B2]">meta</code> <code className="text-[#CBD5E1]">property</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">twitter:description</code>
            <code className="text-gray-400">&quot;</code> <code className="text-[#CBD5E1]">content</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">{metaData.previewerDescription}</code>
            <code className="text-gray-400">&quot;</code> <code className="text-gray-400">/&gt;</code>
          </div>
          <div>
            <code className="text-gray-400">&lt;</code>
            <code className="text-[#F070B2]">meta</code> <code className="text-[#CBD5E1]">property</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">twitter:image</code>
            <code className="text-gray-400">&quot;</code> <code className="text-[#CBD5E1]">content</code>
            <code className="text-gray-400">=&quot;</code>
            <code className="text-[#7DD3FC]">
              {metaData && metaData.previewerImage && metaData.previewerImage.startsWith('http') ? (
                <span>{metaData.previewerImage}</span>
              ) : (
                <span>https://website.ai/social-media-previewer.jpg</span>
              )}
            </code>
            <code className="text-gray-400">&quot;</code> <code className="text-gray-400">/&gt;</code>
          </div>

          <div className="mb-4"></div>
          <div>
            <code className="italic text-gray-500">&lt;!-- Meta Tags Generated with https://webkit.ai --&gt;</code>
          </div>
        </pre>
        {metaData && metaData.previewerImage && !metaData.previewerImage.startsWith('http') && (
          <div className="justify-content flex items-center gap-1 py-2 text-sm">
            <WarningIcon /> Please make sure to update the URL of `og:image` and `twitter:image` with the correct image
            URL after uploading it to your website.
          </div>
        )}
      </div>
      <div className="mt-3 flex justify-start">
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-[#0056d2] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0058d2b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => {
            const element = document.getElementById('code-container')
            if (element) {
              navigator.clipboard.writeText(element.innerText || '')
            }
            setIsClicked(true)
            setTimeout(() => setIsClicked(false), 2000) // Reset after 2 seconds
          }}
        >
          {!isClicked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              // dataSlot="icon"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M13.887 3.182c.396.037.79.08 1.183.128C16.194 3.45 17 4.414 17 5.517V16.75A2.25 2.25 0 0 1 14.75 19h-9.5A2.25 2.25 0 0 1 3 16.75V5.517c0-1.103.806-2.068 1.93-2.207.393-.048.787-.09 1.183-.128A3.001 3.001 0 0 1 9 1h2c1.373 0 2.531.923 2.887 2.182ZM7.5 4A1.5 1.5 0 0 1 9 2.5h2A1.5 1.5 0 0 1 12.5 4v.5h-5V4Z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {isClicked ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

export default CodeResult
