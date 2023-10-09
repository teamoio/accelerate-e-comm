# E-commerce Project setup

# Environment setup
## Install nodemon, typeorm and typescript globally
##### For Windows:
    npm run install -g nodemon typescript typeorm
    
##### For Mac OS:
    sudo npm run install -g nodemon typescript typeorm

# Important Commands
Run the following commands in the root directory(e-commerce).

#### To Auto setup and run both(frontend and backend), Run this command in the root directory:
    npm run setup
#### To run backend development server, you can run below command on either root/backend directory.
    npm run server:dev
#### To run backend production server, you can run below command on either root/backend directory.
    npm run build
    npm run server:prod
#### To install dependencies only on backend
    npm install server-install
#### To make a build of backend only
    npm install server-build
#### To start frondend application only
    npm install start
#### To install dependencies only on frontend
    npm install client-install
#### To make a build of backend only
    npm install server-build
#### To make a build of frontend only
    npm install client-build
#### To update the dependencies on both frontend and backend
    npm run upgrade
#### To start both(frontend and backend) development servers
    npm run dev
#### To start both(frontend and backend) production servers
    npm run prod
#### To make build of both frontend and backend
    npm run build
#### To auto setup and run development servers for both(frontend and backend)
    npm run setup
#### To auto setup and run production servers for both(frontend and backend)
    npm run deploy


## backend migration commands:
#### Following are the customized commands to work with typeORM migration. You can run the following commands on either root or backend directory, They will work perfectly fine regardless of ran in root directory or backend directory.
<br>

#### You can create a new migration(without prewritten changes) using CLI:
    npm run migration:create ./database/<migration_file_name>
#### Automatic migration generation creates a new migration file and writes all sql queries that must be executed to update the database. 
#### If there were no changes generated, the command will exit with code 1. This command will check database and entities and auto generate the migration code based on observed changes
    npm run migration:generate ./database/migrations/<migration_file_name>
#### The rule of thumb is to generate a migration after each entity change.
<br>

#### <b>Note: Important thing to keep in mind is use the ./database/migrations directory followed by migration file name. It will create file in database directory. Migrations files only in ./database/migrations directory are able to run.</b>
<br><br>

#### To show all migrations and whether they've been run or not use following command: 
    npm run migration:show
[X] = Migration has been ran

[ ] = Migration is pending/unapplied
<br><br>

#### To synchronize a database schema use:
    npm run schema:sync
#### Be careful running this command in production - schema sync may cause data loss if you don't use it wisely. Check which sql queries it will run before running on production.
<br>

#### To revert the most recently executed migration use the following command:
    npm run migration:revert
#### This command will undo only the last executed migration. You can execute this command multiple times to revert multiple migrations.
<br>

#### To execute all pending migrations use following command:
    npm run migration:run
#### You can create a new entity using CLI:
    npm run entity:create ./entities/<entity_name_without_extension>
#### Note: Important thing to keep in mind is use the ./entities directory followed by entity file name. It will create file in entities directory. entity files only in ./entities directory will be used as entities.
#### <b>Note: Do not forget to register your entity in entityRegister.ts file.</b>
<br>

#### You can create a new entity using CLI:
    npm run subscriber:create ./subscribers/<entity_name_without_extension>
#### Note: Important thing to keep in mind is use the ./subscribers directory followed by entity file name. It will create file in subscribers directory. subscriber files only in ./subscribers directory will be used as subscribers.