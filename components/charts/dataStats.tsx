"use client"

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
  name: string
  stats: number | null
  unit: string
}

const DataStats = ({name, stats, unit}: Props) => {
return (
  <div className='md:max-w-none md:min-h-none min-h-[150px] shadow-custom w-full p-5 rounded-[8px] gradient-border gradient-text flex flex-col items-center justify-start md:flex-1'>
      <h3 className='font-medium text-neutral-400 mb-5 text-base text-center'>{name}</h3>
      <div className={`flex ${unit === 'Water Bottles' && 'flex-col items-center'} items-end gap-1 `}>
        <p className="text-neutral-800 font-bold text-5xl text-center">{name === 'Sector Comparison' && '+'}</p><Stat num={Number(stats)} unit={unit} />
          <p className="text-neutral-700 font-light text-center ">{unit}</p>
      </div>
  </div>
)
}

export default DataStats  


interface StatProps {
  num: number;
  unit: string;
  decimals?: number;
}

const Stat = ({ num, decimals = 0 }: StatProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) return;

    animate(0, num, {
      duration: 2.5,
      onUpdate(value) {
        if (!ref.current) return;

        ref.current.textContent = value.toFixed(decimals);
      },
    });
  }, [num, decimals, isInView]);


  return (
    <p className="text-neutral-800 font-bold text-5xl text-center">
      <span ref={ref}></span>
    </p>
  );
};