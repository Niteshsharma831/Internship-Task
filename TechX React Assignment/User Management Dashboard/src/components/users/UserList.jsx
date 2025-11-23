import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import AddUserForm from "./AddUserForm";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { useTheme } from "../../themes/index";
import { fetchUsers } from "../../store/slices/userSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = list.filter((u) =>
    [u.name, u.email, u.company?.name]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-foreground dark:text-foreground-dark">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">User Management</h1>

        <div className="flex items-center gap-3">
          {/* Search Input */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl shadow-sm border border-gray-300 dark:border-gray-700 bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Search by name or email..."
          />

          {/* Add User Button */}
          <Button onClick={() => setShowAdd(true)}>+ Add User</Button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              console.log(
                "Theme toggled:",
                theme === "light" ? "dark" : "light"
              );
              toggleTheme();
            }}
            className="px-4 py-2 rounded-xl shadow-sm bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark hover:scale-105 transition-transform"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>

      {/* Loading & Errors */}
      {loading && (
        <div className="text-gray-500 text-center text-sm py-4">
          Loading users...
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center text-sm py-4">{error}</div>
      )}

      {/* User Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* No Data */}
      {!loading && filteredUsers.length === 0 && (
        <div className="text-center text-gray-400 mt-12 text-lg">
          No users found.
        </div>
      )}

      {/* Modal */}
      <Modal
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        title="Add User"
      >
        <AddUserForm onDone={() => setShowAdd(false)} />
      </Modal>
    </div>
  );
};

export default UserList;
