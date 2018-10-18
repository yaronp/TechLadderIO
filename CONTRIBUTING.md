# How to contribute?

## Content guidelines

Before you contribute, it is essential to understand what kind of content we are looking for. We want to create a list of concepts required to master a particular technology. These concepts need to be grouped by levels of expertise, and each one must contain a link to an online and free resource that explains the concept.

### We are looking for
For example, if you want to learn TypeScript one of the things that you need to understand is type aliases. So we have added type aliases to the TypeScript ladder under the advanced beginner section, and we have linked it to a link that points to [an excellent resource about type aliases](http://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases), which is the kind of link that we are looking for. 

### We are not looking for
We are not looking for general purpose links. For example, someone could send a new topic and call it "TypeScript handbook" and link to "http://www.typescriptlang.org/docs/". This is not the kind of contribution that we are looking for. If you want to make this kind of contribution, you should consider the [awesome project](https://github.com/sindresorhus/awesome)

If you need an example, you can refer to the [TypeScript ladder](http://www.techladder.io/?tech=typescript).

### The ladder levels
We would like all ladders to share the same levels:

- Novice
- Advanced beginner
- Competent
- Proficient
- Expert

### Theme
The configuration allows us to change the primary color of a ladder. It is recommended to pick the primary color from the official logo of the selected technology.

Adding additional levels or changing the levels names will throw and exception.

## Creating a new ladder

To contribute you will need to fork the project on GitHub and send a PR once your changes are completed.

Each ladder is contained under a folder within the `technologies` folder.

Let's imagine that we want to create a new ladder for Microsoft Azure. 

1. First we need to come up with a name. We will use `azure` as the name. The name should be as self-descriptive as possible.

2. We need to create a directory named `azure` under the `technologies` directory.

3. We need to save the logo of the technology under its folder. In this example we will save the Microsoft Azure logo under `/technologies/azure/azure.png`. The file extension must be `.png`.

4. We then need to create a JSON file named `azure.json` under the same directory: `/technologies/azure/azure.json`. You can copy the contents of the JSON file from one of the existing ladders and change its contents later.

Here is an example:

```js
{
    "theme": {
        "primaryColor": "#0089d6"
    },
    "levels": {
        "novice": [
            {
                "name": "Lorem ipsum",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "resources": [
                    "https://www.example.com",
                    "https://www.example.com"
                ]
            }
        ],
        "advanced_beginner": [],
        "competent": [],
        "proficient": [],
        "expert": []
    },
    "notes": [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    ],
    "contributors": [
        {
            "name": "Your Name",
            "contact": "https://example.com/"
        }
    ]
}
```

5. Finally, we need to add the ladder to the `/technologies/technologies.json` file. 

```js
[
    {
        "id": "azure",
        "isVisible": false,
        "displayName": "Azure",
        "description": "Microsoft Azure is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through a global network of Microsoft-managed data centers."
    }
]
```

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
