const firebaseConfig = {
    apiKey: "AIzaSyDwzhX2z2Cz2wDRkWwjGZSI6ReCxIiHckQ",
    authDomain: "digigov-325e9.firebaseapp.com",
    projectId: "digigov-325e9",
    storageBucket: "digigov-325e9.firebasestorage.app",
    messagingSenderId: "471958420418",
    appId: "1:471958420418:web:6fad92f7bc8cf182c4745b",
    measurementId: "G-LZDR1SVH98"
  };
  
  try {
      firebase.initializeApp(firebaseConfig);
      
      // Make auth, db, and storage globally accessible
      window.auth = firebase.auth();
      window.db = firebase.firestore();
      window.storage = firebase.storage();
      
      // Enable offline persistence
      db.enablePersistence().catch((err) => {
          if (err.code === 'failed-precondition') {
              console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
          } else if (err.code === 'unimplemented') {
              console.warn('The current browser does not support all features required for persistence');
          }
      });
      
      // Monitor Firebase connection status
      monitorFirebaseConnection();
      
      window.addEventListener('DOMContentLoaded', function() {
          const loader = document.getElementById('firebase-loader');
          const statusText = document.getElementById('firebase-status-text');
          
          if (loader && statusText) {
              setTimeout(() => {
                  statusText.textContent = 'Connected ✅';
                  statusText.style.color = '#34e89e';
                  
                  setTimeout(() => {
                      loader.style.opacity = '0';
                      setTimeout(() => {
                          loader.style.display = 'none';
                      }, 500);
                  }, 800);
              }, 1500);
          }
      });
      
      console.log('Firebase initialized successfully');
  } catch (error) {
      console.error('Firebase initialization error:', error);
      
      window.addEventListener('DOMContentLoaded', function() {
          const loader = document.getElementById('firebase-loader');
          const statusText = document.getElementById('firebase-status-text');
          
          if (loader && statusText) {
              statusText.textContent = 'Firebase connection failed ❌';
              statusText.style.color = '#ff6b6b';
              
              setTimeout(() => {
                  loader.style.opacity = '0';
                  setTimeout(() => {
                      loader.style.display = 'none';
                  }, 500);
              }, 2000);
          }
      });
  }

// Monitor Firebase connection status
function monitorFirebaseConnection() {
    // Wait for DOM to be ready before accessing elements
    window.addEventListener('DOMContentLoaded', function() {
        const indicator = document.getElementById('firebase-connection-indicator');
        
        if (!indicator) {
            console.warn('Firebase connection indicator element not found');
            return;
        }
        
        // Set initial state
        indicator.className = 'firebase-connection-indicator firebase-connected';
        indicator.textContent = '🟢 Connected';
        
        // Test Firestore connection with a simple read
        db.collection('test').limit(1).get()
            .then(() => {
                indicator.className = 'firebase-connection-indicator firebase-connected';
                indicator.textContent = '🟢 Connected';
                console.log('Firebase connection verified');
            })
            .catch((error) => {
                console.error('Firebase connection error:', error);
                indicator.className = 'firebase-connection-indicator firebase-disconnected';
                indicator.textContent = '🔴 Disconnected';
            });
        
        // Monitor connection state using auth state changes
        auth.onAuthStateChanged((user) => {
            // This will be called when auth state changes, indicating connection
            if (indicator) {
                indicator.className = 'firebase-connection-indicator firebase-connected';
                indicator.textContent = '🟢 Connected';
            }
        });
        
        // Periodic connection check
        setInterval(() => {
            db.collection('test').limit(1).get()
                .then(() => {
                    if (indicator) {
                        indicator.className = 'firebase-connection-indicator firebase-connected';
                        indicator.textContent = '🟢 Connected';
                    }
                })
                .catch((error) => {
                    console.error('Periodic connection check failed:', error);
                    if (indicator) {
                        indicator.className = 'firebase-connection-indicator firebase-disconnected';
                        indicator.textContent = '🔴 Disconnected';
                    }
                });
        }, 30000); // Check every 30 seconds
    });
}
  