import React from 'react';

const CategoryForm = ({ category, onChange, onSubmit, onCancel, isEditing }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col">
                <div className="p-6 overflow-y-auto flex-grow">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                        {isEditing ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
                    </h2>
                    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Tên danh mục:
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={category.name}
                                onChange={onChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                           focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                required
                            />
                        </div>
                        {/* Thêm các trường khác nếu cần */}
                    </form>
                </div>
                <div className="p-6">
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 
                                       hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            onClick={onSubmit}
                            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-sky-600 
                                       hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        >
                            {isEditing ? 'Lưu' : 'Thêm'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;
