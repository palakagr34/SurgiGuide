// To upload/update data to firestore database from json file 
// Run npm install firebase-admin
// Then run node UploadJson.js

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const db = admin.firestore();
const procedures = require("./procedures.json");

async function uploadData(){
    procedures.forEach(async (procedure) => {
        let cptCode = procedure["CPT Code"];
      
        if (!cptCode || cptCode === "NaN" || cptCode === "null" || cptCode === undefined) {
          console.error("Skipping entry due to missing or invalid CPT Code:", procedure);
          return;
        }
      
        cptCode = cptCode.toString().trim(); // Convert to string and remove whitespace
      
        try {
          await db.collection("procedures").doc(cptCode).set(procedure);
          console.log(`Uploaded procedure: ${cptCode}`);
        } catch (error) {
          console.error(`Error uploading CPT Code ${cptCode}:`, error);
        }
    });
      
}

uploadData();