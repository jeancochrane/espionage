# espionage

🔎Take screenshots of websites and email them to yourself.

## Installation

Install using Docker and Docker Compose:

```
docker-compose build
```

## Running the script

The script requires the following environment variables to run:

- `SES_FROM`: The "From" email address for SES
- `SES_TO`: The "To" email address for SES
- `SES_SUBJECT`: The subject line for the email

In production, you can set these on whatever task runner you use to run the script.
To run locally, create an `.env` file for the script:

```
mv .env.example .env
```

The script requires one or more arguments representing key::value pairs of the name
and URL of websites you'd like to spy on. For example, to spy on https://example.com
and https://google.com, run:

```bash
# In production
yarn start example::https://example.com google::https://google.com

# The same command, using docker-compose for local development
docker-compose run --rm puppeteer yarn start example::https://example.com google::https://google.com
```
