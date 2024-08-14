import React from 'react';

export default function CategoryForm({ category, onChange, onSubmit, onCancel, isEditing }) {
    return (
        <div className="p-6">
            <h2 className="text-xl mb-4">{isEditing ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Tên danh mục:</label>
                    <input
                        type="text"
                        value={category.name}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded p-2"
                        required
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    {isEditing ? (
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Lưu
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Thêm
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
}
