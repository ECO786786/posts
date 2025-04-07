import { useState, useEffect } from "react";
import { PostList } from "./PostList";
import { PostForm } from "./PostForm";

const initialPosts = [
  {
    id: 1,
    username: "a",
    content: "Learning React hooks!",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    likes: 5,
  },
  {
    id: 2,
    username: "b",
    content: "This dashboard is coming along nicely!",
    timestamp: new Date(),
    likes: 10,
  },
];

export default function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [filter, setFilter] = useState({ username: "", sortBy: "newest" });
  const [filterLikes, setFilterLikes] = useState({
    username: "",
    sortBy: "mostliked",
  });
  const [loading, setLoading] = useState(true);

  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleSubmit = (post) => {
    setPosts((posts) => [...posts, post]);
  };

  const handleDelete = (postId) => {
    setPosts((posts) => posts.filter((post) => post.id !== postId));
  };

  const handleEdit = (postContent) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.content === postContent ? { ...post, content: postContent } : post
      )
    );
  };

  const onSearchInputChange = (event) => {
    const username = event.target.value;
    setFilter({ ...filter, username });
  };

  const onSortChange = (event) => {
    const sortBy = event.target.value;
    setFilter({ ...filter, sortBy });
  };

  const onSortLikes = (event) => {
    const sortBy = event.target.value;
    setFilterLikes({ ...filter, sortBy });
  };

  useEffect(() => {
    // extract filter values into variables
    const { username, sortBy } = filter;

    // copy the original posts array
    const postsCopy = [...posts];

    let filteredByUsername;

    if (username.trim() !== "") {
      // Filter posts by username if username is provided
      filteredByUsername = postsCopy.filter((post) =>
        post.username.toLowerCase().includes(username.toLowerCase())
      );
    } else if (username.trim() !== username) {
      filteredByUsername = [];
    } else {
      // do not filter posts if username is not provided
      filteredByUsername = postsCopy;
    }

    // sort posts based on the sortBy filter
    const sortedPosts = [...filteredByUsername].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } else if (sortBy === "oldest") {
        return new Date(a.timestamp) - new Date(b.timestamp);
      }
      return 0;
    });

    const sortLikes = [...filteredByUsername].sort((a, b) => {
      console.log(a, b, "ab");
      if (sortBy === "mostliked") {
        return b.likes - a.likes;
      } else if (sortBy === "leastliked") {
        return a.likes - b.likes;
      }
      return 0;
    });

    setFilteredPosts(sortedPosts);
    setFilterLikes(sortLikes);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [filter, posts]);

  return (
    <div className="App">
      <h1>Social Dashboard</h1>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="filter posts by username"
            onChange={onSearchInputChange}
            value={filter.username}
          />

          <div>
            {/* <div>Sortby value in state: {filter.sortBy}</div> */}
            <select value={filter.sortBy} onChange={onSortChange}>
              <option value="newest">newest</option>
              <option value="oldest">oldest</option>
            </select>
          </div>

          <div>
            <select value={filterLikes.sortBy} onChange={onSortLikes}>
              {(console.log(filterLikes.sortBy), "sort by")}
              <option value="mostliked">most liked</option>
              <option value="leastliked">least liked</option>
            </select>
          </div>

          <PostList
            posts={filteredPosts}
            onLike={handleLike}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />

          <PostForm onAddPost={handleSubmit} />
        </>
      )}
    </div>
  );
}
