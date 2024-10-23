const urlManager = {
    login: '/login',
    register: '/register', // Đăng ký người dùng mới
    getAllUsers: '/admin/users',
    updateUser: (id) => `/users/${id}`, // Cập nhật người dùng với ID
    deleteUser: (id) => `/users/${id}`,  // Xóa người dùng với ID
    searchUsersByName: '/users/search', // Chỉ định endpoint
    getAllCategories: '/categories', // Lấy tất cả danh mục
    createCategory: '/categories', // Tạo danh mục mới
    updateCategory: (id) => `/categories/${id}`, // Cập nhật danh mục với ID
    deleteCategory: (id) => `/categories/${id}`, // Xóa danh mục với ID
    searchCategoriesByName: '/categories/search', // Tìm kiếm danh mục theo tên

    // Thêm các endpoint cho sách
    getAllBooks: '/books', // Lấy tất cả sách
    createBook: '/books', // Tạo sách mới
    updateBook: (id) => `/books/${id}`, // Cập nhật sách với ID
    deleteBook: (id) => `/books/${id}`, // Xóa sách với ID
    uploadImage: '/books/upload', // Endpoint để tải lên hình ảnh
};

export default urlManager;
