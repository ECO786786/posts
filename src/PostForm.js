import { useState } from "react";

export function PostForm({ onAddPost }) {
  const [content, setContent] = useState("");
  const [usename, setUsername] = useState("");
  const maxLength = 280;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    if (e.target.value === "" || e.target[0].value.length > 280) {
      alert("Please enter text");
    } else {
      const newPost = {
        id: Date.now(),
        username: usename,
        content: content,
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        likes: 0,
      };
      onAddPost(newPost);
      setContent("");
      setUsername("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="username"
        value={usename}
        onChange={(e) => setUsername(e.target.value)}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={maxLength}
        placeholder="What's happening?"
        rows={3}
      />
      <div>
        <span>
          {content.length}/{maxLength}
        </span>
        <button type="submit" disabled={!content.trim()}>
          Post
        </button>
      </div>
    </form>
  );
}
