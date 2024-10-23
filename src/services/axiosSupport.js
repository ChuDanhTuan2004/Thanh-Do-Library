import axios from 'axios';
import urlManager from './urlManager';

class AxiosSupport {
    constructor(baseURL = 'http://localhost:8080') {
        this.baseURL = baseURL;
        this.endpoints = urlManager;
    }

    getFullURL(endpointKey, id = null) {
        const endpoint = this.endpoints[endpointKey];
        if (typeof endpoint === 'function') {
            return `${this.baseURL}${endpoint(id)}`;
        }
        if (!endpoint) {
            throw new Error(`Endpoint ${endpointKey} không tồn tại`);
        }
        return `${this.baseURL}${endpoint}`;
    }

    async fetchWithAuth(endpointKey, options = {}, id = null) {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        };

        const url = this.getFullURL(endpointKey, id);
        const queryParams = new URLSearchParams(options.params).toString();
        const response = await fetch(`${url}${queryParams ? `?${queryParams}` : ''}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const errorText = await response.text(); // Lấy thông tin lỗi từ phản hồi
            throw new Error(`Lỗi: ${response.status} - ${errorText}`); // In ra thông tin lỗi
        }

        if (response.status === 204) {
            return null; // Không có nội dung, không cần phân tích cú pháp
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json(); // Phân tích cú pháp phản hồi JSON
        }

        return null;
    }

    // Thêm các phương thức API cho sách
    async getAllBooks(params) {
        return this.fetchWithAuth('getAllBooks', {
            method: 'GET',
            params,
        });
    }

    async createBook(book) {
        return this.fetchWithAuth('createBook', {
            method: 'POST',
            body: JSON.stringify(book),
        });
    }

    async updateBook(id, book) {
        return this.fetchWithAuth('updateBook', {
            method: 'PUT',
            body: JSON.stringify(book),
        }, id);
    }

    async deleteBook(id) {
        return this.fetchWithAuth('deleteBook', {
            method: 'DELETE',
        }, id);
    }

    // Chỉnh sửa phương thức tải lên hình ảnh
    async uploadImage(formData) {
        return axios.post('http://localhost:8080/books/upload',
             formData,
            // Không cần thiết lập 'Content-Type' cho multipart/form-data
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Thêm token vào header
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    }

    async searchUsersByName(name) {
        return this.fetchWithAuth('searchUsersByName', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            params: { name }
        });
    }

    async getAllCategories() {
        return this.fetchWithAuth('getAllCategories', {
            method: 'GET',
        });
    }

    async createCategory(category) {
        return this.fetchWithAuth('createCategory', {
            method: 'POST',
            body: JSON.stringify(category),
        });
    }

    async updateCategory(id, category) {
        return this.fetchWithAuth('updateCategory', {
            method: 'PUT',
            body: JSON.stringify(category),
        }, id);
    }

    async deleteCategory(id) {
        return this.fetchWithAuth('deleteCategory', {
            method: 'DELETE',
        }, id);
    }

    async searchCategoriesByName(name) {
        return this.fetchWithAuth('searchCategoriesByName', {
            method: 'GET',
            params: { name }
        });
    }
}

export default AxiosSupport;
