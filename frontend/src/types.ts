export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  isPublished: boolean;
}

export interface CreatePostDto {
  title: string;
  content: string;
  excerpt: string;
  isPublished: boolean;
}

export interface UpdatePostDto extends CreatePostDto {}
