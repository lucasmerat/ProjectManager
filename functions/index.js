const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

const createNotification = notification => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification).then(doc=>{
        console.log('Notification added', doc)
    });
};

exports.songCreated = functions.firestore
  .document("projects/{projectId}")
  .onCreate(doc => {
    const project = doc.data();
    const notification = {
      content: "Started writing a new song",
      time: admin.firestore.FieldValue.serverTimestamp()
    };
    return createNotification(notification);
  });
