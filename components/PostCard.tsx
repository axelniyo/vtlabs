
import React from 'react';
import { Post, PostCategory } from '../types';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post;
}

const categoryColorMap: { [key in PostCategory]: string } = {
  [PostCategory.Announcement]: 'bg-blue-500',
  [PostCategory.Project]: 'bg-green-500',
  [PostCategory.Training]: 'bg-purple-500',
  [PostCategory.InteriorDesign]: 'bg-pink-500',
};

const categoryLinkMap: { [key in PostCategory]?: string } = {
  [PostCategory.Project]: '/projects',
  [PostCategory.Training]: '/training-center',
  [PostCategory.InteriorDesign]: '/vtl-craft',
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const linkTo = categoryLinkMap[post.category];
  // Add a fallback image URL in case post.imageUrl is missing or empty
  const imageUrl = post.imageUrl || `https://picsum.photos/seed/${post.id}/600/400`;

  const cardContent = (
    // Ensure the inner div takes full height of the link container
    <div className="bg-vt-surface rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col h-full">
      <div className="relative">
        <img className="w-full h-36 object-cover" src={imageUrl} alt={post.title} />
        <span className={`absolute top-2 right-2 text-white text-xs font-semibold px-2 py-1 rounded-full ${categoryColorMap[post.category]}`}>
          {post.category}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-vt-text-light mb-2">{post.title}</h3>
        <p className="text-vt-text-secondary text-sm flex-grow">{post.description}</p>
        <div className="mt-4 text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );

  // If a link is associated with the category, wrap the card in a Link component.
  if (linkTo) {
    return <Link to={linkTo} className="block h-full">{cardContent}</Link>;
  }

  // Otherwise, just render the card content.
  return cardContent;
};

export default PostCard;
