
import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const categoryColorMap = {
  Announcement: 'bg-blue-500',
  Project: 'bg-green-500',
  Training: 'bg-purple-500',
  'Interior Design': 'bg-pink-500',
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={post.imageUrl} alt={post.title} />
        <span className={`absolute top-2 right-2 text-white text-xs font-semibold px-2 py-1 rounded-full ${categoryColorMap[post.category]}`}>
          {post.category}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-vt-dark-gray mb-2">{post.title}</h3>
        <p className="text-vt-gray text-sm flex-grow">{post.description}</p>
        <div className="mt-4 text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
