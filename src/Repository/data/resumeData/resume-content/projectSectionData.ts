import web from '~/images/projects/web.jpeg';

import type { IProject } from '@/types/portfolio/resume.types';

export const projectSectionData: IProject = {
  Title: 'Projects',
  ProjectDetails: [
    {
      Name: 'The Guestbook',
      Summary: 'A Comment system supporting nested comments and replies',
      Description:
        'The guestbook is a comment system that allows users to comment on a post and reply to other comments. It is built with ReactJs and NodeJs. It uses the thread model to store comments and replies in a database. It also uses the Material UI library for the design. The project is part of my portfolio.',
      StartDate: '02/2023',
      EndDate: '03/2023',
      SrcLink: 'https://github.com/faouzimohamed/mfaouzi.com',
      LiveLink: 'https://mfaouzi.com/guestbook',
      Technologies: ['NextJs', 'MaterialUi', 'Planet Scale', 'Prisma'],
      Image: web,
    },
    {
      Name: 'Leave Management System',
      Summary:
        'A fullstack project made with Blazor WASM and ASP.Net Core allowing employees to make leave requests. The admins will be able to accept or refuse the requests.',
      Description:
        'A Single page Application (SPA) representing a small platform to manage Leave request in a company!!',
      StartDate: '09/2021',
      EndDate: '09/2021',
      SrcLink: 'https://github.com/faouziMohamed/LeaveManagement',
      Technologies: [
        'C#',
        'ASP.Net Core',
        'Blazor Web Assembly',
        'Bootstrap 5',
      ],
      Image: web,
    },
    {
      Name: 'Taradjam',
      Summary:
        'A platform for creating translation from one language to another.',
      Description:
        'This project consists, from sentences in a source language, to receive translation proposals in a language of, to create a dataset of several languages.',
      StartDate: '01/2022',
      EndDate: '-1',
      SrcLink: 'https://github.com/faouziMohamed/Taradjam-backend',
      LiveLink: 'https://taradjam.mfaouzi.com',
      Technologies: [
        'ReactJs (NextJs)',
        'Asp.Net Core',
        'Sql Server',
        'MaterialUi',
        'TailwindCss',
        'Azure',
      ],
      Image: web,
    },
    {
      Name: 'Social share',
      Summary: 'Mini social network',
      SrcLink: 'https://github.com/faouziMohamed/social-share',
      LiveLink: 'https://social-share.mfaouzi.com',
      Description:
        'A Social Network-like web-app, with a design based on Facebook and other social networks',
      StartDate: '10/2021',
      EndDate: '02/2022',
      Technologies: ['ReactJs', 'SCSS', 'MongoDB'],
      Image: web,
    },
    {
      Name: 'Covid Data',
      Summary: 'Desktop application that displays Covid 19',
      SrcLink: 'https://github.com/faouziMohamed/covid-data',
      Description: '',
      StartDate: '12/2020',
      EndDate: '01/2021',
      Technologies: ['Python', 'PyQt5', 'Qss (Qt Style sheet)'],
      Image: web,
    },
  ],
};
