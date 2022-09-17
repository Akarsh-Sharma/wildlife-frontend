import assert from 'assert';
import admin from 'firebase-admin';
import  serviceAccount  from './serviceAccountKey.js';
import { initializeApp } from 'firebase-admin/app';

initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();

