document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    const formMessage = document.getElementById('form-message');
    const hiddenIframe = document.getElementById('hidden_iframe');

    // Academic sections
    const academicSEE = document.getElementById('academicSEE');
    const academicBachelors = document.getElementById('academicBachelors');
    const academicMasters = document.getElementById('academicMasters');
    const studyLevelSelect = document.getElementById('studyLevel');

    // Function to show a message after form submission
    window.showMessage = function() {
        formMessage.style.display = 'block';
        formMessage.textContent = 'Your application has been submitted successfully!';
        formMessage.className = 'form-message success';
        form.reset(); // Clear the form
        // Re-hide academic sections after reset
        academicBachelors.classList.add('hidden');
        academicMasters.classList.add('hidden');
        // Re-evaluate financial sections too
        document.querySelectorAll('[name$="Work Type"]').forEach(select => select.dispatchEvent(new Event('change')));

        // Hide message after a few seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
        return true; // Allows form to submit
    };

    // Listen for the iframe's load event to confirm submission
    hiddenIframe.onload = function() {
        if (form.submitted) { // Check a flag set on form submit
             showMessage();
             form.submitted = false; // Reset the flag
        }
    };

    form.addEventListener('submit', function() {
        form.submitted = true; // Set a flag when the form is submitted
    });

    // Dynamic visibility for Financial Background based on 'Work Details' selection
    const workDetailSelects = document.querySelectorAll('[name$="Work Type"]');

    workDetailSelects.forEach(select => {
        select.addEventListener('change', function() {
            const parentSection = this.closest('.financial-entry');
            if (!parentSection) return;

            // Hide all detail divs within this financial entry first
            const detailDivs = parentSection.querySelectorAll('.hidden');
            detailDivs.forEach(div => div.classList.add('hidden'));

            const selectedValue = this.value;
            let targetDivId;

            // Assuming a consistent naming convention like FM1 Work Type -> FM1 Business Name etc.
            // We need to extract the "FMx" part from the name attribute
            const namePrefixMatch = this.name.match(/^(FM\d+)/);
            if (!namePrefixMatch) return;
            const namePrefix = namePrefixMatch[1]; // e.g., "FM1"

            switch (selectedValue) {
                case 'Business':
                    targetDivId = namePrefix + 'BusinessDetails';
                    break;
                case 'Salary':
                    targetDivId = namePrefix + 'SalaryDetails';
                    break;
                case 'Pension':
                    targetDivId = namePrefix + 'PensionDetails';
                    break;
                case 'Land Lease/House Rent':
                    targetDivId = namePrefix + 'LandHouseDetails';
                    break;
                case 'Foreign Income':
                    targetDivId = namePrefix + 'ForeignIncomeDetails';
                    break;
                default:
                    // Do nothing if no specific type is selected or type is unknown
                    return;
            }

            const targetDiv = parentSection.querySelector(`#${targetDivId}`);
            if (targetDiv) {
                targetDiv.classList.remove('hidden');
            }
        });
        // Trigger change event on load for pre-filled values (if any)
        select.dispatchEvent(new Event('change'));
    });

    // Function to toggle academic sections based on study level
    window.toggleAcademicSections = function() {
        const selectedLevel = studyLevelSelect.value;

        // Hide all academic sections by default
        academicSEE.classList.add('hidden');
        academicBachelors.classList.add('hidden');
        academicMasters.classList.add('hidden');

        // Show sections based on selected level
        switch (selectedLevel) {
            case 'Bachelors':
                academicSEE.classList.remove('hidden');
                // Only SEE/+2 is shown for Bachelors
                break;
            case 'Masters':
                academicSEE.classList.remove('hidden');
                academicBachelors.classList.remove('hidden');
                // SEE/+2 and Bachelors for Masters
                break;
            case 'Research':
            case 'PhD': // Assuming PhD also requires all levels
                academicSEE.classList.remove('hidden');
                academicBachelors.classList.remove('hidden');
                academicMasters.classList.remove('hidden');
                // All levels for Research/PhD
                break;
            default:
                // If "Select" or an unhandled option, all remain hidden except SEE which is the base
                academicSEE.classList.remove('hidden'); // Assuming SEE/SLC is always a base requirement
                break;
        }
    };

    // Call on page load to set initial state based on any pre-filled value
    toggleAcademicSections();
});