import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { SquarePen, SquareX } from 'lucide-react'

type Props<T> = {
  caption?: string
  data: T[]
  columns: Array<{
    header: string
    accessor: keyof T
  }>;
  options?: {
    onEdit: () => void
    onDelete: () => void
  }
};

export const SimpleTable = <T, >({ columns, data, caption, options }: Props<T>) => {
  return Array.isArray(data) ? (
    <Table>
      { caption ?? (
        <TableCaption>{ caption }</TableCaption>
      ) }
      <TableHeader>
        <TableRow>
          { columns.map((column, index) => (
            <TableHead
              key={ index }
              className="text-left text-xs text-[#9FA2B4] font-bold overflow-hidden text-ellipsis whitespace-nowrap"
            >
              { column.header }
            </TableHead>
          )) }
          { options ? (
            <TableHead className="text-left text-xs text-[#9FA2B4] font-bold overflow-hidden text-ellipsis whitespace-nowrap">Options</TableHead>
          ) : null
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        { data.map((row, rowIndex) => (
          <TableRow key={ rowIndex }>
            { columns.map((column, colIndex) => (
              <TableCell key={ colIndex } className="text-base font-light text-[#9FA2B4] overflow-hidden text-ellipsis whitespace-nowrap">
                { String(row[column.accessor]) }
              </TableCell>
            )) }
            { options ? (
              <TableCell className="flex items-center justify-center text-lg font-light text-[#9FA2B4] gap-4">
                <SquarePen className="W-4 H-4"/>
                <SquareX className="W-4 H-4"/>
              </TableCell>
            ) : null }
          </TableRow>
        )) }
      </TableBody>
    </Table>
  ) : (
    <div className="flex items-center justify-center w-full">
      <p>{ data }</p>
    </div>
  )
}
