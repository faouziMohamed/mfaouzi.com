import type { Project } from '@/types/portfolio/resume.types';

export const projectSectionData: Project = {
  Title: 'Projects',
  ProjectDetails: [
    {
      name: 'The Guestbook',
      summary: 'A Comment system supporting nested comments and replies',
      description:
        'The guestbook is a comment system that allows users to comment on a post and reply to other comments. It is built with ReactJs and NodeJs. It uses the thread model to store comments and replies in a database. It also uses the Material UI library for the design. The project is part of my portfolio.',
      startDate: '02/2023',
      endDate: '03/2023',
      srcLink: 'https://github.com/faouzimohamed/mfaouzi.com',
      liveLink: 'https://mfaouzi.com/guestbook',
      technologies: ['NextJs', 'MaterialUi', 'Planet Scale', 'Prisma'],
    },
    {
      name: 'Trust 4 Finance',
      summary: '',
      description:
        'An admin driven platform to manage finance and users for associations',
      startDate: '03/2023',
      endDate: '-1',
      srcLink: 'https://github.com/faouziMohamed/Taradjam-backend',
      liveLink: 'https://taradjam.mfaouzi.com',
      technologies: [
        'NextJs',
        'MaterialUi',
        'MySQL',
        'Serverless',
        'ExpressJs',
        'Nginx',
        'Docker',
      ],
    },
    {
      name: 'Trakz',
      summary: 'Yet another task manager more than a todo list',
      srcLink: 'https://github.com/faouziMohamed/trakz',
      liveLink: 'https://trakz.mfaouzi.com',
      description: 'A Fancy web based of Microsoft To-Do',
      startDate: '2023',
      endDate: '-1',
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'Angular Material'],
    },
    {
      name: 'AMCI Scholarship',
      summary: '',
      srcLink: 'https://github.com/faouziMohamed/amci-scholarship',
      liveLink: 'https://amci-scholarship.vercel.app/',
      description:
        'A convenient way that students will use to get their AMCI scholarship codes',
      startDate: '03/2023',
      endDate: '',
      technologies: ['ReactJs', 'Serverless API', 'MySQL', 'Prisma'],
    },
    {
      name: 'Leave Management System',
      summary:
        'A fullstack project made with Blazor WASM and ASP.Net Core allowing employees to make leave requests. The admins will be able to accept or refuse the requests.',
      description:
        'A Single page Application (SPA) representing a small platform to manage Leave request in a company!!',
      startDate: '09/2021',
      endDate: '09/2021',
      srcLink: 'https://github.com/faouziMohamed/LeaveManagement',
      technologies: [
        'C#',
        'ASP.Net Core',
        'Blazor Web Assembly',
        'Bootstrap 5',
      ],
    },
  ],
};
