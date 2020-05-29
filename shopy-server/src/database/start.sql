insert into roles(name, description) values ('Admin','administrador');
insert into roles (name, description) values ('General', 'Rol general para los usuarios no administradores');


insert into commissions(service_fee, processor_fee, active) values (0.0175,0.03,true);


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


insert into addresses(first_line, second_line, city, state, postal_code, fk_user_id) values ('Carrera 17 Calle 21','Chapinero','Bogota','Cundinamarca','111311',1);
insert into addresses(first_line, second_line, city, state, postal_code, fk_user_id) values ('Carrera 18 Calle 15','Chapinero','Bogota','Cundinamarca','111311',2);
insert into addresses(first_line, second_line, city, state, postal_code, fk_user_id) values ('Carrera 7 Calle 19','Chapinero','Bogota','Cundinamarca','111311',3);
insert into addresses(first_line, second_line, city, state, postal_code, fk_user_id) values ('Carrera 10 Calle 20','Chapinero','Bogota','Cundinamarca','111311',4);
insert into addresses(first_line, second_line, city, state, postal_code, fk_user_id) values ('Carrera 15 Calle 21','Chapinero','Bogota','Cundinamarca','111311',5);


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

insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Mack Book Air', 589.5, 'Retina. 16Gb Ram.Garantia de un año. ', 4.9, 0, 5, 7, 9, false, 1);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('iphone 11', 600.5, 'En perfecto estado, un año de uso', 3.9, 0, 5, 7, 9, true, 2);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Laprop Acer', 300.5, 'Nueva de paquete', 3.9, 0, 5, 7, 9, true, 3);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Laptop Hp', 589.5, 'Todos los modelos disponibles.', 1.9, 0, 5, 7, 9, false, 4);
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

-- MASCOTAS


insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Goldens Retrievers', 589.5, '2 meses de nacidos', 4.9, 0, 5, 7, 9, false, 1);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Guacamayas ', 600.5, 'Los tenemos de todos los colores', 3.9, 0, 5, 7, 9, true, 2);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Cachorritos', 300.5, 'Diferentes razas y tamaños', 3.9, 0, 5, 7, 9, true, 3);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Gatos recien nacidos', 589.5, 'Raza: persa.', 1.9, 0, 5, 7, 9, true, 4);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Tortugas caceras', 10, 'Llevate gratis el estanque tambien!', 2.9, 0, 5, 7, 9, false, 5);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Pajaros cantarines', 20, 'Secadoras Xhe de todos los modelos ', 4.9, 0, 5, 7, 9, true, 1);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Conejos', 12, 'De 5 meses de nacidos en adelante.', 1.9, 0, 5, 7, 9, true, 2);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Conejillos de indias', 40, 'Con jaula incluida, y rueda recreativa.', 2.9, 0, 5, 7, 9, true, 3);


insert into stockpile(quantity, minimum_quantity, fk_product_id) values (8, 2, 17);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (3, 2, 18);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (4, 2, 19);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (5, 2, 20);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (6, 2, 21);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (10, 2, 22);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (10, 2, 23);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (20, 2, 24);


insert into product_images(image, fk_product_id) values ('https://image.freepik.com/psd-gratis/retrato-perrito-lindo-golden-retriever-que-lleva-sombrero-papa-noel_53876-73990.jpg', 17);
insert into product_images(image, fk_product_id) values ('https://img.freepik.com/psd-gratis/dos-cachorros-golden-retriever-bufandas_53876-73985.jpg?size=626&ext=jpg',17);
insert into product_images(image, fk_product_id) values ('https://image.freepik.com/psd-gratis/dos-adorables-cachorros-golden-retriever_53876-73982.jpg', 17);

insert into product_images(image, fk_product_id) values ('https://upload.wikimedia.org/wikipedia/commons/c/c0/Ara_macao_qtl1.jpg', 18);
insert into product_images(image, fk_product_id) values ('https://dam.tbg.com.mx/content/dam/tbg/mexico/natgeo/mx/naturaleza/animales/17/08/15/fotos-de-guacamayas-3.jpg.imgo.jpg', 18);

insert into product_images(image, fk_product_id) values ('https://image.freepik.com/foto-gratis/cachorros-beagles-buscando-algo_1150-18193.jpg', 19);
insert into product_images(image, fk_product_id) values ('https://www.happets.com/blog/wp-content/uploads/2019/05/cual-es-el-mejor-pienso-para-cachorros-1-1180x787.jpg', 19);
insert into product_images(image, fk_product_id) values ('https://blog.arion-petfood.es/wp-content/uploads/2014/06/67-camadas-hu%C3%A9rfanas-604x270.jpg', 19);

insert into product_images(image, fk_product_id) values ('https://images.mediotiempo.com/jfd3Z-Mc3uRpcDOb3Ao8Htng7Q0=/958x596/uploads/media/2020/05/08/gatos-el-animal-mas-propenso.jpeg', 20);
insert into product_images(image, fk_product_id) values ('https://www.affinity-petcare.com/advance/sites/default/files/field/image/que_comen_los_gatos_pequenos_1.jpg', 20);
insert into product_images(image, fk_product_id) values ('https://2.bp.blogspot.com/_WjLXj7vIB_M/SAsH6uVG_YI/AAAAAAAADeI/lk6rIZEJpqA/s400/kittens.jpg', 20);

insert into product_images(image, fk_product_id) values ('https://www.tiendanimal.es/articulos/wp-content/uploads/2010/11/tortugas.jpg', 21);
insert into product_images(image, fk_product_id) values ('https://www.monederosmart.com/wp-content/uploads/2019/09/79221395_l-e1569428572921-scaled.jpg', 21);

insert into product_images(image, fk_product_id) values ('https://t1.ea.ltmcdn.com/es/images/8/1/8/img_los_5_pajaros_que_mejor_cantan_20818_orig.jpg', 22);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/cb/56/89/cb5689024de53bd987dd96a703ce0194.jpg', 22);

insert into product_images(image, fk_product_id) values ('https://ichef.bbci.co.uk/news/410/cpsprodpb/E370/production/_109042285_femaleorgasm3.png', 23);
insert into product_images(image, fk_product_id) values ('https://www.geocities.ws/anitaomar/01.jpg', 23);
insert into product_images(image, fk_product_id) values ('https://uh.gsstatic.es/sfAttachPlugin/552033.png', 23);

insert into product_images(image, fk_product_id) values ('https://www.mundoanimalia.com/images/articles/ae/d6/a4/1c383cd30b7c298ab50293adfecb7b18/conejillo%20de%20indias_5851.jpg', 24);
insert into product_images(image, fk_product_id) values ('https://www.abc.com.py/resizer/7DLzgpWSMWLWHSizL8jZG9-UEBE=/fit-in/770x495/smart/arc-anglerfish-arc2-prod-abccolor.s3.amazonaws.com/public/STGWJ4K2H5CL7EMQJXQVVLVMSQ.jpg', 24);

insert into product_categories(fk_product_id, fk_category_id) values (17,5);
insert into product_categories(fk_product_id, fk_category_id) values (18,7);
insert into product_categories(fk_product_id, fk_category_id) values (19,5);
insert into product_categories(fk_product_id, fk_category_id) values (20,6);
insert into product_categories(fk_product_id, fk_category_id) values (21,7);
insert into product_categories(fk_product_id, fk_category_id) values (22,7);
insert into product_categories(fk_product_id, fk_category_id) values (23,7);
insert into product_categories(fk_product_id, fk_category_id) values (24,7);


-- ENTRETENIMIENTO

-- MASCOTAS


insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('El codigo da vinci', 589.5, 'Edicion especial. Original', 4.9, 0, 5, 7, 9, false, 1);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('PSP 3XM', 600.5, '3 juegos incluidos', 3.9, 0, 5, 7, 9, true, 2);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Coleccion de Agatha Christie', 300.5, 'Coleccion completa de Agatha Cristi', 3.9, 0, 5, 7, 9, true, 3);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('La saga de Harry Potter:Libros', 589.5, 'Peliculas 1,2,3,4,5,6,7 y 8', 1.9, 0, 5, 7, 9, true, 4);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Coleccion Fifa Xbox', 10, 'Todos los producto fifa para ti!', 2.9, 0, 5, 7, 9, true, 5);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Wii ', 20, 'Con dos nunchuks, y wii fit incluido', 4.9, 0, 5, 7, 9, false, 1);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Peliculas: El señor de los anillos', 12, 'Con seccion de "detras de cámara"', 1.9, 0, 5, 7, 9, true, 2);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('El viaje al centro de la tierra', 40, 'Autografiada por Julio Verne.', 2.9, 0, 5, 7, 9, true, 3);


insert into stockpile(quantity, minimum_quantity, fk_product_id) values (8, 2, 25);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (3, 2, 26);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (4, 2, 27);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (5, 2, 28);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (6, 2, 29);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (10, 2, 30);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (10, 2, 31);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (20, 2, 32);


insert into product_images(image, fk_product_id) values ('https://s03.s3c.es/imag/_v2/ecodiario/cultura/225x250/codigo_vinci_libro.jpg', 25);
insert into product_images(image, fk_product_id) values ('http://leedor.com/wp-content/uploads/2020/03/Da.png',25);

insert into product_images(image, fk_product_id) values ('https://icdn2.digitaltrends.com/image/digitaltrends_es/psp-press-shot.jpg', 26);
insert into product_images(image, fk_product_id) values ('https://i.blogs.es/65fef5/yinweiss/450_1000.jpg', 26);

insert into product_images(image, fk_product_id) values ('https://1.bp.blogspot.com/-tR6jKlAy7Cg/V9Apr7DJq8I/AAAAAAAACZA/Hfi8eaOS-JoJyvF0TBVCnCyM3qWdCHxgQCLcB/s1600/100_5497.JPG', 27);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/f9/aa/54/f9aa547ed703a73ab0c7bb27b7935fab.jpg', 27);
insert into product_images(image, fk_product_id) values ('https://www.planetadelibros.com/usuaris/libros/fotos/275/m_libros/portada_se-anuncia-un-asesinato_agatha-christie_201807031705.jpg', 27);

insert into product_images(image, fk_product_id) values ('https://fotografias.antena3.com/clipping/cmsimages02/2017/07/19/D9693B38-1E29-4243-AC6D-CB2FA0A76866/69.jpg', 28);
insert into product_images(image, fk_product_id) values ('https://1.bp.blogspot.com/-YU4DtwIpkpM/Ww8nazHng3I/AAAAAAAAEAs/um94XDYZkZAfStd1vITptDu6xtENXd-ygCLcBGAs/s1600/saga-harry-potter-7-libros-j-k-rowling-salamandra-D_NQ_NP_272405-MLA20859862295_082016-F.jpg', 28);
insert into product_images(image, fk_product_id) values ('https://www.elnacional.com/wp-content/uploads/2019/04/sacerdote-que-quemo-libros-harry-potter-polonia-disculpo_277580.jpg', 28);

insert into product_images(image, fk_product_id) values ('https://s3-us-west-2.amazonaws.com/usedphotosuk/103957357_614.jpg', 29);
insert into product_images(image, fk_product_id) values ('https://thumbs.dreamstime.com/z/collection-fifa-football-games-swindon-uk-september-ea-sports-xbox-one-console-127383574.jpg', 29);

insert into product_images(image, fk_product_id) values ('https://www.muycomputer.com/wp-content/uploads/2020/01/Nintendo-Wii.jpg', 30);
insert into product_images(image, fk_product_id) values ('https://images-na.ssl-images-amazon.com/images/I/71y0V5X%2BJTL._SL1500_.jpg', 30);

insert into product_images(image, fk_product_id) values ('https://cloud10.todocoleccion.online/cine-peliculas-dvd/tc/2019/02/04/01/149765066.jpg', 31);
insert into product_images(image, fk_product_id) values ('https://static.fnac-static.com/multimedia/Images/ES/NR/05/bb/14/1358597/1540-1.jpg', 31);

insert into product_images(image, fk_product_id) values ('https://i.blogs.es/5ddedb/viaje-al-centrodelatierra/450_1000.jpg', 32);
insert into product_images(image, fk_product_id) values ('https://fotos.subefotos.com/418a4162def326dd43c7a1e69e490782o.jpg', 32);

insert into product_categories(fk_product_id, fk_category_id) values (25,12);
insert into product_categories(fk_product_id, fk_category_id) values (26,14);
insert into product_categories(fk_product_id, fk_category_id) values (27,12);
insert into product_categories(fk_product_id, fk_category_id) values (28,12);
insert into product_categories(fk_product_id, fk_category_id) values (29,14);
insert into product_categories(fk_product_id, fk_category_id) values (30,14);
insert into product_categories(fk_product_id, fk_category_id) values (31,13);
insert into product_categories(fk_product_id, fk_category_id) values (32,13);


-- VEHICULOS

insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Corollas 2019', 589.5, 'De agencia', 4.9, 0, 5, 7, 9, false, 1);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Bicicleta roja', 600.5, 'Con 2 años de uso', 3.9, 0, 5, 7, 9, false, 2);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Audi 2018', 300.5, 'Detalles en el parachoque.', 3.9, 0, 5, 7, 9, true, 3);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Volkswagen 2018', 589.5, 'Descapotable. Asientes de cuero. Cauchos nuevos', 1.9, 0, 5, 7, 9, false, 4);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Moto BMW', 10, 'Sacada de agencia', 2.9, 0, 5, 7, 9, true, 5);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Bicicleta de carrera', 20, 'Con cauchos de repuestos.', 4.9, 0, 5, 7, 9, false, 1);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Mazda 2017', 12, 'En perfecto estado.', 1.9, 0, 5, 7, 9, false, 2);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Moto yamaha', 40, 'Con detalle en el freno delantero', 2.9, 0, 5, 7, 9, true, 3);


insert into stockpile(quantity, minimum_quantity, fk_product_id) values (8, 1, 33);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (7, 1, 34);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (4, 1, 35);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (3, 1, 36);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (5, 1, 37);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (5, 1, 38);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (6, 1, 39);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (8, 1, 40);


insert into product_images(image, fk_product_id) values ('https://ventaredonda.com.ve/oc-content/uploads/146/43926.jpg', 33);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/5c/39/67/5c39671d5b4bc7189a211ee12e9a5a75.jpg',33);

insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/b9/66/7e/b9667e8c48fdc13a7c54cb5b5d506fa8.jpg', 34);

insert into product_images(image, fk_product_id) values ('https://cars.usnews.com/static/images/Auto/izmo/i62379705/2018_audi_a4_angularfront.jpg', 35);
insert into product_images(image, fk_product_id) values ('https://static.carroya.com/vehiculos/1777278/1777278_1_w.jpg', 35);

insert into product_images(image, fk_product_id) values ('https://soymotor.com/sites/default/files/usuarios/redaccion/portal/ralonso/volkswagen-cc-2018.jpg', 36);
insert into product_images(image, fk_product_id) values ('https://www.autologia.com.mx/wp-content/uploads/2017/03/Arteon_1.jpg', 36);

insert into product_images(image, fk_product_id) values ('https://revistamoto.com/wp_rm/wp-content/uploads/2017/07/Screenshot_69.jpg', 37);
insert into product_images(image, fk_product_id) values ('https://www.moto1pro.com/sites/default/files/bmw-r-1200-gs-triple-black.jpg', 37);

insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/236x/bb/3c/5d/bb3c5d708ca68e4f7f153bb73afed2e3.jpg', 38);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/236x/3d/a8/48/3da8481ee8bbca846bf0c4e5a314eaeb--fixed-bike-fixed-gear.jpg', 38);

insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/e4/a7/4a/e4a74a70b88ec93f7af741e351e45af9.jpg', 39);
insert into product_images(image, fk_product_id) values ('https://s1.1zoom.me/b5951/258/Mazda_2017_CX-5_Red_Metallic_523565_3840x2400.jpg', 39);

insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/a2/04/1f/a2041f1ed8c10f1509d4ccfea4353b4a.jpg', 40);
insert into product_images(image, fk_product_id) values ('https://i.pinimg.com/originals/2c/7f/48/2c7f488ce0a77e6d2038e9f52da19902.jpg', 40);

insert into product_categories(fk_product_id, fk_category_id) values (33,16);
insert into product_categories(fk_product_id, fk_category_id) values (34,17);
insert into product_categories(fk_product_id, fk_category_id) values (35,16);
insert into product_categories(fk_product_id, fk_category_id) values (36,16);
insert into product_categories(fk_product_id, fk_category_id) values (37,18);
insert into product_categories(fk_product_id, fk_category_id) values (38,17);
insert into product_categories(fk_product_id, fk_category_id) values (39,16);
insert into product_categories(fk_product_id, fk_category_id) values (40,18);

--INMUEBLES

insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Ceramica para baños', 589.5, 'Lo mas moderno lo tenemos nosotros', 4.9, 0, 5, 7, 9, true, 1);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Lavamanos', 600.5, 'De la mejor calidad, y de todos los estilos', 3.9, 0, 5, 7, 9, true, 2);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Cocinas electricas', 300.5, 'Variedad de tamaños.', 3.9, 0, 5, 7, 9, true, 3);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Cocinas electricas portatiles', 589.5, 'Con cambio de ornilla', 1.9, 0, 5, 7, 9, false, 4);
insert into products(name, price, description, score, discount, width, height, depth, new, fk_user_id) values ('Nevera Haier', 10, '15 pies. Dispensador de hielo, y agua', 2.9, 0, 5, 7, 9, true, 5);

insert into stockpile(quantity, minimum_quantity, fk_product_id) values (9, 1, 41);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (12, 1, 42);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (14, 1, 43);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (16, 1, 44);
insert into stockpile(quantity, minimum_quantity, fk_product_id) values (8, 1, 45);


insert into product_images(image, fk_product_id) values ('https://images.homify.com/c_fill,f_auto,q_0,w_740/v1533849309/p/photo/image/2672659/BAN%CC%83O_HABITACION_PRINCIPAL.jpg', 41);
insert into product_images(image, fk_product_id) values ('https://www.siberzone.es/blog-sistemas-ventilacion/wp-content/uploads/2018/03/bano-sin-ventana.jpg',41);

insert into product_images(image, fk_product_id) values ('https://images-na.ssl-images-amazon.com/images/I/91vCCPB8PTL._AC_SY355_.jpg', 42);
insert into product_images(image, fk_product_id) values ('https://img.edilportale.com/product-thumbs/b_simplo-oval-washbasin-antonio-lupi-design-301092-rel6aee224f.jpg', 42);


insert into product_images(image, fk_product_id) values ('https://previews.123rf.com/images/navintar/navintar1801/navintar180100200/94109573-cierre-de-vista-de-una-cocina-el%C3%A9ctrica-de-cocina-de-inducci%C3%B3n-de-cocina-con-muebles-de-cocina.jpg', 43);
insert into product_images(image, fk_product_id) values ('https://images-na.ssl-images-amazon.com/images/I/71Oz8ujbC0L._AC_SX522_.jpg', 43);

insert into product_images(image, fk_product_id) values ('https://http2.mlstatic.com/cocina-electrica-de-2-hornillas-marca-saco-D_NQ_NP_646153-MLV31250852081_062019-F.jpg', 44);
insert into product_images(image, fk_product_id) values ('https://officenet.net.ve/5097-large_default/cocina-electrica-de-1-hornilla-cnzidel-110v-alta-calidad.jpg', 44);

insert into product_images(image, fk_product_id) values ('https://ventaredonda.com.ve/oc-content/uploads/146/44216.jpg', 45);
insert into product_images(image, fk_product_id) values ('https://www.manualpdf.es/thumbs/products/l/102566-haier-cfe633cw.jpg', 45);


insert into product_categories(fk_product_id, fk_category_id) values (41,19);
insert into product_categories(fk_product_id, fk_category_id) values (42,19);
insert into product_categories(fk_product_id, fk_category_id) values (43,20);
insert into product_categories(fk_product_id, fk_category_id) values (44,20);
insert into product_categories(fk_product_id, fk_category_id) values (45,20);


insert into statuses(name, description) values ('Nueva Orden','Nueva orden creada');
insert into statuses(name, description) values ('Orden Pendiente','Orden pendiente para ser pagada');
insert into statuses(name, description) values ('Confirmando Orden','Confirmando una orden en la blockchain');
insert into statuses(name, description) values ('Orden Pagada','Orden pagada y confirmada');
insert into statuses(name, description) values ('Orden Invalida','Orden invalidada en la blockchain');
insert into statuses(name, description) values ('Orden Expirada','Orden expirada por haber pasado 20 min sin pagar');
insert into statuses(name, description) values ('Orden Cancelada','Orden cancelada por el cliente');