const GOOGLE_SHEETS_CONFIG = {
    webAppUrl: 'https://script.google.com/macros/s/AKfycbypB7BfTpaJTbV1NDLwSG_3qT74gb54iUtce2GKthesHDIw4WKQpVTJTc9PbLMtoTLk/exec',
    enabled: false
};

function setGoogleSheetsUrl(url) {
    GOOGLE_SHEETS_CONFIG.webAppUrl = url;
    GOOGLE_SHEETS_CONFIG.enabled = url && url.trim() !== '';
    localStorage.setItem('googleSheetsWebAppUrl', url);
}

function loadGoogleSheetsConfig() {
    const savedUrl = localStorage.getItem('googleSheetsWebAppUrl');
    if (savedUrl) {
        GOOGLE_SHEETS_CONFIG.webAppUrl = savedUrl;
        GOOGLE_SHEETS_CONFIG.enabled = true;
    }
}

async function syncFeedbackToGoogleSheets(feedbackData) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.phone === feedbackData.userId);
        const userName = user ? (user.name || user.email) : feedbackData.userId;
        
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'feedback',
                id: feedbackData.id,
                userId: feedbackData.userId,
                userName: userName,
                serviceType: feedbackData.serviceType,
                rating: feedbackData.rating,
                comment: feedbackData.comment || '',
                voiceNoteLink: feedbackData.voiceNoteLink || '',
                timestamp: feedbackData.timestamp
            })
        });
        
        console.log('Feedback synced to Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('Failed to sync feedback to Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function syncUserToGoogleSheets(userData) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'user',
                aadhaar: userData.aadhaar,
                phone: userData.phone,
                email: userData.email,
                address: userData.address,
                familyMembers: userData.familyMembers,
                createdAt: userData.createdAt
            })
        });
        
        console.log('User data synced to Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('Failed to sync to Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function syncSchemeApplicationToGoogleSheets(applicationData) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const schemes = JSON.parse(localStorage.getItem('schemes') || '[]');
        const scheme = schemes.find(s => s.id == applicationData.schemeId);
        
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'scheme',
                id: applicationData.id,
                userId: applicationData.userId,
                schemeId: applicationData.schemeId,
                schemeName: scheme ? scheme.name : 'Unknown',
                status: applicationData.status,
                appliedAt: applicationData.appliedAt
            })
        });
        
        console.log('Scheme application synced to Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('Failed to sync scheme application to Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function syncComplaintToGoogleSheets(complaintData) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'complaint',
                id: complaintData.id,
                userId: complaintData.userId,
                department: complaintData.department,
                description: complaintData.description,
                status: complaintData.status,
                filedAt: complaintData.filedAt
            })
        });
        
        console.log('Complaint synced to Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('Failed to sync complaint to Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function syncBillPaymentToGoogleSheets(paymentData) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'billPayment',
                id: paymentData.id,
                userId: paymentData.userId,
                billType: paymentData.billType,
                service: paymentData.service,
                consumerNumber: paymentData.consumerNumber,
                amount: paymentData.amount,
                paymentDate: paymentData.paymentDate
            })
        });
        
        console.log('Bill payment synced to Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('Failed to sync bill payment to Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function syncChildToGoogleSheets(childData) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'child',
                id: childData.id,
                userId: childData.userId,
                name: childData.name,
                dob: childData.dob,
                gender: childData.gender,
                birthCertificate: childData.birthCertificate,
                schoolName: childData.schoolName,
                grade: childData.grade,
                attendanceStreak: childData.attendanceStreak || 0,
                vaccinations: childData.vaccinations || [],
                resources: childData.resources || [],
                addedAt: childData.addedAt
            })
        });
        
        console.log('Child data synced to Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('Failed to sync child data to Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function syncDocumentToGoogleSheets(documentData) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'document',
                id: documentData.id,
                userId: documentData.userId,
                type: documentData.type,
                name: documentData.name,
                status: documentData.status || 'Uploaded',
                uploadedAt: documentData.uploadedAt
            })
        });
        
        console.log('Document synced to Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('Failed to sync document to Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function updateSchemeStatusInGoogleSheets(applicationId, newStatus) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'updateSchemeStatus',
                applicationId: applicationId,
                status: newStatus
            })
        });
        
        console.log('Scheme status updated in Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('Failed to update scheme status in Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function updateComplaintStatusInGoogleSheets(complaintId, newStatus) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'updateComplaintStatus',
                complaintId: complaintId,
                status: newStatus
            })
        });
        
        console.log('Complaint status updated in Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('Failed to update complaint status in Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function getUsersFromGoogleSheets() {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl + '?dataType=users', {
            method: 'GET'
        });
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Failed to fetch users from Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function getSchemesFromGoogleSheets() {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl + '?dataType=schemes', {
            method: 'GET'
        });
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Failed to fetch schemes from Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function getComplaintsFromGoogleSheets() {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl + '?dataType=complaints', {
            method: 'GET'
        });
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Failed to fetch complaints from Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function syncBloodDonorToGoogleSheets(donorData) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'bloodDonor',
                id: donorData.id,
                userId: donorData.userId,
                name: donorData.name,
                bloodGroup: donorData.bloodGroup,
                age: donorData.age,
                contact: donorData.contact,
                location: donorData.location,
                availability: donorData.availability,
                medicalHistory: donorData.medicalHistory || '',
                status: donorData.status,
                registeredAt: donorData.registeredAt
            })
        });
        
        console.log('Blood donor data synced to Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('Failed to sync blood donor to Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function syncOrganDonorToGoogleSheets(donorData) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'organDonor',
                id: donorData.id,
                userId: donorData.userId,
                name: donorData.name,
                organType: donorData.organType,
                age: donorData.age,
                contact: donorData.contact,
                location: donorData.location,
                medicalDetails: donorData.medicalDetails || '',
                consent: donorData.consent ? 'Yes' : 'No',
                status: donorData.status,
                registeredAt: donorData.registeredAt
            })
        });
        
        console.log('Organ donor data synced to Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('Failed to sync organ donor to Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function syncBloodRequestToGoogleSheets(requestData) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'bloodRequest',
                id: requestData.id,
                userId: requestData.userId,
                patientName: requestData.patientName,
                bloodGroup: requestData.bloodGroup,
                unitsRequired: requestData.unitsRequired,
                urgency: requestData.urgency,
                hospital: requestData.hospital,
                hospitalAddress: requestData.hospitalAddress,
                contact: requestData.contact,
                additionalInfo: requestData.additionalInfo || '',
                status: requestData.status,
                requestedAt: requestData.requestedAt
            })
        });
        
        console.log('Blood request synced to Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('Failed to sync blood request to Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function syncOrganRequestToGoogleSheets(requestData) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'organRequest',
                id: requestData.id,
                userId: requestData.userId,
                patientName: requestData.patientName,
                organType: requestData.organType,
                patientAge: requestData.patientAge,
                urgency: requestData.urgency,
                hospital: requestData.hospital,
                hospitalAddress: requestData.hospitalAddress,
                contact: requestData.contact,
                medicalDetails: requestData.medicalDetails || '',
                status: requestData.status,
                requestedAt: requestData.requestedAt
            })
        });
        
        console.log('Organ request synced to Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('Failed to sync organ request to Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function updateBloodRequestStatusInGoogleSheets(requestId, newStatus) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'updateBloodRequestStatus',
                requestId: requestId,
                status: newStatus
            })
        });
        
        console.log('Blood request status updated in Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('Failed to update blood request status in Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function updateOrganRequestStatusInGoogleSheets(requestId, newStatus) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'updateOrganRequestStatus',
                requestId: requestId,
                status: newStatus
            })
        });
        
        console.log('Organ request status updated in Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('Failed to update organ request status in Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

function showGoogleSheetsSetup() {
    const currentUrl = GOOGLE_SHEETS_CONFIG.webAppUrl || '';
    const newUrl = prompt(
        'Enter your Google Apps Script Web App URL:\n\n' +
        'To get this URL:\n' +
        '1. Copy the code from google-apps-script.js\n' +
        '2. Go to https://script.google.com/\n' +
        '3. Create a new project and paste the code\n' +
        '4. Deploy as Web App (Anyone can access)\n' +
        '5. Copy the deployment URL and paste it here',
        currentUrl
    );
    
    if (newUrl !== null) {
        setGoogleSheetsUrl(newUrl.trim());
        if (newUrl.trim()) {
            alert('Google Sheets sync configured successfully!');
        } else {
            alert('Google Sheets sync disabled');
        }
    }
}

loadGoogleSheetsConfig();

async function syncScholarshipToGoogleSheets(applicationData) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled for scholarship application');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'scholarship',
                id: applicationData.id,
                userId: applicationData.userId,
                userName: applicationData.userName || '',
                userEmail: applicationData.userEmail || '',
                scholarshipId: applicationData.scholarshipId || '',
                scholarshipTitle: applicationData.scholarshipTitle || '',
                studentName: applicationData.studentName,
                course: applicationData.course,
                gradePercentage: applicationData.gradePercentage,
                familyIncome: applicationData.familyIncome,
                purpose: applicationData.purpose || '',
                status: applicationData.status,
                eligibility: applicationData.eligibility ? JSON.stringify(applicationData.eligibility) : '',
                officialRemarks: applicationData.officialRemarks || '',
                appliedAt: applicationData.appliedAt,
                markSheetsCount: applicationData.markSheets ? applicationData.markSheets.length : 0
            })
        });
        
        console.log('✓ Scholarship application synced to Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('✗ Failed to sync scholarship application to Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function updateScholarshipStatusInGoogleSheets(applicationId, newStatus, remarks) {
    if (!GOOGLE_SHEETS_CONFIG.enabled || !GOOGLE_SHEETS_CONFIG.webAppUrl) {
        console.log('Google Sheets sync is not enabled for scholarship status update');
        return { success: false, reason: 'not_configured' };
    }
    
    try {
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataType: 'updateScholarshipStatus',
                applicationId: applicationId,
                status: newStatus,
                remarks: remarks || '',
                updatedAt: new Date().toISOString()
            })
        });
        
        console.log('✓ Scholarship status updated in Google Sheets successfully');
        return { success: true, timestamp: new Date().toISOString() };
        
    } catch (error) {
        console.error('✗ Failed to update scholarship status in Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

async function syncAllScholarshipApplications() {
    if (!GOOGLE_SHEETS_CONFIG.enabled) {
        alert('Please configure Google Sheets first via the dashboard settings');
        console.log('Google Sheets sync not configured');
        return;
    }
    
    const applications = JSON.parse(localStorage.getItem('scholarshipApplications') || '[]');
    
    if (applications.length === 0) {
        alert('No scholarship applications to sync');
        console.log('No scholarship applications found');
        return;
    }
    
    let syncedCount = 0;
    let failedCount = 0;
    
    console.log(`Starting sync of ${applications.length} scholarship application(s)...`);
    
    const syncPromises = applications.map(app => 
        syncScholarshipToGoogleSheets(app)
            .then(result => {
                if (result.success) {
                    syncedCount++;
                    console.log(`✓ Synced application ${app.id}`);
                } else {
                    failedCount++;
                    console.error(`✗ Failed to sync application ${app.id}:`, result.reason || result.error);
                }
            })
            .catch(err => {
                failedCount++;
                console.error(`✗ Error syncing application ${app.id}:`, err);
            })
    );
    
    Promise.all(syncPromises).then(() => {
        alert(`Sync complete!\nSynced: ${syncedCount}\nFailed: ${failedCount}`);
        console.log(`Scholarship sync complete: ${syncedCount} synced, ${failedCount} failed`);
    });
}
