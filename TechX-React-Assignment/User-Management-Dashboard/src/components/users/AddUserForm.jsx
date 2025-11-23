import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/userSlice";
import { makeId } from "../../utils/constants";
import Button from "../common/Button";

const AddUserForm = ({ onDone }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const newUser = {
      id: makeId(),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: { name: "Self-Added" },
    };

    dispatch(addUser(newUser));
    onDone?.();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="
            mt-1 w-full px-3 py-2 rounded-lg border
            bg-white dark:bg-gray-800
            border-gray-300 dark:border-gray-700
            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
            focus:border-blue-500 outline-none
          "
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="
            mt-1 w-full px-3 py-2 rounded-lg border
            bg-white dark:bg-gray-800
            border-gray-300 dark:border-gray-700
            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
            focus:border-blue-500 outline-none
          "
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Phone
        </label>
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="
            mt-1 w-full px-3 py-2 rounded-lg border
            bg-white dark:bg-gray-800
            border-gray-300 dark:border-gray-700
            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
            focus:border-blue-500 outline-none
          "
        />
        {errors.phone && (
          <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="submit" className="px-5">
          Add
        </Button>

        <Button type="button" variant="ghost" onClick={onDone} className="px-5">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddUserForm;
