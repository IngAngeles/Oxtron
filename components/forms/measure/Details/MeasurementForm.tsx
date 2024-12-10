/* 'use client'
import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { Button } from '@/components/ui/button'

type Props = {};

export const MeasurementForm = (props: Props) => {
  return (
    <form>
      <div className="flex flex-col items-center justify-center w-full gap-32">
        <div className="flex flex-col">
          <span>ADD MANUALLY</span>
          <Button>Manually</Button>
        </div>
        <div className="flex flex-col">
          <span>UPLOAD INVOICE</span>
          <DragDrop/>
        </div>
      </div>
    </form>
  )
}

const fileTypes = ['JPG', 'PNG', 'GIF']

function DragDrop() {
  const [file, setFile] = useState(null)
  const handleChange = (file) => {
    setFile(file)
  }

  return (
    <FileUploader handleChange={ handleChange } name="file" types={ fileTypes }/>
  )
} */
