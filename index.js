const admin = require('firebase-admin');

// LANGSUNG PARSE DARI SECRET, TANPA DECODE BASE64
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Ganti dengan email admin Anda
const adminEmail = 'admin@simdiktanbu.com';

admin.auth().getUserByEmail(adminEmail)
  .then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, { admin: true });
  })
  .then(() => {
    console.log(`✅ Berhasil! Custom claim 'admin: true' telah ditambahkan ke ${adminEmail}.`);
  })
  .catch((error) => {
    console.error('❌ Terjadi kesalahan:', error);
    process.exit(1); // Keluar dengan status error
  });
