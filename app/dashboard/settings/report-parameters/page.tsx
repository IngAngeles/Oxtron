'use client'
import TitleHandler from '@/components/TitleHandler'
import React, { useEffect, useState } from 'react'
import { ArrowLeft, ChevronDownIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getGWPDataset } from '@/actions/settings'
import { IGWP } from '@/constants/types'
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/select'

const Report = () => {
  const [gwpDataset, setGwpDataset] = useState<IGWP[]>()
  const router = useRouter()

  const loadData = async () => {
    const response = await getGWPDataset()

    if (response.success)
      setGwpDataset(response.data as IGWP[])
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="ml-0 p-6 w-full lg:w-1/2 lg:ml-64">
      <div className="flex items-center mb-4 gap-2">
        <button onClick={ () => router.back() } className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-6 h-6"/>
        </button>
        <TitleHandler title="Parameters" text="Manage your user and account information"/>
      </div>
      <div className="flex flex-col gap-6 mt-6">
        {/* Primer Contenedor */ }
        <div className="bg-white shadow-xl p-4 rounded-xl flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-neutral-700 text-lg font-bold">GWP Dataset</h2>
            <div className="w-8 h-8 flex items-center justify-center border border-black rounded-full">
              <span className="text-neutral-600 italic">i</span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-between rounded-xl text-black">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="GWP" className="bg-dark-200 text-black" />
              </SelectTrigger>
              <SelectContent className="bg-dark-200">
                <SelectGroup className="bg-dark-200">
                  { gwpDataset?.map((value) =>
                    <SelectItem value={ value.description.toLowerCase() } key={ value.idGWP }>
                      { value.description }
                    </SelectItem>)
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Segundo Contenedor */ }
        <div className="bg-white shadow-xl p-4 rounded-xl flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-neutral-700 text-lg font-bold">RF Factors</h2>
            <div className="w-8 h-8 flex items-center justify-center border border-black rounded-full">
              <span className="text-neutral-600 italic">i</span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-between rounded-xl text-black">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Yes/No" className="bg-dark-200 text-black"/>
              </SelectTrigger>
              <SelectContent className="bg-dark-200">
                <SelectGroup className="bg-dark-200">
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <ChevronDownIcon className="w-5 h-5 text-neutral-700"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report
