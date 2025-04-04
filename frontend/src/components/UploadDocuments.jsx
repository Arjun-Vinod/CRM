import { useState, useEffect } from "react";
import { FiUpload, FiEye, FiX, FiSave } from "react-icons/fi";
import axios from 'axios';

const ALLOWED_FORMATS = {
  photoId: ["image/jpeg", "image/png"],
  proofDocument: ["application/pdf"],
  certificate: ["application/pdf"],
  resume: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  experienceCertificate: ["application/pdf"],
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const INITIAL_STUDENT_DETAILS = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  highestDegree: "",
  marksObtained: "",
  company: "",
  yearsOfExperience: "",
};

const INITIAL_FILES = {
  photoId: null,
  proofDocument: null,
  certificate: null,
  resume: null,
  experienceCertificate: null,
};

function UploadDocuments() {
  const [category, setCategory] = useState("student");
  const [studentDetails, setStudentDetails] = useState(() => {
    const savedDetails = localStorage.getItem("studentDetails");
    return savedDetails ? JSON.parse(savedDetails) : INITIAL_STUDENT_DETAILS;
  });
  const [files, setFiles] = useState(INITIAL_FILES);
  const [errors, setErrors] = useState({});
  const [previewFile, setPreviewFile] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem("studentDetails", JSON.stringify(studentDetails));
  }, [studentDetails]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudentDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setIsSaved(false);
  };

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!ALLOWED_FORMATS[fileType].includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [fileType]: `Invalid format. Allowed: ${ALLOWED_FORMATS[fileType].join(", ")}`,
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({ ...prev, [fileType]: "File size exceeds 5MB limit." }));
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setFiles((prev) => ({ ...prev, [fileType]: { file, previewUrl } }));
    setErrors((prev) => ({ ...prev, [fileType]: "" }));
    setIsSaved(false);
  };

  const handlePreview = (fileType) => {
    if (files[fileType]?.previewUrl) {
      setPreviewFile({
        type: fileType,
        url: files[fileType].previewUrl,
        mimeType: files[fileType].file.type,
      });
    }
  };

  const closePreview = () => setPreviewFile(null);

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      ...(category === "student" ? ["highestDegree", "marksObtained"] : ["company", "yearsOfExperience"]),
    ];

    requiredFields.forEach((key) => {
      if (!studentDetails[key]) newErrors[key] = "This field is required";
    });

    if (category === "student" && studentDetails.marksObtained) {
      if (!/^\d{1,3}(\.\d{1,2})?$/.test(studentDetails.marksObtained)) {
        newErrors.marksObtained = "Enter a valid percentage (e.g., 85 or 85.5)";
      }
    }

    if (category === "professional" && studentDetails.yearsOfExperience) {
      if (!/^\d+$/.test(studentDetails.yearsOfExperience)) {
        newErrors.yearsOfExperience = "Enter a valid number of years";
      }
    }

    const requiredFiles = ["photoId", "proofDocument", "certificate", "resume"];
    if (category === "professional") requiredFiles.push("experienceCertificate");

    requiredFiles.forEach((key) => {
      if (!files[key]) newErrors[key] = "This document is required";
    });

    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Please complete all required fields and upload valid documents before saving.");
      return;
    }
    setIsSaved(true);
    alert("Form data saved successfully! You can now upload the admission documents.");
  };

  const handleUpload = async () => {
    if (!isSaved) {
      alert("Please save the form before uploading admission documents.");
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Please complete all required fields and upload valid documents.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('userDetails', JSON.stringify({ ...studentDetails, category }));

      Object.entries(files).forEach(([type, fileObj]) => {
        if (fileObj) {
          formData.append(type, fileObj.file);
        }
      });

      const response = await axios.post('http://localhost:5000/api/admissions/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Clean up
      Object.values(files).forEach((fileObj) => fileObj?.previewUrl && URL.revokeObjectURL(fileObj.previewUrl));
      setFiles(INITIAL_FILES);
      setPreviewFile(null);
      setIsSaved(false);
      localStorage.removeItem("studentDetails");
      setStudentDetails(INITIAL_STUDENT_DETAILS);
      alert("Admission uploaded successfully to server!");
    } catch (error) {
      console.error('Upload error:', error);
      alert("Error uploading admission: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <section className="p-6 max-w-5xl mx-auto bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-[18px] font-bold mb-6 text-[#4A90E2]">Upload Admission Documents</h2>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {/* Category Selection */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="block text-sm font-semibold text-[#333333] mb-2">Category</label>
          <div className="flex gap-4">
            {["student", "professional"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                  category === cat
                    ? "bg-[#4A90E2] text-white"
                    : "bg-[#002147] text-white hover:bg-white hover:text-[#002147] border-2 border-[#002147]"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-[18px] font-semibold text-[#333333] mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["firstName", "middleName", "lastName"].map((field) => (
              <div key={field} className="space-y-1">
                <label htmlFor={field} className="block text-sm font-semibold text-[#333333]">
                  {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  {field !== "middleName" && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  id={field}
                  type="text"
                  name={field}
                  value={studentDetails[field]}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#4A90E2] focus:border-[#4A90E2] ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-required={field !== "middleName"}
                  aria-invalid={!!errors[field]}
                />
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-[18px] font-semibold text-[#333333] mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["email", "phone"].map((field) => (
              <div key={field} className="space-y-1">
                <label htmlFor={field} className="block text-sm font-semibold text-[#333333]">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  id={field}
                  type={field === "email" ? "email" : "tel"}
                  name={field}
                  value={studentDetails[field]}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#4A90E2] focus:border-[#4A90E2] ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-required="true"
                  aria-invalid={!!errors[field]}
                />
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label htmlFor="address" className="block text-sm font-semibold text-[#333333]">
              Address<span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={studentDetails.address}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#4A90E2] focus:border-[#4A90E2] ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              rows="3"
              aria-required="true"
              aria-invalid={!!errors.address}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
        </div>

        {/* Conditional Fields */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-[18px] font-semibold text-[#333333] mb-4">
            {category === "student" ? "Academic Details" : "Professional Details"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category === "student" ? (
              <>
                {["highestDegree", "marksObtained"].map((field) => (
                  <div key={field} className="space-y-1">
                    <label htmlFor={field} className="block text-sm font-semibold text-[#333333]">
                      {field === "highestDegree" ? "Highest Degree" : "Marks Obtained (%)"}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id={field}
                      type="text"
                      name={field}
                      value={studentDetails[field]}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#4A90E2] focus:border-[#4A90E2] ${
                        errors[field] ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={field === "marksObtained" ? "e.g., 85.5" : ""}
                      aria-required="true"
                      aria-invalid={!!errors[field]}
                    />
                    {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                  </div>
                ))}
              </>
            ) : (
              <>
                {["company", "yearsOfExperience"].map((field) => (
                  <div key={field} className="space-y-1">
                    <label htmlFor={field} className="block text-sm font-semibold text-[#333333]">
                      {field === "company" ? "Company" : "Years of Experience"}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id={field}
                      type="text"
                      name={field}
                      value={studentDetails[field]}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#4A90E2] focus:border-[#4A90E2] ${
                        errors[field] ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={field === "yearsOfExperience" ? "e.g., 5" : ""}
                      aria-required="true"
                      aria-invalid={!!errors[field]}
                    />
                    {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Document Uploads */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-[18px] font-semibold text-[#333333] mb-4">Document Uploads</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "photoId",
              "proofDocument",
              "certificate",
              "resume",
              ...(category === "professional" ? ["experienceCertificate"] : []),
            ].map((fileType) => (
              <div key={fileType} className="space-y-2">
                <label
                  htmlFor={fileType}
                  className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg h-32 cursor-pointer transition-colors ${
                    errors[fileType] ? "border-red-500" : "border-[#4A90E2] hover:bg-gray-100"
                  }`}
                >
                  <input
                    id={fileType}
                    type="file"
                    onChange={(e) => handleFileChange(e, fileType)}
                    className="sr-only"
                    accept={ALLOWED_FORMATS[fileType].join(",")}
                    aria-required="true"
                    aria-invalid={!!errors[fileType]}
                  />
                  <FiUpload className="text-2xl text-[#4A90E2]" />
                  <span className="text-sm text-[#4A90E2] text-center px-2">
                    {fileType.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    <span className="text-red-500 ml-1">*</span>
                  </span>
                </label>
                {files[fileType] && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate flex-1 text-[#333333]" title={files[fileType].file.name}>
                      {files[fileType].file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePreview(fileType)}
                      className="text-[#4A90E2] hover:text-[#002147] focus:outline-none"
                      aria-label={`Preview ${files[fileType].file.name}`}
                    >
                      <FiEye />
                    </button>
                  </div>
                )}
                {errors[fileType] && <p className="text-red-500 text-xs">{errors[fileType]}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleSave}
            className={`px-6 py-2 flex items-center gap-2 rounded-md font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A90E2] ${
              isSaved
                ? "bg-green-600 cursor-not-allowed"
                : "bg-[#4A90E2] hover:bg-white hover:text-[#4A90E2] border-2 border-[#4A90E2]"
            }`}
            disabled={isSaved}
          >
            <FiSave />
            {isSaved ? "Saved" : "Save"}
          </button>
          <button
            type="button"
            onClick={handleUpload}
            className={`px-6 py-2 rounded-md font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A90E2] ${
              isSaved
                ? "bg-[#002147] hover:bg-white hover:text-[#002147] border-2 border-[#002147]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isSaved}
          >
            Upload Admission Documents
          </button>
        </div>
      </form>

      {/* Preview Modal */}
      {previewFile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closePreview}
        >
          <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {previewFile.type.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              </h3>
              <button onClick={closePreview} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>
            {previewFile.mimeType.startsWith('image/') ? (
              <img src={previewFile.url} alt="Preview" className="max-w-full h-auto" />
            ) : (
              <iframe
                src={previewFile.url}
                title="Document Preview"
                className="w-full h-[60vh]"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default UploadDocuments;