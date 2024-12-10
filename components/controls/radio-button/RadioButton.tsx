import { Button } from '@/components/ui/button'
import { FormLabel } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import React, { useEffect } from 'react'

type Props = {
  options: Readonly<{ value: string; label: string }>[];
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  defaultSelected?: number;
  cols?: number;
  label?: string;
};

export const CustomRadioButton = ({
  value,
  options,
  onChange,
  defaultSelected,
  cols = 4,
  label,
}: Props) => {
  useEffect(() => {
    if (defaultSelected !== undefined && options[defaultSelected]) {
      onChange(options[defaultSelected].value)
    }
  }, [])

  const handleClick = (val: string) => {
    onChange(value === val && options.length === 1 ? '' : val);
  };

  return (
    <div className="space-y-2 flex-1">
      { label && (
        <FormLabel className="text-[12px] uppercase title-century-gothic-bold text-[#9FA2B4]">
          { label }
        </FormLabel>
      ) }
      <div
        className={ cn(
          `grid`,
          cols === 1
            ? 'grid-cols-1'
            : cols === 2
              ? 'grid-cols-2'
              : cols === 3
                ? 'grid-cols-3'
                : 'grid-cols-4',
          `items-center w-full h-auto gap-4`
        ) }
      >
        { options.map(({ label, value: val }, index) => (
          <div key={ index } className="flex">
            <Button
              type="button"
              onClick={ () => handleClick(val) }
              className={ cn(
                'min-w-full max-w-full h-10 text-white',
                value === val ? 'bg-[#03133A]' : 'bg-[#9FA2B4]'
              ) }
            >
              { label }
            </Button>
          </div>
        )) }
      </div>
    </div>
  )
}
