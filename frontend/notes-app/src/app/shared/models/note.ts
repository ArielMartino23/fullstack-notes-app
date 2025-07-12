export interface Note {
  id?: number;
  title: string;
  content: string;
  archived: boolean;
  category?: string;
}