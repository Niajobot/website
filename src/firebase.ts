import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'

// utils
const init = () => {
    // firebase init - add your own config here

    const firebaseConfig = {
        apiKey: "AIzaSyChh1BEx0mB2747hP8jW9QA8ebwIgJmodQ",
        authDomain: "stream-2549c.firebaseapp.com",
        databaseURL: "https://stream-2549c-default-rtdb.firebaseio.com",
        projectId: "stream-2549c",
        storageBucket: "stream-2549c.appspot.com",
        messagingSenderId: "590148583267",
        appId: "1:590148583267:web:fa9acd5b27be53fead1d56"
    }

    console.log('je passe bien là?')
    firebase.initializeApp(firebaseConfig)
}

// export utils/refs
export {
    init
}