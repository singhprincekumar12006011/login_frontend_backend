import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  // Fetch candidates from API
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/candidates");
      if (response.ok) {
        const data = await response.json();
        setCandidates(data);
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:5000/api/candidates/${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            Swal.fire("Deleted!", "The candidate has been deleted.", "success");
            fetchCandidates();
          }
        } catch (error) {
          console.error("Error deleting candidate:", error);
          Swal.fire("Error!", "Failed to delete the candidate.", "error");
        }
      }
    });
  };

  // Handle view details
  const handleView = (candidate) => {
    setSelectedCandidate(candidate);
    setShowViewModal(true);
  };

  // Handle edit
  const handleEdit = (candidate) => {
    setSelectedCandidate(candidate);
    setEditFormData({ ...candidate });
    setShowEditModal(true);
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/candidates/${editFormData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });
      if (response.ok) {
        Swal.fire("Updated!", "The candidate has been updated.", "success");
        setShowEditModal(false);
        fetchCandidates();
      }
    } catch (error) {
      console.error("Error updating candidate:", error);
      Swal.fire("Error!", "Failed to update the candidate.", "error");
    }
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEducationEditChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedEducationDetails = [...editFormData.educationDetails];
    updatedEducationDetails[index][name] = type === "checkbox" ? checked : value;
    setEditFormData(prev => ({
      ...prev,
      educationDetails: updatedEducationDetails
    }));
  };

  const handleExperienceEditChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedExperienceDetails = [...editFormData.experienceDetails];
    updatedExperienceDetails[index][name] = type === "checkbox" ? checked : value;
    setEditFormData(prev => ({
      ...prev,
      experienceDetails: updatedExperienceDetails
    }));
  };

  // Filter and sort candidates
  const filteredCandidates = candidates.filter(candidate =>
    candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.phoneNumber.includes(searchTerm)
  );

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === "fullName") {
      return a.fullName.localeCompare(b.fullName);
    } else if (sortBy === "id") {
      return a.id.localeCompare(b.id);
    } else if (sortBy === "createdAt") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  return (
    <>
      <div className="container-fluid py-4">
        <h2 className="text-center mb-4 text-primary">Candidate Management</h2>
        
        {/* Search and Sort Bar */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email, ID, or phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="createdAt">Sort by Date</option>
              <option value="fullName">Sort by Name</option>
              <option value="id">Sort by ID</option>
            </select>
          </div>
          <div className="col-md-3">
            <div className="text-end">
              <span className="badge bg-info p-2">
                Total Candidates: {filteredCandidates.length}
              </span>
            </div>
          </div>
        </div>

        {/* Candidates Table */}
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Skills</th>
                <th>Experience</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCandidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td className="fw-bold">{candidate.id}</td>
                  <td>{candidate.fullName}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.phoneNumber}</td>
                  <td>
                    <span className={`badge ${
                      candidate.gender === 'male' ? 'bg-primary' : 
                      candidate.gender === 'female' ? 'bg-warning' : 'bg-secondary'
                    }`}>
                      {candidate.gender}
                    </span>
                  </td>
                  <td>{candidate.technicalSkills.substring(0, 30)}...</td>
                  <td>
                    {candidate.experienceDetails[0]?.isFresher ? 
                      "Fresher" : 
                      `${candidate.experienceDetails[0]?.yearOfExperience || 0} years`
                    }
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-1"
                      onClick={() => handleView(candidate)}
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => handleEdit(candidate)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(candidate.id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View Modal */}
        <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Candidate Details - {selectedCandidate?.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedCandidate && (
              <div>
                <h5 className="text-primary">Personal Information</h5>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Full Name:</strong> {selectedCandidate.fullName}
                  </div>
                  <div className="col-md-6">
                    <strong>Email:</strong> {selectedCandidate.email}
                  </div>
                  <div className="col-md-6">
                    <strong>Phone:</strong> {selectedCandidate.phoneNumber}
                  </div>
                  <div className="col-md-6">
                    <strong>Gender:</strong> {selectedCandidate.gender}
                  </div>
                  <div className="col-md-6">
                    <strong>Date of Birth:</strong> {new Date(selectedCandidate.dateOfBirth).toLocaleDateString()}
                  </div>
                </div>

                <h5 className="text-primary">Address</h5>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <strong>Permanent Address:</strong> {selectedCandidate.permanentAddress}
                  </div>
                  <div className="col-md-12">
                    <strong>Current Address:</strong> {selectedCandidate.currentAddress}
                  </div>
                  <div className="col-md-4">
                    <strong>State:</strong> {selectedCandidate.state}
                  </div>
                  <div className="col-md-4">
                    <strong>Country:</strong> {selectedCandidate.country}
                  </div>
                  <div className="col-md-4">
                    <strong>Pincode:</strong> {selectedCandidate.pincode}
                  </div>
                </div>

                <h5 className="text-primary">Technical Skills</h5>
                <p>{selectedCandidate.technicalSkills}</p>

                <h5 className="text-primary">Education Details</h5>
                {selectedCandidate.educationDetails.map((edu, index) => (
                  <div key={index} className="border rounded p-2 mb-2">
                    <strong>{edu.qualification}</strong> from {edu.instituteName}
                    {edu.specialization && <span> ({edu.specialization})</span>}
                    <br />
                    {edu.startingYear} - {edu.currentlyPursuing ? "Present" : edu.endingYear}
                    <br />
                    Percentage: {edu.totalPercentage}%
                  </div>
                ))}

                <h5 className="text-primary mt-3">Experience Details</h5>
                {selectedCandidate.experienceDetails.map((exp, index) => (
                  <div key={index} className="border rounded p-2 mb-2">
                    {exp.isFresher ? (
                      <strong>Fresher</strong>
                    ) : (
                      <>
                        <strong>{exp.jobTitle}</strong> at {exp.companyName}
                        <br />
                        {exp.startDate} - {exp.endDate}
                        <br />
                        Experience: {exp.yearOfExperience} years
                        <br />
                        Current Salary: {exp.currentSalary} | Expected: {exp.expectedSalary}
                        <br />
                        Technologies: {exp.technologiesUsed}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowViewModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Candidate - {selectedCandidate?.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editFormData && (
              <form onSubmit={handleUpdate}>
                {/* Personal Details */}
                <h5 className="text-primary mb-3">Personal Details</h5>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={editFormData.fullName}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phoneNumber"
                      value={editFormData.phoneNumber}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dateOfBirth"
                      value={editFormData.dateOfBirth}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      name="gender"
                      value={editFormData.gender}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Skills */}
                <h5 className="text-primary mb-3">Technical Skills</h5>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    name="technicalSkills"
                    value={editFormData.technicalSkills}
                    onChange={handleEditChange}
                    rows="3"
                  />
                </div>

                {/* Education Details */}
                <h5 className="text-primary mb-3">Education Details</h5>
                {editFormData.educationDetails.map((edu, index) => (
                  <div key={index} className="border rounded p-3 mb-3">
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label className="form-label">Institute Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="instituteName"
                          value={edu.instituteName}
                          onChange={(e) => handleEducationEditChange(index, e)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Qualification</label>
                        <input
                          type="text"
                          className="form-control"
                          name="qualification"
                          value={edu.qualification}
                          onChange={(e) => handleEducationEditChange(index, e)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Specialization</label>
                        <input
                          type="text"
                          className="form-control"
                          name="specialization"
                          value={edu.specialization}
                          onChange={(e) => handleEducationEditChange(index, e)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Percentage</label>
                        <input
                          type="number"
                          className="form-control"
                          name="totalPercentage"
                          value={edu.totalPercentage}
                          onChange={(e) => handleEducationEditChange(index, e)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Experience Details */}
                <h5 className="text-primary mb-3">Experience Details</h5>
                {editFormData.experienceDetails.map((exp, index) => (
                  <div key={index} className="border rounded p-3 mb-3">
                    <div className="form-check mb-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="isFresher"
                        checked={exp.isFresher}
                        onChange={(e) => handleExperienceEditChange(index, e)}
                      />
                      <label className="form-check-label">Fresher</label>
                    </div>
                    {!exp.isFresher && (
                      <div className="row mb-2">
                        <div className="col-md-6">
                          <label className="form-label">Company Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="companyName"
                            value={exp.companyName}
                            onChange={(e) => handleExperienceEditChange(index, e)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Job Title</label>
                          <input
                            type="text"
                            className="form-control"
                            name="jobTitle"
                            value={exp.jobTitle}
                            onChange={(e) => handleExperienceEditChange(index, e)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Years of Experience</label>
                          <input
                            type="number"
                            className="form-control"
                            name="yearOfExperience"
                            value={exp.yearOfExperience}
                            onChange={(e) => handleExperienceEditChange(index, e)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <div className="text-end">
                  <Button variant="secondary" onClick={() => setShowEditModal(false)} className="me-2">
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Update Candidate
                  </Button>
                </div>
              </form>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default CandidateList;