import { allPosts } from "./blog/posts";

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

export const blogPosts: BlogPost[] = allPosts;

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogCategories(): string[] {
  return [...new Set(blogPosts.map((p) => p.category))];
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return blogPosts.slice(0, limit);

  return blogPosts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      // Prioritize same category
      const aMatch = a.category === currentPost.category ? 1 : 0;
      const bMatch = b.category === currentPost.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, limit);
}
