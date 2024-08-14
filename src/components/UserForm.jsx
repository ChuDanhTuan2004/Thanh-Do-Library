// UserForm.js
import React from 'react';

export default function UserForm({ user, onChange, onSubmit, onCancel, isEditing }) {
  return (
    <div>
      <h2 className="text-xl mb-4">{isEditing ? 'Edit User' : 'Add New User'}</h2>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Role:</label>
          <input
            type="text"
            value={user.role}
            onChange={(e) => onChange('role', e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className={`${isEditing ? 'bg-green-500' : 'bg-blue-500'} text-white px-4 py-2 rounded hover:bg-${isEditing ? 'green-600' : 'blue-600'}`}
          >
            {isEditing ? 'Save' : 'Add'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}