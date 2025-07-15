// In your JavaScript file (e.g., script.js or a dedicated sop.js)

function sopHandleSubmit() {
    // You'll need a div to display the message. Let's add one to your HTML.
    // For example, right after the closing </form> tag:
    // <div class="message" id="sop-submission-message"></div>

    const messageDiv = document.getElementById('sop-submission-message');

    // Display a "Submitting..." message initially
    messageDiv.textContent = "Submitting your application... Please wait.";
    messageDiv.style.color = "blue"; // Optional: style the message

    // After a short delay, you might want to show a "Thank you" message
    // and then clear it. The actual success/failure would typically be
    // handled by the Google Apps Script's response in the iframe,
    // but this gives immediate feedback.

    // This setTimeout is for initial feedback. The real "thank you"
    // should ideally come from the Apps Script callback if successful,
    // but for simplicity mirroring the previous example, we'll use this.
    setTimeout(() => {
        messageDiv.textContent = "Thank you for submitting your application! We will get back to you soon.";
        messageDiv.style.color = "green"; // Optional: style success message

        // Clear the message after 5 seconds
        setTimeout(() => {
            messageDiv.textContent = "";
        }, 5000);
    }, 1000); // Show "Thank you" after 1 second (adjust as needed)

    return true; // Important: Allow the form to submit to the Google Apps Script
}

// --- Additional JavaScript for dynamic sections (if not already present) ---

// Function to toggle academic sections based on study level
function toggleAcademicSections() {
    const studyLevel = document.getElementById('sopStudyLevel').value;

    document.getElementById('sop-academic-bachelors').style.display = 'none';
    document.getElementById('sop-academic-masters').style.display = 'none';

    if (studyLevel === 'bachelors' || studyLevel === 'masters' || studyLevel === 'research') {
        document.getElementById('sop-academic-bachelors').style.display = 'block';
    }
    if (studyLevel === 'masters' || studyLevel === 'research') {
        document.getElementById('sop-academic-masters').style.display = 'block';
    }
}

// Event listener for study level change
document.addEventListener('DOMContentLoaded', () => {
    const studyLevelSelect = document.getElementById('sopStudyLevel');
    if (studyLevelSelect) {
        studyLevelSelect.addEventListener('change', toggleAcademicSections);
        // Initial call to set visibility based on default/pre-selected value
        toggleAcademicSections();
    }
});


// Function to add more work experience fields
let workExperienceCount = 1; // Start from 1 as HTML already has one
document.getElementById('sopAddWorkExperience').addEventListener('click', function() {
    const container = document.getElementById('sop-work-experience-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'sop-work-experience-entry border p-4 rounded-md mb-4 bg-white';
    newEntry.innerHTML = `
        <h3 class="text-lg font-semibold text-gray-700 mb-3">Work Experience ${workExperienceCount + 1}</h3>
        <div class="sop-grid-cols-2">
            <div class="sop-input-group">
                <label for="sopEmployerName_${workExperienceCount}">Employer’s Name:</label>
                <input type="text" id="sopEmployerName_${workExperienceCount}" name="employerName[]">
            </div>
            <div class="sop-input-group">
                <label for="sopEmployerAddress_${workExperienceCount}">Address:</label>
                <input type="text" id="sopEmployerAddress_${workExperienceCount}" name="employerAddress[]">
            </div>
            <div class="sop-input-group">
                <label for="sopPosition_${workExperienceCount}">Your Position:</label>
                <input type="text" id="sopPosition_${workExperienceCount}" name="position[]">
            </div>
            <div class="sop-input-group">
                <label for="sopJoiningDate_${workExperienceCount}">Joining Date:</label>
                <input type="date" id="sopJoiningDate_${workExperienceCount}" name="joiningDate[]">
            </div>
            <div class="sop-input-group">
                <label for="sopResigningDate_${workExperienceCount}">Resigning Date (if applicable):</label>
                <input type="date" id="sopResigningDate_${workExperienceCount}" name="resigningDate[]">
            </div>
            <div class="sop-input-group col-span-full">
                <label for="sopDuties_${workExperienceCount}">Your Duties in brief:</label>
                <textarea id="sopDuties_${workExperienceCount}" name="duties[]"></textarea>
            </div>
        </div>
    `;
    container.appendChild(newEntry);
    workExperienceCount++;
});

// Function to add more extracurricular/internship fields
let extraCurricularCount = 1;
document.getElementById('sopAddExtraCurricular').addEventListener('click', function() {
    const container = document.getElementById('sop-extra-curricular-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'sop-extra-curricular-entry border p-4 rounded-md mb-4 bg-white';
    newEntry.innerHTML = `
        <h3 class="text-lg font-semibold text-gray-700 mb-3">Activity ${extraCurricularCount + 1}</h3>
        <div class="sop-grid-cols-2">
            <div class="sop-input-group">
                <label for="sopActivityType_${extraCurricularCount}">Type:</label>
                <select id="sopActivityType_${extraCurricularCount}" name="activityType[]">
                    <option value="">Select Type</option>
                    <option value="internship">Internship</option>
                    <option value="training">Training</option>
                    <option value="extracurricular">Extracurricular</option>
                </select>
            </div>
            <div class="sop-input-group">
                <label for="sopActivityDuration_${extraCurricularCount}">Duration:</label>
                <input type="text" id="sopActivityDuration_${extraCurricularCount}" name="activityDuration[]" placeholder="e.g., 3 months, Jan-Mar 2023">
            </div>
            <div class="sop-input-group">
                <label for="sopActivityPosition_${extraCurricularCount}">Your Position:</label>
                <input type="text" id="sopActivityPosition_${extraCurricularCount}" name="activityPosition[]" placeholder="e.g., Volunteer, Winner, Participant">
            </div>
            <div class="sop-input-group">
                <label for="sopOrganizer_${extraCurricularCount}">Organizer:</label>
                <input type="text" id="sopOrganizer_${extraCurricularCount}" name="organizer[]">
            </div>
            <div class="sop-input-group col-span-full">
                <label for="sopMajorActivities_${extraCurricularCount}">Major Activities:</label>
                <textarea id="sopMajorActivities_${extraCurricularCount}" name="majorActivities[]"></textarea>
            </div>
        </div>
    `;
    container.appendChild(newEntry);
    extraCurricularCount++;
});

// Function to add more financial family members
let familyMemberCount = 1;
document.getElementById('sopAddFamilyMember').addEventListener('click', function() {
    const container = document.getElementById('sop-financial-background-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'sop-financial-entry border p-4 rounded-md mb-4 bg-white';
    newEntry.innerHTML = `
        <h3 class="text-lg font-semibold text-gray-700 mb-3">Family Member ${familyMemberCount + 1}</h3>
        <div class="sop-grid-cols-2">
            <div class="sop-input-group">
                <label for="sopFmName_${familyMemberCount}">Family Member’s Name:</label>
                <input type="text" id="sopFmName_${familyMemberCount}" name="fmName[]">
            </div>
            <div class="sop-input-group">
                <label for="sopFmWorkDetails_${familyMemberCount}">Their Work Details (brief):</label>
                <input type="text" id="sopFmWorkDetails_${familyMemberCount}" name="fmWorkDetails[]" placeholder="e.g., Business Owner, Employee, Pensioner">
            </div>
        </div>

        <div class="sop-financial-income-subsection">
            <h4>Business Income</h4>
            <div class="sop-grid-cols-2">
                <div class="sop-input-group">
                    <label for="sopBusinessName_${familyMemberCount}">Business Name:</label>
                    <input type="text" id="sopBusinessName_${familyMemberCount}" name="businessName[]">
                </div>
                <div class="sop-input-group">
                    <label for="sopBusinessEstYear_${familyMemberCount}">Established Year:</label>
                    <input type="number" id="sopBusinessEstYear_${familyMemberCount}" name="businessEstYear[]" min="1900" max="2100">
                </div>
                <div class="sop-input-group col-span-full">
                    <label for="sopBusinessProfit_${familyMemberCount}">Annual Profit:</label>
                    <input type="text" id="sopBusinessProfit_${familyMemberCount}" name="businessProfit[]" placeholder="e.g., $50,000">
                </div>
            </div>
        </div>

        <div class="sop-financial-income-subsection">
            <h4>Salary Income</h4>
            <div class="sop-grid-cols-2">
                <div class="sop-input-group">
                    <label for="sopCompanyName_${familyMemberCount}">Company Name (Salary):</label>
                    <input type="text" id="sopCompanyName_${familyMemberCount}" name="companyName[]">
                </div>
                <div class="sop-input-group">
                    <label for="sopCompanyLocation_${familyMemberCount}">Location (Salary):</label>
                    <input type="text" id="sopCompanyLocation_${familyMemberCount}" name="companyLocation[]">
                </div>
                <div class="sop-input-group">
                    <label for="sopSalaryPosition_${familyMemberCount}">Position (Salary):</label>
                    <input type="text" id="sopSalaryPosition_${familyMemberCount}" name="salaryPosition[]">
                </div>
                <div class="sop-input-group">
                    <label for="sopSalaryJoiningDate_${familyMemberCount}">Joining Date (Salary):</label>
                    <input type="date" id="sopSalaryJoiningDate_${familyMemberCount}" name="salaryJoiningDate[]">
                </div>
                <div class="sop-input-group col-span-full">
                    <label for="sopSalaryAmount_${familyMemberCount}">Salary Amount (Annual):</label>
                    <input type="text" id="sopSalaryAmount_${familyMemberCount}" name="salaryAmount[]" placeholder="e.g., $30,000">
                </div>
            </div>
        </div>

        <div class="sop-financial-income-subsection">
            <h4>Pension Income</h4>
            <div class="sop-grid-cols-2">
                <div class="sop-input-group">
                    <label for="sopPensionGiver_${familyMemberCount}">Name of Pension Giver:</label>
                    <input type="text" id="sopPensionGiver_${familyMemberCount}" name="pensionGiver[]">
                </div>
                <div class="sop-input-group col-span-full">
                    <label for="sopPensionAmount_${familyMemberCount}">Pension Amount (Annual):</label>
                    <input type="text" id="sopPensionAmount_${familyMemberCount}" name="pensionAmount[]" placeholder="e.g., $10,000">
                </div>
            </div>
        </div>

        <div class="sop-financial-income-subsection">
            <h4>Land Lease or House Rent Income</h4>
            <div class="sop-grid-cols-2">
                <div class="sop-input-group">
                    <label for="sopAgreementDate_${familyMemberCount}">Agreement Date (Land/Rent):</label>
                    <input type="date" id="sopAgreementDate_${familyMemberCount}" name="agreementDate[]">
                </div>
                <div class="sop-input-group col-span-full">
                    <label for="sopRentAmount_${familyMemberCount}">Amount (Annual - Land/Rent):</label>
                    <input type="text" id="sopRentAmount_${familyMemberCount}" name="rentAmount[]" placeholder="e.g., $5,000">
                </div>
            </div>
        </div>

        <div class="sop-financial-income-subsection">
            <h4>Foreign Income</h4>
            <div class="sop-grid-cols-2">
                <div class="sop-input-group">
                    <label for="sopVisaType_${familyMemberCount}">Visa Type (Foreign Income):</label>
                    <input type="text" id="sopVisaType_${familyMemberCount}" name="visaType[]">
                </div>
                <div class="sop-input-group">
                    <label for="sopForeignWorkPosition_${familyMemberCount}">Work Position (Foreign Income):</label>
                    <input type="text" id="sopForeignWorkPosition_${familyMemberCount}" name="foreignWorkPosition[]">
                </div>
                <div class="sop-input-group">
                    <label for="sopForeignCompanyName_${familyMemberCount}">Company Name (Foreign Income):</label>
                    <input type="text" id="sopForeignCompanyName_${familyMemberCount}" name="foreignCompanyName[]">
                </div>
                <div class="sop-input-group col-span-full">
                    <label for="sopForeignAmount_${familyMemberCount}">Monthly or Annual Amount (Foreign Income):</label>
                    <input type="text" id="sopForeignAmount_${familyMemberCount}" name="foreignAmount[]" placeholder="e.g., $2,000/month">
                </div>
            </div>
        </div>
    `;
    container.appendChild(newEntry);
    familyMemberCount++;
});