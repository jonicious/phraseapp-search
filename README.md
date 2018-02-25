# PhraseApp Search

PhraseApp does not offer a full text search across multiple projects. You usually have one project per frontend or micro service. If you have a text and want to see in which project it is defined, you have to go through all the projects manually which is a time consuming and annoying procedure.

## Features

This project will give you two things: A very simple API to search for strings and a Slack Bot.

### Simple `GET` API

Just call it with `text` as an URL parameter.

#### Example Request

```
curl "http://localhost:8080/?text=Add%20Payment%20method"
```

#### Example Response

This will give you a list of results, e.g.

```
{
  "resultList": [
    {
      "keyName": "payment_add_payment_method",
      "keyId": "123123_your_key_id",
      "locale": "en-US",
      "localeId": "123123_your_locale_id",
      "projectId": "123123_your_project_id",
      "projectName": "Your Project Name",
      "text": "Add Payment Method"
    }
  ]
}
```

### Docker

The project can easily be build into a Docker container with the provided Dockerfile

```
docker build --rm -t phaseapp-search .
docker run -d -p 8080:8080 phaseapp-search
```


### Slack Bot

TODO: Add section about Slack Bot.

## How to get started

* TODO: Add information on how to get a PhraseApp API key
* TODO: Add information that you need to pass the api key as an environment variable
