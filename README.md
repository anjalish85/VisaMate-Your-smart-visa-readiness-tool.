# Visa Portal

A comprehensive visa portal that helps users check visa requirements and approval chances based on their home country, destination country, purpose of visit, and duration of stay.

## Features

- **Country Selection**: Choose from 50+ countries worldwide
- **Purpose-Based Requirements**: Different document requirements for tourism, business, study, work, family visits, etc.
- **Approval Chances Calculator**: AI-powered calculation of visa approval probability
- **Document Requirements**: Comprehensive list of required documents organized by category
- **Processing Times**: Estimated processing times for different countries
- **Modern UI**: Responsive design with beautiful animations and user-friendly interface
- **Tips & Recommendations**: Helpful guidance for visa applications

## Quick Start (Standalone Version)

Since Node.js might not be installed on your system, you can use the standalone version:

1. **Open the standalone version**: Navigate to `public/standalone.html` in your web browser
2. **Fill out the form**: Select your home country, destination, purpose, and duration
3. **Get results**: View visa requirements, approval chances, and processing times

## Full Setup (With Node.js)

If you have Node.js installed, you can run the full application with server-side functionality:

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

3. **Open your browser** and go to `http://localhost:3000`

### Development Mode

For development with auto-restart:

```bash
npm run dev
```

## How to Use

1. **Select Your Home Country**: Choose the country you're currently residing in
2. **Choose Destination**: Select the country you want to visit
3. **Pick Purpose**: Select the reason for your visit (tourism, business, study, etc.)
4. **Set Duration**: Choose how long you plan to stay
5. **Get Results**: View comprehensive visa information including:
   - Approval chances percentage
   - Required documents (organized by category)
   - Processing times
   - Visa type information
   - Tips and recommendations

## Document Categories

The portal organizes document requirements into four categories:

- **Basic Requirements**: Standard documents needed for all visa applications
- **Purpose-Specific**: Additional documents based on your visit purpose
- **Country-Specific**: Special requirements for the destination country
- **Additional**: Extra requirements based on country relationships and agreements

## Approval Chances Algorithm

The approval chances are calculated based on:

- **Home Country**: Some countries have better visa approval rates
- **Destination Country**: Different countries have varying approval rates
- **Purpose of Visit**: Some purposes are easier to get approved than others
- **Duration**: Shorter stays generally have higher approval rates
- **Country Relationships**: Bilateral agreements and visa waiver programs

## Supported Countries

The portal includes comprehensive data for:

- **North America**: USA, Canada, Mexico
- **Europe**: UK, Germany, France, Italy, Spain, Netherlands, Switzerland, Austria, Sweden, Norway, Denmark, Finland
- **Asia**: Japan, China, India, Singapore, South Korea, Thailand, Malaysia, Indonesia, Philippines, Vietnam, Hong Kong, Taiwan
- **Oceania**: Australia, New Zealand
- **South America**: Brazil, Argentina, Chile, Colombia, Peru
- **Africa**: South Africa, Egypt, Nigeria, Kenya, Morocco, Ghana
- **Middle East**: UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman, Jordan, Lebanon, Turkey, Israel
- **Other**: Russia, Pakistan, Bangladesh, Sri Lanka, Nepal, Bhutan, Maldives, Afghanistan, Iran, Iraq

## File Structure

```
VISA_APP/
├── package.json              # Project dependencies
├── server.js                 # Express server (Node.js version)
├── data/
│   └── visaData.js          # Visa data and requirements
├── public/
│   ├── index.html           # Main application (server version)
│   ├── standalone.html      # Standalone version (no server needed)
│   ├── styles.css           # CSS styles
│   └── script.js            # JavaScript functionality
└── README.md                # This file
```

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Styling**: Custom CSS with modern design principles
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (responsive design)

## Disclaimer

This application provides general guidance and information about visa requirements. The information is for educational purposes only and should not be considered as official immigration advice. Always consult with official government sources and immigration authorities for the most current and accurate visa requirements.

## Contributing

Feel free to contribute to this project by:
- Adding more countries and their requirements
- Improving the approval chances algorithm
- Enhancing the user interface
- Adding new features

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues or have questions, please check the browser console for error messages and ensure all files are properly loaded.
