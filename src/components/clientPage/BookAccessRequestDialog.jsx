"use client"

import { useState } from "react"
import AxiosSupport from '../../services/axiosSupport'

const axiosSupport = new AxiosSupport();

export default function BookAccessRequestDialog({ bookId, userId, onRequestSubmitted, isOpen, onOpenChange }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reason, setReason] = useState("")
  const [error, setError] = useState("")

  const validateForm = () => {
    if (reason.length < 10) {
      setError("Lý do yêu cầu phải có ít nhất 10 ký tự.")
      return false
    }
    setError("")
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      setIsSubmitting(true)
      await axiosSupport.createAccessRequest(userId, bookId, reason)
      onRequestSubmitted?.()
      onOpenChange(false)
      setReason("")
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-[425px] w-full">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Yêu cầu quyền truy cập sách</h2>
          <p className="text-gray-500 text-sm">
            Vui lòng cung cấp lý do bạn muốn truy cập sách này.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Lý do yêu cầu
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tôi cần truy cập sách này để..."
              className="w-full min-h-[100px] p-2 border rounded-md"
              disabled={isSubmitting}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
