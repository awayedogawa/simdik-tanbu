// index.js
const admin = require('firebase-admin');

// Ambil konfigurasi dari GitHub Secret yang sudah di-decode
const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('ascii'));

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
