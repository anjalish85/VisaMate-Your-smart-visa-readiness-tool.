module.exports = {
    countries: [
        // North America
        { code: 'US', name: 'United States', region: 'North America', visaRequired: true },
        { code: 'CA', name: 'Canada', region: 'North America', visaRequired: true },
        { code: 'MX', name: 'Mexico', region: 'North America', visaRequired: true },
        
        // Europe
        { code: 'UK', name: 'United Kingdom', region: 'Europe', visaRequired: true },
        { code: 'DE', name: 'Germany', region: 'Europe', visaRequired: true },
        { code: 'FR', name: 'France', region: 'Europe', visaRequired: true },
        { code: 'IT', name: 'Italy', region: 'Europe', visaRequired: true },
        { code: 'ES', name: 'Spain', region: 'Europe', visaRequired: true },
        { code: 'NL', name: 'Netherlands', region: 'Europe', visaRequired: true },
        { code: 'CH', name: 'Switzerland', region: 'Europe', visaRequired: true },
        { code: 'AT', name: 'Austria', region: 'Europe', visaRequired: true },
        { code: 'SE', name: 'Sweden', region: 'Europe', visaRequired: true },
        { code: 'NO', name: 'Norway', region: 'Europe', visaRequired: true },
        { code: 'DK', name: 'Denmark', region: 'Europe', visaRequired: true },
        { code: 'FI', name: 'Finland', region: 'Europe', visaRequired: true },
        
        // Asia
        { code: 'JP', name: 'Japan', region: 'Asia', visaRequired: true },
        { code: 'CN', name: 'China', region: 'Asia', visaRequired: true },
        { code: 'IN', name: 'India', region: 'Asia', visaRequired: true },
        { code: 'SG', name: 'Singapore', region: 'Asia', visaRequired: true },
        { code: 'KR', name: 'South Korea', region: 'Asia', visaRequired: true },
        { code: 'TH', name: 'Thailand', region: 'Asia', visaRequired: true },
        { code: 'MY', name: 'Malaysia', region: 'Asia', visaRequired: true },
        { code: 'ID', name: 'Indonesia', region: 'Asia', visaRequired: true },
        { code: 'PH', name: 'Philippines', region: 'Asia', visaRequired: true },
        { code: 'VN', name: 'Vietnam', region: 'Asia', visaRequired: true },
        { code: 'HK', name: 'Hong Kong', region: 'Asia', visaRequired: false },
        { code: 'TW', name: 'Taiwan', region: 'Asia', visaRequired: true },
        
        // Oceania
        { code: 'AU', name: 'Australia', region: 'Oceania', visaRequired: true },
        { code: 'NZ', name: 'New Zealand', region: 'Oceania', visaRequired: true },
        
        // South America
        { code: 'BR', name: 'Brazil', region: 'South America', visaRequired: true },
        { code: 'AR', name: 'Argentina', region: 'South America', visaRequired: true },
        { code: 'CL', name: 'Chile', region: 'South America', visaRequired: true },
        { code: 'CO', name: 'Colombia', region: 'South America', visaRequired: true },
        { code: 'PE', name: 'Peru', region: 'South America', visaRequired: true },
        
        // Africa
        { code: 'ZA', name: 'South Africa', region: 'Africa', visaRequired: true },
        { code: 'EG', name: 'Egypt', region: 'Africa', visaRequired: true },
        { code: 'NG', name: 'Nigeria', region: 'Africa', visaRequired: true },
        { code: 'KE', name: 'Kenya', region: 'Africa', visaRequired: true },
        { code: 'MA', name: 'Morocco', region: 'Africa', visaRequired: true },
        { code: 'GH', name: 'Ghana', region: 'Africa', visaRequired: true },
        
        // Middle East
        { code: 'AE', name: 'United Arab Emirates', region: 'Middle East', visaRequired: true },
        { code: 'SA', name: 'Saudi Arabia', region: 'Middle East', visaRequired: true },
        { code: 'QA', name: 'Qatar', region: 'Middle East', visaRequired: true },
        { code: 'KW', name: 'Kuwait', region: 'Middle East', visaRequired: true },
        { code: 'BH', name: 'Bahrain', region: 'Middle East', visaRequired: true },
        { code: 'OM', name: 'Oman', region: 'Middle East', visaRequired: true },
        { code: 'JO', name: 'Jordan', region: 'Middle East', visaRequired: true },
        { code: 'LB', name: 'Lebanon', region: 'Middle East', visaRequired: true },
        { code: 'TR', name: 'Turkey', region: 'Middle East', visaRequired: true },
        { code: 'IL', name: 'Israel', region: 'Middle East', visaRequired: true },
        
        // Other
        { code: 'RU', name: 'Russia', region: 'Europe/Asia', visaRequired: true },
        { code: 'PK', name: 'Pakistan', region: 'Asia', visaRequired: true },
        { code: 'BD', name: 'Bangladesh', region: 'Asia', visaRequired: true },
        { code: 'LK', name: 'Sri Lanka', region: 'Asia', visaRequired: true },
        { code: 'NP', name: 'Nepal', region: 'Asia', visaRequired: true },
        { code: 'BT', name: 'Bhutan', region: 'Asia', visaRequired: true },
        { code: 'MV', name: 'Maldives', region: 'Asia', visaRequired: true },
        { code: 'AF', name: 'Afghanistan', region: 'Asia', visaRequired: true },
        { code: 'IR', name: 'Iran', region: 'Middle East', visaRequired: true },
        { code: 'IQ', name: 'Iraq', region: 'Middle East', visaRequired: true }
    ],
    
    purposes: [
        { code: 'tourism', name: 'Tourism/Vacation', description: 'Leisure travel and sightseeing' },
        { code: 'business', name: 'Business', description: 'Business meetings, conferences, and work-related travel' },
        { code: 'study', name: 'Study/Education', description: 'Academic studies, research, or educational programs' },
        { code: 'work', name: 'Work/Employment', description: 'Employment, job search, or professional work' },
        { code: 'family', name: 'Family Visit', description: 'Visiting family members or relatives' },
        { code: 'medical', name: 'Medical Treatment', description: 'Medical treatment or healthcare services' },
        { code: 'transit', name: 'Transit', description: 'Passing through the country to reach another destination' },
        { code: 'diplomatic', name: 'Diplomatic', description: 'Official government or diplomatic travel' }
    ],
    
    durations: [
        { code: 'short', name: 'Short-term (up to 90 days)', days: 90 },
        { code: 'medium', name: 'Medium-term (3-6 months)', days: 180 },
        { code: 'long', name: 'Long-term (6+ months)', days: 365 }
    ],
    
    visaTypes: {
        'US': {
            'tourism': 'B-2 Tourist Visa',
            'business': 'B-1 Business Visa',
            'study': 'F-1 Student Visa',
            'work': 'H-1B Work Visa',
            'family': 'B-2 Family Visit Visa'
        },
        'UK': {
            'tourism': 'Standard Visitor Visa',
            'business': 'Business Visitor Visa',
            'study': 'Student Visa (Tier 4)',
            'work': 'Work Visa (Tier 2)',
            'family': 'Family Visitor Visa'
        },
        'CA': {
            'tourism': 'Visitor Visa',
            'business': 'Business Visitor Visa',
            'study': 'Study Permit',
            'work': 'Work Permit',
            'family': 'Family Visit Visa'
        },
        'AU': {
            'tourism': 'Tourist Visa (subclass 600)',
            'business': 'Business Visitor Visa (subclass 600)',
            'study': 'Student Visa (subclass 500)',
            'work': 'Work Visa (subclass 482)',
            'family': 'Family Visit Visa (subclass 600)'
        }
    },
    
    // Visa waiver programs and special agreements
    visaWaivers: {
        'US': ['SG', 'JP', 'KR', 'TW', 'CH', 'AT', 'BE', 'DK', 'FI', 'FR', 'DE', 'IT', 'LU', 'NL', 'NO', 'PT', 'ES', 'SE', 'UK', 'IE', 'NZ', 'AU'],
        'UK': ['US', 'CA', 'AU', 'NZ', 'JP', 'SG', 'KR'],
        'CA': ['US', 'UK', 'AU', 'NZ', 'JP', 'SG', 'KR'],
        'AU': ['US', 'CA', 'UK', 'NZ', 'JP', 'SG', 'KR'],
        'SG': ['US', 'CA', 'UK', 'AU', 'NZ', 'JP', 'KR', 'DE', 'FR', 'IT', 'ES', 'NL', 'CH', 'AT', 'BE', 'DK', 'FI', 'NO', 'PT', 'SE', 'IE']
    },
    
    // Processing fees (in USD)
    processingFees: {
        'US': { standard: 160, expedited: 265 },
        'UK': { standard: 95, expedited: 200 },
        'CA': { standard: 100, expedited: 200 },
        'AU': { standard: 140, expedited: 280 },
        'DE': { standard: 80, expedited: 120 },
        'FR': { standard: 80, expedited: 120 },
        'JP': { standard: 30, expedited: 60 },
        'SG': { standard: 30, expedited: 60 }
    }
};
