import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/ui/Loader";
import {
  Calendar,
  Award,
  MapPin,
  Phone,
  Globe,
  User,
  Mail,
  Box,
  Clock,
  ArrowLeft,
} from "lucide-react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole") || "donor";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch user data");

        const { user, donations } = await res.json();
        setUser(user);
        setDonations(donations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userRole]);

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const closeCertificate = () => {
    setSelectedCertificate(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDonations = donations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(donations.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-12 h-12 text-colour1" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-colour2 p-6 md:p-12 font-sans">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-10 mb-10">
        <div className="flex items-center gap-4 mb-8">
          <button
            className="text-gray-600 hover:text-black"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={28} />
          </button>
          <h1 className="text-4xl font-extrabold text-colour4 tracking-wide">
            {userRole === "NGO" ? "Organization Profile" : "User Profile"}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Profile Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="bg-colour3 rounded-full p-7 flex items-center justify-center">
                <User size={56} className="text-colour4" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-colour4">{user?.name}</h2>
                <p className="text-gray-600 mt-1">
                  <span className="capitalize bg-colour1 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {user?.role}
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-5 pl-5 border-l-4 border-colour3">
              <div className="flex items-center gap-4">
                <Mail className="text-colour4" size={20} />
                <span className="text-gray-800 font-medium">{user?.email}</span>
              </div>

              {user?.organizationName && (
                <div className="flex items-center gap-4">
                  <Box className="text-colour4" size={20} />
                  <span className="text-gray-800 font-medium">
                    {user?.organizationName}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-4">
                <Phone className="text-colour4" size={20} />
                <span className="text-gray-800 font-medium">
                  {user?.contactNumber}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="text-colour4" size={20} />
                <span className="text-gray-800 font-medium">
                  {user?.address}
                </span>
              </div>

              {user?.website && (
                <div className="flex items-center gap-4">
                  <Globe className="text-colour4" size={20} />
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-colour4 font-semibold hover:underline"
                  >
                    {user?.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-colour3 bg-opacity-20 rounded-lg p-8">
            {userRole === "donor" ? (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-colour4">
                  Donation Overview
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-5 shadow-md flex items-center gap-5">
                    <div className="p-3 bg-colour1 bg-opacity-20 rounded-full">
                      <Box className="text-colour1" size={28} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm font-semibold">
                        Total Donations
                      </p>
                      <p className="text-2xl font-bold text-colour4">
                        {user?.totalDonations}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-5 shadow-md flex items-center gap-5">
                    <div className="p-3 bg-colour1 bg-opacity-20 rounded-full">
                      <Calendar className="text-colour1" size={28} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm font-semibold">
                        Monthly Average
                      </p>
                      <p className="text-2xl font-bold text-colour4">
                        {user?.averageMonthlyDonations}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 shadow-md flex items-center gap-5">
                  <div className="p-3 bg-colour1 bg-opacity-20 rounded-full">
                    <Clock className="text-colour1" size={28} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">
                      Last Donation
                    </p>
                    <p className="text-lg font-bold text-colour4">
                      {user?.lastDonationDate
                        ? new Date(user.lastDonationDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-colour4 mb-4">
                  Organization Information
                </h3>
                {user?.foodPreferences?.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-gray-700 font-semibold mb-2">
                      Food Restrictions:
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {user.foodPreferences.map((pref, index) => (
                        <span
                          key={index}
                          className="bg-white text-colour4 px-4 py-1 rounded-full text-sm font-medium border border-colour3"
                        >
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h4 className="text-gray-700 font-semibold mb-2">
                    Volunteer Needs:
                  </h4>
                  <div className="bg-white rounded-lg p-5 shadow-md">
                    <p className="text-gray-700 font-medium">
                      {user?.needsVolunteer
                        ? "Currently looking for volunteers to help with food distribution."
                        : "Not currently looking for volunteers."}
                    </p>
                    {user?.needsVolunteer && (
                      <button className="mt-4 bg-colour4 text-white font-bold px-6 py-2 rounded-md hover:bg-opacity-90">
                        Apply as Volunteer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Donation History */}
      {userRole === "donor" && donations.length > 0 && (
        <div className="bg-white rounded-xl shadow-xl p-8 w-full">
          <h2 className="text-3xl font-bold text-colour4 mb-8 flex items-center gap-3">
            <Award className="text-colour1" size={28} />
            Donation History
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-colour3 bg-opacity-30">
                <tr>
                  {["Date", "Food Type", "Weight (kg)", "Organization", "Certificate"].map((col, i) => (
                    <th key={i} className="p-5 font-bold text-gray-700">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentDonations.map((donation, index) => (
                  <tr
                    key={donation._id}
                    className={`${index % 2 === 0 ? "bg-colour2 bg-opacity-20" : ""}`}
                  >
                    <td className="p-5 font-medium">
                      {donation.foodListing.date}
                    </td>
                    <td className="p-5 font-medium">{donation.foodListing.foodType}</td>
                    <td className="p-5 font-medium">{donation.foodListing.weight} kg</td>
                    <td className="p-5 font-medium">{donation.ngo.name}</td>
                    <td className="p-5">
                      <button
                        onClick={() => handleViewCertificate(donation.certificateData)}
                        className="bg-colour1 text-white font-semibold px-5 py-2 rounded-md hover:bg-opacity-90"
                      >
                        View Certificate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-8">
              <p className="text-gray-600 font-medium">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-5 py-2 rounded-md font-bold ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500"
                      : "bg-colour4 text-white hover:bg-opacity-90"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-5 py-2 rounded-md font-bold ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500"
                      : "bg-colour4 text-white hover:bg-opacity-90"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden">
            <div className="bg-colour4 text-white py-6 px-8 relative">
              <button
                onClick={closeCertificate}
                className="absolute top-4 right-4 text-white bg-colour4 rounded-full p-1 hover:text-colour2"
              >
                ✕
              </button>
              <div className="text-center">
                <h3 className="text-3xl font-bold">Certificate of Donation</h3>
                <p className="text-sm opacity-80">Food Donation Verification</p>
              </div>
            </div>

            <div className="p-10 border-8 border-colour2">
              <div className="mb-6 text-center">
                <p className="text-xl font-semibold text-colour4">
                  This certifies that
                </p>
                <h2 className="text-4xl font-bold text-colour1 mt-2">
                  {selectedCertificate.donorName}
                </h2>
              </div>

              <p className="text-center mb-6 text-gray-700 text-lg">
                Has generously donated{" "}
                <span className="font-bold text-colour4">
                  {selectedCertificate.weight} kg
                </span>{" "}
                of{" "}
                <span className="font-bold text-colour4">
                  {selectedCertificate.foodType}
                </span>{" "}
                to help fight hunger in our community.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-sm text-gray-500">Donation Date:</p>
                  <p className="font-semibold">{selectedCertificate.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location:</p>
                  <p className="font-semibold">{selectedCertificate.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">NFT Token ID:</p>
                  <p className="font-mono text-sm truncate">
                    {selectedCertificate.nftTokenId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transaction Hash:</p>
                  <p className="font-mono text-sm truncate">
                    {selectedCertificate.transactionHash}
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="border-4 border-colour1 rounded-full p-4">
                  <Award className="text-colour1" size={64} />
                </div>
              </div>

              <div className="text-center mt-6">
                <p className="text-2xl font-bold text-colour4">
                  Thank you for making a difference!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
