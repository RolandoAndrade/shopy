insert into roles(name, description) values ('Admin','administrador');


insert into foreign_exchange(name, simbol, exchange_rate) values ('Dolar', '$', 1);


insert into persons(name, lastname, birth_date) values ('Stephanie','Cruz',TO_TIMESTAMP('15-02-1998', 'DD-MM-YYYY'));
insert into persons(name, lastname, birth_date) values ('Rolando','Andrade',TO_TIMESTAMP('21-04-1999', 'DD-MM-YYYY'));
insert into persons(name, lastname, birth_date) values ('Gabriel','Teran',TO_TIMESTAMP('24-05-1999', 'DD-MM-YYYY'));
insert into persons(name, lastname, birth_date) values ('Patrick','Scott',TO_TIMESTAMP('04-02-1998', 'DD-MM-YYYY'));
insert into persons(name, lastname, birth_date) values ('Kevin','Watts',TO_TIMESTAMP('13-08-1999', 'DD-MM-YYYY'));


insert into users(email, username, password, fk_person_id, fk_role_id, fk_badge_id) values ('wisguwi@nu.it','Pearl','#fafb77',1,1,1);
insert into users(email, username, password, fk_person_id, fk_role_id, fk_badge_id) values ('na@am.ac','Jerry','#6899ae',2,1,1);
insert into users(email, username, password, fk_person_id, fk_role_id, fk_badge_id) values ('kekkasbo@hetus.mx','PeRY','#8c31db',3,1,1);
insert into users(email, username, password, fk_person_id, fk_role_id, fk_badge_id) values ('gaozewes@sipodcub.ad','Nora','#ed12ed',4,1,1);
insert into users(email, username, password, fk_person_id, fk_role_id, fk_badge_id) values ('ij@keb.mv','Eddie','#f8a3b6',5,1,1);


--insert into category_types(name, description) values ('Tecnologia','Productos tecnologicos');
--insert into category_types(name, description) values ('Mascotas','Productos para mascotas');
--
--
--insert into categories(name, description, fk_category_type_id) values ('Telefonos', 'Productos moviles', 1);
--insert into categories(name, description, fk_category_type_id) values ('Laptops', 'Productos de escritorio', 1);
--insert into categories(name, description, fk_category_type_id) values ('Perros', 'Productos para perros', 2);
--insert into categories(name, description, fk_category_type_id) values ('Gatos', 'Productos para gatos', 2);


insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Laptop GTX', 589.5, 'La mejor', 4.9, 0, 5, 7, 9, true, 1);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Laptop ACER', 600.5, 'WOOWW', 3.9, 0, 5, 7, 9, true, 2);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Telefono huawei', 300.5, 'maximo', 3.9, 0, 5, 7, 9, true, 3);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Telefono Samsung', 589.5, 'increible', 1.9, 0, 5, 7, 9, true, 4);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Hueso para perro', 10, 'Muy linto', 2.9, 0, 5, 7, 9, true, 5);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Sombrero de perro', 20, 'cuchi', 4.9, 0, 5, 7, 9, true, 1);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Gato de peluche', 12, 'Awwww', 1.9, 0, 5, 7, 9, true, 2);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Arena de gato', 40, 'Sabroso Compadre', 2.9, 0, 5, 7, 9, true, 3);


insert into stockpile(quantity, minimum_quantity, fk_product_id) values (8, 2, 1);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (3, 2, 2);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (4, 2, 3);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (5, 2, 4);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (6, 2, 5);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (10, 2, 6);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (10, 2, 7);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (20, 2, 8);


insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/0e/e3/9e/0ee39eb4dbc2fb69fe2860cb113ae047.png', 1);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/0e/e3/9e/0ee39eb4dbc2fb69fe2860cb113ae047.png', 1);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/0e/e3/9e/0ee39eb4dbc2fb69fe2860cb113ae047.png', 2);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/0e/e3/9e/0ee39eb4dbc2fb69fe2860cb113ae047.png', 2);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/0e/e3/9e/0ee39eb4dbc2fb69fe2860cb113ae047.png', 3);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/0e/e3/9e/0ee39eb4dbc2fb69fe2860cb113ae047.png', 3);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/0e/e3/9e/0ee39eb4dbc2fb69fe2860cb113ae047.png', 4);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/0e/e3/9e/0ee39eb4dbc2fb69fe2860cb113ae047.png', 4);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/0e/e3/9e/0ee39eb4dbc2fb69fe2860cb113ae047.png', 5);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/0e/e3/9e/0ee39eb4dbc2fb69fe2860cb113ae047.png', 5);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/0e/e3/9e/0ee39eb4dbc2fb69fe2860cb113ae047.png', 6);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/0e/e3/9e/0ee39eb4dbc2fb69fe2860cb113ae047.png', 6);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/0e/e3/9e/0ee39eb4dbc2fb69fe2860cb113ae047.png', 7);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/0e/e3/9e/0ee39eb4dbc2fb69fe2860cb113ae047.png', 7);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/0e/e3/9e/0ee39eb4dbc2fb69fe2860cb113ae047.png', 8);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/0e/e3/9e/0ee39eb4dbc2fb69fe2860cb113ae047.png', 8);


insert into product_categories(fk_product_id, fk_category_id) values (1,1);
insert into product_categories(fk_product_id, fk_category_id) values (2,1);
insert into product_categories(fk_product_id, fk_category_id) values (3,2);
insert into product_categories(fk_product_id, fk_category_id) values (4,2);
insert into product_categories(fk_product_id, fk_category_id) values (5,3);
insert into product_categories(fk_product_id, fk_category_id) values (6,3);
insert into product_categories(fk_product_id, fk_category_id) values (7,4);
insert into product_categories(fk_product_id, fk_category_id) values (8,4);

insert into category_types(name, description) values ('Tecnología','Productos tecnológicos');
insert into category_types(name, description) values ('Mascotas','Productos para mascotas');
insert into category_types(name, description) values ('Ropa','Productos de ropa y accesorios');
insert into category_types(name, description) values ('Entretenimiento','Productos para divertirse');
insert into category_types(name, description) values ('Vehículos','Productos para el vehículos');
insert into category_types(name, description) values ('Inmuebles','Productos para el hogar');
insert into category_types(name, description) values ('Otros','Otro tipo de productos');

insert into categories(name, description, fk_category_type_id) values ('Teléfonos', 'Dispositivos móviles', 1);
insert into categories(name, description, fk_category_type_id) values ('Computadoras', 'Laptops y equipos de escritorio', 1);
insert into categories(name, description, fk_category_type_id) values ('Electrodomésticos', 'Equipos para el hogar', 1);
insert into categories(name, description, fk_category_type_id) values ('Otros', 'Otros equipos', 1);
insert into categories(name, description, fk_category_type_id) values ('Perros', 'Productos para perros', 2);
insert into categories(name, description, fk_category_type_id) values ('Gatos', 'Productos para gatos', 2);
insert into categories(name, description, fk_category_type_id) values ('Otros', 'Otras mascotas', 2);
insert into categories(name, description, fk_category_type_id) values ('Masculino', 'Ropa para hombre', 3);
insert into categories(name, description, fk_category_type_id) values ('Femenino', 'Ropa para mujer', 3);
insert into categories(name, description, fk_category_type_id) values ('Unisex', 'Ropa para todos', 3);
insert into categories(name, description, fk_category_type_id) values ('Otros', 'Otro tipo de ropa', 3);
insert into categories(name, description, fk_category_type_id) values ('Libros', 'Mejores obras literarias', 4);
insert into categories(name, description, fk_category_type_id) values ('Películas', 'Mejores películas', 4);
insert into categories(name, description, fk_category_type_id) values ('Videojuegos', 'Videojuegos para todos', 4);
insert into categories(name, description, fk_category_type_id) values ('Otros', 'Otro tipo de entretenimiento', 4);
insert into categories(name, description, fk_category_type_id) values ('Carros', 'Productos para carros', 5);
insert into categories(name, description, fk_category_type_id) values ('Bicicletas', 'Productos para bicicletas', 5);
insert into categories(name, description, fk_category_type_id) values ('Otros', 'Para otro tipo de vihículo', 5);
insert into categories(name, description, fk_category_type_id) values ('Baños', 'Inmuebles para el baño', 6);
insert into categories(name, description, fk_category_type_id) values ('Cocinas', 'Inmuebles para la cocina', 6);
insert into categories(name, description, fk_category_type_id) values ('Otros', 'Otros productos para el hogar', 6);