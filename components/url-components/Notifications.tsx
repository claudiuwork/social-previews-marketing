'use client'

import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Fragment, useEffect, useState } from 'react'

export default function Notifications() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('notificationShown') !== 'true') {
      const timer = setTimeout(() => {
        setShow(true)
        sessionStorage.setItem('notificationShown', 'true')
      }, 30000) // 30 seconds after page load

      return () => clearTimeout(timer) // cleanup on unmount
    }
  }, [])

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false)
      }, 20000) // 20 seconds after notification shows up

      return () => clearTimeout(timer) // cleanup on unmount
    }
  }, [show])

  return (
    <div className="relative z-[1000]">
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                      <path
                        fillRule="evenodd"
                        d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">Bookmark this website!</p>
                    <p className="mt-1 text-sm text-gray-500">You can bookmark this website to access it later.</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex cursor-pointer rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  )
}
