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


insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Camisas de vestir', 589.5, 'Todos los tamaños', 4.9, 0, 5, 7, 9, true, 1);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Camisas de caballero', 600.5, 'Talla x, m y s', 3.9, 0, 5, 7, 9, true, 2);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Chemises ', 300.5, 'Todos los colores disponibles', 3.9, 0, 5, 7, 9, true, 3);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Camisas de dama', 589.5, 'Increibles camisas de damas para ti ', 1.9, 0, 5, 7, 9, true, 4);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Camisas Polo', 10, 'De todos los tamanos, disponibles en talla x,m y s', 2.9, 0, 5, 7, 9, true, 5);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Camisas para niños', 20, 'Camisas para niños de 3 meses a 2 años', 4.9, 0, 5, 7, 9, true, 1);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Pantalones levis', 12, 'Talla unica, Stretch', 1.9, 0, 5, 7, 9, true, 2);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Pantalones Carolina Herrera', 40, 'Disponibles en varios colores y tamaños.', 2.9, 0, 5, 7, 9, true, 3);


insert into stockpile(quantity, minimum_quantity, fk_product_id) values (8, 2, 1);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (3, 2, 2);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (4, 2, 3);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (5, 2, 4);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (6, 2, 5);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (10, 2, 6);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (10, 2, 7);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (20, 2, 8);


insert into product_images(image, fk_product_id) values ('https://www.hikoreanfashion.com/76433-thickbox_default/negro-cuello-mandar%C3%ADn-casual-camisas-de-vestir.jpg', 1);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/736x/73/32/12/73321243a99f3d69b9f631e8c8678786.jpg', 1);
insert into product_images(image, fk_product_id) values ('https://contestimg.wish.com/api/webimage/5a111f1d3c9c3335c206f2c2-large.jpg?cache_buster=ab561c0cdd8b1159667a2d01c9ae8013', 1);

insert into product_images(image, fk_product_id) values ('https://images-na.ssl-images-amazon.com/images/I/615MT-2NBeL._AC_UX466_.jpg', 2);
insert into product_images(image, fk_product_id) values ('https://ae01.alicdn.com/kf/H3e80bd02b188411896f493a1b36ba002o/Camisas-de-vestir-de-cuello-de-panadero-con-bandas-rojas-para-hombre-2019-nuevo-camisa-de.jpg_q50.jpg', 2);

insert into product_images(image, fk_product_id) values ('https://http2.mlstatic.com/chemise-para-caballeros-D_NQ_NP_840687-MLV28700005753_112018-Q.jpg', 3);
insert into product_images(image, fk_product_id) values ('https://dotainca.com.ve/dotainca/wp-content/uploads/2017/10/chemiscompo.jpg', 3);
insert into product_images(image, fk_product_id) values ('https://tienda.macuto.com.ve/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/f/r/frente_73_2.jpg', 3);
insert into product_images(image, fk_product_id) values ('https://www.marketplace440.com/images/MP440_FCHEM.jpg', 3);

insert into product_images(image, fk_product_id) values ('https://http2.mlstatic.com/camisas-para-dama-en-popelina-D_NQ_NP_718389-MLV31755596577_082019-Q.jpg', 4);
insert into product_images(image, fk_product_id) values ('https://http2.mlstatic.com/camisa-dama-nudo-corbata-botone-manga-larga-informal-D_NQ_NP_662327-MLV32921906985_112019-O.jpg', 4);
insert into product_images(image, fk_product_id) values ('https://www.kemsa.com.py/public/55047.jpg', 4);

insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/474x/21/24/50/212450da03d9906488f667727200b8b1.jpg', 5);
insert into product_images(image, fk_product_id) values ('https://i0.wp.com/ae01.alicdn.com/kf/H654685dea83f4f53ae4bb00470e1794cx/2020-calidad-de-marca-2-unids-lote-Polos-hombres-s%C3%B3lido-Slim-Fit-Deer-camisa-Polo-bordada.jpg_350x350.jpg', 5);

insert into product_images(image, fk_product_id) values ('https://http2.mlstatic.com/ropa-para-bebes-camisas-para-bebes-D_NQ_NP_825375-MLV25881058914_082017-F.jpg', 6);
insert into product_images(image, fk_product_id) values ('https://ae01.alicdn.com/kf/HTB11oUHsL5TBuNjSspcq6znGFXaZ/Camisetas-para-beb-ni-o-para-ni-os-2020-camisas-de-manga-corta-de-verano-camisas.jpg_q50.jpg', 6);

insert into product_images(image, fk_product_id) values ('https://http2.mlstatic.com/ropa-para-bebes-camisas-para-bebes-D_NQ_NP_825375-MLV25881058914_082017-F.jpg', 7);
insert into product_images(image, fk_product_id) values ('https://ropavintagekilos.com/wp-content/uploads/2019/02/photo_2019-04-16_12-51-13.jpg', 7);
insert into product_images(image, fk_product_id) values ('https://i.linio.com/p/975ae149292f77cc2f7025682e026e8e-zoom.jpg', 7);

insert into product_images(image, fk_product_id) values ('https://cs82moda.com/wp-content/uploads/2019/10/vaqueros-levis-501-azul-oscuro-hombre-03.jpg', 8);
insert into product_images(image, fk_product_id) values ('https://images-na.ssl-images-amazon.com/images/I/81qRdVKu5rL._AC_UX679_.jpg', 8);



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

insert into product_categories(fk_product_id, fk_category_id) values (1,8);
insert into product_categories(fk_product_id, fk_category_id) values (2,8);
insert into product_categories(fk_product_id, fk_category_id) values (3,8);
insert into product_categories(fk_product_id, fk_category_id) values (4,9);
insert into product_categories(fk_product_id, fk_category_id) values (5,8);
insert into product_categories(fk_product_id, fk_category_id) values (6,10);
insert into product_categories(fk_product_id, fk_category_id) values (7,10);
insert into product_categories(fk_product_id, fk_category_id) values (8,10);

-- tecnologia

insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Mack Book Air', 589.5, 'Retina. 16Gb Ram.Garantia de un año. ', 4.9, 0, 5, 7, 9, true, 1);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('iphone 11', 600.5, 'En perfecto estado, un año de uso', 3.9, 0, 5, 7, 9, true, 2);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Laprop Acer', 300.5, 'Nueva de paquete', 3.9, 0, 5, 7, 9, true, 3);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Laptop Hp', 589.5, 'Todos los modelos disponibles.', 1.9, 0, 5, 7, 9, true, 4);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Lavadora Samsung', 10, 'Contiene manual para manejar la app desde cualquier lugar', 2.9, 0, 5, 7, 9, true, 5);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Secadora Xhe', 20, 'Secadoras Xhe de todos los modelos ', 4.9, 0, 5, 7, 9, true, 1);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Secadores de pelo', 12, 'Lo mejor para ti.', 1.9, 0, 5, 7, 9, true, 2);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Telefono Samsung', 40, 'Perfecto estado, 6 meses de uso. Con garantia de 1 año.', 2.9, 0, 5, 7, 9, true, 3);


insert into stockpile(quantity, minimum_quantity, fk_product_id) values (8, 2, 9);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (3, 2, 10);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (4, 2, 11);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (5, 2, 12);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (6, 2, 13);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (10, 2, 14);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (10, 2, 15);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (20, 2, 16);


insert into product_images(image, fk_product_id) values ('https://hipertextual.com/files/2018/10/MacBook-Air-family-10302018.jpeg', 9);
insert into product_images(image, fk_product_id) values ('https://lacomparacion.com/wp-content/uploads/2019/09/Una-nueva-actualizacion-de-Apple-MacBook-Air-finalmente-podria-agregar.jpg',9);
insert into product_images(image, fk_product_id) values ('https://t.ipadizate.es/2020/04/MacBook-air.jpg', 9);

insert into product_images(image, fk_product_id) values ('https://ep01.epimg.net/tecnologia/imagenes/2019/09/09/actualidad/1568030976_478249_1568031354_noticia_normal.jpg', 10);
insert into product_images(image, fk_product_id) values ('https://as01.epimg.net/meristation/imagenes/2019/09/05/betech/1567701078_959961_1567706455_noticia_normal_recorte1.jpg', 10);

insert into product_images(image, fk_product_id) values ('https://static.acer.com/up/Resource/Acer/Laptops/Spin_1/Image/20180803/Acer-Spin-1-SP111-34N-main.png', 11);
insert into product_images(image, fk_product_id) values ('https://images-na.ssl-images-amazon.com/images/I/61K6jHhMm1L._AC_SX466_.jpg', 11);
insert into product_images(image, fk_product_id) values ('https://tes.com.co/assets/images/laptop-acer-aspire-5-slim-5-1380x894.jpg', 11);

insert into product_images(image, fk_product_id) values ('https://http2.mlstatic.com/D_NQ_NP_795587-MLV40243851226_122019-W.jpg', 12);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/236x/26/96/58/2696587a172be34ab7812a2979040270.jpg', 12);
insert into product_images(image, fk_product_id) values ('https://www8.hp.com/ve/es/images/laptop3_tcm_124_1669143.jpg', 12);

insert into product_images(image, fk_product_id) values ('https://lacronicadelpajarito.com/como/wp-content/uploads/2019/02/C%C3%B3mo-solucionar-el-error-1E-de-una-lavadora-Samsung-1.jpg', 13);
insert into product_images(image, fk_product_id) values ('https://comofunciona.co.com/wp-content/uploads/2016/10/Como-funciona-la-lavadora.jpg', 13);

insert into product_images(image, fk_product_id) values ('https://www.lg.com/co/images/lavasecadoras/dlgx3251w/gallery/large07.jpg', 14);
insert into product_images(image, fk_product_id) values ('https://m.media-amazon.com/images/I/41QkjLD+O+L.jpg', 14);

insert into product_images(image, fk_product_id) values ('https://assets.afcdn.com/story/20190618/2011014_w980h638c1cx628cy628.jpg', 15);
insert into product_images(image, fk_product_id) values ('https://www.dhresource.com/0x0/f2/albu/g7/M01/F5/63/rBVaSluR4nCAFuw5AAJxa5y4G-M445.jpg', 15);
insert into product_images(image, fk_product_id) values ('https://yoycosmetics.com/wp-content/uploads/2019/01/secador-de-pelo-profesiona-4300.jpg', 15);

insert into product_images(image, fk_product_id) values ('https://liberar-tu-movil.es/foto/03_14_42_48_Samsung_Galaxy_A10.jpg', 16);
insert into product_images(image, fk_product_id) values ('https://img.global.news.samsung.com/co/wp-content/uploads/2019/01/M20-Composite-Shot-White-Background-1-490x408.jpg', 16);

insert into product_categories(fk_product_id, fk_category_id) values (9,2);
insert into product_categories(fk_product_id, fk_category_id) values (10,1);
insert into product_categories(fk_product_id, fk_category_id) values (11,2);
insert into product_categories(fk_product_id, fk_category_id) values (12,2);
insert into product_categories(fk_product_id, fk_category_id) values (13,8);
insert into product_categories(fk_product_id, fk_category_id) values (14,3);
insert into product_categories(fk_product_id, fk_category_id) values (15,3);
insert into product_categories(fk_product_id, fk_category_id) values (16,1);
