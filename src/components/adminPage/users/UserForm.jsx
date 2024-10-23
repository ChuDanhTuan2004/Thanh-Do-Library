import React from 'react';

export default function UserForm({ user, onChange, onSubmit, onCancel, isEditing }) {
  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">{isEditing ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</h2>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">Tên:</label>
          <input
            id="username"
            type="text"
            name="username"
            value={user.username}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={user.email}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Mật khẩu:</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            required={!isEditing}
          />
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Hủy
          </button>
          <button
            type="submit"
            className={`px-4 py-2 rounded-md text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
          >
            {isEditing ? 'Lưu' : 'Thêm'}
          </button>
        </div>
      </form>
    </div>
  );
}
