import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ open, onClose, message }) => {
  if (!open) return null;

  return (
    <div className="fixed top-0 right-0 flex flex-col items-center justify-center w-screen h-screen bg-black/25 z-50">
      <div className="relative flex flex-col items-center w-full h-full lg:w-1/3 md:w-2/3 md:h-auto rounded bg-white p-8">
        <div className="absolute top-2 right-2">
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>
        <Box mt={4}>
          <Typography variant="body1" paragraph className='text-black text-sm text-left font-sans'>
            {message}
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default ModalComponent;
