import gsap from "gsap";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonWithAvatar from "../Components/MainPage/HoverButton";
import {
  getDashboardStats,
} from "../services/dashboardService";
import { IconAlertCircle, IconChartBar, IconHeartHandshake, IconMapPin, IconTruckDelivery } from "@tabler/icons-react";
import { User } from "lucide-react";

const Header = () => {
  const [stats, setStats] = useState([]);
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef(null);
  const buttonRef = useRef(null);
  const comp = useRef(null);

  const toggleWarningPopup = () => setShowPopup(!showPopup);

  useLayoutEffect(() => {
    const introEl = comp.current;
    if (!introEl) return;

    introEl.classList.add("scroll-lock");
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline({
        onComplete: () => {
          introEl.style.display = "none";
          introEl.classList.remove("scroll-lock");
        },
      });

      t1.from("#intro-slider", { xPercent: "-100", duration: 1.3, delay: 0.3 })
        .from(["#title-1", "#title-2", "#title-3"], { opacity: 0, y: "+=30", stagger: 0.2 })
        .to(["#title-1", "#title-2", "#title-3"], { opacity: 0, y: "-=30", delay: 0.1, stagger: 0.2 })
        .to("#intro-slider", { xPercent: "-100", duration: 0.8, opacity: 0 });
    }, comp);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      const data = await getDashboardStats();
      setStats([
        { label: "Total Donations", value: data.totalDonations, icon: <IconHeartHandshake className="h-6 w-6 text-amber-500" /> },
        { label: "Distribution Routes", value: data.distributionRoutes, icon: <IconTruckDelivery className="h-6 w-6 text-amber-500" /> },
        { label: "Coverage Areas", value: data.coverageAreas, icon: <IconMapPin className="h-6 w-6 text-amber-500" /> },
        { label: "Impact Score", value: data.impactScore, icon: <IconChartBar className="h-6 w-6 text-amber-500" /> },
      ]);
    };
    loadStats();
  }, []);

  const handleAvatarClick = () => navigate("/joyloop");
  const handleProfileClick = () => navigate("/profile");

  const tabs = [
    { name: "Overview", path: "/dashboard" },
    { name: "Donations", path: "/Listings" },
    { name: "Feed Daily", path: "/recurring" },
    { name: "Relief Camps", path: "/relief" },
  ];

  return (
    <header className="sticky top-0 mt-0 z-50 bg-gradient-to-r from-amber-500 to-orange-400 shadow-lg ">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-white tracking-wide">MealChain Dashboard</h1>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              ref={buttonRef}
              className="p-2 rounded-full hover:bg-white/20 transition duration-300"
              onClick={toggleWarningPopup}
            >
              <IconAlertCircle className="h-8 w-8 text-white" />
            </button>
            {showPopup && (
              <div
                ref={popupRef}
                className="absolute top-12 right-0 bg-white text-gray-800 p-6 rounded-xl shadow-lg w-80 z-50 border border-amber-200"
              >
                <h3 className="font-bold text-lg mb-2 text-amber-600">Security Policies</h3>
                <ul className="space-y-1 text-sm">
                  <li>• All donations are verified by our team</li>
                  <li>• Food safety protocols must be followed</li>
                  <li>• Personal information is protected</li>
                  <li>• Report suspicious activity immediately</li>
                  <li>• Review our full guidelines before distributing</li>
                </ul>
                <button
                  className="mt-3 text-xs text-amber-600 hover:text-amber-800"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>

          <button onClick={handleAvatarClick} className="transition transform hover:scale-105">
            <ButtonWithAvatar />
          </button>

          <button
            onClick={handleProfileClick}
            className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white py-2 px-3 rounded-full font-medium transition duration-300"
          >
            <User className="h-5 w-5" />
            My Account
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <nav className="relative flex px-6 border-t border-white/20 bg-white/10">
       {tabs.map((tab) => (
    <button
      key={tab.path}
      onClick={() => navigate(tab.path)}
      className={`relative pl-2 px-5 py-3 text-sm font-medium transition-all ${
        location.pathname === tab.path
          ? "text-white border-b-1 border-white"
          : "text-white/80 hover:text-white"
      }`}
    >
      {tab.name}
          </button>
        ))}

        {/* Sliding indicator for active tab */}
        <div
          className="absolute bottom-0 h-1 bg-white rounded-full transition-all duration-300"
          style={{
            left: `${tabs.findIndex((t) => t.path === location.pathname) * 100}px`,
            width: "100px",
          }}
        />
      </nav>
    </header>
  );
};

export default Header;
