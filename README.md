# DigiGov18 - Government Service Portal

A comprehensive government service portal built with HTML, CSS, and JavaScript, integrated with Firebase Firestore for data management and voice recognition for accessibility.

## 🚀 Features Implemented

### 1. Government Schemes Module
- **Dynamic Scheme Display**: Fetches schemes from Firestore based on user's state
- **State Detection**: Automatically detects user's state from Aadhaar details
- **Voice Search**: Search schemes using voice commands
- **Application Management**: Apply for schemes and track application status
- **Quick Complaint**: Voice-enabled complaint submission

### 2. Unified Complaints, Bill Payments & Documents Module

#### 🟥 Complaints System
- **Multi-department Support**: File complaints across various government departments
- **Voice Input**: Record complaints using voice recognition
- **Text Input**: Traditional text-based complaint submission
- **Status Tracking**: Real-time complaint status updates
- **Firestore Integration**: All complaints stored in `/complaints/{uid}/`

#### 🟨 Bill Payments
- **Multiple Utilities**: Electricity, Gas, Water bill payments
- **UPI Integration**: Secure payment processing via UPI
- **PIN Protection**: 4-digit PIN verification for security
- **Transaction Records**: Complete payment history in `/payments/{uid}/`
- **Mobile-friendly**: Optimized for mobile payment apps

#### 🟪 Document Management
- **File Upload**: Upload documents to Firebase Storage
- **Document Types**: Support for various document categories
- **Preview & Download**: View and download uploaded documents
- **Metadata Storage**: Document information stored in `/documents/{uid}/`
- **File Management**: Delete and organize documents

### 3. Children Module (Education & Reminders)
- **Child Profiles**: Add and manage multiple child records
- **Attendance Tracking**: Mark daily attendance with streak counter
- **Vaccination Reminders**: Schedule and track vaccination dates
- **Teacher Resources**: Download educational materials uploaded by teachers
- **Parent Complaints**: File complaints related to children's education
- **Firestore Collections**: `/children/{userId}/` and `/teacherResources/`

## 🛠 Technical Implementation

### Firebase Integration
- **Authentication**: User registration and login
- **Firestore**: Real-time database for all data
- **Storage**: File upload and management
- **Security**: User-based data access control

### Voice Features
- **Speech Recognition**: Web Speech API integration
- **Voice Commands**: Navigate using voice commands
- **Voice Input**: Text input via voice recognition
- **Multi-language Support**: English and Hindi support

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Progressive Web App**: Works offline with cached data
- **Accessibility**: Voice navigation and screen reader support
- **Modern UI**: Gradient backgrounds and smooth animations

## 📁 File Structure

```
DigiGov18/
├── index.html              # Main HTML file
├── app.js                  # Core application logic
├── firebase.js             # Firebase configuration
├── firestore-sample-data.js # Sample data initialization
├── styles.css              # CSS styles
├── voice.js                # Voice recognition features
├── voice-integration.js    # Voice command integration
├── translations.js         # Multi-language support
├── language.js             # Language switching
├── sheets-sync.js          # Google Sheets integration
├── health-services.js      # Health services module
├── education-assistance.js  # Education assistance
├── citizen-feedback.js     # Feedback system
├── digital-id-card.js      # Digital ID features
└── official-feedback-dashboard.js # Admin dashboard
```

## 🔧 Setup Instructions

### 1. Firebase Setup
1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication, Firestore, and Storage
3. Update `firebase.js` with your project configuration
4. Set up Firestore security rules for user-based access

### 2. Firestore Collections Structure
```
/schemes/
  - name, description, benefits, eligibility, type, state

/complaints/
  - userId, userName, sector, text, status, createdAt

/payments/
  - userId, billType, consumerNumber, amount, status, transactionId, createdAt

/documents/
  - userId, name, type, fileName, size, downloadUrl, uploadedAt

/children/
  - userId, name, age, school, class, attendanceStreak, vaccinationDue, createdAt

/teacherResources/
  - title, description, subject, class, uploadedBy, downloadUrl, uploadedAt

/schemeApplications/
  - userId, schemeId, userName, status, appliedAt
```

### 3. Sample Data Initialization
1. Open browser console
2. Run `initializeSampleData()` to populate Firestore with sample data
3. Or use the automatic initialization in `firestore-sample-data.js`

### 4. Deployment
- **Static Hosting**: Deploy to Render, Netlify, or GitHub Pages
- **No Backend Required**: Pure client-side application
- **Firebase Hosting**: Recommended for optimal performance

## 🎯 Usage Guide

### For Citizens
1. **Register/Login**: Create account with Aadhaar verification
2. **Browse Schemes**: View available government schemes
3. **Apply for Schemes**: Submit applications with voice or text
4. **File Complaints**: Report issues to relevant departments
5. **Pay Bills**: Make utility bill payments via UPI
6. **Manage Documents**: Upload and organize important documents
7. **Track Children**: Monitor child's education and health

### For Officials
1. **Admin Dashboard**: Access official feedback dashboard
2. **View Applications**: Review scheme applications
3. **Manage Complaints**: Process citizen complaints
4. **Upload Resources**: Share educational materials
5. **Analytics**: View usage statistics and reports

## 🔒 Security Features
- **User Authentication**: Firebase Auth integration
- **Data Privacy**: User-based data access control
- **PIN Protection**: Secure payment processing
- **Input Validation**: Client and server-side validation
- **HTTPS Only**: Secure data transmission

## 🌐 Browser Support
- **Chrome**: Full support including voice features
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Optimized for mobile devices

## 📱 Mobile Features
- **Responsive Design**: Works on all screen sizes
- **Touch-friendly**: Optimized for touch interactions
- **Voice Commands**: Hands-free navigation
- **Offline Support**: Cached data for offline access
- **PWA Ready**: Can be installed as mobile app

## 🚀 Future Enhancements
- **AI Chatbot**: Automated customer support
- **Blockchain Integration**: Secure document verification
- **IoT Integration**: Smart city services
- **Advanced Analytics**: Machine learning insights
- **Multi-language Expansion**: Support for more regional languages

## 📞 Support
For technical support or feature requests, please contact the development team or create an issue in the project repository.

---

**Built with ❤️ for Digital India Initiative**
