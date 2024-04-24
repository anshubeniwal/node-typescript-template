# node-typescript-template

##Setup

#### 1. Requirements

- node.js >= 18.12.1
- npm >= 8.19.2 (`$ npm i -g npm`)

#### 2. Installation

- `$ git clone https://github.com/anshubeniwal/node-typescript-template.git`
- `$ cd node-typescript-template && npm install`

#### 3. Mysql

- `install mysql && configure`

#### 4. MongoDb

- `install mongodb && configure`

#### 5. Run

- ##### Development
  - go to `src/config/custom-environment-variables.ts` and make sure all the mentioned variables should be in .env file
  - configure .env
  - `$ npm run dev`

#### 6. Build

Project build will be stored under the directory `/node-typescript-template/dist`

- ##### Development
  - `$ npm start dev`

#### Common Issues

- ##### Failed while installing dependencies

  - clear cache for NPM with `$ npm cache clean --force`
  - delete `node_modules`
  - re-install dependencies using `$ npm install`

- ##### Unable to setup or run
  - go to logs in logs file
  - debug the error
  - save changes
  - run project in development mode
