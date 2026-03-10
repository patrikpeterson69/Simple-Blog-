import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import type { Post } from '../types';

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    api.getPost(slug)
      .then(setPost)
      .catch(() => setError('Inlägget hittades inte.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-center py-20 text-gray-500">Laddar...</p>;
  if (error || !post) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Link to="/" className="text-sm text-indigo-600 hover:underline mb-6 inline-block">
        ← Tillbaka
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-8">
        {new Date(post.publishedAt).toLocaleDateString('sv-SE')}
      </p>
      <div className="prose prose-gray max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
        {post.content}
      </div>
    </div>
  );
}
