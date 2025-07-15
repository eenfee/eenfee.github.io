
        (function() { // IIFE for encapsulation
            // IMPORTANT: Replace with your deployed Google Apps Script Web App URL
            const GOOGLE_APP_SCRIPT_URL = 'YOUR_GOOGLE_APP_SCRIPT_WEB_APP_URL_HERE'; // <--- REPLACE THIS LINE

            const sopStudentForm = document.getElementById('sopStudentForm');
            const sopStudyLevelSelect = document.getElementById('sopStudyLevel');
            const sopAcademicBachelors = document.getElementById('sop-academic-bachelors');
            const sopAcademicMasters = document.getElementById('sop-academic-masters');
            const sopHiddenIframe = document.getElementById('sopHiddenIframe');

            // Function to update academic section visibility based on study level
            function sopUpdateAcademicVisibility() {
                const selectedLevel = sopStudyLevelSelect.value;

                // Hide all dynamic academic sections first
                sopAcademicBachelors.style.display = 'none';
                sopAcademicMasters.style.display = 'none';

                // Show sections based on selected study level
                if (selectedLevel === 'bachelors') {
                    // For Bachelor's, only SEE/SLC and +2 are needed (which are always visible)
                } else if (selectedLevel === 'masters') {
                    sopAcademicBachelors.style.display = 'block'; // Masters students also need Bachelor's info
                } else if (selectedLevel === 'research') {
                    sopAcademicBachelors.style.display = 'block'; // Research students need Bachelor's and Master's
                    sopAcademicMasters.style.display = 'block';
                }
            }

            // Add event listener for changes in the study level dropdown
            sopStudyLevelSelect.addEventListener('change', sopUpdateAcademicVisibility);

            // Initial call to set correct visibility based on default/pre-selected value
            sopUpdateAcademicVisibility();

            // --- Dynamic "Add More" Functionality ---

            // Function to create a new input group with incremented IDs/names
            function sopCreateInputGroup(labelText, inputType, namePrefix, placeholder = '') {
                const div = document.createElement('div');
                div.className = 'sop-input-group';
                const label = document.createElement('label');
                label.textContent = labelText;
                const input = document.createElement(inputType === 'textarea' ? 'textarea' : 'input');
                input.type = inputType;
                input.name = namePrefix + '[]'; // Use array notation for multiple entries
                input.placeholder = placeholder;
                if (inputType === 'number') {
                    input.min = "1900";
                    input.max = "2100";
                }
                div.appendChild(label);
                div.appendChild(input);
                return div;
            }

            // Function to create a new select input group
            function sopCreateSelectGroup(labelText, namePrefix, options) {
                const div = document.createElement('div');
                div.className = 'sop-input-group';
                const label = document.createElement('label');
                label.textContent = labelText;
                const select = document.createElement('select');
                select.name = namePrefix + '[]';
                options.forEach(optionText => {
                    const option = document.createElement('option');
                    option.value = optionText.toLowerCase().replace(/ /g, '');
                    option.textContent = optionText;
                    select.appendChild(option);
                });
                div.appendChild(label);
                div.appendChild(select);
                return div;
            }

            // Add Work Experience
            let sopWorkExperienceCount = 0; // Start at 0 for initial element
            document.getElementById('sopAddWorkExperience').addEventListener('click', function() {
                sopWorkExperienceCount++; // Increment before creating new element
                const container = document.getElementById('sop-work-experience-container');
                const newEntry = document.createElement('div');
                newEntry.className = 'sop-work-experience-entry border p-4 rounded-md mb-4 bg-white';
                newEntry.innerHTML = `
                    <h3 class="text-lg font-semibold text-gray-700 mb-3">Work Experience ${sopWorkExperienceCount + 1}</h3>
                    <div class="sop-grid-cols-2">
                        ${sopCreateInputGroup('Employer’s Name:', 'text', 'employerName').outerHTML}
                        ${sopCreateInputGroup('Address:', 'text', 'employerAddress').outerHTML}
                        ${sopCreateInputGroup('Your Position:', 'text', 'position').outerHTML}
                        ${sopCreateInputGroup('Joining Date:', 'date', 'joiningDate').outerHTML}
                        ${sopCreateInputGroup('Resigning Date (if applicable):', 'date', 'resigningDate').outerHTML}
                        <div class="sop-input-group col-span-full">
                            <label>Your Duties in brief:</label>
                            <textarea name="duties[]"></textarea>
                        </div>
                    </div>
                `;
                container.appendChild(newEntry);
            });

            // Add Extra-Curricular Activity
            let sopExtraCurricularCount = 0; // Start at 0 for initial element
            document.getElementById('sopAddExtraCurricular').addEventListener('click', function() {
                sopExtraCurricularCount++; // Increment before creating new element
                const container = document.getElementById('sop-extra-curricular-container');
                const newEntry = document.createElement('div');
                newEntry.className = 'sop-extra-curricular-entry border p-4 rounded-md mb-4 bg-white';
                newEntry.innerHTML = `
                    <h3 class="text-lg font-semibold text-gray-700 mb-3">Activity ${sopExtraCurricularCount + 1}</h3>
                    <div class="sop-grid-cols-2">
                        ${sopCreateSelectGroup('Type:', 'activityType', ['Select Type', 'Internship', 'Training', 'Extracurricular']).outerHTML}
                        ${sopCreateInputGroup('Duration:', 'text', 'activityDuration', 'e.g., 3 months, Jan-Mar 2023').outerHTML}
                        ${sopCreateInputGroup('Your Position:', 'text', 'activityPosition', 'e.g., Volunteer, Winner, Participant').outerHTML}
                        ${sopCreateInputGroup('Organizer:', 'text', 'organizer').outerHTML}
                        <div class="sop-input-group col-span-full">
                            <label>Major Activities:</label>
                            <textarea name="majorActivities[]"></textarea>
                        </div>
                    </div>
                `;
                container.appendChild(newEntry);
            });

            // Add Family Member for Financial Background
            let sopFamilyMemberCount = 0; // Start at 0 for initial element
            document.getElementById('sopAddFamilyMember').addEventListener('click', function() {
                sopFamilyMemberCount++; // Increment before creating new element
                const container = document.getElementById('sop-financial-background-container');
                const newEntry = document.createElement('div');
                newEntry.className = 'sop-financial-entry border p-4 rounded-md mb-4 bg-white';
                newEntry.innerHTML = `
                    <h3 class="text-lg font-semibold text-gray-700 mb-3">Family Member ${sopFamilyMemberCount + 1}</h3>
                    <div class="sop-grid-cols-2">
                        ${sopCreateInputGroup('Family Member’s Name:', 'text', 'fmName').outerHTML}
                        ${sopCreateInputGroup('Their Work Details (brief):', 'text', 'fmWorkDetails', 'e.g., Business Owner, Employee, Pensioner').outerHTML}
                    </div>

                    <div class="sop-financial-income-subsection">
                        <h4>Business Income</h4>
                        <div class="sop-grid-cols-2">
                            ${sopCreateInputGroup('Business Name:', 'text', 'businessName').outerHTML}
                            ${sopCreateInputGroup('Established Year:', 'number', 'businessEstYear').outerHTML}
                            <div class="sop-input-group col-span-full">
                                <label>Annual Profit:</label>
                                <input type="text" name="businessProfit[]" placeholder="e.g., $50,000">
                            </div>
                        </div>
                    </div>

                    <div class="sop-financial-income-subsection">
                        <h4>Salary Income</h4>
                        <div class="sop-grid-cols-2">
                            ${sopCreateInputGroup('Company Name (Salary):', 'text', 'companyName').outerHTML}
                            ${sopCreateInputGroup('Location (Salary):', 'text', 'companyLocation').outerHTML}
                            ${sopCreateInputGroup('Position (Salary):', 'text', 'salaryPosition').outerHTML}
                            ${sopCreateInputGroup('Joining Date (Salary):', 'date', 'salaryJoiningDate').outerHTML}
                            <div class="sop-input-group col-span-full">
                                <label>Salary Amount (Annual):</label>
                                <input type="text" name="salaryAmount[]" placeholder="e.g., $30,000">
                            </div>
                        </div>
                    </div>

                    <div class="sop-financial-income-subsection">
                        <h4>Pension Income</h4>
                        <div class="sop-grid-cols-2">
                            ${sopCreateInputGroup('Name of Pension Giver:', 'text', 'pensionGiver').outerHTML}
                            <div class="sop-input-group col-span-full">
                                <label>Pension Amount (Annual):</label>
                                <input type="text" name="pensionAmount[]" placeholder="e.g., $10,000">
                            </div>
                        </div>
                    </div>

                    <div class="sop-financial-income-subsection">
                        <h4>Land Lease or House Rent Income</h4>
                        <div class="sop-grid-cols-2">
                            ${sopCreateInputGroup('Agreement Date (Land/Rent):', 'date', 'agreementDate').outerHTML}
                            <div class="sop-input-group col-span-full">
                                <label>Amount (Annual - Land/Rent):</label>
                                <input type="text" name="rentAmount[]" placeholder="e.g., $5,000">
                            </div>
                        </div>
                    </div>

                    <div class="sop-financial-income-subsection">
                        <h4>Foreign Income</h4>
                        <div class="sop-grid-cols-2">
                            ${sopCreateInputGroup('Visa Type (Foreign Income):', 'text', 'visaType').outerHTML}
                            ${sopCreateInputGroup('Work Position (Foreign Income):', 'text', 'foreignWorkPosition').outerHTML}
                            ${sopCreateInputGroup('Company Name (Foreign Income):', 'text', 'foreignCompanyName').outerHTML}
                            <div class="sop-input-group col-span-full">
                                <label>Monthly or Annual Amount (Foreign Income):</label>
                                <input type="text" name="foreignAmount[]" placeholder="e.g., $2,000/month">
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(newEntry);
            });


            // Function to handle form submission (called by onsubmit)
            function sopHandleSubmit() {
                // Show loading message
                const loadingBox = document.createElement('div');
                loadingBox.className = 'fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50';
                loadingBox.innerHTML = `
                    <div class="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">Submitting Form...</h3>
                        <p class="text-gray-600 mb-6">Please wait while your data is being processed.</p>
                        <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 mx-auto"></div>
                    </div>
                    <style>
                        .loader {
                            border-top-color: #3b82f6;
                            -webkit-animation: spinner 1.5s linear infinite;
                            animation: spinner 1.5s linear infinite;
                        }
                        @-webkit-keyframes spinner {
                            0% { -webkit-transform: rotate(0deg); }
                            100% { -webkit-transform: rotate(360deg); }
                        }
                        @keyframes spinner {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    </style>
                `;
                document.body.appendChild(loadingBox);

                // Return true to allow the form to submit normally to the iframe
                return true;
            }

            // Listen for the iframe to load (indicating the Apps Script has processed the submission)
            sopHiddenIframe.onload = function() {
                // Remove loading message
                const existingLoadingBox = document.querySelector('.fixed.inset-0.bg-gray-800');
                if (existingLoadingBox) {
                    document.body.removeChild(existingLoadingBox);
                }

                // Show success message
                const successMessageBox = document.createElement('div');
                successMessageBox.className = 'fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50';
                successMessageBox.innerHTML = `
                    <div class="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">Form Submitted Successfully!</h3>
                        <p class="text-gray-600 mb-6">Your form is submitted! Our team will reach out to you for further discussion.</p>
                        <button id="sopCloseMessageBox" class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Close</button>
                    </div>
                `;
                document.body.appendChild(successMessageBox);

                document.getElementById('sopCloseMessageBox').addEventListener('click', function() {
                    document.body.removeChild(successMessageBox);
                    sopStudentForm.reset(); // Optionally reset the form after successful submission
                    sopUpdateAcademicVisibility(); // Reset academic section visibility
                });

                // Clear the iframe content to prevent re-triggering onload on subsequent submissions
                sopHiddenIframe.contentWindow.document.open();
                sopHiddenIframe.contentWindow.document.close();
            };

            // You might want an onerror for the iframe, but direct error feedback from no-cors POST is limited.
            // Errors would primarily be seen in the Google Apps Script execution logs.

        })(); // End of IIFE

        

        