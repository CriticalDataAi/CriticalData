# CriticalDataAI

CriticalDataAi aims to create an Analytics Hub solving major day to day analytics tasks using LLM to generate queries while building other Data Products.

Our current goal is reaching at least 60% of accuracy while generating SQL queries from questions made.

## Features

- Text to SQL questions
- Source Database config
- ChatGPT API Key management

## Deployment

This project isn't production ready, this deploy method is meant for local development only.

The repo is separated in folders, each with a module that must be executed independently. All modules are docker based and running the docker-compose is the only requirement for running the project:

```bash
  docker compose up
```

If you want to develop on the project, you will also need to install project dependencies:

```bash
  cd backend
  npm install
  cd ..
  cd frontend
  npm install
```

After the project builds and the containers are running, the frontend will be accessible on the link: http://localhost:3000/

## Setup

With the project running, the following steps must be completed:

#### Step 1

Go to http://localhost:3000/settings/parameters and input your ChatGPT API Key.

#### Step 2

Go to http://localhost:3000/settings/sources and input your target database information .

#### Step 3

For LLM to anwser your questions correctly, you will need to insert a few descriptive questions with the SQL query counterpart that solves the question.

A few pairs in the platform should be enough for CriticalDataAI

To input these pairs, go to http://localhost:3000/training/statements

(For an explanation how the approach is currently working, read [this](https://www.kdnuggets.com/leveraging-gpt-models-to-transform-natural-language-to-sql-queries))

#### Step 4

All setup is ready, now start asking questions!

## Roadmap

- Test other Text to SQL strategies
- Better error handling
- Improve Frontend experience
- Slack App integration
- User management

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributing

Contributions are always welcome!

Please adhere to this project's `code of conduct`.

## Feedback

If you have any feedback, please reach out to us at ljpbarreto@hotmail.com
