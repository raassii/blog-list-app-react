import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { toast } from "react-toastify";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    isPending,
    error,
  } = useFetch("http://localhost:8000/blogs/" + id);
  const navigate = useNavigate();

  const handleClick = () => {
    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
      toast("Blog was deleted successfully!", {
        className: "delete-alert",
        draggable: false,
        position: "top-center",
        autoClose: 6000,
        theme: "dark",
      });
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div className="blog-body">{blog.body}</div>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
