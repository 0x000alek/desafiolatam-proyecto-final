CREATE DATABASE "wawita_db";

CREATE TABLE "users" (
	"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"email" TEXT NOT NULL UNIQUE,
	"password_hash" TEXT NOT NULL,
	"is_active" BOOLEAN NOT NULL DEFAULT TRUE,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "user_profiles" (
	"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" UUID NOT NULL,
	"fullname" TEXT NOT NULL,
	"nickname" TEXT UNIQUE,
	"avatar_url" TEXT,
	"biography" TEXT,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "categories" (
	"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"name" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "publications" (
	"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"owner_profile_id" UUID NOT NULL,
	"title" TEXT NOT NULL,
	"description" TEXT,
	"condition" TEXT NOT NULL DEFAULT 'Nuevo' CHECK ("condition" IN ('Nuevo', 'Usado')),
	"price" INTEGER NOT NULL,
	"stock" INTEGER NOT NULL DEFAULT 1,
	"status" TEXT NOT NULL DEFAULT 'activa' CHECK ("status" IN ('activa', 'pausada', 'finalizada')),
	"category_id" INTEGER NOT NULL DEFAULT 5,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "publication_images" (
	"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"publication_id" UUID NOT NULL,
	"image_url" TEXT NOT NULL,
	"position" INTEGER NOT NULL DEFAULT 1,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "favorites" (
	"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_profile_id" UUID NOT NULL,
	"publication_id" UUID NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE "user_profiles"
ADD FOREIGN KEY("user_id") REFERENCES "users"("id")
ON DELETE CASCADE;

ALTER TABLE "publications"
ADD FOREIGN KEY("owner_profile_id") REFERENCES "user_profiles"("id")
ON DELETE CASCADE;
ALTER TABLE "publications"
ADD FOREIGN KEY("category_id") REFERENCES "categories"("id")
ON DELETE NO ACTION;

ALTER TABLE "publication_images"
ADD FOREIGN KEY("publication_id") REFERENCES "publications"("id")
ON DELETE CASCADE;

ALTER TABLE "favorites"
ADD FOREIGN KEY("user_profile_id") REFERENCES "user_profiles"("id")
ON DELETE CASCADE;
ALTER TABLE "favorites"
ADD FOREIGN KEY("publication_id") REFERENCES "publications"("id")
ON DELETE CASCADE;

INSERT INTO users (id, email, password_hash) VALUES
('a16b3e91-305e-46b4-9193-1924dca102f4', 'ventas@babyworld.cl', '$2b$10$9/fDU.Drrx5P8Hlp9gzGyu8v/7ioCBR8YiJsTzKcO5dxdT/1pCwsm'),
('97a2ef14-5011-4cd6-9e69-907471189ec0', 'contacto@bebesfelices.cl', '$2b$10$uElhbN1bABy72nPv3E0ck.Bv7MacDX2avteETHczgKh5BmupLSaRy'),
('f15010ea-4bca-4e11-97b0-e9853bf7e7f8', 'milimenares@gmail.com', '$2b$10$tHvGv7nbU.JCnBFqExT6WehnY6dJdwPT9154EkZGYgeC85Qq3E34u'),
('c502d807-38a9-46dc-bbe7-82df6a0fbce4', 'alexisolguin@gmail.com', '$2b$10$gv2sLm2SIW11jwy2KmczAuIbUFZA4y6p0CwYGtMekswOMKzpvB7b.');

INSERT INTO user_profiles (id, user_id, fullname) VALUES
('65dabf50-ee25-4301-aaaa-cbe5ce49f3ac', 'a16b3e91-305e-46b4-9193-1924dca102f4', 'Baby World SPA'),
('626a97eb-3859-492b-80b6-e66a085e8ced', '97a2ef14-5011-4cd6-9e69-907471189ec0', 'Bebés Felices Ltda.'),
('44f94490-e05d-4d63-a20d-bfe021c68c31', 'f15010ea-4bca-4e11-97b0-e9853bf7e7f8', 'Melany Menares'),
('214bf28e-5681-4a90-b680-fb4d032c7e7d', 'c502d807-38a9-46dc-bbe7-82df6a0fbce4', 'Alexis Olguin');

INSERT INTO categories (name) VALUES
('Vestuario'),
('Juguetes'),
('Muebles'),
('Accesorios'),
('Otros');

INSERT INTO publications (
		id,
    owner_profile_id,
    title,
    description,
    condition,
    price,
    stock
) VALUES
('b262a9b7-7db1-4317-b138-6f96119dbf42', '65dabf50-ee25-4301-aaaa-cbe5ce49f3ac', 'Pijama Algodón grueso', '100% Algodón - 3 Capas de algodón Hipoalergénico.\nDiseños exclusivos.\nDiseñados de algodón exclusivo, transpirable. \nIdeales para invierno', 'Nuevo', 18000, 30),
('4932ab42-40c7-41c7-bea6-681f1d5b82d1', '65dabf50-ee25-4301-aaaa-cbe5ce49f3ac', 'Pack 2 Mamaderas Anti-Cólicos', 'Las Mamaderas Closer to Nature de Tommee Tippee son una innovación excepcional para padres y bebés, especialmente diseñadas para facilitar la transición entre la lactancia materna y el uso de mamaderas.', 'Nuevo', 25000, 12),
('aaff262c-e803-4088-9f6e-0f9c5836b270', '65dabf50-ee25-4301-aaaa-cbe5ce49f3ac', 'Pack 5 bodies manga larga', 'Bodies en punto de algodón suave. Modelo de manga larga con hombros solapados y botones de presión en la entrepierna.', 'Nuevo', 22000, 25),
('3f6c8fb4-091f-4c12-b84f-a7ab40982d4c', '44f94490-e05d-4d63-a20d-bfe021c68c31', 'Mochila porta bebé', 'Mochila ergonómica con 3 posiciones de carga. Desde 3 hasta 15 kg.', 'Usado', 78000, 1),
('9beb587c-6b9c-4d5c-a21f-f57a0cea80df', '44f94490-e05d-4d63-a20d-bfe021c68c31', 'Cuna 3 en 1 Lovi', 'La cuna LOVI es una solución multifuncional diseñada para adaptarse a todas tus necesidades, ya sea en casa o de viaje. Esta cuna 3 en 1 puede utilizarse como cuna mecedora, cuna de viaje y cuna de casa, proporcionando comodidad y seguridad para tu bebé desde el nacimiento hasta que empiece a sentarse (0 a 6 meses, hasta 9 kg).', 'Usado', 95000, 1),
('a1ea1f6a-5347-496d-a12c-1772f9027548', '44f94490-e05d-4d63-a20d-bfe021c68c31', 'Silla de comer madera', 'Silla alta para bebé con bandeja removible y cinturón de seguridad. Fácil de guardar y linda madera pintada.', 'Usado', 115000, 2),
('49b2573f-63b4-4bbe-a7a7-44a325c2042d', '626a97eb-3859-492b-80b6-e66a085e8ced', 'Organizadores Apilables', 'Jugueteros Organizadores Apilables de Madera Montessori, pensados para que los niños tengan la libertad e independencia a la hora de jugar. Al ser capaces de ver lo que hay en su interior, alcanzar todos los objetos y volver a guardar y ordenar con facilidad. ', 'Nuevo', 55000, 150),
('7bf66ae8-30d7-4f34-b181-d59d23dde2a1', '626a97eb-3859-492b-80b6-e66a085e8ced', 'Repisa Avión de Madera', 'Maravillosas Repisas con forma de Avión de madera, hechas 100% a mano, inspiración de estilo nórdico, son perfectas y prácticas para decorar y dar un toque lúdico a cualquier espacio de tu casa. Quedan increíbles en cualquier lugar! Darás un ambiente lúdico y estiloso. Ideal instalar a la altura de tus hijos, para mayor autonomía.', 'Nuevo', 45000, 111),
('f023e515-e65e-4965-bb52-0a833d29abcc', '44f94490-e05d-4d63-a20d-bfe021c68c31', 'Gorro Hoodie Foxi', 'Gorrito Lana hipoalergénica desde 1 año hasta 5 años. Alto total 40 cm x ancho 30 cm', 'Nuevo', 18990, 3);

INSERT INTO publication_images (publication_id, image_url) VALUES
('b262a9b7-7db1-4317-b138-6f96119dbf42', 'https://www.bombukids.cl/cdn/shop/products/IMG_6677-copia_1296x.jpg?v=1619823502'),
('4932ab42-40c7-41c7-bea6-681f1d5b82d1', 'https://mamasmateas.com/cdn/shop/files/tommee-tippee-alimentacion-mamadera-tommee-tippee-260-ml-tt42250090-37065129918639.webp?v=1729189670&width=1426'),
('aaff262c-e803-4088-9f6e-0f9c5836b270', 'https://hmchile.vtexassets.com/unsafe/1280x0/center/middle/https%3A%2F%2Fhmchile.vtexassets.com%2Farquivos%2Fids%2F7334573%2FPack-de-5-bodies-de-manga-larga---Rosa-claro-Corazones---H-M-CL.jpg%3Fv%3D638881441944070000'),
('3f6c8fb4-091f-4c12-b84f-a7ab40982d4c', 'https://mamasmateas.com/cdn/shop/files/Disenosintitulo-2024-11-23T125411.170.png?v=1732377258&width=1426'),
('9beb587c-6b9c-4d5c-a21f-f57a0cea80df', 'https://mamasmateas.com/cdn/shop/files/cuna-moises-lovi-3-en-1-kinderkraft-295138_5000x_54177468-53aa-4d95-9e41-9cd3503d0624.webp?v=1723063429&width=1426'),
('a1ea1f6a-5347-496d-a12c-1772f9027548', 'https://form.cl/cdn/shop/files/v-muk1081011114r-1-762979e9-be54-4406-90da-f2e32e4f3f12_e9455cb3-7018-4ea7-92ed-4f8a7b9bbe98.jpg?v=1732822973&width=1400'),
('49b2573f-63b4-4bbe-a7a7-44a325c2042d', 'https://comomono.cl/wp-content/uploads/2022/09/APILABLES.jpg'),
('7bf66ae8-30d7-4f34-b181-d59d23dde2a1', 'https://comomono.cl/wp-content/uploads/2022/11/AVION-CHICO-1536x1386.jpg'),
('f023e515-e65e-4965-bb52-0a833d29abcc', 'https://www.bombukids.cl/cdn/shop/products/IMG_5035.jpg?v=1659671222');

INSERT INTO favorites (user_profile_id, publication_id) VALUES
('44f94490-e05d-4d63-a20d-bfe021c68c31', '4932ab42-40c7-41c7-bea6-681f1d5b82d1');