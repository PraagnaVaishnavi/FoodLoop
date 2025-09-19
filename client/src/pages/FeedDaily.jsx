import React, { useState, useEffect } from "react";
import RecurringForm from "../Components/ui/RecurringForm";
import ExistingReminders from "../Components/ui/ExistingReminders";
import { FoodDistributionSidebar } from "../Components/MainPage/Sidebar";
import Header from "../Components/Header";

const FeedDaily = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Modern Background with Subtle Gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
        {/* Geometric Background Elements */}
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-100/60 to-indigo-200/40 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute top-1/3 right-16 w-24 h-24 bg-gradient-to-br from-purple-100/50 to-blue-200/30 rounded-full blur-2xl"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div 
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-indigo-100/40 to-purple-200/30 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Main Application Container */}
      <div className="relative min-h-screen flex">
        
        {/* Sidebar Section */}
        <aside className={`
          fixed top-0 left-0 h-full w-0 bg-white/95 backdrop-blur-xl 
          border-r border-gray-200/80 shadow-xl z-50 
          transform transition-transform duration-300 ease-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden absolute top-6 right-6 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <FoodDistributionSidebar />
        </aside>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1">
          
          {/* Header Section - Full Width */}
          <header className={`sticky top-0 z-30 w-full bg-white/90 backdrop-blur-xl border-b border-gray-200/60 transition-all duration-300 ${isMobileMenuOpen ? "pl-64 " : "pl-[45px]"} 
    `}>
            <div className="flex items-center justify-between w-full px-0 py-0">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden inline-flex items-center justify-center p-3 rounded-xl bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex-1">
                <Header />
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="px-6 py-12 lg:ml-80">
            <div className="text-center">
              <div className="inline-block bg-white/80 backdrop-blur-lg rounded-2xl px-8 py-6 shadow-lg border border-gray-200/60">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Daily Food Distribution
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  Streamline your food distribution scheduling and management
                </p>
              </div>
            </div>
          </section>

          {/* Main Content Grid */}
          <section className="px-6 pb-12 lg:ml-80">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                
                {/* Create Schedule Card */}
                <article className="group">
                  <div className="h-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-white/95">
                    
                    {/* Card Header */}
                    <header className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 p-6 border-b border-gray-200/40">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                            Create Schedule
                          </h2>
                          <p className="text-gray-600">Set up recurring food distribution schedules</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                      </div>
                    </header>
                    
                    {/* Card Content */}
                    <div className="p-6">
                      <RecurringForm />
                    </div>
                  </div>
                </article>

                {/* Active Reminders Card */}
                <article className="group">
                  <div className="h-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-white/95">
                    
                    {/* Card Header */}
                    <header className="bg-gradient-to-r from-indigo-50/80 to-purple-50/80 p-6 border-b border-gray-200/40">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                            Active Reminders
                          </h2>
                          <p className="text-gray-600">View and manage your existing schedules</p>
                        </div>
                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                      </div>
                    </header>
                    
                    {/* Card Content */}
                    <div className="p-6">
                      <ExistingReminders />
                    </div>
                  </div>
                </article>
              </div>

              {/* Statistics Cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-gray-200/60 transition-all duration-300 hover:shadow-xl hover:bg-white/90">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
                  <p className="text-gray-600 font-medium">Continuous Monitoring</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-gray-200/60 transition-all duration-300 hover:shadow-xl hover:bg-white/90">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Smart</h3>
                  <p className="text-gray-600 font-medium">Automated Scheduling</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-gray-200/60 transition-all duration-300 hover:shadow-xl hover:bg-white/90">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Fast</h3>
                  <p className="text-gray-600 font-medium">Quick Response Time</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Floating Action Button - Visible on all devices */}
        <button className="fixed bottom-6 right-6 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 z-50 lg:bottom-8 lg:right-8">
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/60 px-6 py-4 z-40 mb-0 pb-safe">
          <div className="flex justify-around items-center">
            <button className="flex flex-col items-center space-y-1 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-700">Schedule</span>
            </button>
            
            <button className="flex flex-col items-center space-y-1 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5a7.5 7.5 0 01-15 0c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-700">Reminders</span>
            </button>
            
            <button className="flex flex-col items-center space-y-1 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-700">Analytics</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default FeedDaily;