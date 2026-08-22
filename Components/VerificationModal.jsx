// src/components/VerificationModal.jsx
import React, { useState } from 'react';
import { SPORTS_LIST, ACADEMIC_QUALIFICATIONS } from '../src/data/sportsList';
import './VerificationModal.css';

export default function VerificationModal({ isOpen, onClose, userData, onSave }) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: userData?.role || 'player',
    name: userData?.name || '',
    age: userData?.age || '',
    gender: userData?.gender || 'Male',
    academicQualification: userData?.academicQualification || ACADEMIC_QUALIFICATIONS[0],
    village: userData?.village || '',
    district: userData?.district || '',
    state: userData?.state || '',
    sport: userData?.sport || SPORTS_LIST[0].name,
    sportLevel: userData?.sportLevel || 'Village Level',
    villageRank: userData?.villageRank || 'Unranked',
    bio: userData?.bio || '',
    achievements: userData?.achievements || '',
    videoProofUrl: userData?.videoProofUrl || '',
    photoProofUrl: userData?.photoProofUrl || '',
    scoutAgency: userData?.scoutAgency || '',
    scoutExperience: userData?.scoutExperience || '',
    targetRegions: userData?.targetRegions || ''
  });

  const [previewPhoto, setPreviewPhoto] = useState(userData?.photoProofUrl || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const mockUrl = URL.createObjectURL(file);
      setPreviewPhoto(mockUrl);
      setFormData((prev) => ({ ...prev, photoProofUrl: mockUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      verificationPercentage: 100,
      isVerified: true
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Complete GaonKhiladi Verification</h2>
            <p className="modal-subtitle">Step {step} of 4 • Get verified for scouts</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* Step Indicator */}
        <div className="step-bar">
          <div className={`step-item ${step >= 1 ? 'active' : ''}`}>1. Personal Info</div>
          <div className={`step-item ${step >= 2 ? 'active' : ''}`}>2. {formData.role === 'player' ? 'Sport Details' : 'Scout Profile'}</div>
          <div className={`step-item ${step >= 3 ? 'active' : ''}`}>3. Bio & Past Records</div>
          <div className={`step-item ${step >= 4 ? 'active' : ''}`}>4. Proof Upload</div>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {step === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label className="form-label">Register As</label>
                <div className="role-selector">
                  <label className={`role-option ${formData.role === 'player' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value="player"
                      checked={formData.role === 'player'}
                      onChange={handleChange}
                    />
                    <span>🏃 Village Player</span>
                  </label>
                  <label className={`role-option ${formData.role === 'scout' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value="scout"
                      checked={formData.role === 'scout'}
                      onChange={handleChange}
                    />
                    <span>🔍 Talent Scout / Coach</span>
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Age (Years)</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Academic Qualification</label>
                  <select name="academicQualification" value={formData.academicQualification} onChange={handleChange}>
                    {ACADEMIC_QUALIFICATIONS.map((qual, idx) => (
                      <option key={idx} value={qual}>{qual}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Village Name</label>
                  <input type="text" name="village" value={formData.village} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">District & State</label>
                  <input type="text" name="district" value={formData.district} onChange={handleChange} required />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              {formData.role === 'player' ? (
                <>
                  <div className="form-group">
                    <label className="form-label">Select Primary Sport (16 Available)</label>
                    <select name="sport" value={formData.sport} onChange={handleChange}>
                      {SPORTS_LIST.map((s) => (
                        <option key={s.id} value={s.name}>{s.icon} {s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Level Played</label>
                      <select name="sportLevel" value={formData.sportLevel} onChange={handleChange}>
                        <option value="Village Level">Village Level</option>
                        <option value="Block Level">Tehsil / Block Level</option>
                        <option value="District Level">District Level</option>
                        <option value="State Level">State Level</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Village Rank</label>
                      <input type="text" name="villageRank" value={formData.villageRank} onChange={handleChange} placeholder="e.g. Rank #1" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label">Scouting Agency / Organization</label>
                    <input type="text" name="scoutAgency" value={formData.scoutAgency} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Scouting Experience (Years)</label>
                    <input type="number" name="scoutExperience" value={formData.scoutExperience} onChange={handleChange} />
                  </div>
                </>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <div className="form-group">
                <label className="form-label">Bio & Sports Journey</label>
                <textarea name="bio" rows="3" value={formData.bio} onChange={handleChange} placeholder="Tell scouts about your sporting background..."></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Achievements & Medals</label>
                <textarea name="achievements" rows="3" value={formData.achievements} onChange={handleChange} placeholder="List medals, Dangal wins, tournament awards..."></textarea>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step">
              <div className="form-group">
                <label className="form-label">Video Proof Link (YouTube / Reel)</label>
                <input type="url" name="videoProofUrl" value={formData.videoProofUrl} onChange={handleChange} placeholder="https://..." />
              </div>
              <div className="form-group">
                <label className="form-label">Upload Certificate / Photo Proof</label>
                <input type="file" accept="image/*" onChange={handlePhotoFile} />
                {previewPhoto && (
                  <div style={{ marginTop: '8px' }}>
                    <img src={previewPhoto} alt="Proof" style={{ height: '80px', borderRadius: '6px' }} />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="modal-footer">
            {step > 1 && <button type="button" className="btn-secondary" onClick={() => setStep(step - 1)}>Back</button>}
            {step < 4 ? (
              <button type="button" className="btn-primary" onClick={() => setStep(step + 1)}>Next →</button>
            ) : (
              <button type="submit" className="btn-success">Submit & Verify ✓</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}