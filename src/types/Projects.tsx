export interface ProjectProps {
    projects: {
      id: string
      title: string
      siteUrl: string
      githubUrl: string
      description: string
      image: {
        url: string;
        height?: number | null;
        width?: number | null;
      }
      langs: {
        id: string;
        name: string;
        abbreviation: string;
        langUrl: {
          url: string;
        }
      }[]
    }[]
  }