export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  video?: string;
  category: string;
  publishedAt: string;
  readTime: number;
  author?: string;
  tags?: string[];
}
