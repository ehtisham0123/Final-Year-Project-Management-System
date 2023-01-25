import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Posts() {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [postId, setPostId] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let getUserData = async () => {
      setLoading(true);

      await axios
        .get(`http://localhost:5000/admin/posts`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setPosts(response.data.result);
            console.log(response.data.result);

            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      let getSessionData = async () => {
        setLoading(true);
        await axios
          .get(`http://localhost:5000/admin/sessions`, {
            headers: {
              token: token,
            },
          })
          .then((response) => {
            if (response.data) {
              setSessions(response.data.result);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getSessionData();
    };
    getUserData();
  }, [reloading]);

  const setNewPosts = async (e) => {
    if (e.target.value == "All") {
      setReloading(!reloading);
    } else {
      let data = e.target.value.split("|");
      let session = data[0];
      let discipline = data[1];
      setLoading(true);
      await axios
        .get(`http://localhost:5000/admin/posts/search`, {
          headers: {
            token: token,
          },
          params: {
            session: session,
            discipline: discipline,
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
    }
  };

  const deletePost = async (id) => {
    await axios
      .delete(`http://localhost:5000/admin/posts/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        const newPosts = posts.filter((post) => post.id !== id);
        setPosts(newPosts);
      });
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <label>
          <select className="form-control ml-3" onChange={setNewPosts}>
            <option value="All">ALL</option>
            {sessions.map((session) => (
              <>
                <option value={`${session.name}|Computer Science`}>
                  Computer Science {session.name}
                </option>
                <option value={`${session.name}|Software Engineering`}>
                  Software Engineering {session.name}
                </option>
              </>
            ))}
          </select>
        </label>
        <Link
          to={`/admin/posts/create`}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <Button variant="contained" startIcon={<AddIcon />}>
            Add New Post
          </Button>
        </Link>
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
                <div className="posts-footer">
                  <Link to={`/admin/posts/edit/${post.id}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<EditIcon />}
                    style={{ background: "orange" }}
                  >
                    Edit
                  </Button>
                  </Link>{" "}
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      setPostId(post.id);
                      setOpen(true);
                    }}
                    style={{ background: "red" }}
                  >
                    Delete
                  </Button>
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
                <div className="posts-footer">

                  <Link to={`/admin/posts/edit/${post.id}`}  style={{ color: "inherit", textDecoration: "inherit" }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<EditIcon />}
                    style={{ background: "orange" }}
                  >
                    Edit
                  </Button>
                  </Link>{" "}
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<DeleteIcon />}
                   onClick={() => {
                      setPostId(post.id);
                      setOpen(true);
                  }}
                    style={{ background: "red" }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
            )

          ))
        ) : (
          <li>
            <div class="timeline-body">No Posts...</div>
          </li>
        )}
      </ul>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            When posts are deleted they are completely removed, and they can not
            be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              deletePost(postId);
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Posts;
