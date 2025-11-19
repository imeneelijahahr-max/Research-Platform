export interface Article {
  id: string;
  title: string;
  authors: string;
  date: string;
  content: string;
  views: number;
}

export interface UserContextType {
  isOwner: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

export type ViewState = 'landing' | 'library';