# Easy Agile Database Service

A database service - in a yet-to-be-completed state.

## Getting started

1. Read over the entirety of this README
1. If you have any questions, please don't hesitate to contact us on the JIRA ticket thread from your application and we would be happy to help.
1. Fork this repo into your own personal **private** Bitbucket repo.
1. Please don't spend all weekend on this task. A rough guide is about six hours of work.
1. This task is for you. Please ensure you complete all of the work by yourself. The code you write is your own and in your own repo. Please ensure it actually is yours. i.e. No copying and pasting from existing projects.

## Requirements

We have a number of services directly persisting data to a shared Postrgesql database. Having multiple services share a database makes it hard to update the schema without breaking one of them. We'd like you to build a new HTTP service to sit in front of this database. It will act as the persistence API for all our dependant services.

To get you started we've added the ORM models from one of the existing services.

Using the models as a guide create a CRUD HTTP API to access each of them.

You should first choose whether you want to use the [Data Mapper](https://typeorm.io/#/active-record-data-mapper/what-is-the-data-mapper-pattern) or [Active Record](https://typeorm.io/#/active-record-data-mapper/what-is-the-active-record-pattern) to manage communicating with the database.

Feel free to change anything in the project if you disagree with the way it has been setup.

Don't worry about deploying this as a production service. You just need to get the code working locally and setup a command under `npm start` to invoke the service.

Please assume that all data transformation is done outside of this code base and that authentication is handled externally (e.g. via AWS with all connected services having the appropriate IAM roles).

Be ready to discuss your work once you're done!

Note: `Response.test.ts` is setup to use the `test-fixture` and talk directly to the db because the `jsonb` data type is not supported by SQLite.

## 3rd party code

Please use any of the npm modules you want to create this service. In fact, we don't want you to write everything from scratch. That's just silly.

Notes:

1. It's recommended (but not required) that you use [Express](https://www.npmjs.com/package/express) for the server.
1. One possible endpoint testing framework is [Supertest](https://www.npmjs.com/package/supertest).
1. You can also use [Postman](https://www.postman.com/) for ad-hoc testing.
1. [Lodash](https://www.npmjs.com/package/lodash) has already been added to the repo.

## Your code

The project in this repo sets up a basic development environment with some basic commands available in the repo to get you going.

## What we're looking for

(in no particular order)

1. No Bugs
1. Readable
1. Efficient
1. Maintainable
1. It handles errors nicely
1. You don't reinvent the wheel

## Building and running on localhost

First install dependencies:

```sh
npm install
```

In order to get the project up and running you will need to [download postgresql](https://www.postgresql.org/download/).
You will also need to create a database called `marketplace` within this db. You should be able to follow these [first steps](https://wiki.postgresql.org/wiki/First_steps) to do so.
The `DB_URL` in the `.env.sample` file should already be pointed at the default Postgresql url but if this is different for your OS then please adjust accordingly. In order to be recognised by [Dotenv](https://www.npmjs.com/package/dotenv) the `.env.sample` file needs to be copied to a `.env` file.

Once you have completed these steps please run:
```sh
npm run setup
```
This will setup the database correctly and pre-populate some of the tables with some data.

There are some tests setup that talk directly to the localhost.
To confirm that setup has been completed you can run:
```sh
npm test
```

## Submitting your work

When you have finished, please create a git running the command below (substituting your name) and attach it to your Jira Service Desk job application issue.

```
git bundle create your-name.git --all
```
