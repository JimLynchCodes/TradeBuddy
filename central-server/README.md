# Trade Buddle Central Server

NestJs server backend for the Trade Buddy webapp.


## Local Development Setup Guide

<br/>

### 0) Clone the project and install dependencies

```
git clone ...
```

```
cd TradeBuddy/central-server
```

_(Please use node v13)_
```
nvm use
npm i
```

### 1) Get Local SSL Cert and Key Files

Follow [this guide]() to create the files locally on a mac.

Then create a directory in the root of this central server codebase named `ssl-keys` and place your files inside of it. 

_Note: You can change the location of your key and cert files my modifying the corresponding environment variables in the next step._

### 1) Create .env.dev File

Duplicate the .env file, and name the new one: `.env.dev` 

Replace "your generated" with the names of your generated ssl keys from step 1.

Replace the x's in the IEX environment variables with the corresponding values from the [tokens page](https://iexcloud.io/console/tokens) within the iex-cloud developer console.  

_Note: If you want to use a different .env.dev you can change the file names within the command that is run for npm scripts. See, for example, how `.env.dev` is directly referenced in the `start` and `build` script commands._

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
