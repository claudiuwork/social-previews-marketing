'use client'

import { ArrowUpIcon } from '@radix-ui/react-icons'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function DropZone({
  uploadImage,
  setUploadImage,
}: {
  uploadImage: string
  setUploadImage: React.Dispatch<React.SetStateAction<string>>
}) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setPreviewSrc(reader.result as string | null)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }, [])

  useEffect(() => {
    if (previewSrc) {
      setUploadImage(previewSrc)
    }
  }, [previewSrc])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      className="relative flex h-[150px] w-[286px] justify-center rounded-[10px] border border-solid border-[#dadde1] bg-slate-100 bg-cover bg-center align-middle"
      style={{ backgroundImage: `url(${uploadImage})` }}
      {...getRootProps()}
    >
      <div className="z-1 absolute left-0 top-0 h-full w-full rounded-[8px] bg-[rgba(256,256,256,0.8)]"></div>
      <div className="z-10 flex h-full w-full justify-center align-middle">
        <input {...getInputProps()} />
        <div className="flex w-full cursor-pointer items-center justify-center rounded-xl font-semibold text-black">
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="mb-2 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black">
                <ArrowUpIcon
                  style={{
                    strokeWidth: 10,
                    width: '25px',
                    height: '25px',
                    color: 'white',
                  }}
                />
              </div>
              <div>Drag&Drop or Click</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
