"use client"

import React, { useState } from 'react'
import { Book, Send, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom';
import { FaBackward } from 'react-icons/fa';

export default function BookSuggestion() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        category: '',
        reason: '',
        name: '',
        email: '',
        studentId: ''
    })

    const [errors, setErrors] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const validateForm = () => {
        let errors = {}
        if (!formData.title.trim()) errors.title = "Tiêu đề sách là bắt buộc"
        if (!formData.author.trim()) errors.author = "Tên tác giả là bắt buộc"
        if (!formData.category) errors.category = "Vui lòng chọn danh mục"
        if (!formData.reason.trim()) errors.reason = "Vui lòng cung cấp lý do đề xuất"
        if (!formData.name.trim()) errors.name = "Tên của bạn là bắt buộc"
        if (!formData.email.trim()) errors.email = "Email là bắt buộc"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email không hợp lệ"
        if (!formData.studentId.trim()) errors.studentId = "Mã số sinh viên là bắt buộc"
        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newErrors = validateForm()
        if (Object.keys(newErrors).length === 0) {
            // Here you would typically send the form data to your backend
            console.log('Form submitted:', formData)
            setIsSubmitted(true)
            setFormData({
                title: '',
                author: '',
                isbn: '',
                category: '',
                reason: '',
                name: '',
                email: '',
                studentId: ''
            })
            setErrors({})
        } else {
            setErrors(newErrors)
        }
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="text-center">
                            <Book className="mx-auto h-12 w-12 text-green-500" />
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Cảm ơn bạn!</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Đề xuất sách của bạn đã được gửi thành công. Chúng tôi sẽ xem xét và phản hồi sớm nhất có thể.
                            </p>
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Đề xuất sách khác
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0b328f] to-[#f2a429] py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto px-4 py-2 fixed top-0 left-0 z-50">
                <div className="flex justify-start items-center">
                    <Link
                        to="/library/categories"
                        className="bg-orange-400 hover:bg-orange-500 text-white rounded-full p-2 border-2 border-yellow-300 transition duration-300 ease-in-out"
                    >
                        <FaBackward className="text-xl" />
                    </Link>
                </div>
            </div>
            <div className="max-w-3xl mx-auto">
                <div className="text-center">
                    <Book className="mx-auto h-12 w-12 text-blue-500" />
                    <h2 className="mt-6 text-3xl font-extrabold text-white">Đề xuất Sách Mới</h2>
                    <p className="mt-2 text-sm text-white">
                        Giúp chúng tôi làm phong phú thêm bộ sưu tập của Thư viện Đại học Thành Đô
                    </p>
                </div>

                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Tiêu đề sách *
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        <div>
                            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                                Tác giả *
                            </label>
                            <input
                                type="text"
                                name="author"
                                id="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.author && <p className="mt-2 text-sm text-red-600">{errors.author}</p>}
                        </div>

                        <div>
                            <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
                                ISBN (nếu biết)
                            </label>
                            <input
                                type="text"
                                name="isbn"
                                id="isbn"
                                value={formData.isbn}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Danh mục *
                            </label>
                            <select
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">Chọn danh mục</option>
                                <option value="science">Khoa học Công nghệ</option>
                                <option value="economics">Kinh tế & Quản lý</option>
                                <option value="literature">Văn học & Ngôn ngữ</option>
                                <option value="medicine">Y học & Sức khỏe</option>
                                <option value="other">Khác</option>
                            </select>
                            {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category}</p>}
                        </div>

                        <div>
                            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                                Lý do đề xuất *
                            </label>
                            <textarea
                                name="reason"
                                id="reason"
                                rows={3}
                                value={formData.reason}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            ></textarea>
                            {errors.reason && <p className="mt-2 text-sm text-red-600">{errors.reason}</p>}
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Họ và tên *
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                                Mã số sinh viên *
                            </label>
                            <input
                                type="text"
                                name="studentId"
                                id="studentId"
                                value={formData.studentId}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.studentId && <p className="mt-2 text-sm text-red-600">{errors.studentId}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Send className="mr-2 h-5 w-5" />
                                Gửi đề xuất
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">Lưu ý</h3>
                            <div className="mt-2 text-sm text-yellow-700">
                                <p>
                                    Chúng tôi sẽ xem xét cẩn thận mọi đề xuất. Tuy nhiên, việc bổ sung sách mới vào bộ sưu tập
                                    của thư viện phụ thuộc vào nhiều yếu tố như ngân sách, nhu cầu chung của sinh viên và
                                    sự phù hợp với chương trình học.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}