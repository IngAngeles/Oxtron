"use client";

import { useRouter } from 'next/navigation'; 
import TitleHandler from '@/components/TitleHandler';
import React, { useState } from 'react';
import { Box, Paper, List, ListItem, ListItemText, IconButton, Divider, TextField, InputAdornment, Collapse } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ArrowLeft } from 'lucide-react';

const options = [
  'What is the emissions inventory measurement platform?',
  'Who can use this platform?',
  'Setup',
  'How do I set up my account for the first time?',
  'Can I customize the tracking metrics?',
  'Technical Issues',
  'I can not access my account, what should I do?',
  'The platform is not loading properly, what should I do?',
  'Billing',
  'How do I upgrade my subscription plan?',
  'Where can I find my invoices?',
  'Security and Privacy',
  'How is my company information protected?',
  'How can I delete my account and all my data?',
  'Can not find your answer?',
  'Contact us info@oxtron.mx',
];

const noArrowOptions = ['Setup', 'Technical Issues', 'Billing', 'Security and Privacy', 'Can not find your answer?', 'Contact us info@oxtron.mx'];

const Faqs: React.FC = () => {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleNavigation = (option: string) => {
    const routeMap: { [key: string]: string } = {
      'Admin Account': 'settings/admin-account',
      'User Accounts': 'settings/user-accounts',
      'Set Up Company Information': 'settings/setup-company-information',
      'Report Parameters': 'settings/report-parameters',
      'Change Language': 'settings/change-language',
      'Upgrade Plan': 'settings/upgrade-plan',
      'Tutorials': 'settings/tutorials',
      'Glossary': 'settings/glossary',
    };

    const route = routeMap[option];
    if (route) {
      router.push(route);
    }
  };

  const handleExpand = (option: string) => {
    setExpanded(expanded === option ? null : option);
  };

  return (
    <div className='mt-6 md:ml-64 p-6 lg:ml-64 ml-0'>

    <div className='flex items-center mb-4 gap-2'>
        <button onClick={() => router.back()} className='flex items-center gap-2 text-blue-600 hover:text-blue-800'>
          <ArrowLeft className='w-6 h-6' /> 
        </button>
        <TitleHandler title="FAQS" text='Find answers to common questions and get quick solutions to optimize your emissions tracking experience.' />
      </div>
      

      <Box sx={{ width: '100%', p: 2 }}>
        {/* Contenedor General */}
        <div className='rounded-2xl shadow-xl md:p-6 p-3 mt-25'>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, 
              alignItems: 'center', 
              justifyContent: { md: 'space-between' }, 
              mb: 2 
            }}
          >
            <h2 className='text-2xl font-bold text-neutral-800'>
              General
            </h2>
          </Box>
          <p className='text-neutral-400 text-sm'>
            Welcome to the Frequently Asked Questions FAQs section. Here, you will find answers to common questions about our emissions inventory measurement platform. If you can not find what you are looking for, please contact our support team.
          </p>
          <List>
            {options.map((option, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    py: 1,
                    pr: 2,
                    mt: noArrowOptions.includes(option) ? 6 : 0
                  }}
                >
                  <ListItemText
                    primary={
                      option === 'Contact us info@oxtron.mx' ? (
                        <a href="mailto:soporte@oxtron.mx" className="no-underline">
                          <React.Fragment>
                            <h2 className='text-lg font-bold text-neutral-800 cursor-pointer'>
                              Contact us
                            </h2>
                            <p className='text-neutral-400 text-sm cursor-pointer'>
                              info@oxtron.mx
                            </p>
                          </React.Fragment>
                        </a>
                      ) : (
                        option
                      )
                    }
                    primaryTypographyProps={{ 
                      className: `text-xl font-bold text-neutral-800 font-sans ${noArrowOptions.includes(option) ? 'text-2xl' : 'text-xl'}`,
                      style: { fontSize: noArrowOptions.includes(option) ? '1.25rem' : '1rem' }
                    }}
                  />
                  {option 
                  !== 'How can I delete my account and all my data?' 
                  && option !== 'Contact us info@oxtron.mx' 
                  && option !== 'What is the emissions inventory measurement platform?' 
                  && option !== 'Who can use this platform?' 
                  && option !== 'How do I set up my account for the first time?' 
                  && option !== 'Can I customize the tracking metrics?' 
                  && option !== 'I can not access my account, what should I do?' 
                  && option !== 'The platform is not loading properly, what should I do?' 
                  && option !== 'How do I upgrade my subscription plan?' 
                  && option !== 'Where can I find my invoices?' 
                  && option !== 'How is my company information protected?' 
                  && !noArrowOptions.includes(option) && (
                    <IconButton edge="end" onClick={() => handleNavigation(option)}>
                      <ArrowForwardIosIcon />
                    </IconButton>
                  )}

                  {option === 'How can I delete my account and all my data?' && (
                    <IconButton edge="end" onClick={() => handleExpand(option)}>
                      {expanded === option ? <ArrowDropDownIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                  )}
                  {option === 'What is the emissions inventory measurement platform?' && (
                    <IconButton edge="end" onClick={() => handleExpand(option)}>
                      {expanded === option ? <ArrowDropDownIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                  )}
                  {option === 'Who can use this platform?' && (
                    <IconButton edge="end" onClick={() => handleExpand(option)}>
                      {expanded === option ? <ArrowDropDownIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                  )}
                  {option === 'How do I set up my account for the first time?' && (
                    <IconButton edge="end" onClick={() => handleExpand(option)}>
                      {expanded === option ? <ArrowDropDownIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                  )}
                  {option === 'Can I customize the tracking metrics?' && (
                    <IconButton edge="end" onClick={() => handleExpand(option)}>
                      {expanded === option ? <ArrowDropDownIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                  )}
                  {option === 'I can not access my account, what should I do?' && (
                    <IconButton edge="end" onClick={() => handleExpand(option)}>
                      {expanded === option ? <ArrowDropDownIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                  )}
                  {option === 'The platform is not loading properly, what should I do?' && (
                    <IconButton edge="end" onClick={() => handleExpand(option)}>
                      {expanded === option ? <ArrowDropDownIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                  )}
                  {option === 'How do I upgrade my subscription plan?' && (
                    <IconButton edge="end" onClick={() => handleExpand(option)}>
                      {expanded === option ? <ArrowDropDownIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                  )}
                  {option === 'Where can I find my invoices?' && (
                    <IconButton edge="end" onClick={() => handleExpand(option)}>
                      {expanded === option ? <ArrowDropDownIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                  )}
                  {option === 'How is my company information protected?' && (
                    <IconButton edge="end" onClick={() => handleExpand(option)}>
                      {expanded === option ? <ArrowDropDownIcon /> : <ArrowForwardIosIcon />}
                    </IconButton>
                  )}

                </ListItem>

                {option === 'How can I delete my account and all my data?' && (
                  <Collapse in={expanded === 'How can I delete my account and all my data?'}>
                    <Box sx={{ mt: 2, ml: 4 }}>
                    <p className='text-neutral-400 text-sm'>
                        If you wish to delete your account and all your data, please contact our support team. We will assist you with the data deletion process.
                      </p>
                    </Box>
                  </Collapse>
                )}
                {option === 'What is the emissions inventory measurement platform?' && (
                  <Collapse in={expanded === 'What is the emissions inventory measurement platform?'}>
                    <Box sx={{ mt: 2, ml: 4 }}>
                    <p className='text-neutral-400 text-sm'>
                      The platform is a tool that allows companies to measure, monitor, and report their greenhouse gas emissions. It offers features for data management, report generation, and compliance.
                    </p>
                    </Box>
                  </Collapse>
                )}
                {option === 'Who can use this platform?' && (
                  <Collapse in={expanded === 'Who can use this platform?'}>
                    <Box sx={{ mt: 2, ml: 4 }}>
                    <p className='text-neutral-400 text-sm'>
                      Any company interested in tracking and reducing their carbon emissions can use the platform, regardless of size or industry.
                    </p>
                    </Box>
                  </Collapse>
                )}
                {option === 'How do I set up my account for the first time?' && (
                  <Collapse in={expanded === 'How do I set up my account for the first time?'}>
                    <Box sx={{ mt: 2, ml: 4 }}>
                    <p className='text-neutral-400 text-sm'>
                      To set up your account, follow the steps in the &apos;Initial Setup&apos; tutorial available in the Tutorials section. Be sure to have your company&apos;s basic information ready.
                    </p>
                    </Box>
                  </Collapse>
                )}
                {option === 'Can I customize the tracking metrics?' && (
                  <Collapse in={expanded === 'Can I customize the tracking metrics?'}>
                    <Box sx={{ mt: 2, ml: 4 }}>
                    <p className='text-neutral-400 text-sm'>
                      Yes, you can customize the metrics according to your specific needs from the settings panel. Refer to our &apos;Customizing Metrics&apos; tutorial for more details.
                    </p>
                    </Box>
                  </Collapse>
                )}
                {option === 'I can not access my account, what should I do?' && (
                  <Collapse in={expanded === 'I can not access my account, what should I do?'}>
                    <Box sx={{ mt: 2, ml: 4 }}>
                    <p className='text-neutral-400 text-sm'>
                      If you&apos;re having trouble accessing your account, try resetting your password using the &apos;Forgot your password&apos; link on the login page. If the issue persists, contact our technical support team.
                    </p>
                    </Box>
                  </Collapse>
                )}
                {option === 'The platform is not loading properly, what should I do?' && (
                  <Collapse in={expanded === 'The platform is not loading properly, what should I do?'}>
                    <Box sx={{ mt: 2, ml: 4 }}>
                    <p className='text-neutral-400 text-sm'>
                      Make sure you&apos;re using a compatible browser and that your internet connection is stable. Clear your browser&apos;s cache and try again. If the problem continues, reach out to our support team.
                    </p>
                    </Box>
                  </Collapse>
                )}
                {option === 'How do I upgrade my subscription plan?' && (
                  <Collapse in={expanded === 'How do I upgrade my subscription plan?'}>
                    <Box sx={{ mt: 2, ml: 4 }}>
                    <p className='text-neutral-400 text-sm'>
                      You can upgrade your subscription plan in the &apos;Upgrade Plan&apos; section within your account. Select the plan that best suits your needs and follow the instructions to complete the upgrade.
                    </p>
                    </Box>
                  </Collapse>
                )}
                {option === 'Where can I find my invoices?' && (
                  <Collapse in={expanded === 'Where can I find my invoices?'}>
                    <Box sx={{ mt: 2, ml: 4 }}>
                    <p className='text-neutral-400 text-sm'>
                      Invoices are available in the &apos;Billing History&apos; section of your account profile. You can download and review your invoices at any time.
                    </p>
                    </Box>
                  </Collapse>
                )}
                {option === 'How is my company information protected?' && (
                  <Collapse in={expanded === 'How is my company information protected?'}>
                    <Box sx={{ mt: 2, ml: 4 }}>
                    <p className='text-neutral-400 text-sm'>
                      The security of your data is our priority. We use end-to-end encryption and advanced security protocols to protect your information.
                    </p>
                    </Box>
                  </Collapse>
                )}


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
    </div>
  );
};

export default Faqs;
