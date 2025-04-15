import { useState } from "react";

const MAX_LENGTH = 280;

// post.utilty.js

// date.util.js

// DRY: dont repeat yourself

const createPost = (username, content) => {
  return {
    id: Date.now(),
    username: username,
    content: content,
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    likes: 0,
  };
};

export function PostForm({ onAddPost }) {
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // event.target[0]

    if (content === "" || content.length > 280) {
      alert("Please enter text");
    } else {
      const newPost = createPost(username, content);
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
        value={username}
        onChange={(inputEvent) => setUsername(inputEvent.target.value)}
      />
      <textarea
        value={content}
        onChange={(textareaEvent) => setContent(textareaEvent.target.value)}
        maxLength={MAX_LENGTH}
        placeholder="What's happening?"
        rows={3}
      />
      <div>
        <span>
          {content.length}/{MAX_LENGTH}
        </span>
        <button type="submit" disabled={!content.trim()}>
          Post
        </button>
      </div>
    </form>
  );
}
