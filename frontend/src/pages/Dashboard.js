import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
 const [users, setUsers] = useState([]);
 const [search, setSearch] = useState("");
 const [status, setStatus] = useState("");
 const [lastActive, setLastActive] = useState("");
 const [page, setPage] = useState(1);
 const [pages, setPages] = useState(1);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
  
// Call API on Change
 useEffect(() => {
  fetchUsers();
}, [search, status, lastActive, page]);


 const fetchUsers = async () => {
  try {
    const res = await API.get(
      `/users?page=${page}&search=${search}&status=${status}&lastActive=${lastActive}`
    );

    setUsers(res.data.users);
    setPages(res.data.pages);
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Dashboard</h2>

      <input
        placeholder="Search by name/email"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      <br /><br />
      {/* Filters */}
      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <select onChange={(e) => setLastActive(e.target.value)}>
        <option value="">All Activity</option>
        <option value="24h">Last 24 Hours</option>
        <option value="7d">Last 7 Days</option>
        <option value="inactive">Inactive</option>
      </select>


      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Last Activity</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.status}</td>
              <td>{new Date(u.lastActivity).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {/* Pagination */}
      <br /><br />

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span> Page {page} of {pages} </span>

        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

    </div>
  );
}

export default Dashboard;