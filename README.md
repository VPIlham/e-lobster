create table categories
- npx sequelize-cli model:generate --name categories --attributes name:string

create tabel members
- npx sequelize-cli model:generate --name members --attributes name:string,address:string,city:string,gender:string,email:string

create tabel products
- npx sequelize-cli model:generate --name products --attributes category_id:integer,name:string,image:string,stock:string

