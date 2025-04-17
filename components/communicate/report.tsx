import { useEffect, useRef } from 'react'
import Image from 'next/image'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useCommunicateStore } from '@/store/communicate'

export default function Report({ data, pdf = false }: { data: any, pdf?: boolean }) {
  const { setDownloadReport } = useCommunicateStore()
  function splitFiscalPeriod(start: string = new Date().toString(), end: string = new Date().toString()) {
    const startDate = new Date(start)
    const endDate = new Date(end)

    const dayStart = startDate.getDate()
    const monthStart = startDate.toLocaleString('es-ES', { month: 'long' })
    const yearStart = startDate.getFullYear()

    const dayEnd = endDate.getDate()
    const monthEnd = endDate.toLocaleString('es-ES', { month: 'long' })
    const yearEnd = endDate.getFullYear()

    return {
      title: 'Inventario de emisiones',
      line1: `Periodo del ${ dayStart } de ${ capitalize(monthStart) }`,
      line2: `${ yearStart } al ${ dayEnd } de ${ capitalize(monthEnd) }`,
      line3: `${ yearEnd } (Año Fiscal ${ yearEnd })`,
    }
  }

  function getFormattedToday() {
    const today = new Date()

    const day = today.getDate().toString().padStart(2, '0')
    const month = today.toLocaleString('es-ES', { month: 'long' })
    const year = today.getFullYear()

    return `${ day } de ${ capitalize(month) }, ${ year }`
  }

  function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  const text = splitFiscalPeriod(data?.communicate?.startDate, data?.communicate?.endDate)

  const printRef = useRef<HTMLDivElement | null>(null)
  const handleDownloadPdf = () => {
    if (printRef.current) {
      const element = printRef.current
      html2canvas(element).then(canvas => {
        const data = canvas.toDataURL('image/png')

        const pdf = new jsPDF()
        const imgProperties = pdf.getImageProperties(data)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('Reporte.pdf')
      })

      setDownloadReport(false)
    }
  }

  useEffect(() => {
    if (pdf) handleDownloadPdf()
  }, [pdf])

  return (
    <div className="mx-auto px-6 py-8 bg-white" style={ { fontFamily: 'Poppins, sans-serif' } } id="reporte"
         ref={ printRef }>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-wide text-gray-900">Reporte de Impacto Ambiental</h1>
          <div className="mt-6 grid grid-cols-2 gap-x-16 gap-y-2 text-sm">
            <div>
              <p className="font-medium text-gray-900">{ data?.communicate?.organisationName }</p>
              <p className="text-gray-600 text-xs">{ `${ data?.communicate?.city }, ${ data?.communicate?.state }` }</p>
              <p className="text-gray-600 text-xs">{ data?.communicate?.country }</p>
              <p className="text-gray-600 text-xs">{ getFormattedToday() }</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">{ text.title }</p>
              <p className="text-gray-600 text-xs">{ text.line1 }</p>
              <p className="text-gray-600 text-xs">{ text.line2 }</p>
              <p className="text-gray-600 text-xs">{ text.line3 }</p>
              <p className="text-gray-600 text-xs">{ data.communicate.idFacility }</p>
            </div>
          </div>
        </div>
        <div className="relative w-24 h-24">
          <Image
            src="/placeholder.svg?height=96&width=96"
            alt="Nexstar IMPACT logo"
            width={ 96 }
            height={ 96 }
            className="rounded-full bg-black"
          />
        </div>
      </div>

      <section className="mb-8">
        <h4 className="text-sm font-medium mb-3 text-gray-900">Impacto Ambiental por Alcances (T/CO₂.)</h4>

        { data.reports.map((item: any) => (
          <div className="mb-6">
            {
              /* <>
                <h3 className="text-md font-medium mb-2 text-gray-900">{ item.alcance }</h3>
                <hr className="mb-4 bg-[#000A14] h-0.5"/>
              </> */
            }
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="border-b-2 border-[#000A14]">
                  <TableRow>
                    { Object.keys(item)
                      .filter(key => key !== 'id' && key !== 'idUserControl' && key !== 'idControlCommunicate' && key !== 'descripcion')
                      .map((key, index) => (
                        <TableHead
                          key={ key }
                          className={ cn(index === 0 ? 'w-1/3' : 'text-right', 'h-auto !px-0 text-black text-xs py-1.5') }
                        >
                          { index === 0 ? item[key] : key }
                        </TableHead>
                      ))
                    }
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    { Object.keys(item)
                      .filter(key => key !== 'id' && key !== 'idUserControl' && key !== 'idControlCommunicate' && key !== 'alcance')
                      .map((key, index) => (
                        <TableCell
                          key={ key }
                          className={ cn(index === 0 ? 'w-1/3' : 'text-right', '!px-0 text-black text-xs py-1.5') }
                        >
                          { item[key] }
                        </TableCell>
                      ))
                    }
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        )) }
      </section>

      <section className="mb-8">
        <h4 className="text-sm font-medium mb-2 text-gray-900">Impacto Ambiental por Sucursal (T/CO₂.)</h4>
        <hr className="mb-4 bg-[#000A14] h-0.5"/>

        { data.reportDetails.map((item: any) => (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableRow>
                    { Object.keys(item)
                      .filter(key => key !== 'id' && key !== 'idUserControl' && key !== 'idControlCommunicate' && key !== 'descripcion')
                      .map((key, index) => (
                        <TableHead
                          key={ key }
                          className={ cn(index === 0 ? 'w-1/3' : 'text-right', 'h-auto !px-0 text-black text-xs py-1.5') }
                        >
                          { index === 0 ? item[key] : key }
                        </TableHead>
                      ))
                    }
                  </TableRow>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  { Object.keys(item)
                    .filter(key => key !== 'id' && key !== 'idUserControl' && key !== 'idControlCommunicate' && key !== 'alcance')
                    .map((key, index) => (
                      <TableCell
                        key={ key }
                        className={ cn(index === 0 ? 'w-1/3' : 'text-right', '!px-0 text-black text-xs py-1.5') }
                      >
                        { item[key] }
                      </TableCell>
                    ))
                  }
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )) }
      </section>

      <footer className="mt-16 pt-4 border-t border-gray-200 flex flex-col gap-4">
        <div className="text-xs text-gray-500 flex justify-between">
          <div>© 2023 Nexstar</div>
          <div>Página 1 de 1</div>
        </div>
        <div className="flex justify-between pb-2" style={ { color: '#000A14' } }>
          <div className="text-xs font-medium">OXTRON</div>
          <div className="text-xs font-medium">2023</div>
        </div>
      </footer>
    </div>
  )
}

