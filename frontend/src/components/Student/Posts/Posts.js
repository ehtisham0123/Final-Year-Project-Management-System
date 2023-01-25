import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Posts() {
  const user_id = reactLocalStorage.get("user_id");
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [posts, setPosts] = useState([]);

    useEffect(() => {
    let getUserData = async () => {
      setLoading(true);

      await axios
        .get(`http://localhost:5000/student/posts`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setPosts(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, [reloading]);


  return (
    <>
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4" noWrap component="div">
        Posts
      </Typography>
    </Box>
      <ul className="posts">
        {posts[0] ? (
          posts.map((post) => (
          post.admin ? ( 
            <li>
              <div className="posts-body">
                <div className="posts-header">
                  <div>
                  <span className="userimage">
                    <img
                      src={"/uploads/" + post.admin.avatar}
                      alt={post.admin.name}
                    />
                  </span>
                  <span className="username">
                    {post.admin.firstname} {post.admin.lastname}
                  </span>
                  </div>
                  <span className="pull-right text-danger text-bold">
                    Admin
                  </span>
                </div>
                <div className="posts-content">
                  <h4 className="template-title">{post.name}</h4>
                  <p>{post.details}</p>
                </div>
              </div>
            </li>
            ) :
            (
           <li>
              <div className="posts-body">
                <div className="posts-header">
                  <div>
                  <span className="userimage">
                    <img
                      src={"/uploads/" + post.teacher.avatar}
                      alt={post.teacher.name}
                    />
                  </span>
                  <span className="username">
                    {post.teacher.firstname} {post.teacher.lastname}
                  </span>
                  </div>
                  <span className="pull-right text-danger text-bold">
                    Teacher
                  </span>
                </div>
                <div className="posts-content">
                  <h4 className="template-title">{post.name}</h4>
                  <p>{post.details}</p>
                </div>
              </div>
            </li>
            )

          ))
        ) : (
          <li>
            <div class="timeline-body ml-5">No Posts...</div>
          </li>
        )}
      </ul> 
  </>
  );
}

export default Posts;
