import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import type { Post } from '../types';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getPosts()
      .then(setPosts)
      .catch(() => setError('Kunde inte hämta inlägg.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-20 text-gray-500">Laddar...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Inlägg</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">Inga inlägg ännu.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.id} className="border-b border-gray-100 pb-6">
              <Link to={`/posts/${post.slug}`} className="group">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(post.publishedAt).toLocaleDateString('sv-SE')}
                </p>
                <p className="text-gray-600 mt-2">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
