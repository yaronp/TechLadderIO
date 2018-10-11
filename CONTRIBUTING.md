# How to contribute?

To contribute you will need to fork the project on GitHub and send a PR once your changes are completed.

Each ladder is contained under a folder within the `technologies` folder.

Let's imagine that we want to create a new ladder for Microsoft Azure. 

1. First we need to come up with a name. We will use `azure` as the name. The name should be as self-descriptive as possible.

2. We need to create a directory named `azure` under the `technologies` directory.

3. We need to save the logo of the technology under its folder. In this example we will save the Microsoft Azure logo under `/technologies/azure/azure.png`. The file extension must be `.png`;

4. We then need to create a JSON  file named `azure.json` under the same directory: `/technologies/azure/azure.json`. You can copy the contents of the JSON file from one of the existing ladders and change its contents later.

5. Finally, we need to add the name of the ladder to the `/technologies/technologies.json` file.

To compile the project you need to use:

```
npm install
```

```
npm run build
```

To run the application you will need a web server:

```
npm install -g http-server
```

```
http-server
```

The new ladders should be available under `http://localhost:8080/?tech=azure`.
