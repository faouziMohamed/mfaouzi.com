export const GUESTBOOK_PAGE = '/guestbook';
export const getGuestbookThreadPage = (commentId: string) =>
  `${GUESTBOOK_PAGE}/${commentId}`;
export const HOME_PAGE = '/';
export const HOME_ABOUT_PAGE = `${HOME_PAGE}#about`;
export const HOME_SKILLS_PAGE = `${HOME_PAGE}#skills`;
export const HOME_PROJECTS_PAGE = `${HOME_PAGE}#projects`;
export const HOME_CONTACTS_PAGE = `${HOME_PAGE}#contacts`;
export const RESUME_PAGE = '/resume';
