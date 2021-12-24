export interface IUserPortfolio {
  about: string;
  address: string;
  description: string;
  phone?: number;
  firstName: string;
  portfolioName: string;
  profile: string;
  inTouch: string;
  email: string;
  template: string;
  userId: string;
  url?: string;
}

export interface IFileSHA {
  'bundle.js': string;
  'credentials.json': string;
  'index.html': string;
  portfolioImage?: string;
  'resume.pdf'?: string;
}
