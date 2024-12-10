import React from 'react';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface TutorialModalProps {
  open: boolean;
  onClose: () => void;
  modalContent: {
    title: string;
    sections: Array<{ title?: string; text: string; route: string; buttonText?: string }>;
  };
  handleReadGuide: (route: string) => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ open, onClose, modalContent, handleReadGuide }) => {
  if (!open) return null;

  return (
    <div className="fixed top-0 right-0 flex flex-col items-center justify-center w-screen h-screen bg-black/25 z-50">
      <div className="flex flex-col items-center justify-between w-full h-full lg:w-1/3 md:w-2/3 md:h-auto rounded bg-white p-8 gap-4 md:gap-8">
        <section className="flex items-center justify-between w-full h-auto space-y-4">
          <h2 className='text-2xl font-bold text-neutral-800'>
            {modalContent.title}
          </h2>
          <div className="flex items-center justify-center rounded-full border-2 border-neutral-500">
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>
        </section>
        <Box>
          {modalContent.sections.map((section, index) => (
            <Box key={index} mb={2}>
              {section.title && (
                <h2 className='text-xl font-bold text-neutral-800'>
                  {section.title}
                </h2>
              )}
              <Typography variant="body1" paragraph className='text-black text-sm text-left font-sans'>
                {section.text}
              </Typography>
              {section.buttonText && (
                <button
                  onClick={() => handleReadGuide(section.route)}
                  className="text-blue-500 underline hover:text-blue-700 text-xs" 
                >
                  {section.buttonText}
                </button>
              )}
            </Box>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default TutorialModal;
