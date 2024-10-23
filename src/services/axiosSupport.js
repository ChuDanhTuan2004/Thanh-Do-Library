import axios from 'axios';
import urlManager from './urlManager';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL,getMetadata } from 'firebase/storage';

// Xóa import này nếu bạn không sử dụng
// import {upload} from "@testing-library/user-event/dist/upload";

class AxiosSupport {
    constructor(baseURL = 'http://localhost:8080') {
        const firebaseConfig = {
            apiKey: "AIzaSyAewhdQuJuOebuT8PqvOvV_izJSMOvfSFQ",
            authDomain: "demofirebase-6e7a1.firebaseapp.com",
            projectId: "demofirebase-6e7a1",
            storageBucket: "demofirebase-6e7a1.appspot.com",
            messagingSenderId: "600682198593",
            appId: "1:600682198593:web:e88c7a4373648fabc3b8c0",
            measurementId: "G-DLSK3MYRFK"
        };
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        this.auth = getAuth(app); // Get the Firebase Authentication instance
        this.storage = getStorage(app); // Get the Firebase Storage instance

        this.baseURL = baseURL;
        this.endpoints = urlManager;
    }

    // ... rest of the code

    // Sửa lại phương thức uploadImageToFirebase
    async uploadImageToFirebase(file) {
        const storageRef = ref(this.storage, `images/${file.name}`);

        // Upload the file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, file);

        // Get the metadata of the uploaded file
        const metadata = await getMetadata(snapshot.ref);

        // Construct the download URL
        const bucket = metadata.bucket;
        const pathEncoded = encodeURIComponent(metadata.fullPath);
        const downloadToken = metadata.downloadTokens;

        const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${pathEncoded}?alt=media&token=${downloadToken}`;

        console.log("Download URL:", downloadURL);

        return downloadURL;
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
        return this.uploadImageToFirebase(formData.get('file'));
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
