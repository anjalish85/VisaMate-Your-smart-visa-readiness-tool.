// Global variables
let countries = [];
let currentResults = null;

// DOM elements
const visaForm = document.getElementById('visaForm');
const resultsSection = document.getElementById('resultsSection');
const loadingOverlay = document.getElementById('loadingOverlay');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadCountries();
    setupEventListeners();
});

// Load countries from API
async function loadCountries() {
    try {
        const response = await fetch('/api/countries');
        countries = await response.json();
        populateCountrySelects();
    } catch (error) {
        console.error('Error loading countries:', error);
        showError('Failed to load countries. Please refresh the page.');
    }
}

// Populate country select elements
function populateCountrySelects() {
    const homeCountrySelect = document.getElementById('homeCountry');
    const destinationCountrySelect = document.getElementById('destinationCountry');
    
    // Sort countries alphabetically
    const sortedCountries = countries.sort((a, b) => a.name.localeCompare(b.name));
    
    // Populate both selects
    sortedCountries.forEach(country => {
        const option1 = new Option(country.name, country.code);
        const option2 = new Option(country.name, country.code);
        
        homeCountrySelect.add(option1);
        destinationCountrySelect.add(option2);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Form submission
    visaForm.addEventListener('submit', handleFormSubmit);
    
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // Form validation
    const formInputs = document.querySelectorAll('select');
    formInputs.forEach(input => {
        input.addEventListener('change', validateForm);
    });
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const formData = new FormData(visaForm);
    const data = {
        homeCountry: formData.get('homeCountry'),
        destinationCountry: formData.get('destinationCountry'),
        purpose: formData.get('purpose'),
        duration: formData.get('duration')
    };
    
    showLoading(true);
    
    try {
        const response = await fetch('/api/visa-check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Failed to check visa requirements');
        }
        
        const results = await response.json();
        currentResults = results;
        displayResults(results);
        
    } catch (error) {
        console.error('Error checking visa requirements:', error);
        showError('Failed to check visa requirements. Please try again.');
    } finally {
        showLoading(false);
    }
}

// Validate form
function validateForm() {
    const requiredFields = ['homeCountry', 'destinationCountry', 'purpose', 'duration'];
    let isValid = true;
    
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!field.value) {
            field.style.borderColor = '#e53e3e';
            isValid = false;
        } else {
            field.style.borderColor = '#e2e8f0';
        }
    });
    
    // Check if home and destination countries are the same
    const homeCountry = document.getElementById('homeCountry').value;
    const destinationCountry = document.getElementById('destinationCountry').value;
    
    if (homeCountry && destinationCountry && homeCountry === destinationCountry) {
        showError('Home country and destination country cannot be the same.');
        isValid = false;
    }
    
    return isValid;
}

// Display results
function displayResults(results) {
    // Update basic information
    document.getElementById('homeCountryName').textContent = results.homeCountry;
    document.getElementById('destinationCountryName').textContent = results.destinationCountry;
    document.getElementById('purposeName').textContent = getPurposeName(results.purpose);
    document.getElementById('durationName').textContent = getDurationName(results.duration);
    document.getElementById('visaType').textContent = results.visaType;
    document.getElementById('processingTime').textContent = `${results.processingTime.standard} (Standard) / ${results.processingTime.expedited} (Expedited)`;
    
    // Update approval chances
    updateApprovalChance(results.approvalChance);
    
    // Update document requirements
    updateDocumentRequirements(results.requirements);
    
    // Show results section
    resultsSection.style.display = 'block';
    resultsSection.classList.add('fade-in');
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Update approval chance display
function updateApprovalChance(percentage) {
    const percentageElement = document.getElementById('approvalPercentage');
    const descriptionElement = document.getElementById('chanceDescription');
    
    percentageElement.textContent = `${percentage}%`;
    
    // Update circle color based on percentage
    const circle = document.querySelector('.chance-circle');
    if (percentage >= 80) {
        circle.style.background = 'conic-gradient(from 0deg, #48bb78 0%, #38a169 100%)';
        descriptionElement.textContent = 'Excellent chances of approval!';
    } else if (percentage >= 60) {
        circle.style.background = 'conic-gradient(from 0deg, #ed8936 0%, #dd6b20 100%)';
        descriptionElement.textContent = 'Good chances of approval.';
    } else if (percentage >= 40) {
        circle.style.background = 'conic-gradient(from 0deg, #f6ad55 0%, #ed8936 100%)';
        descriptionElement.textContent = 'Moderate chances of approval.';
    } else {
        circle.style.background = 'conic-gradient(from 0deg, #f56565 0%, #e53e3e 100%)';
        descriptionElement.textContent = 'Lower chances of approval. Consider additional documentation.';
    }
}

// Update document requirements
function updateDocumentRequirements(requirements) {
    // Base requirements
    const baseList = document.getElementById('baseRequirements');
    baseList.innerHTML = '';
    requirements.base.forEach(req => {
        const li = document.createElement('li');
        li.textContent = req;
        baseList.appendChild(li);
    });
    
    // Purpose-specific requirements
    const purposeList = document.getElementById('purposeRequirements');
    purposeList.innerHTML = '';
    if (requirements.purposeSpecific && requirements.purposeSpecific.length > 0) {
        requirements.purposeSpecific.forEach(req => {
            const li = document.createElement('li');
            li.textContent = req;
            purposeList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No additional purpose-specific requirements.';
        li.style.fontStyle = 'italic';
        li.style.color = '#718096';
        purposeList.appendChild(li);
    }
    
    // Country-specific requirements
    const countryList = document.getElementById('countryRequirements');
    countryList.innerHTML = '';
    if (requirements.countrySpecific && requirements.countrySpecific.length > 0) {
        requirements.countrySpecific.forEach(req => {
            const li = document.createElement('li');
            li.textContent = req;
            countryList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No additional country-specific requirements.';
        li.style.fontStyle = 'italic';
        li.style.color = '#718096';
        countryList.appendChild(li);
    }
    
    // Additional requirements
    const additionalList = document.getElementById('additionalRequirements');
    additionalList.innerHTML = '';
    if (requirements.additional && requirements.additional.length > 0) {
        requirements.additional.forEach(req => {
            const li = document.createElement('li');
            li.textContent = req;
            additionalList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No additional requirements.';
        li.style.fontStyle = 'italic';
        li.style.color = '#718096';
        additionalList.appendChild(li);
    }
}

// Switch between tabs
function switchTab(tabName) {
    // Remove active class from all tabs and panes
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    
    // Add active class to selected tab and pane
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Show/hide loading overlay
function showLoading(show) {
    loadingOverlay.style.display = show ? 'flex' : 'none';
}

// Show error message
function showError(message) {
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f56565;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(245, 101, 101, 0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    errorDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 300);
    }, 5000);
}

// Helper functions
function getPurposeName(purpose) {
    const purposes = {
        'tourism': 'Tourism/Vacation',
        'business': 'Business',
        'study': 'Study/Education',
        'work': 'Work/Employment',
        'family': 'Family Visit',
        'medical': 'Medical Treatment',
        'transit': 'Transit',
        'diplomatic': 'Diplomatic'
    };
    return purposes[purpose] || purpose;
}

function getDurationName(duration) {
    const durations = {
        'short': 'Short-term (up to 90 days)',
        'medium': 'Medium-term (3-6 months)',
        'long': 'Long-term (6+ months)'
    };
    return durations[duration] || duration;
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
