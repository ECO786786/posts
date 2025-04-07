export const PostList = ({ posts, onLike, onDelete, onEdit }) => {
  console.log(posts);

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post">
            <h3>{post.username}</h3>
            <p>{post.content}</p>
            <small>{new Date(post.timestamp).toLocaleString()}</small>
            <div>
              <button onClick={() => onLike(post.id)}>
                Like ({post.likes})
              </button>
              <button onClick={() => onDelete(post.id)}>Delete</button>
              <button onClick={() => onEdit(post.content)}>Edit</button>
            </div>
          </div>
        ))
      ) : (
        <p>No posts found for that username</p>
      )}
    </div>
  );
};
