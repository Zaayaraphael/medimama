import React, { useState } from "react";
import { FaHome, FaUsers, FaBell, FaUserMd, FaBook } from "react-icons/fa";
import { motion } from "framer-motion";

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Sarah (First-time Mom)",
      role: "Mother",
      content: "Is it safe to drink ginger tea in the 2nd trimester?",
      time: "2h",
      likes: 24,
      comments: 10,
    },
    {
      id: 2,
      user: "Dr. Musa (Obstetrician)",
      role: "Doctor",
      content: "@Sarah yes, ginger tea is safe but take in moderation.",
      time: "1h",
      likes: 15,
      comments: 5,
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (!newPost) return;
    const post = {
      id: posts.length + 1,
      user: "You (Community Member)",
      role: "Mother",
      content: newPost,
      time: "Just now",
      likes: 0,
      comments: 0,
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <motion.div 
    initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.4 }}
    className="max-w-2xl mx-auto p-4">
      {/* Header */}
      <h1 className="text-2xl font-bold text-green-700 text-center mb-6">
        Medimama Community
      </h1>

      {/* Create Post */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your experience or ask a question..."
          className="w-full p-3 border rounded-lg"
        />
        <button
          onClick={handlePost}
          className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Post
        </button>
      </div>

      {/* Feed */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white p-4 rounded-lg shadow mb-4 border"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-green-800">{post.user}</h2>
            <span className="text-gray-500 text-sm">{post.time}</span>
          </div>
          <p className="mt-2 text-gray-700">{post.content}</p>
          <div className="flex justify-between mt-3 text-sm text-gray-600">
            <span>❤️ {post.likes} Likes</span>
            <span>💬 {post.comments} Comments</span>
          </div>
        </div>
      ))}

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-3">
        <button className="flex flex-col items-center text-green-700">
          <FaHome /> <span className="text-xs">Feed</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <FaBook /> <span className="text-xs">Topics</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <FaUserMd /> <span className="text-xs">Experts</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <FaUsers /> <span className="text-xs">Groups</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <FaBell /> <span className="text-xs">Notify</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Community;
