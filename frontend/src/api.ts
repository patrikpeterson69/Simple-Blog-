import type { Post, CreatePostDto, UpdatePostDto } from './types';

const BASE = '/api/posts';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  getPosts: () => request<Post[]>(BASE),
  getPost: (slug: string) => request<Post>(`${BASE}/${slug}`),
  createPost: (data: CreatePostDto) =>
    request<Post>(BASE, { method: 'POST', body: JSON.stringify(data) }),
  updatePost: (id: number, data: UpdatePostDto) =>
    request<Post>(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePost: (id: number) =>
    request<void>(`${BASE}/${id}`, { method: 'DELETE' }),
};
