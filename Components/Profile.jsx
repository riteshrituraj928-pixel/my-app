import React, { useState } from 'react';
import VerificationModal from './VerificationModal';
import { SPORTS_LIST } from '../src/data/sportsList';
import './Profile.css';

export default function Profile({ currentUser }) {
  // Read user role & data from props or internal state (Auth simulation)
  const [user, setUser] = useState({
    name: currentUser?.name || 'Suraj Singh Tanwar',
    role: currentUser?.role || 'player', // 'player' or 'scout' (controlled by auth state)
    age: currentUser?.age || '20',
    gender: currentUser?.gender || 'Male',
    academicQualification: currentUser?.academicQualification || '12th Pass (Higher Secondary)',
    village: currentUser?.village || 'Khedi Sadh',
    district: currentUser?.district || 'Rohtak, Haryana',
    avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    verificationPercentage: currentUser?.verificationPercentage || 60,
    isVerified: currentUser?.isVerified || false,
    
    // Player Specific Data
    sport: currentUser?.sport || 'Kabaddi',
    sportLevel: currentUser?.sportLevel || 'District Level Champion',
    villageRank: currentUser?.villageRank || 'Rank #1 in Block',
    rating: currentUser?.rating || 4.9,
    bio: currentUser?.bio || 'Kabaddi raider from Khedi village. Won silver medal in Block level tournament 2024. Passionate about bringing village talent to national academies.',
    achievements: currentUser?.achievements || '• Best Raider Award 2024 (Rohtak Block)\n• Captain of Khedi Village Kabaddi Team\n• State Trials Qualifier',
    videoProofUrl: currentUser?.videoProofUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    photoProofUrl: currentUser?.photoProofUrl || 'https://images.unsplash.com/photo-1517649763962-0c6232662000?auto=format&fit=crop&w=600&q=80',
    
    // Scout Specific Data
    scoutAgency: currentUser?.scoutAgency || 'Haryana Grassroots Sports Federation',
    scoutExperience: currentUser?.scoutExperience || '8 Years',
    targetRegions: currentUser?.targetRegions || 'Rohtak, Jhajjar & Sonipat Villages'
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentSportObj = SPORTS_LIST.find(
    (s) => s.name.toLowerCase() === user.sport?.toLowerCase()
  ) || SPORTS_LIST[0];

  const handleSaveProfile = (updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData
    }));
  };

  return (
    <div className="demo3-profile-wrapper">
      {/* Main Glass Card Container (Demo 3 Style) */}
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
              <img src={user.avatar} alt={user.name} className="demo3-avatar-img" />
            </div>
          </div>

          <div className="meta-and-actions">
            <div className="user-details-left">
              <div className="name-badge-row">
                <h1 className="user-fullname">{user.name}</h1>
                <span className={`verified-badge-pill ${user.isVerified ? 'is-verified' : 'is-pending'}`}>
                  {user.isVerified ? '✓ Verified Profile' : '⚠️ 60% Verified'}
                </span>
              </div>
              <p className="user-tagline">
                {user.role === 'player'
                  ? `${currentSportObj.icon} ${user.sport} Player • ${user.sportLevel}`
                  : `🔍 Talent Scout • ${user.scoutAgency}`}
              </p>
              <p className="user-location-text">
                📍 {user.village}, {user.district}
              </p>

              <div className="action-buttons-group">
                <button className="btn-edit-main" onClick={() => setIsModalOpen(true)}>
                  {user.isVerified ? 'Edit Profile' : '⚡ Complete Verification'}
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
                <span className="meta-label">Sports & Qualifications ⭐</span>
                <div className="tags-flex-wrap">
                  {user.role === 'player' ? (
                    <>
                      <span className="skill-chip highlight">{currentSportObj.name}</span>
                      <span className="skill-chip">{user.villageRank}</span>
                      <span className="skill-chip">{user.academicQualification}</span>
                      <span className="skill-chip">Age: {user.age}</span>
                    </>
                  ) : (
                    <>
                      <span className="skill-chip highlight">{user.scoutAgency}</span>
                      <span className="skill-chip">{user.scoutExperience} Exp</span>
                      <span className="skill-chip">Verified Scout</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Quick Action Insight Cards (Demo 3 Feature Cards) */}
        <div className="demo3-insight-cards">
          <div className="insight-card click-card" onClick={() => setIsModalOpen(true)}>
            <div className="insight-text-wrapper">
              <span className="insight-title">Verification Status</span>
              <p className="insight-desc">
                {user.verificationPercentage === 100
                  ? 'Your profile is 100% verified for scouts!'
                  : 'Complete details to get scouted.'}
              </p>
            </div>
            <div className="insight-arrow">➔</div>
          </div>

          <div className="insight-card click-card" onClick={() => setActiveTab('proofs')}>
            <div className="insight-text-wrapper">
              <span className="insight-title">Skill & Match Proofs</span>
              <p className="insight-desc">
                {user.videoProofUrl ? '1 Video & Certificate Attached' : 'Upload match highlights'}
              </p>
            </div>
            <div className="insight-arrow">➔</div>
          </div>

          <div className="insight-card click-card" onClick={() => setActiveTab('academic')}>
            <div className="insight-text-wrapper">
              <span className="insight-title">Academic & Village Stats</span>
              <p className="insight-desc">
                {user.academicQualification} • {user.village}
              </p>
            </div>
            <div className="insight-arrow">➔</div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="demo3-tabs-bar">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview & Bio
          </button>
          <button
            className={`tab-btn ${activeTab === 'sport' ? 'active' : ''}`}
            onClick={() => setActiveTab('sport')}
          >
            {user.role === 'player' ? 'Sport & Ranking' : 'Scouting Coverage'}
          </button>
          <button
            className={`tab-btn ${activeTab === 'proofs' ? 'active' : ''}`}
            onClick={() => setActiveTab('proofs')}
          >
            Skill Video & Proofs
          </button>
          <button
            className={`tab-btn ${activeTab === 'academic' ? 'active' : ''}`}
            onClick={() => setActiveTab('academic')}
          >
            Academic Details
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="demo3-tab-content">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="tab-pane">
              <div className="content-grid-2col">
                <div className="content-card">
                  <h3 className="section-title">📝 About / Sports Journey</h3>
                  <p className="bio-paragraph">{user.bio || 'No bio added yet.'}</p>
                </div>

                <div className="content-card">
                  <h3 className="section-title">🏆 Key Achievements & Medals</h3>
                  <pre className="achievements-pre">{user.achievements || 'No achievements listed.'}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SPORT / SCOUTING DETAILS */}
          {activeTab === 'sport' && (
            <div className="tab-pane">
              {user.role === 'player' ? (
                <div className="sport-details-wrapper">
                  <div className="sport-hero-card">
                    <span className="giant-sport-icon">{currentSportObj.icon}</span>
                    <div className="sport-hero-info">
                      <h2>{user.sport}</h2>
                      <p className="sport-subtitle">{user.sportLevel}</p>
                      <div className="chips-row">
                        <span className="chip-yellow">🏆 {user.villageRank}</span>
                        <span className="chip-blue">⭐ {user.rating} / 5.0 Scout Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="scout-details-wrapper">
                  <div className="content-card">
                    <h3>🔍 Scouting Organization: {user.scoutAgency}</h3>
                    <p><strong>Years of Experience:</strong> {user.scoutExperience}</p>
                    <p><strong>Target Talent Districts:</strong> {user.targetRegions}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROOFS & VIDEOS */}
          {activeTab === 'proofs' && (
            <div className="tab-pane">
              <div className="proofs-grid">
                <div className="content-card">
                  <h3 className="section-title">🎥 Skill & Match Video Highlights</h3>
                  {user.videoProofUrl ? (
                    <div className="video-box">
                      <iframe
                        src={user.videoProofUrl}
                        title="Skill Proof"
                        className="video-iframe"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>No video proof link provided yet.</p>
                      <button className="btn-edit-main" onClick={() => setIsModalOpen(true)}>
                        Upload Video Proof
                      </button>
                    </div>
                  )}
                </div>

                <div className="content-card">
                  <h3 className="section-title">📜 Certificate / Photo Proof</h3>
                  {user.photoProofUrl ? (
                    <div className="photo-box">
                      <img src={user.photoProofUrl} alt="Proof" className="proof-img" />
                    </div>
                  ) : (
                    <p className="empty-text">No certificate photo uploaded.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ACADEMIC DETAILS */}
          {activeTab === 'academic' && (
            <div className="tab-pane">
              <div className="content-card">
                <h3 className="section-title">🎓 Personal & Educational Qualifications</h3>
                <div className="details-list">
                  <div className="detail-item">
                    <span className="detail-label">Academic Qualification:</span>
                    <span className="detail-val">{user.academicQualification}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Age & Gender:</span>
                    <span className="detail-val">{user.age} Years • {user.gender}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Village / Gram Panchayat:</span>
                    <span className="detail-val">{user.village}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">District & State:</span>
                    <span className="detail-val">{user.district}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
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