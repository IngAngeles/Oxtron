"use client"

import { useRouter } from 'next/navigation'; 
import TitleHandler from '@/components/TitleHandler';
import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ArrowLeft } from 'lucide-react';
import ModalComponent from '@/components/glossary/Modal'

const options = ['1', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const Glossary: React.FC = () => {
  const router = useRouter(); 
  const [openModal, setOpenModal] = useState(false);

  const handleNavigation = (option: string) => {
    const routeMap: { [key: string]: string } = {
      'A': 'glossary/a', 
      'B': 'glossary/b', 
      'C': 'glossary/c', 
      'D': 'glossary/d', 
      'E': 'glossary/e', 
      'F': 'glossary/f', 
      'G': 'glossary/g', 
      'I': 'glossary/i', 
      'L': 'glossary/l', 
      'N': 'glossary/n', 
      'P': 'glossary/p', 
      'R': 'glossary/r', 
      'S': 'glossary/s', 
      'V': 'glossary/v', 
      'T': 'glossary/t', 
      'U': 'glossary/u', 
    };

    const route = routeMap[option];
    if (route) {
      router.push(route);
    } else {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className='lg:ml-64 ml-0 p-6 md:ml-64'>
      <div className='flex items-center mb-4 gap-2'>
        <button onClick={() => router.back()} className='flex items-center gap-2 text-blue-600 hover:text-blue-800'>
          <ArrowLeft className='w-6 h-6' /> 
        </button>
        <TitleHandler title="Glossary" text='Explore the most common carbon accounting terms, abbreviations, and frameworks.' />
      </div>
      <Box sx={{ width: '100%'}}>
        <div className='rounded-2xl shadow-xl md:p-6 p-3 mt-25'>
          <h2 className='text-2xl font-bold text-neutral-800'>
            General
          </h2>
          <p className='text-neutral-400 text-sm'>
            Manage your user and account information
          </p>
          <List>
            {options.map((option, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ py: 1, pr: 2 }}>
                  <ListItemText primary={option} primaryTypographyProps={{ className:'text-xl font-bold text-neutral-800 font-sans' }} />
                  <IconButton edge="end" onClick={() => handleNavigation(option)}>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </ListItem>
                {index < options.length - 1 && (
                  <Divider sx={{ my: 1 }} />
                )}
              </React.Fragment>
            ))}
          </List>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '100%',
              textAlign: 'right',
              p: 2,
            }}
          >
            <Box
              sx={{
                width: 0,
                height: 0,
                borderLeft: '20px solid transparent',
                borderRight: '20px solid transparent',
                borderTop: '20px solid #fff',
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            />
          </Box>
        </div>
      </Box>
      <ModalComponent
        open={openModal}
        onClose={handleCloseModal}
        message="No words found for this letter in the glossary."
      />
    </div>
  );
};

export default Glossary;
