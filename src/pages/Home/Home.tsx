import React, { useEffect } from "react";
import { Table } from "../../components/Table";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getUsers } from "../../store/action/userAction";

const Home = () => {
  const dispatch = useDispatch();

  const users: any[] = useSelector(
    (state: any) => state?.users.users,
    shallowEqual
  );

  useEffect(() => {
    dispatch(getUsers() as any);
  }, []);
  const columns = [
    { name: "Name", value: "name" },
    {
      name: "Email",
      value: "email",
    },
    { name: "Phone", value: "phone" },
    { name: "Website", value: "website" },
  ];

  return (
    <section className="articlesList-section">
      <div className="container pt-5 pb-2">
        <h2>User List</h2>

        {users?.length && (
          <Table rows={users} pagination={false} columns={columns} />
        )}
      </div>
    </section>
  );
};
export default Home;
