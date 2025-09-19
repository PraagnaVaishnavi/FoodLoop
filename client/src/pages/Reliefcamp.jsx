import { useEffect, useState } from "react";
import ReliefMaps from "./ReliefMaps";
import ReliefCampCard from "./ReliefCampCard";
import Header from "../Components/Header";
import { FoodDistributionSidebar } from "../Components/MainPage/Sidebar";

const images = ["dis1.jpg", "dis2.jpg"];

// static data, comment after intr.
const reliefCamps = [
  {
    _id: "1",
    eventType: "Earthquake",
    location: { coordinates: [28.7041, 77.1025] },
    startDate: "2025-05-01T10:00:00Z",
    resourcesNeeded: "Food, Shelter, Medical Supplies",
    demandPrediction: 75,
  },
  {
    _id: "2",
    eventType: "Flood",
    location: { coordinates: [19.076, 72.8777] },
    startDate: "2025-06-10T08:30:00Z",
    resourcesNeeded: "Water, Clothing, First Aid",
    demandPrediction: 85,
  },
  {
    _id: "3",
    eventType: "Hurricane",
    location: { coordinates: [25.276987, 55.296249] },
    startDate: "2025-07-15T09:00:00Z",
    resourcesNeeded: "Food, Shelter, Medical Supplies, Water",
    demandPrediction: 90,
  },
  {
    _id: "4",
    eventType: "Wildfire",
    location: { coordinates: [34.0522, -118.2437] },
    startDate: "2025-08-20T11:00:00Z",
    resourcesNeeded: "Water, Shelter, Firefighting Equipment",
    demandPrediction: 70,
  },
  {
    _id: "5",
    eventType: "Tsunami",
    location: { coordinates: [10.8231, 106.6297] },
    startDate: "2025-09-30T14:00:00Z",
    resourcesNeeded: "Food, Water, Rescue Equipment",
    demandPrediction: 80,
  },
];

export default function Reliefcamp() {
  const role = "NGO"; // "donor", "NGO", etc. for static, comment after intr.
  //const [role, setRole] = useState(null); uncomment while intr.
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 1000);
    }, 3000);

    // Use while integration......
    // useEffect(() => {
    //     const storedRole = localStorage.getItem("userRole");
    //     if (storedRole) {
    //       setRole(storedRole);
    //     } else {
    //       setRole("donor");
    //     }
    //   }, []);

    return () => clearInterval(interval);
  }, []);
  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <div className="flex w-full min-h-screen font-sans">
      {/* Sidebar - Width 300px */}
      <div className="hidden lg:block w-[50px] h-screen fixed left-0 top-0 z-20 shadow-xl">
        <FoodDistributionSidebar />
      </div>

      {/* Main Content */}
      <div className="w-full lg:ml-[50px] flex flex-col min-h-screen">
        {/* Header */}
        <div className="w-full sticky top-0 z-10 bg-orange shadow-sm">
          <Header />
        </div>

        {/* Hero Section - Added pt-4 to push content below sticky header */}
        <section className="w-full flex flex-col lg:flex-row items-center justify-between relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 pt-4">
         {/* Left Content */}
<div className="w-full lg:w-1/2 flex items-center px-6 sm:px-8 lg:px-12 py-8 lg:py-12 z-10">
  <div
    className={`bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-6 sm:p-8 lg:p-12 max-w-2xl w-full transition-all duration-100 border border-gray-100 hover:shadow-3xl mt-4
      ${scrolled ? "opacity-0 translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"}
    `}
  >
    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-6 leading-relaxed break-words font-serif">
      Empower Relief with Impact
    </h1>
    <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-medium leading-relaxed tracking-wide">
      Support regions in need by staying informed. Every second counts when
      it comes to disaster response. Stay aware, act fast, and empower
      communities through informed action.
    </p>
  </div>
</div>


          {/* Right Image Section */}
          <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-screen relative z-0">
            <div
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={images[index]}
                alt="Relief Camp"
                className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                key={images[index]}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Section Title */}
        <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-8 sm:py-12">
          {role === "donor" ? (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-gray-800 px-4 font-serif">
              🌍 Active Disaster Prone Areas
            </h2>
          ) : role === "NGO" ? (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-gray-800 px-4 font-serif">
              🌍 Active Relief Camps Nearby
            </h2>
          ) : null}
        </div>

        {/* Content Section */}
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {role === "donor" ? (
            <div className="max-w-7xl mx-auto">
              <ReliefMaps />
            </div>
          ) : role === "NGO" ? (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {reliefCamps.map((camp) => (
                  <div key={camp._id} className="transform hover:scale-105 transition-transform duration-300">
                    <ReliefCampCard camp={camp} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <p className="text-lg text-gray-600 font-medium">
                  Access restricted or role undefined
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Please verify your permissions and try again.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}