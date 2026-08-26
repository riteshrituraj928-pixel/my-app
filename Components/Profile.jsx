import { useState } from 'react';
import { useAuth } from '../src/context/AuthContext';
import VerificationModal from './VerificationModal';
import { SPORTS_LIST } from '../src/data/sportsList';
import './Profile.css';

export default function Profile() {
  const { user: authUser } = useAuth();

  // Merge auth user data with profile state
  // If profile hasn't been updated via the verification modal,
  // we show only the basic data we have from signup/login
  const [user, setUser] = useState({
    name: authUser?.name || 'Unknown User',
    email: authUser?.email || '',
    mobileNo: authUser?.mobileNo || '',
    role: authUser?.type || 'player', // backend stores as 'type'
    sports: authUser?.sports || [],

    // These fields are empty until the user completes their profile
    age: '',
    gender: '',
    academicQualification: '',
    village: '',
    district: '',
    avatar: '',
    verificationPercentage: 0,
    isVerified: false,

    // Player Specific Data
    sport: authUser?.sports?.[0] || '',
    sportLevel: '',
    villageRank: '',
    rating: 0,
    bio: '',
    achievements: '',
    videoProofUrl: '',
    photoProofUrl: '',

    // Scout Specific Data
    scoutAgency: '',
    scoutExperience: '',
    targetRegions: ''
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentSportObj = SPORTS_LIST.find(
    (s) => s.name.toLowerCase() === user.sport?.toLowerCase()
  ) || { icon: '🏃' };

  const handleSaveProfile = (updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData
    }));
  };

  const isProfileIncomplete = !user.age || !user.village || !user.gender;

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=f59e0b&color=0f172a&size=130&bold=true&font-size=0.4`;

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
                  : user.isVerified
                    ? 'Your profile is 100% verified for scouts!'
                    : 'Profile details added. Submit for verification.'}
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
                {user.academicQualification
                  ? `${user.academicQualification} • ${user.village || 'No village set'}`
                  : 'Add your academic and village details'}
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
              {isProfileIncomplete ? (
                <div className="content-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
                  <p style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</p>
                  <h3 className="section-title" style={{ borderBottom: 'none', textAlign: 'center' }}>
                    Complete Your Profile
                  </h3>
                  <p className="bio-paragraph" style={{ marginBottom: '24px' }}>
                    Hi <strong>{user.name}</strong>! Your profile is not complete yet. Click the button below to add your bio, achievements, and personal details so scouts can discover you.
                  </p>
                  <button className="btn-edit-main" onClick={() => setIsModalOpen(true)}>
                    ⚡ Complete Profile Now
                  </button>
                </div>
              ) : (
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
              )}
            </div>
          )}

          {/* TAB 2: SPORT / SCOUTING DETAILS */}
          {activeTab === 'sport' && (
            <div className="tab-pane">
              {user.role === 'player' ? (
                <div className="sport-details-wrapper">
                  {user.sport && user.sportLevel ? (
                    <div className="sport-hero-card">
                      <span className="giant-sport-icon">{currentSportObj.icon}</span>
                      <div className="sport-hero-info">
                        <h2>{user.sport}</h2>
                        <p className="sport-subtitle">{user.sportLevel}</p>
                        <div className="chips-row">
                          {user.villageRank && <span className="chip-yellow">🏆 {user.villageRank}</span>}
                          {user.rating > 0 && <span className="chip-blue">⭐ {user.rating} / 5.0 Scout Rating</span>}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="content-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
                      <p style={{ fontSize: '3rem', marginBottom: '16px' }}>🏅</p>
                      <h3 className="section-title" style={{ borderBottom: 'none', textAlign: 'center' }}>
                        Add Sport Details
                      </h3>
                      <p className="bio-paragraph" style={{ marginBottom: '24px' }}>
                        Tell us about your sport, level, and ranking.
                      </p>
                      <button className="btn-edit-main" onClick={() => setIsModalOpen(true)}>
                        ⚡ Add Sport Details
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="scout-details-wrapper">
                  {user.scoutAgency ? (
                    <div className="content-card">
                      <h3>🔍 Scouting Organization: {user.scoutAgency}</h3>
                      <p><strong>Years of Experience:</strong> {user.scoutExperience}</p>
                      <p><strong>Target Talent Districts:</strong> {user.targetRegions}</p>
                    </div>
                  ) : (
                    <div className="content-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
                      <p style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</p>
                      <h3 className="section-title" style={{ borderBottom: 'none', textAlign: 'center' }}>
                        Add Scouting Details
                      </h3>
                      <p className="bio-paragraph" style={{ marginBottom: '24px' }}>
                        Add your scouting agency and experience details.
                      </p>
                      <button className="btn-edit-main" onClick={() => setIsModalOpen(true)}>
                        ⚡ Add Scouting Details
                      </button>
                    </div>
                  )}
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
              {isProfileIncomplete ? (
                <div className="content-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
                  <p style={{ fontSize: '3rem', marginBottom: '16px' }}>🎓</p>
                  <h3 className="section-title" style={{ borderBottom: 'none', textAlign: 'center' }}>
                    Add Academic Details
                  </h3>
                  <p className="bio-paragraph" style={{ marginBottom: '24px' }}>
                    Complete your profile to show academic and personal information.
                  </p>
                  <button className="btn-edit-main" onClick={() => setIsModalOpen(true)}>
                    ⚡ Complete Profile
                  </button>
                </div>
              ) : (
                <div className="content-card">
                  <h3 className="section-title">🎓 Personal & Educational Qualifications</h3>
                  <div className="details-list">
                    <div className="detail-item">
                      <span className="detail-label">Academic Qualification:</span>
                      <span className="detail-val">{user.academicQualification || 'Not specified'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Age & Gender:</span>
                      <span className="detail-val">{user.age} Years • {user.gender}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Village / Gram Panchayat:</span>
                      <span className="detail-val">{user.village || 'Not specified'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">District & State:</span>
                      <span className="detail-val">{user.district || 'Not specified'}</span>
                    </div>
                    {user.email && (
                      <div className="detail-item">
                        <span className="detail-label">Email:</span>
                        <span className="detail-val">{user.email}</span>
                      </div>
                    )}
                    {user.mobileNo && (
                      <div className="detail-item">
                        <span className="detail-label">Mobile:</span>
                        <span className="detail-val">{user.mobileNo}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
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