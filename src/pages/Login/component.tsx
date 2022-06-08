/* eslint-disable no-lone-blocks */
import React, {  useState } from "react";
import { useNavigate,  } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  userLogin
} from "../../store/action/userAction";
export default function Login() {
  const dispatch = useDispatch();
  const [user, setUserName] = useState("");
  const navigate = useNavigate();
  const addUser = () => {
    localStorage.setItem('user', user)
    dispatch(userLogin(user) as any);
  
    navigate('/post-list');
  };
  return (
    <div className="col-md-4 mx-auto pt-5">
      <div className="card p-3">
      <h1>Please Log In</h1>
      <hr/>
      <form>
        <div className="mb-3">
          <label className="form-label">User Name</label>
          <input
            type="text"
            className="form-control"
            value={user}
            onChange={e => setUserName(e.target.value)}
            placeholder="Username"
            maxLength={26} 
          />
             <small  className="form-text text-muted">User must be 6 digit</small>
        </div>

        <div>
          <button onClick={addUser} disabled={user.length > 6 ? false : true } className="btn theme-btn" type="submit">Submit</button>
        </div>
      </form>
      </div>
    </div>
  );
}
