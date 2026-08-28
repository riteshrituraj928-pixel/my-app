import { useState, useEffect } from 'react';
import { useAuth } from '../src/context/AuthContext';
import VerificationModal from './VerificationModal';
import { SPORTS_LIST } from '../src/data/sportsList';
import './Profile.css';

export default function Profile() {
  const { user: authUser } = useAuth();

  const userKey = authUser?.email || authUser?._id || authUser?.name;

  // Read saved profile from localStorage if available
  const [user, setUser] = useState(() => {
    const saved = userKey ? localStorage.getItem(`profile_data_${userKey}`) : null;
    const parsedSaved = saved ? JSON.parse(saved) : {};

    return {
      name: authUser?.name || 'Unknown User',
      email: authUser?.email || '',
      mobileNo: authUser?.mobileNo || '',
      role: authUser?.type || authUser?.role || 'player',
      sports: authUser?.sports || [],

      age: '',
      gender: '',
      academicQualification: '',
      village: '',
      district: '',
      avatar: '',
      verificationPercentage: 0,
      isVerified: false,

      sport: authUser?.sports?.[0] || '',
      sportLevel: '',
      villageRank: '',
      rating: 0,
      bio: '',
      achievements: '',
      videoProofUrl: '',
      photoProofUrl: '',

      scoutAgency: '',
      scoutExperience: '',
      targetRegions: '',
      ...parsedSaved
    };
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentSportObj = SPORTS_LIST.find(
    (s) => s.name.toLowerCase() === user.sport?.toLowerCase()
  ) || { icon: '🏃' };

  // Save profile updates to state and localStorage
  const handleSaveProfile = (updatedData) => {
    const updatedUser = {
      ...user,
      ...updatedData
    };
    setUser(updatedUser);
    if (userKey) {
      localStorage.setItem(`profile_data_${userKey}`, JSON.stringify(updatedUser));
    }
  };

  const isProfileIncomplete = !user.age || !user.village || !user.gender;

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=f59e0b&color=0f172a&size=130&bold=true&font-size=0.4`;

  return (
    <div className="demo3-profile-wrapper">
      {/* Main Glass Card Container */}
      <div className="demo3-profile-card">
        {/* Vibrant Gradient Banner */}
        <div className="demo3-banner">
          <button className="banner-edit-btn" onClick={() => setIsModalOpen(true)} title="Edit Banner / Profile">
            ✏️
          </button>
        </div>

        {/* Profile Header Main Content */}
        <div className="demo3-header-content">
          <div className="avatar-section">
            <div className="avatar-ring">
              <img src={user.avatar || defaultAvatar} alt={user.name} className="demo3-avatar-img" />
            </div>
          </div>

          <div className="meta-and-actions">
            <div className="user-details-left">
              <div className="name-badge-row">
                <h1 className="user-fullname">{user.name}</h1>
                <span className={`verified-badge-pill ${user.isVerified ? 'is-verified' : 'is-pending'}`}>
                  {user.isVerified ? '✓ Verified Profile' : '⚠️ Profile Incomplete'}
                </span>
              </div>
              <p className="user-tagline">
                {user.role === 'player'
                  ? user.sport
                    ? `${currentSportObj.icon} ${user.sport} Player${user.sportLevel ? ` • ${user.sportLevel}` : ''}`
                    : '🏃 Player'
                  : user.scoutAgency
                    ? `🔍 Talent Scout • ${user.scoutAgency}`
                    : '🔍 Talent Scout'}
              </p>
              {(user.village || user.district) && (
                <p className="user-location-text">
                  📍 {[user.village, user.district].filter(Boolean).join(', ')}
                </p>
              )}

              <div className="action-buttons-group">
                <button className="btn-edit-main" onClick={() => setIsModalOpen(true)}>
                  {user.isVerified ? 'Edit Profile' : '⚡ Complete Profile'}
                </button>
                <button className="btn-settings-secondary" onClick={() => setIsModalOpen(true)}>
                  ⚙️ Settings
                </button>
              </div>
            </div>

            <div className="tags-and-role-right">
              <div className="role-meta-box">
                <span className="meta-label">Current Role 💼</span>
                <span className={`role-pill-badge ${user.role}`}>
                  {user.role === 'player' ? '🏃 Village Player' : '🔍 Talent Scout'}
                </span>
              </div>

              <div className="skills-tags-container">
                <span className="meta-label">Sports & Info ⭐</span>
                <div className="tags-flex-wrap">
                  {user.sports && user.sports.length > 0 ? (
                    user.sports.map((sport, idx) => (
                      <span key={idx} className={`skill-chip ${idx === 0 ? 'highlight' : ''}`}>{sport}</span>
                    ))
                  ) : (
                    <span className="skill-chip">No sports selected</span>
                  )}
                  {user.email && <span className="skill-chip">📧 {user.email}</span>}
                  {user.mobileNo && <span className="skill-chip">📱 {user.mobileNo}</span>}
                  {user.age && <span className="skill-chip">Age: {user.age}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Insight Cards */}
        <div className="demo3-insight-cards">
          <div className="insight-card click-card" onClick={() => setIsModalOpen(true)}>
            <div className="insight-text-wrapper">
              <span className="insight-title">Profile Status</span>
              <p className="insight-desc">
                {isProfileIncomplete
                  ? 'Complete your profile to get noticed by scouts.'
                  : 'Profile 100% Complete & Verified.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Modal Component */}
      <VerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={user}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
