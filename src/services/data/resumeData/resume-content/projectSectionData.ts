import type { IProject } from '@/@types/resume.types';

export const projectSectionData: IProject = {
  Title: 'Projects',
  ProjectDetails: [
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
      LiveLink: 'https://taradjam.mfaouzi.live',
      Technologies: [
        'ReactJs (NextJs)',
        'Asp.Net Core',
        'Sql Server',
        'MaterialUi',
        'TailwindCss',
        'Azure',
      ],
    },
    {
      Name: 'Social share',
      Summary: 'Mini social network',
      SrcLink: 'https://github.com/faouziMohamed/social-share',
      LiveLink: 'https://social-share.mfaouzi.live',
      Description:
        'A Social Network-like web-app, with a design based on Facebook and other social networks',
      StartDate: '10/2021',
      EndDate: '02/2022',
      Technologies: ['ReactJs', 'SCSS', 'MongoDB'],
    },
    {
      Name: 'ACEM - Vote',
      Summary: 'Online vote secured for a student association called ACEM',
      SrcLink: 'https://github.com/faouziMohamed/acem-vote',
      LiveLink: 'https://acem-vote.vercel.app',
      Description: '',
      StartDate: '10/2021',
      EndDate: '-1',
      Technologies: [
        'NextJs',
        'Typescript',
        'TailwindCSS',
        'SCSS',
        'MongoDB',
        'Open GPG',
      ],
    },
    {
      Name: 'Covid Data',
      Summary: 'Desktop application that displays Covid 19',
      SrcLink: 'https://github.com/faouziMohamed/covid-data',
      Description: '',
      StartDate: '12/2020',
      EndDate: '01/2021',
      Technologies: ['Python', 'PyQt5', 'Qss (Qt Style sheet)'],
    },
  ],
};
