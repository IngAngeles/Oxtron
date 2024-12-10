"use client";

import { useRouter } from 'next/navigation';
import TitleHandler from '@/components/TitleHandler';
import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, IconButton, Divider, Switch } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TutorialModal from '@/components/tutorials/Modal';
import { ArrowLeft } from 'lucide-react'

const options = ['Written Guides', 'Advanced Features', 'FAQs Related to Tutorials', 'Additional Resources', 'Contact Support'];

const Tutorials: React.FC = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    sections: [] as Array<{ title?: string; text: string; route: string; buttonText?: string }>,
  });

  const handleOpenModal = (option: string) => {
    const contentMap: { [key: string]: { title: string; sections: Array<{ title?: string; text: string; route: string; buttonText?: string }> } } = {
      'Written Guides': {
        title: 'Written Guides',
        sections: [
          {
            title: 'Step-by-Step Guide: Setting Up Your Account',
            text: 'A detailed guide to help you set up your account, including how to enter company information, configure settings, and personalize your dashboard.',
            route: '/pdf/HowToInputAndTrackEmissionsData.pdf',
            buttonText: 'Read Guide'
          },
          {
            title: 'Input and Track Emissions Data',
            text: 'Learn how to accurately input and monitor your emissions data within the platform. This guide covers data entry, validation, and tracking best practices.',
            route: '/pdf/HowToInputAndTrackEmissionsData.pdf',
            buttonText: 'Read Guide'
          }
        ]
      },
      'Advanced Features': {
        title: 'Advanced Features',
        sections: [
          {
            title: 'Customizing Metrics and Reports',
            text: 'Discover how to tailor the platforms is metrics and reporting features to suit your specific needs. This guide will show you how to customize data views, set up alerts, and more.',
            route: '/pdf/HowToInputAndTrackEmissionsData.pdf',
            buttonText: 'Read Guide'
          },
          {
            title: 'Integration with Other Tools',
            text: 'Find out how to integrate the platform with other tools and systems your company uses, such as accounting software or environmental management systems.',
            route: '/pdf/HowToInputAndTrackEmissionsData.pdf',
            buttonText: 'Read Guide'
          }
        ]
      },
      'FAQs Related to Tutorials': {
        title: 'FAQs Related to Tutorials',
        sections: [
          {
            title: 'Common Questions About Using the Platform',
            text: 'A list of frequently asked questions related to the tutorials and platform usage. Find quick answers and troubleshooting tips.',
            route: 'faqs',
            buttonText: 'Read FAQs'
          }
        ]
      },
      'Additional Resources': {
        title: 'Additional Resources',
        sections: [
          {
            title: 'User Manual',
            text: 'A comprehensive manual that covers all aspects of the platform, from basic operations to advanced features.',
            route: '/pdf/SettingUpYourAccount.pdf',
            buttonText: 'Download Manual'
          },
          {
            title: 'Community Forum',
            text: 'Join our community forum to connect with other users, share tips, and ask questions.',
            route: 'tutorials/community-forum',
            buttonText: 'Visit Forum'
          }
        ],
      },
      'Contact Support': {
        title: 'Contact Support',
        sections: [
          {
            title: 'Need help? Contact our support team for assistance.',
            text: 'info@oxtron.mx',
            route: '', 
            buttonText: '' 
          }
        ]
      }
    };

    const content = contentMap[option];
    if (content) {
      setModalContent(content);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleReadGuide = (route: string) => {
    if (route) {
      router.push(route);
    }
  };

  return (
    <div className='p-6 ml-0 mt-6 lg:ml-64'>
      <div className='flex items-center mb-4 gap-2'>
        <button onClick={() => router.back()} className='flex items-center gap-2 text-blue-600 hover:text-blue-800'>
          <ArrowLeft className='w-6 h-6' /> 
        </button>
        <TitleHandler title="Tutorials" text='Master the art of measuring and managing emissions with our step-by-step guides and educational resources.' />
      </div>
      <Box sx={{ width: '100%', p: 2 }}>
        <div className='rounded-2xl shadow-xl lg:p-6 p-3 mt-25'>
          <h2 className='text-2xl font-bold text-neutral-800'>
            Getting Started
          </h2>
          <p className='text-neutral-400 text-xs'>
            Welcome! Here, you&apos;ll find resources to help you master our emissions inventory measurement platform. Whether you&apos;re just starting or looking to expand your knowledge, our tutorials provide valuable insights and guidance.
          </p>
          <List>
            {options.map((option, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ py: 1, pr: 2 }}>
                  <ListItemText primary={option} primaryTypographyProps={{ className: 'text-xl font-bold text-neutral-800 font-sans' }} />
                  {option === 'Upgrade Plan' ? (
                    <Switch edge="end" />
                  ) : (
                    <IconButton edge="end" onClick={() => handleOpenModal(option)}>
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
        </div>
      </Box>

      <TutorialModal
        open={openModal}
        onClose={handleCloseModal}
        modalContent={modalContent}
        handleReadGuide={handleReadGuide}
      />
    </div>
  );
};

export default Tutorials;
