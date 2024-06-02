// script.js

const resumeData = {
    personalInfo: {},
    workExperience: [],
    education: [],
    skills: "",
    projects: []
};

// Function to handle form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formId = form.id;
        
        if (formId === 'personal-info-form') {
            resumeData.personalInfo = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value
            };
        } else if (formId === 'work-experience-form') {
            resumeData.workExperience.push({
                jobTitle: document.getElementById('job-title').value,
                company: document.getElementById('company').value,
                workDates: document.getElementById('work-dates').value,
                jobDescription: document.getElementById('job-description').value
            });
        } else if (formId === 'education-form') {
            resumeData.education.push({
                school: document.getElementById('school').value,
                degree: document.getElementById('degree').value,
                graduationDates: document.getElementById('graduation-dates').value,
                achievements: document.getElementById('achievements').value
            });
        } else if (formId === 'skills-form') {
            resumeData.skills = document.getElementById('skills').value;
        } else if (formId === 'projects-form') {
            resumeData.projects.push({
                projectTitle: document.getElementById('project-title').value,
                projectDescription: document.getElementById('project-description').value
            });
        }
        updateResumePreview();
        showNextForm(getNextFormId(formId));
    });
});

// Function to show the next form section
function showNextForm(formId) {
    document.querySelectorAll('.form-section').forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
}

// Function to get the next form ID based on the current form ID
function getNextFormId(currentFormId) {
    const formIds = [
        'personal-info-form',
        'work-experience-form',
        'education-form',
        'skills-form',
        'projects-form'
    ];
    const currentIndex = formIds.indexOf(currentFormId);
    return formIds[currentIndex + 1] || 'projects-form';
}

// Function to navigate between form sections
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const formId = link.getAttribute('data-form');
        showNextForm(formId);
    });
});

// Function to update the resume preview
function updateResumePreview() {
    const previewContainer = document.getElementById('preview-container');
    previewContainer.innerHTML = ''; // Clear previous preview

    // Personal Information
    const personalInfoSection = document.createElement('div');
    personalInfoSection.classList.add('resume-section');
    let photoURL = '';
    if (resumeData.personalInfo.photo) {
        photoURL = URL.createObjectURL(resumeData.personalInfo.photo);
    }
    personalInfoSection.innerHTML = `
        <h3>Personal Information</h3>
        ${photoURL ? `<img src="${photoURL}" alt="Profile Photo" class="profile-photo">` : ''}

        <p><strong>Name:</strong> ${resumeData.personalInfo.name}</p>
        <p><strong>Email:</strong> ${resumeData.personalInfo.email}</p>
        <p><strong>Phone:</strong> ${resumeData.personalInfo.phone}</p>
        <p><strong>Address:</strong> ${resumeData.personalInfo.address}</p>
    `;
    previewContainer.appendChild(personalInfoSection);

    // Work Experience
    resumeData.workExperience.forEach((work, index) => {
        const workSection = document.createElement('div');
        workSection.classList.add('resume-section');
        workSection.innerHTML = `
            <h3>Work Experience ${index + 1}</h3>
            <p><strong>Job Title:</strong> ${work.jobTitle}</p>
            <p><strong>Company:</strong> ${work.company}</p>
            <p><strong>Dates:</strong> ${work.workDates}</p>
            <p><strong>Description:</strong> ${work.jobDescription}</p>
        `;
        previewContainer.appendChild(workSection);
    });

    // Education
    resumeData.education.forEach((edu, index) => {
        const eduSection = document.createElement('div');
        eduSection.classList.add('resume-section');
        eduSection.innerHTML = `
            <h3>Education ${index + 1}</h3>
            <p><strong>School:</strong> ${edu.school}</p>
            <p><strong>Degree:</strong> ${edu.degree}</p>
            <p><strong>Graduation Dates:</strong> ${edu.graduationDates}</p>
            <p><strong>Achievements:</strong> ${edu.achievements}</p>
        `;
        previewContainer.appendChild(eduSection);
    });

    // Skills
    const skillsSection = document.createElement('div');
    skillsSection.classList.add('resume-section');
    skillsSection.innerHTML = `
        <h3>Skills</h3>
        <p>${resumeData.skills}</p>
    `;
    previewContainer.appendChild(skillsSection);

    // Projects
    resumeData.projects.forEach((project, index) => {
        const projectSection = document.createElement('div');
        projectSection.classList.add('resume-section');
        projectSection.innerHTML = `
            <h3>Project ${index + 1}</h3>
            <p><strong>Title:</strong> ${project.projectTitle}</p>
            <p><strong>Description:</strong> ${project.projectDescription}</p>
        `;
        previewContainer.appendChild(projectSection);
    });
}

// Initially show the personal info form
showNextForm('personal-info-form');
