import React from 'react';

export default function DocumentForm({ document, onChange, onSubmit, onCancel, isEditing }) {
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Chỉnh sửa tài liệu' : 'Thêm tài liệu mới'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-gray-700">Tiêu đề:</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={document.title}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-700">Mô tả:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={document.description}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded p-2"
                        rows="4"
                        required
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {isEditing ? 'Lưu' : 'Thêm'}
                    </button>
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
