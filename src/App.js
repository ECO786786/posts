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

  // to change pposts array
  // posts = [a,b,b,c]; //

  // setPostss([..,,..])

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

  const onSortChange = (event) => {
    const sortBy = event.target.value;
    setFilter({ ...filter, sortBy });
  };

  const onSortLikes = (event) => {
    const sortBy = event.target.value;
    setFilterLikes({ ...filterLikes, sortBy });
  };

  useEffect(() => {
    // extract filter values into variables
    const { username, sortBy } = filter;

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

      // filter by lineId
      // cuisedFiltered = cruises.filter(
      //   (cruise) => cruise.linedId === "whaterver"
      // );

      // cosnt[(isVIP, setIsVip)] = iuseState();

      // {
      //   isVIP && <input type="text" required value={vipEmailAddress} />;
      // }

      // if (isVIP && vipEmailAddress !== "") {
      //   // process the vip email here
      // } else {
      //   // email 2
      // }
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

    // 1. posts in the state: posts[]
    // 2. copy it postsCopy[]
    // 3. filter it by username: filteredByUsername[]
    // 4. sort by newest or oldest: sortedPosts[]
    // 5. update the state with sortedPosts

    // update the state
    // setFilteredPosts(sortedPosts);

    const { sortBy: sortByLikes } = filterLikes;
    const sortLikes = [...filteredByUsername].sort((a, b) => {
      if (sortByLikes === "mostliked") {
        return b.likes - a.likes;
      } else if (sortByLikes === "leastliked") {
        return a.likes - b.likes;
      }
      return 0;
    });

    setFilteredPosts(sortLikes);
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
            {/* <div>Sortby value in state: {filter.sortBy}</div> */}
            <select value={filter.sortBy} onChange={onSortChange}>
              <option value="newest">newest</option>
              <option value="oldest">oldest</option>
            </select>
          </div>

          <div>
            <select value={filterLikes.sortBy} onChange={onSortLikes}>
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
