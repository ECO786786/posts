import { useState } from "react";

const MAX_LENGTH = 280;

export const PostList = ({ posts, onLike, onDelete, onEdit }) => {
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const handleEditClick = (post) => {
    setEditingPostId(post.id);
    setEditedContent(post.content);
  };

  const handleSaveClick = (postId) => {
    onEdit(postId, editedContent);
    setEditingPostId(null);
  };

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post">
            <h3>{post.username}</h3>
            {editingPostId === post.id ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={3}
                maxLength={MAX_LENGTH}
                placeholder="What's happening?"
              />
            ) : (
              <p>{post.content}</p>
            )}
            {editingPostId === post.id ? (
              <small>
                {new Date(Date.now() - 15 * 60 * 1000).toLocaleString()}
              </small>
            ) : (
              <small>{new Date(post.timestamp).toLocaleString()}</small>
            )}

            <div>
              <button onClick={() => onLike(post.id)}>
                Like ({post.likes})
              </button>

              <button onClick={() => onDelete(post.id)}>Delete</button>

              {editingPostId === post.id ? (
                <button onClick={() => handleSaveClick(post.id)}>Save</button>
              ) : (
                <button onClick={() => handleEditClick(post)}>Edit</button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No posts found for that username</p>
      )}
    </div>
  );
};
