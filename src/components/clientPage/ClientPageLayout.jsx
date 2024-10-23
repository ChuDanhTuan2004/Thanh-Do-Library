import React from 'react';
import Sidebar from './ClientSidebar';
import Header from './ClientHeader';
import ClientPageFooter from './ClientPageFooter';

export default function ClientPageLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Header />
          <div className="px-6 py-8">
            {children}
          </div>
        </main>
      </div>
      <ClientPageFooter />
    </div>
  );
}
