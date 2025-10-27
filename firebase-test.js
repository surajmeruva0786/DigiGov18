// Firebase Connection Test Script
// Run this in browser console to test Firebase connection

console.log('Testing Firebase Connection...');

// Test 1: Check if Firebase is loaded
if (typeof firebase !== 'undefined') {
    console.log('✅ Firebase SDK loaded');
} else {
    console.error('❌ Firebase SDK not loaded');
}

// Test 2: Check if auth is available
if (typeof auth !== 'undefined') {
    console.log('✅ Firebase Auth available');
} else {
    console.error('❌ Firebase Auth not available');
}

// Test 3: Check if Firestore is available
if (typeof db !== 'undefined') {
    console.log('✅ Firestore available');
} else {
    console.error('❌ Firestore not available');
}

// Test 4: Test Firestore connection
if (typeof db !== 'undefined') {
    db.collection('test').limit(1).get()
        .then((snapshot) => {
            console.log('✅ Firestore connection successful');
            console.log('Test collection query result:', snapshot.size, 'documents');
        })
        .catch((error) => {
            console.error('❌ Firestore connection failed:', error);
        });
}

// Test 5: Test Firebase Auth
if (typeof auth !== 'undefined') {
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('✅ User authenticated:', user.email);
        } else {
            console.log('ℹ️ No user authenticated (this is normal)');
        }
    });
}

// Test 6: Check Firebase Storage
if (typeof storage !== 'undefined') {
    console.log('✅ Firebase Storage available');
} else {
    console.error('❌ Firebase Storage not available');
}

console.log('Firebase connection test completed. Check the results above.');
