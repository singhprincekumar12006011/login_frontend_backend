import { FaPlus, FaTrash } from "react-icons/fa6";
import { useState } from "react";
import Swal from "sweetalert2";

const Candidate = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    permanentAddress: "",
    technicalSkills: "",
    currentAddress: "",
    state: "",
    country: "",
    pincode: "",
    educationDetails: [
      {
        instituteName: "",
        qualification: "",
        specialization: "",
        totalPercentage: "",
        startingYear: "",
        endingYear: "",
        currentlyPursuing: false,
      },
    ],
    experienceDetails: [
      {
        companyName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        yearOfExperience: "",
        currentSalary: "",
        expectedSalary: "",
        technologiesUsed: "",
        isFresher: false,
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEducationChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedEducationDetails = [...formData.educationDetails];
    if (type === "checkbox" && name === "currentlyPursuing") {
      updatedEducationDetails[index][name] = checked;
      if (checked) {
        updatedEducationDetails[index].endingYear = "";
      }
    } else {
      updatedEducationDetails[index][name] = value;
    }
    setFormData((prevData) => ({
      ...prevData,
      educationDetails: updatedEducationDetails,
    }));
  };

  const handleExperienceChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedExperienceDetails = [...formData.experienceDetails];

    if (type === "checkbox" && name === "isFresher") {
      updatedExperienceDetails[index][name] = checked;
      if (checked) {
        updatedExperienceDetails[index].companyName = "";
        updatedExperienceDetails[index].jobTitle = "";
        updatedExperienceDetails[index].startDate = "";
        updatedExperienceDetails[index].endDate = "";
        updatedExperienceDetails[index].yearOfExperience = "";
        updatedExperienceDetails[index].currentSalary = "";
        updatedExperienceDetails[index].expectedSalary = "";
        updatedExperienceDetails[index].technologiesUsed = "";
      }
    } else {
      updatedExperienceDetails[index][name] = value;
    }

    setFormData((prevData) => ({
      ...prevData,
      experienceDetails: updatedExperienceDetails,
    }));
  };

  const addEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      educationDetails: [
        ...prevData.educationDetails,
        {
          instituteName: "",
          qualification: "",
          specialization: "",
          totalPercentage: "",
          startingYear: "",
          endingYear: "",
          currentlyPursuing: false,
        },
      ],
    }));
  };

  const deleteEducation = (index) => {
    const updatedEducationDetails = [...formData.educationDetails];
    updatedEducationDetails.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      educationDetails: updatedEducationDetails,
    }));
  };

  const addExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      experienceDetails: [
        ...prevData.experienceDetails,
        {
          companyName: "",
          jobTitle: "",
          startDate: "",
          endDate: "",
          yearOfExperience: "",
          currentSalary: "",
          expectedSalary: "",
          technologiesUsed: "",
          isFresher: false,
        },
      ],
    }));
  };

  const deleteExperience = (index) => {
    const updatedExperienceDetails = [...formData.experienceDetails];
    updatedExperienceDetails.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      experienceDetails: updatedExperienceDetails,
    }));
  };

  // Function to generate a random ID with JA prefix and 6 alphanumeric characters
  const generateCustomId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "JA";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Generate custom ID
    const customId = generateCustomId();
    const dataWithCustomId = {
      ...formData,
      id: customId
    };
    
    try {
      const response = await fetch("http://localhost:5000/api/candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithCustomId),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Application Successful!",
          html: `Form submitted successfully<br>Name: <b>${formData.fullName}</b><br> Your ID: <b>${customId}</b>`,
        });
        // Clear form data
        setFormData({
          fullName: "",
          dateOfBirth: "",
          gender: "",
          phoneNumber: "",
          email: "",
          permanentAddress: "",
          currentAddress: "",
          state: "",
          country: "",
          pincode: "",
          technicalSkills: "",
          educationDetails: [
            {
              instituteName: "",
              qualification: "",
              specialization: "",
              totalPercentage: "",
              startingYear: "",
              endingYear: "",
              currentlyPursuing: false,
            },
          ],
          experienceDetails: [
            {
              companyName: "",
              jobTitle: "",
              startDate: "",
              endDate: "",
              yearOfExperience: "",
              currentSalary: "",
              expectedSalary: "",
              technologiesUsed: "",
            },
          ],
        });
      } else {
        alert("Failed to add candidate");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center py-5"
        style={{ backgroundColor: "#f4f6f8" }}
      >
        <div className=" container-md bg-white rounded shadow p-5 border ">
          <h2 className="text-center mb-4 text-primary fw-semibold text-white bg-primary p-3 rounded-top ">
            Candidate Application
          </h2>
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <h5 className="text-secondary mb-2 fw-medium">
                  Personal Details
                </h5>
                <div className="border rounded p-3">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label
                      htmlFor="fullName"
                      className="form-label fw-semibold"
                    >
                      Full Name
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="dateOfBirth"
                      className="form-label fw-semibold"
                    >
                      Date of Birth<span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="gender" className="form-label fw-semibold">
                      Gender<span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="phoneNumber"
                      className="form-label fw-semibold"
                    >
                      Phone Number<span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email<span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                </div>
              </div>

              <div className="mb-3">
                <h5 className="text-secondary mb-2 fw-medium">
                  Address Details
                </h5>
                <div className="border rounded p-3">
                <div className="mb-3">
                  <label
                    htmlFor="permanentAddress"
                    className="form-label fw-semibold"
                  >
                    Permanent Address<span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="permanentAddress"
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    required
                    rows="2"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="currentAddress"
                    className="form-label fw-semibold"
                  >
                    Current Address<span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="currentAddress"
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={handleChange}
                    required
                    rows="2"
                  ></textarea>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="state" className="form-label fw-semibold">
                      State<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="country" className="form-label fw-semibold">
                      Country<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="pincode" className="form-label fw-semibold">
                      Pincode<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                </div>
              </div>

              <div className="mb-3">
                <h5 className="text-secondary mb-3 fw-medium d-flex justify-content-between align-items-center">
                  Skills
                </h5>
                <div className="border rounded p-3">
                  <label className="form-label fw-semibold" >Skills<span className="text-danger">*</span></label>
                  <textarea name="technicalSkills" className="form-control" id="technicalSkills" value={formData.technicalSkills} onChange={handleChange}/>
                </div>
              </div>
              <div className="mb-3">
                <h5 className="text-secondary mb-3 fw-medium d-flex justify-content-between align-items-center">
                  Education Details
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={addEducation}
                  >
                    <FaPlus className="me-1" /> Add Education
                  </button>
                </h5>
                {formData.educationDetails.map((education, index) => (
                  <div
                    key={index}
                    className="border rounded p-3 mb-3 position-relative"
                  >
                    {formData.educationDetails.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2"
                        onClick={() => deleteEducation(index)}
                      >
                        <FaTrash />
                      </button>
                    )}
                    <p className="text-muted small mb-2">
                      Education {index + 1}
                    </p>
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label
                          htmlFor={`instituteName-${index}`}
                          className="form-label fw-semibold"
                        >
                          Institute Name<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`instituteName-${index}`}
                          name="instituteName"
                          value={education.instituteName}
                          onChange={(e) => handleEducationChange(index, e)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor={`qualification-${index}`}
                          className="form-label fw-semibold"
                        >
                          Qualification<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`qualification-${index}`}
                          name="qualification"
                          value={education.qualification}
                          onChange={(e) => handleEducationChange(index, e)}
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label
                          htmlFor={`specialization-${index}`}
                          className="form-label fw-semibold"
                        >
                          Specialization
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`specialization-${index}`}
                          name="specialization"
                          value={education.specialization}
                          onChange={(e) => handleEducationChange(index, e)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label
                          htmlFor={`totalPercentage-${index}`}
                          className="form-label fw-semibold"
                        >
                          Percentage<span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          placeholder="%"
                          className="form-control"
                          id={`totalPercentage-${index}`}
                          name="totalPercentage"
                          value={education.totalPercentage}
                          onChange={(e) => handleEducationChange(index, e)}
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-3">
                        <label
                          htmlFor={`startingYear-${index}`}
                          className="form-label fw-semibold"
                        >
                          Starting Year<span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id={`startingYear-${index}`}
                          name="startingYear"
                          value={education.startingYear}
                          onChange={(e) => handleEducationChange(index, e)}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label
                          htmlFor={`endingYear-${index}`}
                          className="form-label fw-semibold"
                        >
                          Ending Year
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id={`endingYear-${index}`}
                          name="endingYear"
                          value={education.endingYear}
                          onChange={(e) => handleEducationChange(index, e)}
                          disabled={education.currentlyPursuing}
                        />
                      </div>
                      <div className="col-md-6 d-flex align-items-center">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`currentlyPursuing-${index}`}
                            name="currentlyPursuing"
                            checked={education.currentlyPursuing}
                            onChange={(e) => handleEducationChange(index, e)}
                          />
                          <label
                            className="form-check-label fw-semibold"
                            htmlFor={`currentlyPursuing-${index}`}
                          >
                            Currently Pursuing
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <h5 className="text-secondary mb-3 fw-medium d-flex justify-content-between align-items-center">
                  Experience Details
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={addExperience}
                  >
                    <FaPlus className="me-1" /> Add Experience
                  </button>
                </h5>
                {formData.experienceDetails.map((experience, index) => (
                  <div
                    key={index}
                    className="border rounded p-3 mb-3 position-relative"
                  >
                    {formData.experienceDetails.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2"
                        onClick={() => deleteExperience(index)}
                      >
                        <FaTrash />
                      </button>
                    )}
                    <p className="text-muted small mb-2">
                      Experience #{index + 1}
                    </p>
                    <div className="form-check mb-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`isFresher-${index}`}
                        name="isFresher"
                        checked={experience.isFresher}
                        onChange={(e) => handleExperienceChange(index, e)}
                      />
                      <label className="form-check-label" htmlFor={`isFresher-${index}`}>
                        Fresher
                      </label>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label
                          htmlFor={`companyName-${index}`}
                          className="form-label fw-semibold"
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`companyName-${index}`}
                          name="companyName"
                          value={experience.companyName}
                          onChange={(e) => handleExperienceChange(index, e)}
                          disabled={experience.isFresher}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor={`jobTitle-${index}`}
                          className="form-label fw-semibold"
                        >
                          Job Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`jobTitle-${index}`}
                          name="jobTitle"
                          value={experience.jobTitle}
                          onChange={(e) => handleExperienceChange(index, e)}
                          disabled={experience.isFresher}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-4">
                        <label
                          htmlFor={`startDate-${index}`}
                          className="form-label fw-semibold"
                        >
                          Start Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id={`startDate-${index}`}
                          name="startDate"
                          value={experience.startDate}
                          onChange={(e) => handleExperienceChange(index, e)}
                          disabled={experience.isFresher}
                        />
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor={`endDate-${index}`}
                          className="form-label fw-semibold"
                        >
                          End Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id={`endDate-${index}`}
                          name="endDate"
                          value={experience.endDate}
                          onChange={(e) => handleExperienceChange(index, e)}
                          disabled={experience.isFresher}
                        />
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor={`yearOfExperience-${index}`}
                          className="form-label fw-semibold"
                        >
                          Years of Experience
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={30}
                          className="form-control"
                          id={`yearOfExperience-${index}`}
                          name="yearOfExperience"
                          value={experience.yearOfExperience}
                          onChange={(e) => handleExperienceChange(index, e)}
                          disabled={experience.isFresher}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label
                          htmlFor={`currentSalary-${index}`}
                          className="form-label fw-semibold"
                        >
                          Current Salary
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id={`currentSalary-${index}`}
                          name="currentSalary"
                          value={experience.currentSalary}
                          onChange={(e) => handleExperienceChange(index, e)}
                          disabled={experience.isFresher}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor={`expectedSalary-${index}`}
                          className="form-label fw-semibold"
                        >
                          Expected Salary
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id={`expectedSalary-${index}`}
                          name="expectedSalary"
                          value={experience.expectedSalary}
                          onChange={(e) => handleExperienceChange(index, e)}
                          disabled={experience.isFresher}
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-12">
                        <label
                          htmlFor={`technologiesUsed-${index}`}
                          className="form-label fw-semibold"
                        >
                          Technologies / Tools Used
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`technologiesUsed-${index}`}
                          name="technologiesUsed"
                          value={experience.technologiesUsed}
                          onChange={(e) => handleExperienceChange(index, e)}
                          disabled={experience.isFresher}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg fw-semibold"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Candidate;