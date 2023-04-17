# EnjinScraper

Scrapes an Enjin site via the Enjin API

API calls used are described in detail [here](https://gist.github.com/Kas-tle/249d73f9f73ae43aa64413ac0ee49a37).

## Usage

Note that this is still a work in progress and as such installation and usage requires manual installation of dependencies and configuration of the `config.json` file. When done, I may opt to publish as a global npm package or distribute as a CLI electron app.

### Installation

```bash
git clone https://github.com/Kas-tle/EnjinScraper.git
cd EnjinScraper
yarn
```

### Configuration

#### Obtaining an API key

Per Enjin's instructions:

> To enable your API, visit your admin panel / settings / API area. The content on this page includes your base API URL, your secret API key, and the API mode. Ensure that the API mode is set to "Public".

#### Configuring the `config.json`

Create a `config.json` file in the root directory of the project. The file should look like this:

```jsonc
{
    "apiKey": "someapiKey", // Required
    "domain": "www.example.com", // Required
    "email": "someemail@email.com", // Required
    "password": "somepassword", // Required
    "disabledModules": {
        "forums": false,
        "news": false,
        "wikis": false,
        "tickets": false,
        "applications": false,
        "comments": false,
        "users": false,
        "usertags": false,
        "files": false
    },
    "debug": false
}
```

### Running

```bash
npx ts-node index.ts
```

## Outputs

The scraper will output an sqlite file at `target/site.sqlite` in the root directory of the project. For a more detailed database schema, see [OUTPUTS.md](OUTPUTS.md). The database will contain the following tables:
- `scrapers`: Contains information about what steps have been completed to gracefully resume scraping if needed.
- `module_categories`: Enumerates the different cateogries modules can fall into
- `modules`: Contains information about modules
- `presets`: Contains information about presets, essentially a list of individual modules
- `pages`: Contains information about modules in the context of the page they reside on
- `site_data`: A table that stores various information about a website
- `forum_modules`: Contains information about the forum modules that were scraped
- `forums`: Contains information about the forums scraped from the forum modules
- `threads`: Contains information about the threads scraped from the forums
- `posts`: Contains information about the posts scraped from the forums
- `wiki_pages`: Contains information about pages in a wiki, including their content, access control settings, and metadata
- `wiki_revisions`: Contains information about revisions to pages in a wiki, including their content, access control settings, and metadata
- `wiki_likes`: Contains information about users who have liked pages in a wiki
- `wiki_categories`: Contains information about categories in a wiki, including their titles and thumbnails
- `wiki_uploads`: Contains information about uploaded files in a wiki
- `news_articles`: Contains information about news articles scraped from the news modules
- `ticket_modules`: Contains information about ticket modules
- `tickets`: Contains information about tickets scraped from the ticket modules
- `applications`: Contains basic information about applications
- `application_sections`: Contains sections from applications
- `application_questions`: Contains questions from applications
- `application_questions`: Contains individual responses for applications
- `comments`: Contains information about comments on applications and news articles
- `users`: Contains information about users

Any files hosted on Enjin's Amazon S3 instance (which includes attachments for applications, tickets, forum posts, and news posts) will be downloaded to `target/files`. Note that I still need to add support for downloading of certain non-S3 files, such as avatars and (for some odd reason) wiki uploads.

## TODO

- [ ] Add more options for user data scraping (https://github.com/Kas-tle/EnjinScraper/issues/8)
- [ ] Add support for scraping galleries (https://github.com/Kas-tle/EnjinScraper/issues/6)
