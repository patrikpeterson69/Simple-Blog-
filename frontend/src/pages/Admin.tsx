import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Post, CreatePostDto } from '../types';
import PostForm from '../components/PostForm';

export default function Admin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    setLoading(true);
    api.getPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = async (data: CreatePostDto) => {
    await api.createPost(data);
    setShowForm(false);
    fetchPosts();
  };

  const handleUpdate = async (data: CreatePostDto) => {
    if (!editing) return;
    await api.updatePost(editing.id, data);
    setEditing(null);
    fetchPosts();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Är du säker på att du vill ta bort inlägget?')) return;
    await api.deletePost(id);
    fetchPosts();
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin</h1>
        <button
          onClick={() => { setShowForm(true); setEditing(null); }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          + Nytt inlägg
        </button>
      </div>

      {(showForm && !editing) && (
        <div className="mb-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Skapa inlägg</h2>
          <PostForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Laddar...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">Inga inlägg än.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border border-gray-200 rounded-xl p-5">
              {editing?.id === post.id ? (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Redigera inlägg</h2>
                  <PostForm post={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />
                </>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-gray-900">{post.title}</h2>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(post.publishedAt).toLocaleDateString('sv-SE')} &middot;{' '}
                      <span className={post.isPublished ? 'text-green-600' : 'text-yellow-500'}>
                        {post.isPublished ? 'Publicerad' : 'Utkast'}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => { setEditing(post); setShowForm(false); }}
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      Redigera
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Ta bort
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
