const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Import visa data
const visaData = require('./data/visaData');

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all countries
app.get('/api/countries', (req, res) => {
    res.json(visaData.countries);
});

// Get visa requirements and chances
app.post('/api/visa-check', (req, res) => {
    const { homeCountry, destinationCountry, purpose, duration } = req.body;
    
    try {
        const result = calculateVisaRequirements(homeCountry, destinationCountry, purpose, duration);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Calculate visa requirements and approval chances
function calculateVisaRequirements(homeCountry, destinationCountry, purpose, duration) {
    const homeCountryData = visaData.countries.find(c => c.code === homeCountry);
    const destinationCountryData = visaData.countries.find(c => c.code === destinationCountry);
    
    if (!homeCountryData || !destinationCountryData) {
        throw new Error('Invalid country selection');
    }
    
    // Get visa requirements for this combination
    const requirements = getVisaRequirements(homeCountry, destinationCountry, purpose);
    
    // Calculate approval chances
    const approvalChance = calculateApprovalChance(homeCountry, destinationCountry, purpose, duration);
    
    return {
        homeCountry: homeCountryData.name,
        destinationCountry: destinationCountryData.name,
        purpose,
        duration,
        requirements,
        approvalChance,
        processingTime: getProcessingTime(destinationCountry, purpose),
        visaType: getVisaType(purpose, duration)
    };
}

function getVisaRequirements(homeCountry, destinationCountry, purpose) {
    const baseRequirements = [
        'Valid passport (minimum 6 months validity)',
        'Completed visa application form',
        'Recent passport-sized photographs',
        'Proof of financial means',
        'Travel itinerary'
    ];
    
    const purposeSpecificRequirements = {
        'tourism': [
            'Hotel reservations or accommodation proof',
            'Travel insurance',
            'Return flight tickets'
        ],
        'business': [
            'Business invitation letter',
            'Company registration documents',
            'Bank statements (last 3 months)',
            'Employment letter'
        ],
        'study': [
            'University acceptance letter',
            'Proof of tuition payment',
            'Academic transcripts',
            'Language proficiency test results'
        ],
        'work': [
            'Job offer letter',
            'Work permit',
            'Educational certificates',
            'Professional experience documents'
        ],
        'family': [
            'Family invitation letter',
            'Proof of relationship',
            'Host\'s financial documents',
            'Accommodation proof'
        ]
    };
    
    const countrySpecificRequirements = getCountrySpecificRequirements(destinationCountry);
    
    return {
        base: baseRequirements,
        purposeSpecific: purposeSpecificRequirements[purpose] || [],
        countrySpecific: countrySpecificRequirements,
        additional: getAdditionalRequirements(homeCountry, destinationCountry)
    };
}

function getCountrySpecificRequirements(destinationCountry) {
    const requirements = {
        'US': [
            'DS-160 confirmation page',
            'Interview appointment confirmation',
            'Previous travel history'
        ],
        'UK': [
            'Biometric residence permit (if applicable)',
            'Tuberculosis test results (if required)',
            'Financial evidence'
        ],
        'CA': [
            'Biometric information',
            'Medical examination (if required)',
            'Police clearance certificate'
        ],
        'AU': [
            'Health insurance',
            'Character assessment',
            'Genuine temporary entrant statement'
        ],
        'DE': [
            'Travel health insurance',
            'Proof of accommodation',
            'Coverage of living expenses'
        ],
        'FR': [
            'Travel insurance (minimum €30,000)',
            'Proof of accommodation',
            'Financial means proof'
        ],
        'JP': [
            'Certificate of eligibility (for work/study)',
            'Guarantor documents',
            'Reason for visit'
        ],
        'SG': [
            'SG Arrival Card',
            'Yellow fever vaccination (if applicable)',
            'Proof of sufficient funds'
        ]
    };
    
    return requirements[destinationCountry] || [];
}

function getAdditionalRequirements(homeCountry, destinationCountry) {
    const additional = [];
    
    // Add requirements based on country relationships
    if (['US', 'CA', 'UK', 'AU', 'NZ'].includes(destinationCountry)) {
        additional.push('English language proficiency proof');
    }
    
    if (['DE', 'FR', 'IT', 'ES', 'NL'].includes(destinationCountry)) {
        additional.push('Schengen visa application');
    }
    
    if (destinationCountry === 'US' && homeCountry !== 'US') {
        additional.push('ESTA authorization (for visa waiver countries)');
    }
    
    return additional;
}

function calculateApprovalChance(homeCountry, destinationCountry, purpose, duration) {
    let baseChance = 70; // Base approval chance
    
    // Adjust based on home country
    const countryFactors = {
        'US': 85, 'CA': 80, 'UK': 75, 'AU': 75, 'DE': 70,
        'FR': 70, 'JP': 65, 'SG': 60, 'IN': 50, 'CN': 45,
        'BR': 55, 'MX': 60, 'RU': 40, 'NG': 35, 'PK': 30
    };
    
    baseChance = countryFactors[homeCountry] || 50;
    
    // Adjust based on destination country
    const destinationFactors = {
        'US': 0.7, 'CA': 0.8, 'UK': 0.75, 'AU': 0.8, 'DE': 0.85,
        'FR': 0.85, 'JP': 0.6, 'SG': 0.9, 'IN': 0.95, 'CN': 0.5
    };
    
    baseChance *= (destinationFactors[destinationCountry] || 0.7);
    
    // Adjust based on purpose
    const purposeFactors = {
        'tourism': 1.0,
        'business': 0.9,
        'study': 0.8,
        'work': 0.6,
        'family': 0.95
    };
    
    baseChance *= (purposeFactors[purpose] || 0.8);
    
    // Adjust based on duration
    if (duration === 'short') {
        baseChance *= 1.1;
    } else if (duration === 'long') {
        baseChance *= 0.9;
    }
    
    return Math.min(Math.max(Math.round(baseChance), 5), 95);
}

function getProcessingTime(destinationCountry, purpose) {
    const processingTimes = {
        'US': { standard: '15-30 days', expedited: '3-5 days' },
        'UK': { standard: '15-30 days', expedited: '5-10 days' },
        'CA': { standard: '14-30 days', expedited: '1-3 days' },
        'AU': { standard: '15-30 days', expedited: '2-5 days' },
        'DE': { standard: '10-15 days', expedited: '3-5 days' },
        'FR': { standard: '10-15 days', expedited: '2-3 days' },
        'JP': { standard: '5-10 days', expedited: '1-2 days' },
        'SG': { standard: '3-7 days', expedited: '1-2 days' }
    };
    
    return processingTimes[destinationCountry] || { standard: '10-20 days', expedited: '3-5 days' };
}

function getVisaType(purpose, duration) {
    const visaTypes = {
        'tourism': duration === 'short' ? 'Tourist Visa (B-2)' : 'Long-term Tourist Visa',
        'business': duration === 'short' ? 'Business Visa (B-1)' : 'Business Visa (Long-term)',
        'study': 'Student Visa (F-1)',
        'work': 'Work Visa (H-1B)',
        'family': 'Family Visa'
    };
    
    return visaTypes[purpose] || 'General Visa';
}

app.listen(PORT, () => {
    console.log(`Visa Portal server running on http://localhost:${PORT}`);
});
