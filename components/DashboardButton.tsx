import React from 'react';
import Image from "next/image";
import { Button } from "./ui/button"; 

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick: () => void; 
}

const DashboardButton: React.FC<ButtonProps> = ({ isLoading, className, children, style, onClick }) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-secondary-btn w-fit my-2"}
      style={style}
      onClick={onClick} 
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Cargando...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default DashboardButton;
