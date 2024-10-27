import React from 'react';
import { FaFacebookF, FaYoutube, FaGoogle } from 'react-icons/fa';

export default function ClientPageFooter() {
  return (
    <footer className="bg-[#0b328f] text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Thông tin liên hệ */}
          <div className="space-y-2">
            <p className="font-semibold text-lg">Bản quyền thuộc về Thư viện Trường Đại học Thành Đô</p>
            <p>Địa chỉ: Kim Chung, Hoài Đức, Hà Nội, Việt Nam</p>
            <p>Email: lib@thanhdo.edu.vn</p>
            <p>Điện thoại: (84-24)33861016</p>
            <p>Hotline: 0936.146838</p>
            <p>IP Address: 59.153.238.8</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-3">
              <a href="#" className="text-white hover:text-gray-300">
                <FaFacebookF className="fa-lg" />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaYoutube className="fa-lg" />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaGoogle className="fa-lg" />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-zalo fa-lg"></i>
              </a>
            </div>
          </div>

          {/* Bản đồ Google */}
          <div className="flex justify-center">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5109.788412740747!2d105.71876907641048!3d21.062219980595497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134544dba522d4b%3A0x5db1a51aaf3dd805!2zxJDhuqFpIEjhu41jIFRow6BuaCDEkMO0IC0gUXXhu5FjIEzhu5kgMzI!5e1!3m2!1svi!2sus!4v1727497587612!5m2!1svi!2sus"
              width="250"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy">
            </iframe>
          </div>

          {/* Thông tin dữ liệu */}
          <div className="space-y-2">
            <ul>
              <li><strong>Hôm nay:</strong> {new Date().toLocaleDateString('vi-VN')}</li>
              <li><strong>Người dùng online:</strong> 1062</li>
              <li><strong>Ngày hôm nay:</strong> 93299</li>
              <li><strong>Tuần qua:</strong> 980335</li>
              <li><strong>Tháng này:</strong> 6695651</li>
              <li><strong>Tổng lượt truy cập:</strong> 80241167</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8">
          <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} Thư viện Thành Đô. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}