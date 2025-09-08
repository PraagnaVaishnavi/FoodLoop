import React from "react";
import RecurringForm from "../Components/ui/RecurringForm";
import ExistingReminders from "../Components/ui/ExistingReminders";
import { FoodDistributionSidebar } from "../Components/MainPage/Sidebar";
import Header from "../Components/Header";

const FeedDaily = () => {
  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-lg animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-indigo-200/25 to-blue-200/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.5) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full min-h-screen flex font-sans">
        {/* Enhanced Sidebar */}
        <div className="hidden lg:block w-72 xl:w-80 h-screen fixed left-0 top-0 z-20">
          <div className="h-full bg-white/80 backdrop-blur-md border-r border-gray-200/50 shadow-xl">
            <FoodDistributionSidebar />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col w-full lg:ml-72 xl:ml-80 min-h-screen">
          {/* Sticky Header with Glass Effect */}
          <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
            <Header />
          </div>

          {/* Hero Section with Title */}
          <div className="relative px-6 py-8 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto text-center">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 inline-block transform hover:scale-105 transition-all duration-300">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 font-serif">
                  Daily Food Distribution
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  Manage recurring schedules and track existing reminders
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="flex-1 px-6 pb-8 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 min-h-[600px]">
                
                {/* Recurring Form Section */}
                <div className="group">
                  <div className="h-full bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] hover:bg-white/80">
                    {/* Section Header */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-6 border-b border-gray-200/30">
                      <h2 className="text-2xl font-bold text-gray-800 font-serif flex items-center">
                        <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3 animate-pulse"></span>
                        Create Schedule
                      </h2>
                      <p className="text-gray-600 mt-2 font-medium">Set up recurring food distribution schedules</p>
                    </div>
                    
                    {/* Form Container */}
                    <div className="p-6 h-full">
                      <div className="h-full flex items-center justify-center">
                        <div className="w-full transform transition-all duration-300 group-hover:scale-[1.01]">
                          <RecurringForm />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Existing Reminders Section */}
                <div className="group">
                  <div className="h-full bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] hover:bg-white/80">
                    {/* Section Header */}
                    <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6 border-b border-gray-200/30">
                      <h2 className="text-2xl font-bold text-gray-800 font-serif flex items-center">
                        <span className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3 animate-pulse" style={{ animationDelay: '0.5s' }}></span>
                        Active Reminders
                      </h2>
                      <p className="text-gray-600 mt-2 font-medium">View and manage your existing schedules</p>
                    </div>
                    
                    {/* Reminders Container */}
                    <div className="p-6 h-full">
                      <div className="h-full flex items-center justify-center">
                        <div className="w-full transform transition-all duration-300 group-hover:scale-[1.01]">
                          <ExistingReminders />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards at Bottom */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 text-center transform hover:scale-105 transition-all duration-300 hover:bg-white/70">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">24/7</h3>
                  <p className="text-gray-600 font-medium">Continuous Monitoring</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 text-center transform hover:scale-105 transition-all duration-300 hover:bg-white/70">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Smart</h3>
                  <p className="text-gray-600 font-medium">Automated Scheduling</p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 text-center transform hover:scale-105 transition-all duration-300 hover:bg-white/70">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Fast</h3>
                  <p className="text-gray-600 font-medium">Quick Response Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 backdrop-blur-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Floating Action Button */}
        <div className="hidden lg:block fixed bottom-8 right-8 z-40">
          <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white p-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 backdrop-blur-sm group">
            <svg className="w-8 h-8 transform group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default FeedDaily;