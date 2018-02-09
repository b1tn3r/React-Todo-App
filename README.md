# React Todo App

A dynamic todos application with data persistence and authentication that uses ReactJS on the frontend and Firebase on the backend.

## Usage

Install packages

```
npm install
```

And build client.min.js bundle

```
npm run build
```

Now index.html can be used with the bundled javascript file to view React components.

### Using Dev Server

Webpack has capabilities to run the app on its server.

```
npm run build-server
```

And now the app can be viewed on <http://localhost:8080> by default.

### Setting Up Firebase

Go to <https://firebase.google.com/> and "Get Started" to create unique project. Once project is created, navigate to main console and click on "Add Firebase to your web app" and the snippet should look like this:

```
<script src="https://www.gstatic.com/firebasejs/4.9.1/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "[My API Key]",
    authDomain: "[my-project-name].firebaseapp.com",
    databaseURL: "https://[my-project-name].firebaseio.com",
    projectId: "[my-project-name]",
    storageBucket: "[my-project-name].appspot.com",
    messagingSenderId: "833094533555"
  };
  firebase.initializeApp(config);
</script>
``` 

Copy only the javascript and insert it into the constructor in src/js/FirebaseAPI.js and replace the similar javascript pertaining to the example Firebase backend project.

It will also be required that the authentication settings be changed as well. Go to the Authentication dashboard, navigate to the 'SIGN-IN METHOD' tab and Enable the "Email/Password" Provider to be able to start signing in and creating new users within the todo app.

The app is now ready to be used and modified to build on it as a starter template for more complex applications.

## Built With

* [ReactJS](https://reactjs.org/) - The ReactJS frontend library
* [Firebase](https://firebase.google.com/) - Backend Tools and Infrastructure for Free with Limited Use
* [Material-UI](http://www.material-ui.com/#/) - Awesome library of React Components that implement Google's Material design.
* [Bootstrap 4](https://getbootstrap.com/) - Responsive front-end component library.
* [Webpack](https://webpack.js.org/) - Bundles modules and dependencies into static assets.
* [Babel](https://babeljs.io/) - Javascript and React Transpiler

## Authors

* **Titan Global Tech, LLC** - *All Work Contained* - [b1tn3r](https://github.com/b1tn3r)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details