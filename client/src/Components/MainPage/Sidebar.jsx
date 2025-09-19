"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/Sidebar";
import {
  IconHome,
  IconHeartHandshake,
  IconTruckDelivery,
  IconMapPin,
  IconChartBar,
  IconSettings,
  IconLogout,
  IconShieldCheck,
  IconSalad,
  IconCoinRupee,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Img } from "react-image";
import { Box, Modal, Fade } from "@mui/material";
import FoodDonationRequestForm from "../ui/RequestForm";

export function FoodDistributionSidebar() {
  const [open, setOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState("/api/placeholder/50/50");
  const [userRole, setUserRole] = useState("guest");

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const handleOpenRequestModal = () => setIsRequestModalOpen(true);
  const handleCloseRequestModal = () => setIsRequestModalOpen(false);

  useEffect(() => {
    try {
      const userRoleFromStorage = localStorage.getItem("userRole");
      if (userRoleFromStorage) setUserRole(userRoleFromStorage);

      const user = localStorage.getItem("userData");
      if (user) {
        const userData = JSON.parse(user);
        if (userData.avatar) setUserAvatar(userData.avatar);
      }
    } catch (error) {
      console.error("Error getting user data from storage:", error);
    }
  }, []);

  const commonLinks = [
    { label: "Dashboard", href: "/dashboard", icon: <IconHome className="h-5 w-5 shrink-0" /> },
    { label: "Donate Food", href: "/donate", icon: <IconHeartHandshake className="h-5 w-5 shrink-0" /> },
    { label: "Donate Money", href: "/donatemoney", icon: <IconCoinRupee className="h-5 w-5 shrink-0" /> },
    { label: "Delivery Status", href: "/orderstatus", icon: <IconTruckDelivery className="h-5 w-5 shrink-0" /> },
    { label: "Food Map", href: "/map", icon: <IconMapPin className="h-5 w-5 shrink-0" /> },
    { label: "Impact Reports", href: "/impact", icon: <IconChartBar className="h-5 w-5 shrink-0" /> },
    { label: "Settings", href: "/settings", icon: <IconSettings className="h-5 w-5 shrink-0" /> },
    {
      label: "Logout",
      href: "/logout",
      icon: <IconLogout className="h-5 w-5 shrink-0 group-hover:text-red-500" />,
      className: "group",
      labelClassName: "group-hover:text-red-500",
    },
  ];

  const links = [...commonLinks];

  if (userRole === "NGO" || userRole === "donor") {
    const donorNGOLink = {
      label: "Request for Food",
      onClick: handleOpenRequestModal,
      icon: <IconSalad className="h-5 w-5 shrink-0 text-emerald-600" />,
      labelClassName: "font-medium text-emerald-600",
    };

    const dashboardIndex = links.findIndex((link) => link.label === "Dashboard");
    links.splice(dashboardIndex + 1, 0, donorNGOLink);
  }

  if (userRole === "admin") {
    const adminLink = {
      label: "Admin Dashboard",
      href: "/admin",
      icon: <IconShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />,
      className: "bg-emerald-50",
      labelClassName: "font-medium text-emerald-600",
    };

    const settingsIndex = links.findIndex((link) => link.label === "Settings");
    if (settingsIndex !== -1) {
      links.splice(settingsIndex, 0, adminLink);
    } else {
      links.push(adminLink);
    }
  }

  return (
    <>
      <Sidebar
        open={open}
        setOpen={setOpen}
        className={`bg-white shadow-xl border-r-0 transition-all duration-100 fixed top-0 left-0 z-[9999] ${
          +   open ? "w-[280px] bg-white" : "w-0 bg-transparent"
        }`}
      >
        <SidebarBody className="flex flex-col justify-between">
          <div className="flex flex-col">
            {open ? <FoodShareLogo /> : <FoodShareIcon />}
            <div className="mt-6 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className={link.className || ""}
                  labelClassName={link.labelClassName || ""}
                  onClick={link.onClick}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: userRole.charAt(0).toUpperCase() + userRole.slice(1),
                href: "/profile",
                icon: (
                  <Img
                    src={userAvatar}
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Profile Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Modal */}
      <Modal
        open={isRequestModalOpen}
        onClose={handleCloseRequestModal}
        closeAfterTransition
        keepMounted
      >
        <Fade in={isRequestModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "35rem",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              zIndex: 99999,
            }}
          >
            <FoodDonationRequestForm handleClose={handleCloseRequestModal} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export const FoodShareLogo = () => (
  <Link to="/" className="flex items-center space-x-2 py-2">
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600">
      <Img src="/logo.png" className="h-5 w-5" alt="Logo" />
    </div>
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-semibold text-gray-800"
    >
      MealChain
    </motion.span>
  </Link>
);

export const FoodShareIcon = () => (
  <Link to="/" className="flex items-center py-2">
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600">
      <Img src="/logo.png" className="h-5 w-5" alt="Logo" />
    </div>
  </Link>
);
