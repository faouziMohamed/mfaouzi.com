# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.1.4 (2022-09-10)


### Features

* **& fix:** add og metada and update projects data in json file, fix social icon errors ([ac94c1b](https://github.com/faouziMohamed/fz-portfolio/commit/ac94c1bf61b437c423b8b90db29fcaeb3553c3a6))
* add contact form for small screen layout and info banner ([b2c7fb7](https://github.com/faouziMohamed/fz-portfolio/commit/b2c7fb7fabbf9860d865589086df43326411f0f9))
* add footer ([6f92d24](https://github.com/faouziMohamed/fz-portfolio/commit/6f92d248e3235e9afd5cb7cd88ec16e0b82fdf38))
* add home page title ([f4c7fe0](https://github.com/faouziMohamed/fz-portfolio/commit/f4c7fe0e8cdab44ba23af87ede10af2dc315e67f))
* add new skill, update contact form ([26ad61d](https://github.com/faouziMohamed/fz-portfolio/commit/26ad61d6a7c554ccea8ede2729e06cabb4b523e8))
* add og metada and update projects data in json file ([8c73815](https://github.com/faouziMohamed/fz-portfolio/commit/8c73815fcd2c3f11504b7ec4c7ab0fbd1b967934))
* add project modal, remove hard coded data in  code ([c6af5f3](https://github.com/faouziMohamed/fz-portfolio/commit/c6af5f3a611501be1162950a89bffb78069deaa3))
* add responsive header ([8a68171](https://github.com/faouziMohamed/fz-portfolio/commit/8a6817100af6a72190b7f02513c544ddadf81eb5))
* add some section ofthe  home page ([6ba0fd7](https://github.com/faouziMohamed/fz-portfolio/commit/6ba0fd7987de9fe990931ee6c72ec35c678637b3))
* **configuration:** configure projects files and packages ([9598a4b](https://github.com/faouziMohamed/fz-portfolio/commit/9598a4b4688e966500dfdeb836642ceb444a908d))
* fix responsivness of navbar, add icons to the nvbar ([730f38d](https://github.com/faouziMohamed/fz-portfolio/commit/730f38d643b7850d337433986d07da8ddeb1b705))
* make the navbar fully responsive ([7adfb53](https://github.com/faouziMohamed/fz-portfolio/commit/7adfb53e798f6a5d681eb9b0779d42cca17f1b60))


### Bug Fixes

* fix ProjectData interface type ([b12b47e](https://github.com/faouziMohamed/fz-portfolio/commit/b12b47e50dae4905aa5fcb0cf686cbc9e70dfcfb))
* fix typescript eslint parser version not supported ([5e0093c](https://github.com/faouziMohamed/fz-portfolio/commit/5e0093c9c297f69d5a7a06abc629ce38a8f6d8b6))
* fix typescript eslint parser version not supported ([47ba2e0](https://github.com/faouziMohamed/fz-portfolio/commit/47ba2e0250c4eb84246df70b899c27bb97f11c3c))
* fix unable to locate package ([eadab31](https://github.com/faouziMohamed/fz-portfolio/commit/eadab3191333d32c2672d5964bfb455e397ced0d))
* **refactor:** moved non page tsx file to the it reserved folder ([66da745](https://github.com/faouziMohamed/fz-portfolio/commit/66da7458a5382b2f3ad0e775720ebb927ad2e6ee))
* svg fix component props ([053f8c7](https://github.com/faouziMohamed/fz-portfolio/commit/053f8c74b349c230b13f4cc00cb8d3fd336676cd))
* update intro section next/image props ([5106440](https://github.com/faouziMohamed/fz-portfolio/commit/510644044d01a7d1922e03a060e3cbfcd793b92f))
* **workaround tests:** add mock for next/image ([3e9c719](https://github.com/faouziMohamed/fz-portfolio/commit/3e9c719b75bad4dfb675286fda11c42fcc42c96c))

### [0.1.3](https://github.com/faouziMohamed/fz-resume/compare/v0.1.2...v0.1.3) (2022-03-03)

### 0.1.2 (2022-03-03)

### 0.1.1 (2022-03-03)

## 0.5.3 - 2022-02-27

### New Features

- #### Shimmer for NextImage and Skeleton
    
    Addition of shimmer & blur placeholder for NextImage, and new Skeleton Component with shimmer effect.

    https://user-images.githubusercontent.com/55318172/155867729-8c3176ad-ede4-4443-b42b-780517615e5a.mp4


- #### Support for SVGR

    You can directly import SVG like

    ```tsx
    import Vercel from '~/svg/Vercel.svg';

    <Vercel className='text-5xl' />
    ```

- #### Public Folder Path Mapping

    Easily access public folder with `~/` prefix.

- #### Tailwind CSS Prettier Sorter

    ts-nextjs-tailwind-starter now use first-party plugin `prettier-plugin-tailwindcss`

### Improvements & Bug Fixes

- #### Layout Declared Twice

    Fix issue where adding elements to Layout ends up rendering them twice

- #### ESLint Curly Brace Rule

    New autofixable rule
    
    ```tsx
    props={'hi'}

    will become

    props='hi'
    ```

## 0.5.2 - 2021-12-30

### New Features

- #### New Component: PrimaryLink

    Add a link component with accent color on top of UnstyledLink.

### Improvements & Bug Fixes

- #### Unused Import ESlint Autofix

    Unused import will automatically be removed by the ESlint autofix.

- #### Renamed CustomLink to UnderlineLink

    This is to compensate the new PrimaryLink component

- #### Primary Button & ButtonLink Shade

    The shade of the button is now using the `500` instead of `400`.


## 0.5.1 - 2021-12-26

### New Features

- #### New Snippets Wrap: clsx and fragment `<></>`
    
    You can select text then wrap it with clsx or React.Fragment shorthand.
    
    https://user-images.githubusercontent.com/55318172/147401848-3db5dba0-ef71-4f25-9f47-c7908beba69e.mp4


## 0.5.0 - 2021-12-21

### New Features

- #### Expansion Pack
    You can easily add expansion such as React Hook Form + Components, Storybook, and more just using a single command line.

    https://user-images.githubusercontent.com/55318172/146631994-e1cac137-1664-4cfe-950b-a96decc1eaa6.mp4

    Check out the [expansion pack repository](https://github.com/theodorusclarence/expansion-pack) for the commands

### Improvements & Bug Fixes

- #### Can't Use Layout Fill on NextImage

    Using layout fill will make the width and height optional

- #### Vertically center Button & ButtonLink

    Adds `items-center` to make the button vertically centered


## 0.4.1 - 2021-12-12

### New Features

- #### Tailwind CSS v3
    
    The color palette configuration is also updated accordingly. 

## 0.4.0 - 2021-12-02

### New Features

- #### Button & ButtonLink Variants

    - New Variant: **Outline** and **Ghost**, you can also add `isDarkBg` prop if you are using these variants with dark background.
    - Animated Underline style on **Primary**, **Dark**, **Light** is removed
    - Added `ring-primary-500` on `focus-visible`

    ![Button Variants](https://user-images.githubusercontent.com/55318172/144385213-632b3e1f-9a0e-4184-82e0-7905ee3318b4.gif)

- #### ArrowLink


    Adds an animated arrow, this component is Polymorphic, the default element is `CustomLink`, you can extend it with `as` prop.

    ```tsx
    <ArrowLink
      as={ButtonLink}
      variant='light'
      href='/'
    >
      Register now
    </ArrowLink>
    ```

    ![Arrow Link Feature](https://user-images.githubusercontent.com/55318172/144385991-f3521d52-e0a8-49c5-8e87-409231fdd5b6.gif)

- #### Change default theme to white

    | ![Home Page](https://user-images.githubusercontent.com/55318172/144386763-00e6c3fd-ee2e-4c9e-87f8-18b036bdc2e1.png) | ![404](https://user-images.githubusercontent.com/55318172/144386764-0e4b4fb0-35a8-4725-a795-f998b06543a1.png) |
    | - | - |

### Improvements & Bug Fixes

- #### Split Next.js Link Props Type

    Now, to add props to Next.js `<Link>` component, you can use `nextLinkProps`.

    ```tsx
    <UnstyledLink 
      href='/'
      nextLinkProps={{
        shallow: true,
      }}
    >
      Link
    </UnstyledLink>
    ```

    The rest of `<a>` props can be directly added as a prop.

- #### Add Motion Safe to Animations

    All components animation respect user preference about motion.

## 0.3.0 - 2021-12-01

### New Features

- #### Create Branch & Auto Resolve Issue Actions

    | ![Create Branch Actions](https://user-images.githubusercontent.com/55318172/144379834-8c3e4d4f-d584-4253-9ad8-b9f1d468ed01.gif) <br> Auto Create Branch | ![Auto Resolve](https://user-images.githubusercontent.com/55318172/144382044-0132e755-9cd5-4805-a756-4086f67b3282.gif) <br> Auto Resolve  |
    | :--: | :--: |

    You have to install the app for your organization/account/repository from the [GitHub Marketplace](https://github.com/marketplace/create-issue-branch) for this to work.

    The branch will be created on **assign** with format `i${number}-${issue_title_lowercase}`.

- #### Custom Tailwind CSS Class Sorter

    Classes are sorted using [prettier-plugin-sort-class-names](https://github.com/PutziSan/prettier-plugin-sort-class-names) with custom class order on [this file](https://github.com/theodorusclarence/ts-nextjs-tailwind-starter/blob/main/prettier-plugin-sort-class-names-order) and custom variant order on [prettierrc](https://github.com/theodorusclarence/ts-nextjs-tailwind-starter/blob/main/.prettierrc.js)

    With this plugin, we can now safely check the order of the classes using the preconfigured lint action.

## 0.2.0 - 2021-11-10

### New Features

- #### Jest

    Jest is configured and will be run every push on Github Actions

- #### Lint Github Action

    1. **ESLint** - will fail if there are any warning and error.
    2. **Type Check** - will fail on `tsc` error.
    3. **Prettier Check** - will fail if there are any formatting error.
    4. **Test** - will fail if there are any test failure.

## 0.1.0

### New Features

- #### Installed Packages

    1. [clsx](https://bundlephobia.com/package/clsx@latest), utility for constructing `className` strings conditionally.
    2. [react-icons](https://bundlephobia.com/package/react-icons@latest), svg react icons of popular icon packs.

- #### UnstyledLink Component

    Used as a component for Next.js Link. Will render out Next/Link if the href started with `/` or `#`, else will render an `a` tag with `target='_blank'`. Also add a cursor style for outside links

- #### CustomLink Component

    ![customlink](https://user-images.githubusercontent.com/55318172/129183546-4e8c2059-0493-4459-a1e9-755fbd32fe39.gif)


- #### Absolute Import

    You can import without using relative path

    ```tsx
    import Nav from '../../../components/Nav';

    simplified to

    import Nav from '@/components/Nav';
    ```

- #### Seo Component

    Configure the default in `src/components/Seo.tsx`. If you want to use the default, just add `<Seo />` on top of your page.

    You can also customize it per page by overriding the title, description as props

    ```tsx
    <Seo title='Next.js Tailwind Starter' description='your description' />
    ```

    or if you want to still keep the title like `%s | Next.js Tailwind Starter`, you can use `templateTitle` props.

- #### Custom 404 Page

![404](https://user-images.githubusercontent.com/55318172/129184274-d90631f2-6688-4ed2-bef2-a4d018a4863c.gif)

- #### Workspace Snippets

Snippets such as React import, useState, useEffect, React Component. [View more](/.vscode/typescriptreact.code-snippets)

- #### Husky, Prettier, Lint, and Commitlint Configured

    3 Husky hooks including:

    1. pre-commit, running `next lint` and format the code using prettier
    2. commit-msg, running commitlint to ensure the use of [Conventional Commit](https://theodorusclarence.com/library/conventional-commit-readme) for commit messages
    3. post-merge, running `yarn` every `git pull` or after merge to ensure all new packages are installed and ready to go

- #### Default Favicon Declaration

    Use [Favicon Generator](https://www.favicon-generator.org/) and then overwrite the files in `/public/favicon`

- #### Default Tailwind CSS Base Styles

    There are default styles for responsive heading sizes, and `.layout` to support a max-width for larger screen size. Find more about it on [my blog post](https://theodorusclarence.com/blog/tailwindcss-best-practice#1-using-layout-class-or-container)

- #### Open Graph Generator

    | ![image](https://user-images.githubusercontent.com/55318172/137617070-806a0509-84bd-4cae-a900-2ab17e418d8d.png) | ![image](https://user-images.githubusercontent.com/55318172/137617090-c24f684a-bfe5-41b6-8ba9-fa99bae5cadf.png) |
    | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |

    Open Graph is generated using [og.thcl.dev](https://og.thcl.dev), but please fork and self-host if your website is going to have a lot of traffic.

    Check out the [repository](https://github.com/theodorusclarence/og) to see the API parameters.

- #### Preloaded & Self Hosted Inter Fonts

    Inter fonts is a variable fonts that is self hosted and preloaded.

## Snippets

This starter is equipped with workspace-snippets, it is encouraged to use it, especially the `np` and `rc`

### Next.js Page

File inside `src/pages` will be the webpage route, there are 2 things that need to be added in Next.js page:

1. Seo component
2. Layout class to give constraint to viewport width. [Read more about layout class](https://theodorusclarence.com/blog/tailwindcss-best-practice#1-using-layout-class-or-container).

Snippets: `np`

```tsx
import * as React from 'react';
import Seo from '@/components/Seo';
export default function TestPage() {
  return (
    <>
      <Seo templateTitle='Test' />
      <main>
        <section className=''>
          <div className='layout'></div>
        </section>
      </main>
    </>
  );
}
```

### React Components

To make a new component, It is encouraged to use `export default function`. Because when we need to rename it, we only need to do it once.

Snippets: `rc`

```tsx
import * as React from 'react';
export default function Component() {
  return <div></div>;
}
```

#### Import React

Snippets: `ir`

```tsx
import * as React from 'react';
```

#### Import Next Image

Snippets: `imimg`

```tsx
import Image from 'next/image';
```

#### Import Next Link

Snippets: `iml`

```tsx
import Link from 'next/link';
```

#### useState Hook

Snippets: `us`

```tsx
const [state, setState] = React.useState(initialState);
```

#### useEffect Hook

Snippets: `uf`

```tsx
React.useEffect(() => {}, []);
```

#### useReducer Hook

Snippets: `ur`

```tsx
const [state, dispatch] = React.useReducer(someReducer, {});
```

#### useRef Hook

Snippets: `urf`

```tsx
const someRef = React.useRef();
```

#### Region Comment

It is really useful when we need to group code. It is also collapsible in VSCode

Snippets: `reg`

```tsx
//#region  //*============== FORM SUBMIT
//#endregion  //*============== FORM SUBMIT
```

You should also use [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) extension.
