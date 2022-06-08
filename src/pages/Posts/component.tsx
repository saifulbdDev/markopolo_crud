/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  addPost,
  getPosts,
  editPost,
  deletePost,
  removeStatus,
} from "../../store/action/userAction";
import Modal from "../../components/Modal";
const columns = [
  { name: "Id", value: "id" },
  {
    name: "Title",
    value: "title",
    format: (value: string | any[]) => (value ? value.slice(0, 20) : ""),
  },

  {
    name: "Description",
    value: "body",
    format: (value: string | any[]) => (value ? value.slice(0, 50) : ""),
  },
  {
    name: "Action",
    value: "action",
    action: true,
  },
];
const Posts = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState(false);

  const [state, setState] = React.useState({
    title: "",
    body: "",
    userId: 1,
  });
  const [editstate, setEditState] = React.useState({
    title: "",
    body: "",
    id: "",
    userId: "",
  } as any);
  const enabled = state.title.length > 0 && state.body.length > 0;

  const posts: any = useSelector(
    (state: any) => state?.users?.posts,
    shallowEqual
  );
  const postStatus = useSelector((state: any) => state.users?.status);
  const handleChange = (evt: { target: { value: any; name: any } }) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  const handleEditChange = (evt: { target: { value: any; name: any } }) => {
    const value = evt.target.value;

    setEditState({
      ...editstate,
      [evt.target.name]: value,
    });
  };

  let statusMasage;
  let statusClass;
  if (postStatus === "add") {
    statusMasage = "Successfully Add New Item";
    statusClass = "alert alert-success";
  } else if (postStatus === "remove") {
    statusMasage = "Successfully Delete Item";
    statusClass = "alert alert-danger";
  } else if (postStatus === "edit") {
    statusMasage = "Successfully Update Item";
    statusClass = "alert alert-success";
  } else {
    statusClass = "hide";
  }

  const editHandle = (value: any) => {
    setEditState(value);
    setEditShow(true);
  };

  const deleteHandle = (value: number) => {
    dispatch(deletePost(value) as any);
  };
  const removeStatusPost = () => {
    dispatch(removeStatus() as any);
  };
  const addNewPost = () => {
    dispatch(addPost(state) as any);
  };
  const onEditPost = () => {
    dispatch(editPost(editstate) as any);
  };
  const close = () => {
    setShow(false);
    setState({
      ...state,
      title: "",
      body: "",
    });
  };
  const closeEdit = () => {
    setEditShow(false);

    setEditState({
      ...state,
      title: "",
      body: "",
      id: "",
      userId: "",
    });
  };

  useEffect(() => {
    if (
      postStatus === "remove" ||
      postStatus === "add" ||
      postStatus === "edit"
    ) {
      if (postStatus === "add") {
        close();
      }
      if (postStatus === "edit") {
        closeEdit();
      }
      const timer = setTimeout(() => {
        removeStatusPost();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [postStatus]);
  useEffect(() => {
    dispatch(getPosts() as any);
  }, []);

  return (
    <section className="articlesList-section">
      <div className="container">
        <div className="post_add row align-items-center">
          <div className="col-md-3">
            <h2>Posts List</h2>
          </div>
          <div className="col-md-6">
            <div className={`${statusClass}`} role="alert">
              {statusMasage}
              <button
                className="ml-4 btn btn-danger"
                onClick={() => removeStatusPost()}
              >
                Close
              </button>
            </div>
          </div>
          <div className="col-md-3">
            <button className="btn theme-btn" onClick={() => setShow(true)}>
              Add New Post
            </button>
          </div>
        </div>

        {posts?.length && (
          <Table
            editHandle={editHandle}
            deleteHandle={deleteHandle}
            rows={posts}
            pagination={true}
            columns={columns}
          />
        )}
      </div>
      {/* edit Modal */}

      <Modal show={editshow} onClose={() => setEditShow(false)}>
        <div className="content">
          <h3>New Post Add</h3>

          <div className="mb-3">
            <label className="form-label">Post title</label>
            <input
              type="text"
              name="title"
              value={editstate.title}
              onChange={handleEditChange}
              className="form-control"
              placeholder=" Post title"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="body"
              value={editstate.body}
              onChange={handleEditChange}
              className="form-control"
            />
          </div>
          <button className="btn theme-btn mr-2" onClick={onEditPost}>
            Save
          </button>
          <button className="btn btn-outline-secondary" onClick={closeEdit}>
            Close
          </button>
        </div>
      </Modal>

      {/* add Modal */}
      <Modal show={show} onClose={() => setShow(false)}>
        <div className="content">
          <h3>New Post Add</h3>

          <div className="mb-3">
            <label className="form-label">Post title</label>
            <input
              type="text"
              name="title"
              value={state.title}
              onChange={handleChange}
              className="form-control"
              placeholder=" Post title"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="body"
              value={state.body}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button
            className="btn theme-btn mr-2"
            disabled={!enabled}
            onClick={addNewPost}
          >
            Save
          </button>
          <button className="btn btn-outline-secondary" onClick={close}>
            Close
          </button>
        </div>
      </Modal>
    </section>
  );
};
export default Posts;
