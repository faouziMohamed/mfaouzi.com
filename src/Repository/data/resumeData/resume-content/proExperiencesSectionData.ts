import { ProfessionalExperience } from '@/types/portfolio/resume.types';

export const proExperiencesSectionData: ProfessionalExperience = {
  title: 'Professional Experience',
  experiences: [
    {
      title: 'Full-stack Developer',
      company: 'Keystone',
      companyLink: 'https://www.linkedin.com/company/keystone-techsolutions',
      city: 'Full Remote',
      country: 'Morocco',
      date: '10/2022',
      description: {
        summary:
          "We've worked on different projects most of them unique and challenging, here are some of them:",
        project: [
          {
            task: '2 Raffle - reimplantation and adding of new features of the most used website, in Mexico, to play online raffle',
            summary:
              '2 Raffle is a website that allows users to play online raffle, and win prizes.',
            technologies: [
              'NextJs',
              'React Server Components',
              'nuvei payment',
              'Mailchimp',
              'Jira',
              'Figma',
              'open Api',
              'Redtrack',
              'Hotjar',
              '...',
            ],
            subTasks: [
              { subTask: 'Website from angular to react Js (NextJs AppDir)' },
              {
                subTask:
                  'Nuvei payment integration, Mailchimp, different tracking tech',
              },
              {
                subTask:
                  'Scrum ideology, Team collaboration and project management with Jira',
              },
              { subTask: 'SEO Optimization, Figma, open Api' },
            ],
          },
          {
            task: 'CSentinel Vm Manager',
            summary:
              'Deploying and running virtualized Android x86 on the cloud on demand.',
            technologies: [
              'ReactJs',
              'Nginx',
              'Docker',
              'ASP.NET Core',
              'Azure SDK for Js and C# ...',
            ],
            subTasks: [
              {
                subTask:
                  'Basically, a SaaS that provide virtual the ability to run Virtual VM from the\n' +
                  'Cloud, and a focus on Managing Android X86 on the Cloud easily',
              },
            ],
          },
          {
            task: 'Magical Ravers Website',
            summary:
              'Development and deployment of the official website of the Magical Ravers project',
            technologies: ['NextJs', 'Nginx', 'Docker', 'DigitalOcean...'],
            subTasks: [
              {
                subTask:
                  'A Website that will serve an NFT project called Magical Ravers.',
              },
              {
                subTask: 'Working on the frontend development',
              },
              {
                subTask: 'Integration of web3 technologies',
              },
              {
                subTask: 'Deployment on an nginx server (azure vm)',
              },
            ],
          },
        ],
      },
    },
    {
      title: 'Requirement Admin - End-of-study internship',
      company: 'Lear Corporation',
      companyLink: 'https://www.lear.com/',
      city: 'Rabat Technopolis, Sala Al Jadida',
      country: 'Morocco',
      date: '06/2021 - 08/2021',
      description: {
        summary: 'Design and optimization of a requirements export system',
        technologies: [
          'DXL',
          'IBM Rational DOORS',
          'Interop',
          'C#',
          'EF Core',
          'ASP.NET Core',
          'SQL Server',
          'OSLC',
        ],
        project: [
          {
            task: 'Integration with IBM Rational DOORS',
            subTasks: [
              {
                subTask:
                  'Usage of dxl script along with IBM rational doors to extends built-in functionalities of DOORS',
                subTaskDetails: [],
              },
              {
                subTask:
                  'Improve interoperability between DOORS and Internal tools at Lear',
                subTaskDetails: [],
              },
            ],
          },

          {
            task: 'Optimization of the export process',
            subTasks: [
              {
                subTask:
                  'Improve performances in the existing export process by using newer strategies, better memory management of DXL script and using more lower-level functionalities for better control of the execution.',
                subTaskDetails: [],
              },
              {
                subTask:
                  'Reduce higher memory usage on the export and allowing parallel export (reduction of export time)',
                subTaskDetails: [],
              },
              {
                subTask:
                  'Usage of a cache mechanism to reduce drastically the export’s execution time, with SQL server as cache database:',
                subTaskDetails: [
                  'Allowing to export only newer or updated requirements',
                  'Allowing to Resume export',
                  'Reduce unnecessary export',
                  'etc.',
                ],
              },
            ],
          },
          {
            task: 'Migration of the existing library to Dotnet 6',
            subTasks: [],
          },
          {
            task: 'Exposing usable API for a later use (in a Command Line Interface) or for a web server (REST API, mvc, …)',
            subTasks: [],
          },
          {
            task: 'Creation of a Command-Line Application (CLI) and web server for exporting requirements',
            subTasks: [],
          },
          {
            task: 'Scheduling export process in windows server to run automatically and periodically in a specified date time.',
            subTasks: [],
          },
        ],
      },
    },
  ],
};
