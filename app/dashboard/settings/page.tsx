"use client";

import { useRouter } from 'next/navigation'; 
import TitleHandler from '@/components/TitleHandler';
import React from 'react';
import { Box, Paper, List, ListItem, ListItemText, IconButton, Divider, Switch } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const options = [
  'Admin Account',
  //'User Accounts',
  'Set Up Company Information',
  'Report Parameters',
  'Change Language',
  'Upgrade Plan'
];

const supportOptions = ['Tutorials', 'Glossary', 'FAQs'];

const Settings: React.FC = () => {
  const router = useRouter(); 

  const handleNavigation = (option: string) => {
    const routeMap: { [key: string]: string } = {
      'Admin Account': 'settings/admin-account',
      //'User Accounts': 'settings/user-accounts',
      'Set Up Company Information': 'settings/setup-company-information',
      'Report Parameters': 'settings/report-parameters',
      'Change Language': 'settings/change-language',
      'Upgrade Plan': 'settings/upgrade-plan',
      'Tutorials': 'settings/tutorials',
      'Glossary': 'settings/glossary',
      'FAQs': 'settings/faqs', 
    };

    const route = routeMap[option];
    if (route) {
      router.push(route);
    }
  };

  const handleSwitchChange = () => {
    handleNavigation('Upgrade Plan');
  };

  return (
    <div className='p-6 lg:ml-64 ml-0'>
      <TitleHandler title="Settings" text='Manage your user and account information' />
      <div className='w-full mt-8'>
        {/* Contenedor General */}
        <div className='rounded-[8px] shadow-custom lg:p-6 p-3 mb-10'>
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
                  <ListItemText primary={option} primaryTypographyProps={{ className: 'text-xl font-bold text-neutral-800 font-sans' }} />
                  {option === 'Upgrade Plan' ? (
                    <Switch edge="end" onChange={handleSwitchChange} />
                  ) : (
                    <IconButton edge="end" onClick={() => handleNavigation(option)}>
                      <ArrowForwardIosIcon />
                    </IconButton>
                  )}
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

        {/* Contenedor Support */}
        <div className='rounded-[8px] shadow-custom lg:p-6 p-3 mt-8'>
          <h2 className='text-2xl font-bold text-neutral-800'>
            Support
          </h2>
          <p className='text-neutral-400 text-sm'>
            Extra content to help you through your net zero journey
          </p>
          <List>
            {supportOptions.map((option, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ py: 1, pr: 2 }}>
                  <ListItemText primary={option} primaryTypographyProps={{ className:'text-xl font-bold text-neutral-800 font-sans' }} />
                  {option !== 'FAQs' ? (
                    <IconButton edge="end" onClick={() => handleNavigation(option)}>
                      <ArrowForwardIosIcon />
                    </IconButton>
                  ) : (
                    <IconButton edge="end" onClick={() => handleNavigation(option)}>
                      <ArrowForwardIosIcon />
                    </IconButton>
                  )}
                </ListItem>
                {index < supportOptions.length - 1 && (
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
      </div>
    </div>
  );
};

export default Settings;
