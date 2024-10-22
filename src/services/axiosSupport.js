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
            ...options.headers,
            ...(token && { 'Authorization': `Bearer ${token}` }),
        };

        const url = this.getFullURL(endpointKey, id);
        const queryParams = new URLSearchParams(options.params).toString();
        const response = await fetch(`${url}${queryParams ? `?${queryParams}` : ''}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            throw new Error(`Lỗi: ${response.status}`);
        }

        // Kiểm tra mã trạng thái
        if (response.status === 204) {
            return null; // Không có nội dung, không cần phân tích cú pháp
        }

        // Kiểm tra xem phản hồi có nội dung JSON hay không
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json(); // Phân tích cú pháp phản hồi JSON
        }

        // Nếu không có nội dung JSON, trả về null hoặc một giá trị mặc định
        return null;
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
