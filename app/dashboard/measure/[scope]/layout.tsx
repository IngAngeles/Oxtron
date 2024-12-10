'use client'
import MeasureProvider from '@/context/measure'

type Props = Readonly<{ children: React.ReactNode, params: { scope: string } }>

export default function ScopeLayout({ children, params: { scope } }: Props) {
  return (
    <MeasureProvider scope={ scope }>
      { children }
    </MeasureProvider>
  )
}
