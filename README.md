##- Apps E-Lobster
- URL : https://e-lobster.herokuapp.com/ 
- API : https://e-lobster.herokuapp.com/api-docs

### How To Start ?
- npm run start / npm start


create table categories
- npx sequelize-cli model:generate --name categories --attributes name:string

create tabel members
- npx sequelize-cli model:generate --name members --attributes name:string,address:string,city:string,gender:string,email:string

create tabel products
- npx sequelize-cli model:generate --name products --attributes category_id:integer,name:string,image:string,stock:string

create tabel transactions
- npx sequelize-cli model:generate --name transactions --attributes name:string,payment:string

create tabel transactions_products
- npx sequelize-cli model:generate --name transaction_product --attributes productId:integer,transactionId:integer,name:string,total:integer,qty:integer,status:string

