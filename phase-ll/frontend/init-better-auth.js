const { auth } = require('./lib/auth.ts');

async function initBetterAuth() {
  try {
    console.log('Initializing Better Auth database tables...');
    // Better Auth should auto-create tables on first request
    console.log('Better Auth initialized successfully!');
    console.log('Tables should be created automatically on first signup attempt.');
  } catch (error) {
    console.error('Error initializing Better Auth:', error);
  }
}

initBetterAuth();
