# RodBe eXperience: CLI Project Scaffold 🚀

This project provides a **CLI tool** to **scaffold new projects based on predefined archetypes**. It's designed to streamline the creation of new projects by setting up the necessary files and configurations based on user inputs.

## Features

- Check for updates and prompt to update the CLI.
- Create new projects with customizable options.
- Supports different archetypes like **typescript library** and **typescript CLI**.
- Automatically initializes a git repository.
- Customizes project files based on user inputs.

## Prerequisites

- **Node.js 18.18.2 or higher**

## Installation

To use this CLI tool, ensure you have Node.js installed. Then, you can run the script directly using:

```sh
npm i -g @rodbe/rbx
```

## Usage

```sh
rbx
```

When you run the CLI, you'll be prompted with a series of questions to help customize your new project setup:

1. **Archetype Type**: Choose from a list of available archetypes.
2. **Project Name**: Input the name of your new project.
3. **Scope**: Optionally, provide a scope for your project.
4. **Description**: Optionally, add a description for your project.
5. **Repository URL**: Provide the HTTPS URL for the project's repository.
6. **Author**: Optionally, add project author information.
7. **Command Name**: If the archetype type is `ts-cli`, you'll need to specify a command name.


You'll then be prompted with the questions as outlined above. Once completed, your project will be scaffolded in the directory specified by the project name.

## Project Structure

Once you've created a new project, it will have the following structure:

- Basic file setup cloned from the specified archetype.
- Git repository initialized without the `.git` folder from the archetype source.
- Custom placeholders in files replaced with your specified project details.

## Contributions

Contributions are welcome. Please ensure your changes are tested and documented.

## License

This project is licensed under the MIT License.