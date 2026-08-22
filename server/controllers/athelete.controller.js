const { Athlete, SPORT_SCHEMA_MAP } = require("../models/Athelete.model");

/* =========================================================
   Helper: validate sport-specific "data" object against the
   correct sub-schema before it's saved into a sport entry.
   ========================================================= */
function validateSportData(sportName, data) {
  const subSchema = SPORT_SCHEMA_MAP[sportName];
  if (!subSchema) {
    throw new Error(`Unsupported sport: ${sportName}`);
  }
  // Run the data through the sub-schema's own validators without
  // persisting anything — catches wrong enums/types early.
  const tempDoc = new (require('mongoose').model('TempValidator', subSchema, undefined, { overwriteModels: true }))(data);
  const error = tempDoc.validateSync();
  if (error) throw error;
  return true;
}

/* =========================================================
   CREATE — new athlete profile (basic info only; sports added later)
   ========================================================= */
exports.createAthlete = async (req, res) => {
    try {

        const {
            userId,
            photoUrl,
            dob,
            gender,
            location,
            experience,
            academicQualification,
            about
        } = req.body;

        const athlete = await Athlete.create({
            userId,
            photoUrl,
            dob,
            gender,
            location,
            experience,
            academicQualification,
            about
        });

        res.status(201).json({
            success: true,
            data: athlete
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }
};

exports.getAthleteById = async (req, res) => {
  try {
    const athlete = await Athlete.findById(req.params.id);
    if (!athlete) return res.status(404).json({ success: false, message: 'Athlete not found' });
    res.json({ success: true, data: athlete });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.listAthletes = async (req, res) => {
  try {
    const { sportName, state, gender, profileStatus, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (sportName) filter['sports.sportName'] = sportName;
    if (state) filter['location.state'] = state;
    if (gender) filter.gender = gender;
    if (profileStatus) filter.profileStatus = profileStatus;

    const athletes = await Athlete.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({ success: true, count: athletes.length, data: athletes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateAthlete = async (req, res) => {
  try {
    const allowedFields = ['name', 'photoUrl', 'dob', 'gender', 'location', 'academicQualification', 'profileStatus'];
    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const athlete = await Athlete.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!athlete) return res.status(404).json({ success: false, message: 'Athlete not found' });
    res.json({ success: true, data: athlete });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteAthlete = async (req, res) => {
  try {
    const athlete = await Athlete.findByIdAndDelete(req.params.id);
    if (!athlete) return res.status(404).json({ success: false, message: 'Athlete not found' });
    res.json({ success: true, message: 'Athlete profile deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.addTrainingInstitute = async (req, res) => {
  try {
    const athlete = await Athlete.findById(req.params.id);
    if (!athlete) return res.status(404).json({ success: false, message: 'Athlete not found' });

    athlete.trainingInstitutes.push(req.body); // { instituteName, sport, coachName, from, to, certificateUrl }
    await athlete.save();

    res.status(201).json({ success: true, data: athlete.trainingInstitutes });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


exports.addProof = async (req, res) => {
  try {
    const { sportId } = req.query; // optional: attach to a specific sport instead of general
    const { type, title, fileUrl, issuedBy, issuedDate } = req.body;

    if (!['video', 'certificate'].includes(type)) {
      return res.status(400).json({ success: false, message: 'type must be video or certificate' });
    }

    const athlete = await Athlete.findById(req.params.id);
    if (!athlete) return res.status(404).json({ success: false, message: 'Athlete not found' });

    const proofEntry = { type, title, fileUrl, issuedBy, issuedDate, verified: false };

    if (sportId) {
      const sportEntry = athlete.sports.id(sportId);
      if (!sportEntry) return res.status(404).json({ success: false, message: 'Sport entry not found' });
      sportEntry.proofs.push(proofEntry);
    } else {
      athlete.generalProofs.push(proofEntry);
    }

    await athlete.save();
    res.status(201).json({ success: true, data: athlete });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


exports.addSportProfile = async (req, res) => {
  try {
    const { sportName, experienceYears, currentLevel, data } = req.body;

    if (!SPORT_SCHEMA_MAP[sportName]) {
      return res.status(400).json({ success: false, message: `Unsupported sport: ${sportName}` });
    }
    validateSportData(sportName, data); // throws if shape is wrong for this sport

    const athlete = await Athlete.findById(req.params.id);
    if (!athlete) return res.status(404).json({ success: false, message: 'Athlete not found' });

    const existing = athlete.sports.find(s => s.sportName === sportName);
    if (existing) {
      existing.experienceYears = experienceYears;
      existing.currentLevel = currentLevel;
      existing.data = data;
    } else {
      athlete.sports.push({ sportName, experienceYears, currentLevel, data, proofs: [] });
    }

    await athlete.save();
    res.status(201).json({ success: true, data: athlete.sports });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.removeSportProfile = async (req, res) => {
  try {
    const { id, sportId } = req.params;
    const athlete = await Athlete.findById(id);
    if (!athlete) return res.status(404).json({ success: false, message: 'Athlete not found' });

    athlete.sports.id(sportId)?.deleteOne();
    await athlete.save();

    res.json({ success: true, data: athlete.sports });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};