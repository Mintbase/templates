import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

const firebaseConfig = {
          apiKey: process.env.FIREBASE_API_KEY,
          projectId: process.env.FIREBASE_PROJECT_ID,
          appId: process.env.FIREBASE_APP_ID,
    };

    initializeApp({
      credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
  });

  const db = getFirestore();

  export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { licenseKey, domain } = req.body;
    if (!licenseKey || !domain) {
        return res.status(400).json({ error: 'Missing license key or domain' });
    }

    try {
        if (licenseKey == process.env.TRIAL_LICENCE_KEY) {
            return res.status(200).json({ message: 'Domain is authorized for this license key' });
        }

        const licenseRef = db.collection('licenses').doc(licenseKey);
        const doc = await licenseRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'License key not found' });
        }

        const domains = doc.data().domains;
        if (domains.includes(domain)) {
          return res.status(200).json({ message: 'Domain is authorized for this license key' });
      } else {
          return res.status(403).json({ error: 'Domain is not authorized for this license key' });
      }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error });
    }
};
