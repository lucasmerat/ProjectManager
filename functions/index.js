const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const createNotification = notification => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification)
    .then(doc => {
      console.log("Notification added", doc);
    });
};

// exports.songCreated = functions.firestore
//   .document("projects/{projectId}")
//   .onCreate(doc => {
//     console.log(admin.firestore)
//     const project = doc.data();
//     const notification = {
//       content: `Started writing ${project.title}`,
//       time: admin.firestore.FieldValue.serverTimestamp()
//     };
//     console.log("New song was added, sending notification", notification)
//     return createNotification(notification);
//   });

  exports.projectEdited = functions.firestore
  .document("projects/{projectId}")
  .onUpdate((change,context) => {
    const newValue = change.after.data();

    const oldValue = change.before.data();

    if (newValue.lyrics !== oldValue.lyrics){
        const notification = {
            content: `Edited lyrics of ${newValue.title}`,
            time: admin.firestore.FieldValue.serverTimestamp()
          };
          console.log("Lyrics changed, sending notification", notification)
          return createNotification(notification);
    }

    if (newValue.recordings !== oldValue.recordings){
        const notification = {
            content: `Added recording to ${newValue.title}`,
            time: admin.firestore.FieldValue.serverTimestamp()
          };
          console.log("Recording added, sending notification", notification)
          return createNotification(notification);
    }
  });
