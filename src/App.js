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
  const [filter, setFilter] = useState({
    username: "",
    sortByTime: "",
    sortByLikes: "",
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

  const handleEdit = (postId, newContent) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, content: newContent } : post
      )
    );
  };

  const onSearchInputChange = (event) => {
    const username = event.target.value;
    setFilter({ ...filter, username });
  };

  const onSortTimeChange = (event) => {
    const sortByTime = event.target.value;
    setFilter({ ...filter, sortByTime });
  };

  const onSortLikesChange = (event) => {
    const sortByLikes = event.target.value;
    setFilter({ ...filter, sortByLikes });
  };

  useEffect(() => {
    // extract filter values into variables
    const { username, sortByTime, sortByLikes } = filter;

    // copy the original posts array

    // 1. create a copy of the data stored in the state
    const postsCopy = [...posts];

    // 2. work with the copy, change, update, delete, remote, filter, etc.

    // 3. let React know about this change, by calling the setStateHandlers

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

    // 1. posts in the state: posts[]
    // 2. copy it postsCopy[]
    // 3. filter it by username: filteredByUsername[]
    // 4. sort by newest or oldest: sortedPosts[]
    // 5. update the state with sortedPosts

    // update the state
    // setFilteredPosts(sortedPosts);

    if (sortByTime === "newest") {
      filteredByUsername.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
    } else if (sortByTime === "oldest") {
      filteredByUsername.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
    }

    // Then sort by likes
    if (sortByLikes === "mostliked") {
      filteredByUsername.sort((a, b) => b.likes - a.likes);
    } else if (sortByLikes === "leastliked") {
      filteredByUsername.sort((a, b) => a.likes - b.likes);
    }

    setFilteredPosts(filteredByUsername);

    // setFilterLikes(sortLikes);

    // 1. posts in the state: posts[]
    // 2. copy it postsCopy[]
    // 3. filter it by username: filteredByUsername[]
    // 4. sort the posts by likes: sortLikes[]
    // 5. update the state with sortLikes[]

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
            <select value={filter.sortByTime} onChange={onSortTimeChange}>
              <option value="newest">newest</option>
              <option value="oldest">oldest</option>
            </select>
          </div>

          <div>
            <select value={filter.sortByLikes} onChange={onSortLikesChange}>
              <option value="mostliked">most liked</option>
              <option value="leastliked">least liked</option>
            </select>
          </div>

          {/* <SortByLikes /> */}

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
