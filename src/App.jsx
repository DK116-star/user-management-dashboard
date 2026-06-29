import { useEffect, useState } from "react";
import "./index.css";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import FilterPopup from "./components/FilterPopup";
import SortBar from "./components/SortBar";
import Pagination from "./components/Pagination";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./api/userService";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------- Form ----------

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // ---------- Filter ----------

  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  // ---------- Sorting ----------

  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");

  // ---------- Pagination ----------

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // ---------- ADD ----------

  const handleAddUser = async (user) => {
    try {
      await createUser(user);

      const newUser = {
        id: users.length + 1,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        company: {
          name: user.department,
        },
      };

      setUsers([newUser, ...users]);
      setShowForm(false);
    } catch {
      alert("Unable to add user");
    }
  };

  // ---------- EDIT ----------

  const handleEditClick = (user) => {
    setEditingUser({
      id: user.id,
      firstName: user.name.split(" ")[0],
      lastName: user.name.split(" ").slice(1).join(" "),
      email: user.email,
      department: user.company.name,
    });

    setShowForm(true);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await updateUser(editingUser.id, updatedUser);

      const updatedUsers = users.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              name: `${updatedUser.firstName} ${updatedUser.lastName}`,
              email: updatedUser.email,
              company: {
                name: updatedUser.department,
              },
            }
          : user
      );

      setUsers(updatedUsers);
      setEditingUser(null);
      setShowForm(false);
    } catch {
      alert("Update failed");
    }
  };

  // ---------- DELETE ----------

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch {
      alert("Delete failed");
    }
  };
    // ---------- SEARCH + FILTER ----------

  let filteredUsers = users.filter((user) => {
    const q = search.toLowerCase();

    const firstName = user.name.split(" ")[0].toLowerCase();
    const lastName = user.name
      .split(" ")
      .slice(1)
      .join(" ")
      .toLowerCase();

    return (
      (
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.company.name.toLowerCase().includes(q)
      ) &&
      firstName.includes(filters.firstName.toLowerCase()) &&
      lastName.includes(filters.lastName.toLowerCase()) &&
      user.email
        .toLowerCase()
        .includes(filters.email.toLowerCase()) &&
      user.company.name
        .toLowerCase()
        .includes(filters.department.toLowerCase())
    );
  });

  // ---------- SORTING ----------

  if (sortBy) {
    filteredUsers = [...filteredUsers].sort((a, b) => {
      let valueA;
      let valueB;

      switch (sortBy) {
        case "id":
          valueA = a.id;
          valueB = b.id;
          break;

        case "firstName":
          valueA = a.name.split(" ")[0];
          valueB = b.name.split(" ")[0];
          break;

        case "lastName":
          valueA = a.name.split(" ").slice(1).join(" ");
          valueB = b.name.split(" ").slice(1).join(" ");
          break;

        case "email":
          valueA = a.email;
          valueB = b.email;
          break;

        case "department":
          valueA = a.company.name;
          valueB = b.company.name;
          break;

        default:
          return 0;
      }

      if (typeof valueA === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) return order === "asc" ? -1 : 1;
      if (valueA > valueB) return order === "asc" ? 1 : -1;

      return 0;
    });
  }

  // ---------- PAGINATION ----------

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
    return (
    <div className="container">
      <Header />

      {loading && <Loader />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <div className="toolbar">
            <SearchBar
              search={search}
              setSearch={setSearch}
            />

            <button
              className="filter-btn"
              onClick={() => setShowFilter(!showFilter)}
            >
              {showFilter ? "Close Filter" : "Filter"}
            </button>

            <button
              className="add-btn"
              onClick={() => {
                setEditingUser(null);
                setShowForm(!showForm);
              }}
            >
              + Add User
            </button>
          </div>

          <FilterPopup
            filters={filters}
            setFilters={setFilters}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
          />

          <SortBar
            sortBy={sortBy}
            setSortBy={setSortBy}
            order={order}
            setOrder={setOrder}
          />

          {showForm && (
            <UserForm
              editingUser={editingUser}
              onSave={
                editingUser
                  ? handleUpdateUser
                  : handleAddUser
              }
              onCancel={() => {
                setEditingUser(null);
                setShowForm(false);
              }}
            />
          )}

          <UserTable
            users={currentUsers}
            onEdit={handleEditClick}
            onDelete={handleDeleteUser}
          />

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            usersPerPage={usersPerPage}
            setUsersPerPage={setUsersPerPage}
            totalUsers={filteredUsers.length}
          />
        </>
      )}
    </div>
  );
}

export default App;