let currentStep = 1;
let employmentCount = 1;
let educationCount = 1;

function nextStep(step) {
    document.getElementById(`step-${currentStep}`).classList.add('hidden');
    document.getElementById(`step-${step}`).classList.remove('hidden');
    updateStepIndicator(step);
    currentStep = step;
}

function prevStep(step) {
    document.getElementById(`step-${currentStep}`).classList.add('hidden');
    document.getElementById(`step-${step}`).classList.remove('hidden');
    updateStepIndicator(step);
    currentStep = step;
}

function updateStepIndicator(step) {
    const indicators = document.querySelectorAll('.step-indicator');
    indicators.forEach((indicator, index) => {
        if (index + 1 === step) {
            indicator.classList.remove('bg-gray-300', 'text-gray-800');
            indicator.classList.add('bg-blue-600', 'text-white');
        } else {
            indicator.classList.remove('bg-blue-600', 'text-white');
            indicator.classList.add('bg-gray-300', 'text-gray-800');
        }
    });
}

function addEmployment() {
    employmentCount++;
    const employmentEntries = document.getElementById('employment-entries');
    const newEntry = document.createElement('div');
    newEntry.className = 'employment-entry mb-4';
    newEntry.innerHTML = `
        <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="job-title-${employmentCount}">Job Title</label>
            <input type="text" id="job-title-${employmentCount}" class="w-full p-2 border rounded" placeholder="e.g., Senior Sales Coordinator">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="company-${employmentCount}">Company</label>
            <input type="text" id="company-${employmentCount}" class="w-full p-2 border rounded" placeholder="e.g., Comet Granito Pvt. Ltd, Morbi">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="duration-${employmentCount}">Duration</label>
            <input type="text" id="duration-${employmentCount}" class="w-full p-2 border rounded" placeholder="e.g., April 2018 - Present">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="responsibilities-${employmentCount}">Responsibilities</label>
            <textarea id="responsibilities-${employmentCount}" class="w-full p-2 border rounded" rows="4" placeholder="e.g., Coordinated sales activities to optimize team performance..."></textarea>
        </div>
    `;
    employmentEntries.appendChild(newEntry);
}

function addEducation() {
    educationCount++;
    const educationEntries = document.getElementById('education-entries');
    const newEntry = document.createElement('div');
    newEntry.className = 'education-entry mb-4';
    newEntry.innerHTML = `
        <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="degree-${educationCount}">Degree</label>
            <input type="text" id="degree-${educationCount}" class="w-full p-2 border rounded" placeholder="e.g., BE Automobile">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="institution-${educationCount}">Institution</label>
            <input type="text" id="institution-${educationCount}" class="w-full p-2 border rounded" placeholder="e.g., Marwadi Education Foundation's Group of Institution, Rajkot">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="edu-duration-${educationCount}">Duration</label>
            <input type="text" id="edu-duration-${educationCount}" class="w-full p-2 border rounded" placeholder="e.g., 2013 - 2017">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="details-${educationCount}">Details</label>
            <input type="text" id="details-${educationCount}" class="w-full p-2 border rounded" placeholder="e.g., Graduated with 8.2 CGPA">
        </div>
    `;
    educationEntries.appendChild(newEntry);
}

function generateResume() {
    // Collect data from the form
    const resumeData = {
        name: document.getElementById('name').value,
        profileSummary: document.getElementById('profile-summary').value,
        address: `${document.getElementById('address').value}, ${document.getElementById('city').value}, ${document.getElementById('state').value}, ${document.getElementById('zip').value}`,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        skills: document.getElementById('skills').value,
        languages: document.getElementById('languages').value,
        hobbies: document.getElementById('hobbies').value,
        employment: [],
        education: []
    };

    // Collect employment history
    for (let i = 1; i <= employmentCount; i++) {
        const jobTitle = document.getElementById(`job-title-${i}`).value;
        const company = document.getElementById(`company-${i}`).value;
        const duration = document.getElementById(`duration-${i}`).value;
        const responsibilities = document.getElementById(`responsibilities-${i}`).value;
        if (jobTitle && company && duration) {
            resumeData.employment.push({ jobTitle, company, duration, responsibilities });
        }
    }

    // Collect education history
    for (let i = 1; i <= educationCount; i++) {
        const degree = document.getElementById(`degree-${i}`).value;
        const institution = document.getElementById(`institution-${i}`).value;
        const duration = document.getElementById(`edu-duration-${i}`).value;
        const details = document.getElementById(`details-${i}`).value;
        if (degree && institution && duration) {
            resumeData.education.push({ degree, institution, duration, details });
        }
    }

    // Store data in localStorage to pass to preview page
    localStorage.setItem('resumeData', JSON.stringify(resumeData));

    // Redirect to preview page
    window.location.href = 'preview.html';
}

// Populate resume preview on preview.html
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('preview.html')) {
        const resumeData = JSON.parse(localStorage.getItem('resumeData'));
        if (resumeData) {
            // Populate resume fields
            document.getElementById('resume-name').textContent = resumeData.name || 'Your Name';
            document.getElementById('resume-profile-summary').textContent = resumeData.profileSummary || 'Profile summary not provided.';
            document.getElementById('resume-address').textContent = resumeData.address || 'Address not provided.';
            document.getElementById('resume-phone').textContent = resumeData.phone || 'Phone not provided.';
            document.getElementById('resume-email').textContent = resumeData.email || 'Email not provided.';
            document.getElementById('resume-skills').textContent = resumeData.skills || 'Skills not provided.';
            document.getElementById('resume-languages').textContent = resumeData.languages || 'Languages not provided.';
            document.getElementById('resume-hobbies').textContent = resumeData.hobbies || 'Hobbies not provided.';

            // Populate employment history
            const employmentSection = document.getElementById('resume-employment');
            employmentSection.innerHTML = '';
            resumeData.employment.forEach(job => {
                const jobEntry = document.createElement('div');
                jobEntry.className = 'mb-4';
                jobEntry.innerHTML = `
                    <h3 class="text-lg font-semibold text-gray-800">${job.jobTitle} at ${job.company}</h3>
                    <p class="text-gray-600 italic">${job.duration}</p>
                    <p class="text-gray-600">${job.responsibilities}</p>
                `;
                employmentSection.appendChild(jobEntry);
            });

            // Populate education history
            const educationSection = document.getElementById('resume-education');
            educationSection.innerHTML = '';
            resumeData.education.forEach(edu => {
                const eduEntry = document.createElement('div');
                eduEntry.className = 'mb-4';
                eduEntry.innerHTML = `
                    <h3 class="text-lg font-semibold text-gray-800">${edu.degree}, ${edu.institution}</h3>
                    <p class="text-gray-600 italic">${edu.duration}</p>
                    <p class="text-gray-600">${edu.details}</p>
                `;
                educationSection.appendChild(eduEntry);
            });

            // Download as Word
            document.getElementById('download-word').addEventListener('click', () => {
                try {
                    if (typeof htmlDocx === 'undefined') {
                        alert('html-docx-js library failed to load. Please check your internet connection or try again later.');
                        return;
                    }
                    const htmlContent = document.getElementById('resume-preview').innerHTML;
                    const converted = htmlDocx.asBlob(`
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { font-family: Arial, sans-serif; }
                                h1 { font-size: 24px; font-weight: bold; }
                                h2 { font-size: 18px; font-weight: bold; }
                                h3 { font-size: 16px; font-weight: bold; }
                                p { font-size: 14px; }
                            </style>
                        </head>
                        <body>${htmlContent}</body>
                        </html>
                    `);
                    const url = window.URL.createObjectURL(converted);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'resume.docx';
                    link.click();
                    window.URL.revokeObjectURL(url);
                } catch (error) {
                    console.error('Error generating Word document:', error);
                    alert('Failed to generate Word document. Please try again.');
                }
            });

            // Download as PDF
            document.getElementById('download-pdf').addEventListener('click', () => {
                try {
                    if (!window.jspdf) {
                        alert('jsPDF library failed to load. Please check your internet connection or try again later.');
                        return;
                    }
                    const { jsPDF } = window.jspdf;
                    const doc = new jsPDF({
                        orientation: 'portrait',
                        unit: 'mm',
                        format: 'a4'
                    });
                    const element = document.getElementById('resume-preview');
                    doc.html(element, {
                        callback: function (doc) {
                            doc.save('resume.pdf');
                        },
                        x: 10,
                        y: 10,
                        width: 190,
                        windowWidth: 650,
                        html2canvas: {
                            scale: 0.3 // Adjust scale to fit content better
                        }
                    });
                } catch (error) {
                    console.error('Error generating PDF:', error);
                    alert('Failed to generate PDF. Please try again.');
                }
            });
        }
    }
});