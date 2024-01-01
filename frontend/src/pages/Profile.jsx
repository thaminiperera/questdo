import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

function Profile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="profile">
      <Navbar />
      <p className="profile-title">Your Profile</p>
      <div className="user-details">
        <p className="profile-label">Username</p>
        <p className="profile-detail">{user.username}</p>
        <p className="profile-label">Email</p>
        <p className="profile-detail">{user.email}</p>
        <p className="profile-label">Points</p>
        <p className="profile-detail">{user.points}</p>
      </div>
    </div>
  );
}

export default Profile;
