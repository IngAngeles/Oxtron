import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React, { SetStateAction, useEffect } from "react";

type Props = {
  options: Readonly<{ value: string; label: String }>[];
  value: string;
  onChange: React.Dispatch<SetStateAction<string>>;
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
  console.log({ defaultSelected });
  useEffect(() => {
    onChange(defaultSelected ? options[defaultSelected].value : "");
  }, []);

  return (
    <div className="space-y-2 flex-1">
      {label ?? (
        <FormLabel className="text-[12px] uppercase title-century-gothic-bold text-[#9FA2B4]">
          {label}
        </FormLabel>
      )}
      <div
        className={cn(
          `grid grid-cols-${ cols } items-center w-full h-auto gap-8`
        )}
      >
        {options.map(({ label, value: val }, index) => (
          <div key={index} className="flex">
            <Button
              onClick={() => onChange(val)}
              className={cn(
                "min-w-full max-w-full h-10 text-white",
                `${value === val ? "bg-[#03133A]" : "bg-[#9FA2B4]"}`
              )}
            >
              {label}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};