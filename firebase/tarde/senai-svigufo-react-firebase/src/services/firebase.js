import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCuwKiNe2Sv_odv9MrctdvgP8I4jDgVKDw",
    authDomain: "svigufotardefernando.firebaseapp.com",
    databaseURL: "https://svigufotardefernando.firebaseio.com",
    projectId: "svigufotardefernando",
    storageBucket: "svigufotardefernando.appspot.com",
    messagingSenderId: "1096015912028",
    appId: "1:1096015912028:web:919bb0db105866b2"
};

firebase.initializeApp(firebaseConfig);

export default firebase;