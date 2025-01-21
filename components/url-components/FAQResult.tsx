'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const FAQResult = () => {
  return (
    <div className="pt-0">
      <div className="relative px-7 py-10">
        <div className="mb-4 text-[20px] font-semibold text-[#0056d2]">FAQs</div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-4">
            <AccordionTrigger>What are Meta Tags</AccordionTrigger>
            <AccordionContent>
              <p>
                Meta tags are concise snippets of text and image content that summarize a webpage. They typically appear
                when a link is shared on social media, in messaging apps, or in business communication software.
              </p>
              <p className="pt-2">
                Moreover, meta tags can provide essential information that assists search engines and other technical
                services in understanding your site&apos;s content and verifying its authenticity.
              </p>
              <p className="pt-2">
                Wondering why you can&apos;t see the meta data? It&apos;s because it was initially designed for machines
                and is located in the code at the top of a website. That&apos;s where our tool comes in. Simply enter
                any URL into the search box, and our site will allow you to view and edit the meta tag code, making it
                easy for you to update it.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>How can I insert meta tags into HTML?</AccordionTrigger>
            <AccordionContent>
              <p>
                You can use a free tool like Webkit.ai to create meta tags for your website. Once generated, paste these
                meta tags within the &lt;head&gt; and &lt;/head&gt; tags of your HTML document.
              </p>
              <p className="mt-3">Inserting meta tags in the body element will lead to invalid markup.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>Meta Image (also known as OG:Image)</AccordionTrigger>
            <AccordionContent>
              <p>
                Given the visual-centric nature of the web, your Meta Tag Image is the most impactful graphic content
                you can create to entice users to click and visit your website. To ensure optimal display across various
                platforms, aim for an image size of 1200 x 630 pixels.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Why does a social share image matter?</AccordionTrigger>
            <AccordionContent>
              <p>
                Social share images play a crucial role in determining how your content is presented when shared on
                social media platforms such as Facebook, Twitter or even iMessage. They not only help in creating a
                compelling first impression but also encourage users to engage with your link preview.
              </p>
              <p className="pt-2">
                A well-crafted social share image can:
                <ul className="ml-4 mt-1 list-disc">
                  <li>
                    Amplify Click-Through Rates: An appealing combination of image and text can stimulate users to click
                    and explore further.
                  </li>
                  <li>
                    Boost Engagement: On platforms like LinkedIn, an intriguing preview can lead to increased likes,
                    shares, and comments.
                  </li>
                  <li>
                    Improve SEO: Higher engagement often leads to improved SEO rankings, as platforms acknowledge the
                    popularity and relevance of your content.
                  </li>
                </ul>
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-1">
            <AccordionTrigger>Why isn&apos;t there any code for LinkedIn?</AccordionTrigger>
            <AccordionContent>
              <p>
                LinkedIn uses Open Graph meta tags (&quot;og:title&quot;, &quot;og:description&quot;,
                &quot;og:image&quot;, &quot;og:url&quot;, &quot;og:type&quot;) for link previews. These tags are read by
                LinkedIn&apos;s crawler when a link is shared. Changes to these tags may not reflect immediately due to
                LinkedIn&apos;s caching.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>My site doesn&apos;t show up correctly. What&apos;s wrong?</AccordionTrigger>
            <AccordionContent>
              <p>
                When you share your website on social media, the appearance might differ from the preview shown here.
                This discrepancy often occurs because the website was previously shared, and any recent modifications
                you&apos;ve made may not have been updated yet.
              </p>
              <p className="pt-2">
                To update the preview, use the official debugger tools located beneath each social media preview to
                refresh the cache of your website.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default FAQResult
