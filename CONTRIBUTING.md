# How to contribute?

## Content guidelines

Before you contribute, it is essential to understand what kind of content we are looking for. We want to create a list of concepts required to master a particular technology. These concepts need to be grouped by levels of expertise, and each one must contain a link to an online and free resource that explains the concept.

### We are looking for
For example, if you want to learn TypeScript one of the things that you need to understand is type aliases. So we have added type aliases to the TypeScript ladder under the advanced beginner section, and we have linked it to a link that points to [an excellent resource about type aliases](http://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases), which is the kind of link that we are looking for. 

### We are not looking for
We are not looking for general purpose links. For example, someone could send a new topic and call it "TypeScript handbook" and link to "http://www.typescriptlang.org/docs/". This is not the kind of contribution that we are looking for. If you want to make this kind of contribution, you should consider the [awesome project](https://github.com/sindresorhus/awesome)

If you need an example, you can refer to the [TypeScript ladder](http://www.techladder.io/?tech=typescript).

## Creating a new ladder

To contribute you will need to fork the project on GitHub and send a PR once your changes are completed.

Each ladder is contained under a folder within the `technologies` folder.

Let's imagine that we want to create a new ladder for Microsoft Azure. 

1. First we need to come up with a name. We will use `azure` as the name. The name should be as self-descriptive as possible.

2. We need to create a directory named `azure` under the `technologies` directory.

3. We need to save the logo of the technology under its folder. In this example we will save the Microsoft Azure logo under `/technologies/azure/azure.png`. The file extension must be `.png`.

4. We then need to create a JSON file named `azure.json` under the same directory: `/technologies/azure/azure.json`. You can copy the contents of the JSON file from one of the existing ladders and change its contents later.

5. Finally, we need to add the ladder to the `/technologies/technologies.json` file. 

## Compile and run the project

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

The new ladders should be available under the `http://localhost:8080/?tech=azure` url.
