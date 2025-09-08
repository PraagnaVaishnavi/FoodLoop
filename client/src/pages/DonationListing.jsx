import React, { useEffect, useState } from "react";
import { MapPin, AlarmClock, UserRound, Heart, Package, Utensils } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FoodDistributionSidebar } from "../Components/MainPage/Sidebar";
import Header from "../Components/Header";
import axios from "axios";

const DonationCard = ({ donation, userRole, onClaim }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
  };

  const getFoodTypeIcon = (foodType) => {
    switch (foodType?.toLowerCase()) {
      case 'hot meal':
        return <Utensils className="w-4 h-4" />;
      case 'fruits':
        return <Heart className="w-4 h-4" />;
      case 'vegetables':
        return <Package className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getTagColor = (tag) => {
    switch (tag?.toLowerCase()) {
      case 'urgent':
        return 'bg-gradient-to-r from-red-100 to-orange-100 text-red-600 border border-red-200/50';
      case 'perishable':
        return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border border-yellow-200/50';
      case 'fresh':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 border border-green-200/50';
      case 'packaged':
        return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600 border border-blue-200/50';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-600 border border-gray-200/50';
    }
  };

  return (
    <div className="group bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl w-full max-w-sm flex flex-col h-full border border-gray-200/50 overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:bg-white/80">
      {/* Image Section */}
      <div className="relative w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {donation.images && donation.images.length > 1 ? (
          <div className="donation-slider">
            <Slider {...settings}>
              {donation.images.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={img}
                    alt="donation"
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </Slider>
          </div>
        ) : donation.images && donation.images.length === 1 ? (
          <div className="relative overflow-hidden h-full">
            <img
              src={donation.images[0]}
              alt="donation"
              className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ) : (
          <div className="w-full h-56 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
            <div className="text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <span className="text-gray-500 font-medium">No image available</span>
            </div>
          </div>
        )}
        
        {/* Floating Food Type Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200/50">
          <div className="flex items-center gap-2">
            <span className="text-indigo-600">{getFoodTypeIcon(donation.foodType)}</span>
            <span className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              {donation.foodType}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4 flex-1 overflow-y-auto" style={{ maxHeight: "18rem" }}>
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {donation.tags && donation.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`text-xs px-3 py-1 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${getTagColor(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Donor Info */}
        <div className="flex items-center text-gray-700 gap-3 p-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-100/50">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
            <UserRound className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{donation.name}</p>
            <p className="text-xs text-gray-600">Donor</p>
          </div>
        </div>

        {/* Location Info */}
        <div className="space-y-3">
          <div className="flex items-center text-gray-700 gap-3 p-3 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-xl border border-green-100/50">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">{donation.location}</p>
              <p className="text-xs text-gray-600">{donation.adress}</p>
            </div>
          </div>

          {/* Expiry Info */}
          <div className="flex items-center text-gray-700 gap-3 p-3 bg-gradient-to-r from-orange-50/50 to-red-50/50 rounded-xl border border-orange-100/50">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <AlarmClock className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Expires: {donation.expiryDate}</p>
              <p className="text-xs text-red-600">Time sensitive</p>
            </div>
          </div>
        </div>

        {/* Description */}
        {donation.description && (
          <div className="text-sm text-gray-700 bg-gray-50/70 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50">
            <p className="leading-relaxed">{donation.description}</p>
          </div>
        )}
      </div>

      {/* Claim Button */}
      {userRole === "NGO" && (
        <div className="p-6 pt-0">
          <button
            onClick={() => onClaim(donation._id)}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-4 rounded-2xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Claim Donation
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

const DonationList = () => {
  const userRole = "NGO"; // Temporarily hardcoded for demo
  // const userRole = localStorage.getItem("userRole");
  
  const handleClaim = async (donationId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/ngo/claim/${donationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Donation claimed successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error claiming donation:", error);
      alert("Failed to claim donation.");
    }
  };

  const sampleDonations = [
    {
      _id: "1",
      images: ["./card1.png", "./card2.png"],
      foodType: "Hot Meal",
      name: "Rajesh Kumar",
      tags: ["Perishable", "Urgent"],
      location: "Delhi, India",
      adress: "123 Main Street, Connaught Place",
      expiryDate: "2025-04-21 18:00",
      description:
        "Fresh hot meals prepared with love and care. These meals are ready for immediate distribution and contain nutritious ingredients perfect for those in need. Please claim quickly as these items are highly perishable.",
    },
    {
      _id: "2",
      images: ["./card3.png"],
      foodType: "Fruits",
      name: "Priya Sharma",
      tags: ["Fresh", "Packaged"],
      location: "Mumbai, India",
      adress: "456 Side Avenue, Bandra West",
      expiryDate: "2025-04-20 14:00",
      description: "Fresh seasonal fruits including apples, bananas, and oranges. All fruits are carefully selected and packaged for easy distribution.",
    },
    {
      _id: "3",
      images: ["./card4.png"],
      foodType: "Vegetables",
      name: "Amit Patel",
      tags: ["Fresh", "Urgent"],
      location: "Bangalore, India",
      adress: "789 Park Road, Koramangala",
      expiryDate: "2025-04-19 10:30",
      description: "Farm fresh vegetables harvested this morning. Includes tomatoes, onions, potatoes, and leafy greens.",
    },
    {
      _id: "4",
      images: ["./card1.png"],
      foodType: "Hot Meal",
      name: "Sunita Devi",
      tags: ["Perishable"],
      location: "Chennai, India",
      adress: "101 Beach Road, Marina",
      expiryDate: "2025-04-21 20:00",
      description: "Traditional South Indian meals with rice, sambar, rasam, and vegetables. Prepared in hygienic conditions.",
    }
  ];

  const [donations, setDonations] = useState(sampleDonations);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/api/donations/list`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data && res.data.data) {
          setDonations(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching donations:", err);
      } finally {
        setLoading(false);
      }
    };

    // fetchDonations(); // Uncomment when backend is ready
  }, []);

  const dataToRender = donations && donations.length > 0 ? donations : sampleDonations;

  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 right-32 w-32 h-32 bg-gradient-to-r from-purple-200/15 to-pink-200/15 rounded-full blur-xl animate-bounce" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-48 h-48 bg-gradient-to-r from-indigo-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.4) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex w-full min-h-screen font-sans">
        {/* Enhanced Sidebar */}
        <div className="hidden lg:block w-72 xl:w-80 h-screen fixed left-0 top-0 z-20">
          <div className="h-full bg-white/80 backdrop-blur-md border-r border-gray-200/50 shadow-xl">
            <FoodDistributionSidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:ml-72 xl:ml-80 flex flex-col min-h-screen">
          {/* Header */}
          <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
            <Header />
          </div>

          {/* Hero Section */}
          <div className="relative px-6 py-8 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto text-center">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 inline-block transform hover:scale-105 transition-all duration-300">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 font-serif">
                  Available Donations
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  Discover and claim food donations in your area
                </p>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="max-w-7xl mx-auto mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200/50 transform hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold text-indigo-600">{dataToRender.length}</div>
                  <div className="text-sm text-gray-600 font-medium">Total Donations</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200/50 transform hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold text-green-600">{dataToRender.filter(d => d.tags?.includes('Fresh')).length}</div>
                  <div className="text-sm text-gray-600 font-medium">Fresh Items</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200/50 transform hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold text-red-600">{dataToRender.filter(d => d.tags?.includes('Urgent')).length}</div>
                  <div className="text-sm text-gray-600 font-medium">Urgent Claims</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200/50 transform hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold text-purple-600">{dataToRender.filter(d => d.foodType === 'Hot Meal').length}</div>
                  <div className="text-sm text-gray-600 font-medium">Hot Meals</div>
                </div>
              </div>
            </div>
          </div>

          {/* Donations Grid */}
          <div className="flex-1 px-6 pb-8 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
              {loading ? (
                <div className="flex items-center justify-center min-h-96">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                  {dataToRender.map((donation, idx) => (
                    <div
                      key={donation._id || idx}
                      className="transform transition-all duration-300 hover:z-10"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <DonationCard
                        donation={donation}
                        userRole={userRole}
                        onClaim={handleClaim}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
          <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx global>{`
        .donation-slider .slick-dots {
          bottom: 12px;
          z-index: 10;
        }
        
        .donation-slider .slick-dots li button:before {
          color: white;
          font-size: 10px;
          opacity: 0.7;
        }
        
        .donation-slider .slick-dots li.slick-active button:before {
          opacity: 1;
          color: #6366f1;
        }
        
        .custom-dots {
          display: flex !important;
          justify-content: center;
          gap: 8px;
        }
        
        .custom-dots li {
          margin: 0 !important;
        }
      `}</style>
    </>
  );
};

export default DonationList;