const { getDocs, collection } = require("firebase/firestore");
const { db } = require("./firebaseConfig");

async function testFirestore() {
  try {
    const querySnapshot = await db.getDocs(collection(db, "procedures"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Firestore error:", error);
  }
}

testFirestore();
