import Image from 'next/image'
import { SearchIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Facility from '@/public/assets/icons/black/Facility.png'

type Props = {
  children: React.ReactNode
  title: string,
  registryCount: number,
  onClick: () => void,
};

export const HistoricalCard = ({ children, title, registryCount, onClick }: Props) => {
  return (
    <Card className="w-full text-neutral-500 rounded-[8px] border-none shadow-2xl">
      <CardHeader className="flex flex-col items-start md:flex-row md:items-center md:justify-between w-full">
        <div className="flex flex-row items-center justify-center gap-4 w-full md:w-auto">
          <Image src={ Facility.src } alt="Facility" width="96" height="96" className="w-16 h-16"/>
          <h2 className="text-[#252733] text-3xl font-bold">{ title }</h2>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between w-full md:w-auto gap-8">
          <Button className="text-[#FDFDFD] bg-[#03133A] w-full md:w-auto" onClick={ onClick }>New Measurement</Button>
          <div
            className="md:flex flex-row items-center justify-center bg-[#FDFDFD] w-48 border border-[#9FA2B4] rounded-lg pl-4 hidden">
            <SearchIcon className="w-10 h-10"/>
            <Input
              placeholder="Search"
              className="bg-transparent border-none focus-visible:ring-transparent h-8 w-[90%]"/>
          </div>
          <Badge
            className="hidden md:inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 text-[#9FA2B4] bg-[#F4F4F4]">
            { `${ registryCount } record${ registryCount > 1 ? 's' : '' }` }
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-start w-full">
        { children }
      </CardContent>
    </Card>
  )
}
