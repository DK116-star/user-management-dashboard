import { FaEdit, FaTrash } from "react-icons/fa";

function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user) => {
              const nameParts = user.name.split(" ");

              return (
                <tr key={user.id}>
                  <td>{user.id}</td>

                  <td>{nameParts[0]}</td>

                  <td>{nameParts.slice(1).join(" ")}</td>

                  <td>{user.email}</td>

                  <td>{user.company.name}</td>

                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => onEdit(user)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => onDelete(user.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;