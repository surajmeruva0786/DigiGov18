// Firestore Sample Data Initialization Script
// Run this script once to populate Firestore with sample data

// Sample Government Schemes Data
const sampleSchemes = [
    {
        name: "Pradhan Mantri Awas Yojana (PMAY)",
        description: "Housing for All by 2022 - Affordable housing scheme for urban and rural areas",
        benefits: "Financial assistance up to ₹2.67 lakh for construction of new house",
        eligibility: "Economically Weaker Section (EWS), Low Income Group (LIG), Middle Income Group (MIG)",
        type: "Central",
        state: "All"
    },
    {
        name: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana",
        description: "Health insurance scheme providing coverage of ₹5 lakh per family per year",
        benefits: "Cashless treatment at empaneled hospitals across India",
        eligibility: "Families identified as deprived rural families and identified occupational categories",
        type: "Central",
        state: "All"
    },
    {
        name: "Maharashtra Housing and Area Development Authority (MHADA)",
        description: "Affordable housing scheme for Maharashtra residents",
        benefits: "Subsidized housing units in Mumbai and other cities",
        eligibility: "Maharashtra residents with income below ₹1 lakh per annum",
        type: "State",
        state: "Maharashtra"
    },
    {
        name: "Karnataka Housing Board Scheme",
        description: "Affordable housing for Karnataka residents",
        benefits: "Low-cost housing units with easy EMI options",
        eligibility: "Karnataka residents with annual income below ₹3 lakh",
        type: "State",
        state: "Karnataka"
    },
    {
        name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        description: "Direct income support scheme for farmers",
        benefits: "₹6,000 per year in three equal installments",
        eligibility: "Small and marginal farmer families",
        type: "Central",
        state: "All"
    },
    {
        name: "Pradhan Mantri Mudra Yojana",
        description: "Micro Units Development and Refinance Agency for small businesses",
        benefits: "Loans up to ₹10 lakh for micro, small and medium enterprises",
        eligibility: "Small business owners, entrepreneurs, and MSMEs",
        type: "Central",
        state: "All"
    }
];

// Sample Teacher Resources Data
const sampleTeacherResources = [
    {
        title: "Mathematics Grade 5 - Fractions",
        description: "Comprehensive lesson plan and worksheets for teaching fractions to 5th grade students",
        subject: "Mathematics",
        class: "5",
        uploadedBy: "Teacher123",
        downloadUrl: "https://example.com/math-grade5-fractions.pdf",
        uploadedAt: new Date()
    },
    {
        title: "Science Grade 3 - Plants and Animals",
        description: "Interactive worksheets and activities for teaching about plants and animals",
        subject: "Science",
        class: "3",
        uploadedBy: "Teacher456",
        downloadUrl: "https://example.com/science-grade3-plants.pdf",
        uploadedAt: new Date()
    },
    {
        title: "English Grade 4 - Grammar Basics",
        description: "Grammar exercises and practice sheets for 4th grade English",
        subject: "English",
        class: "4",
        uploadedBy: "Teacher789",
        downloadUrl: "https://example.com/english-grade4-grammar.pdf",
        uploadedAt: new Date()
    }
];

// Function to initialize sample data
async function initializeSampleData() {
    try {
        console.log('Initializing sample data...');
        
        // Add sample schemes
        for (const scheme of sampleSchemes) {
            await db.collection('schemes').add({
                ...scheme,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        console.log('Sample schemes added successfully');
        
        // Add sample teacher resources
        for (const resource of sampleTeacherResources) {
            await db.collection('teacherResources').add({
                ...resource,
                uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        console.log('Sample teacher resources added successfully');
        
        console.log('Sample data initialization completed!');
        
    } catch (error) {
        console.error('Error initializing sample data:', error);
    }
}

// Function to add sample departments for complaints
function initializeDepartments() {
    const departments = [
        'Education',
        'Health',
        'Transport',
        'Water Supply',
        'Electricity',
        'Municipal Corporation',
        'Police',
        'Revenue',
        'Agriculture',
        'Social Welfare',
        'Women & Child Development',
        'Environment',
        'Public Works',
        'Food & Civil Supplies',
        'General'
    ];
    
    // Store in localStorage for offline access
    localStorage.setItem('departments', JSON.stringify(departments));
    console.log('Departments initialized');
}

// Function to initialize sample schemes in localStorage (fallback)
function initializeSchemesData() {
    if (!localStorage.getItem('schemes')) {
        localStorage.setItem('schemes', JSON.stringify(sampleSchemes));
        console.log('Sample schemes added to localStorage');
    }
}

// Auto-initialize when script loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize localStorage data
    initializeDepartments();
    initializeSchemesData();
    
    // Initialize Firestore data if Firebase is available
    if (typeof db !== 'undefined') {
        // Uncomment the line below to initialize sample data in Firestore
        // initializeSampleData();
    }
});

// Export functions for manual initialization
window.initializeSampleData = initializeSampleData;
window.initializeDepartments = initializeDepartments;
window.initializeSchemesData = initializeSchemesData;
