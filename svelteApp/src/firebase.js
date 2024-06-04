import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { ref, set, get, getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCb6K-2h0MattDr5MP5S8hAKcU1kLl-k-I",
  authDomain: "svelteapp-b2a9f.firebaseapp.com",
  projectId: "svelteapp-b2a9f",
  storageBucket: "svelteapp-b2a9f.appspot.com",
  messagingSenderId: "629725185056",
  appId: "1:629725185056:web:fe554ed4010912f651e845",
  databaseURL: "https://svelteapp-b2a9f-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const db = getDatabase(app);

export function toggleParkParticipant(parkId, user, isParticipant) {
  const participantsRef = ref(db, 'parks/' + parkId + '/participants');

  get(participantsRef).then((snapshot) => {
      let currentParticipants = snapshot.val() || [];
      if (isParticipant) {
          // Si existe el participante, se remueve
          currentParticipants = currentParticipants.filter(p => p.email !== user.email);
      } else {
          // Agregar al participante
          if (!currentParticipants.some(p => p.email === user.email)) {
              currentParticipants.push({ name: user.displayName, photoURL: user.photoURL, email: user.email });
          }
      }
      set(participantsRef, currentParticipants);
      console.log(`Updated participants list:`, currentParticipants);
  }).catch((error) => {
      console.error("Failed to toggle park participant:", error);
  });
}

export function fetchParkParticipants(parkId, setParticipants) {
  const participantsRef = ref(db, 'parks/' + parkId + '/participants');
  get(participantsRef).then((snapshot) => {
    if (snapshot.exists()) {
      setParticipants(snapshot.val());
    } else {
      setParticipants([]);
    }
  }).catch((error) => {
    console.error("Failed to fetch park participants:", error);
  });
}