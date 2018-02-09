var firebase = require('firebase');


module.exports = class FirebaseAPI {
    constructor() {
        var config = {
            apiKey: "AIzaSyCVYbKi0gqjxwub3n_9GyC6yV4LymDu3Go",
            authDomain: "react-integration.firebaseapp.com",
            databaseURL: "https://react-integration.firebaseio.com",
            projectId: "react-integration",
            storageBucket: "react-integration.appspot.com",
            messagingSenderId: "833094560785"
        };
        this.firebaseApp = firebase.initializeApp(config);
    }

    signIn(email, password) {
        return this.firebaseApp.auth()
            .signInWithEmailAndPassword(email, password);
    }
    createAccount(email, password) {
        return this.firebaseApp.auth()
            .createUserAndRetrieveDataWithEmailAndPassword(email, password);
    }

    onAuthChange(handler) {
        this.firebaseApp.auth().onAuthStateChanged(handler);
    }

    signOut() {
        this.firebaseApp.auth().signOut()
            .then(() => {
                console.log('Successfully Signed Out')
            }, (error) => {
                console.log('Error on Sign Out: ' + error.message)
            })
    }


    addTodo(newTodo) {
        this.firebaseDB = this.firebaseApp.database();
        this.todosRef = this.firebaseDB.ref('todos');

        this.todoRef = this.todosRef.child(newTodo.id);
        this.todoRef.set(newTodo);
    }

    getTodos() {
        this.todosRef = this.firebaseApp.database().ref('todos');
        return this.todosRef.once("value");
    }

    removeTodo(deleteID) {
        this.todosRef.child(deleteID).remove()
            .then(
                console.log("Remove Succeeded")
            ).catch((error) => {
                console.log("Remove Failed: " + error.message);
            });

    }

    updateTodo(updatedTodo) {
        this.todosRef.child(updatedTodo.id).update(updatedTodo);
    }
};
