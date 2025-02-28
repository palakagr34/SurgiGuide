// To upload/update data to firestore database from json file 
// Run npm install firebase-admin
// Then run node UploadJson.js

const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const db = admin.firestore();
const procedures = require("./procedures.json");

async function clearCollection(collectionRef) {
  const snapshot = await collectionRef.get();
  const batch = db.batch();
  snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
  });
  await batch.commit();
}

async function uploadData(){
    const proceduresCollectionRef = db.collection("procedures");

    // Clear existing documents in collection
    await clearCollection(proceduresCollectionRef); 

    procedures.forEach(async (procedure) => {
        let procedureName = procedure["Procedure Name"];
      
        if (!procedureName || procedureName === "NaN" || procedureName === "null" || procedureName === undefined) {
          console.error("Skipping entry due to missing or invalid Procedure Name:", procedure);
          return;
        }
      
        procedureName = procedureName.toString().trim(); // Convert to string and remove whitespace
      
        try {
          await db.collection("procedures").doc(procedureName).set(procedure);
          console.log(`Uploaded procedure: ${procedureName}`);
        } catch (error) {
          console.error(`Error uploading CPT Code ${procedureName}:`, error);
        }
    });
      
}

uploadData();