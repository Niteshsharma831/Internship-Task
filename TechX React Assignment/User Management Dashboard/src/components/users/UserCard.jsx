import React from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../store/slices/userSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`Delete ${user.name}?`)) {
      dispatch(deleteUser(user.id));
    }
  };

  return (
    <Card
      className="
        flex flex-col gap-4 p-5 rounded-2xl 
        shadow-sm hover:shadow-lg transition-shadow 
        bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
      "
    >
      {/* User Info */}
      <div>
        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
          {user.name}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {user.company?.name ?? "—"}
        </p>
      </div>

      {/* Email + Phone */}
      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {user.phone}
        </p>
        <p>
          <span className="font-medium"> Company:</span> {user.company?.name ?? "—"}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-auto grid grid-cols-2 gap-3">
        <Button
          className="w-full"
          onClick={() => alert(`Profile of ${user.name} coming soon!`)}
        >
          View
        </Button>

        <Button variant="danger" className="w-full" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default UserCard;
