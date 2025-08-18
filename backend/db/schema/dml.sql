-- Query para obteener todas las publicaciones, junto con el nombre de la condición, categoria, y url de la imagen
SELECT 
  p.id,
  p.title, 
  p.description, 
  cn.name AS condition, 
  ct.name AS category, 
  p.price, 
  p.stock, 
  pi.image_url, 
  p.owner_profile_id AS owner_id, 
  p.updated_at 
FROM publications p
LEFT JOIN publication_images pi ON pi.publication_id = p.id 
  AND pi.position = 1 
JOIN categories ct ON ct.id = p.category_id
JOIN conditions cn ON cn.id = p.condition_id;

-- Query para obteener todas las publicaciones, junto con el nombre de la condición, categoria, y url de la imagen
-- y si la publicacion es favorita por un usuario especifico (usuario logeado)
-- Reemplazar '44f94490-e05d-4d63-a20d-bfe021c68c31' con el ID del usuario deseado
SELECT 
  p.id,
  p.title, 
  p.description, 
  cn.name AS condition, 
  ct.name AS category, 
  p.price, 
  p.stock, 
  pi.image_url, 
  p.owner_profile_id AS owner_id, 
  CASE WHEN f.id IS NOT NULL THEN true ELSE false END AS is_favorite, 
  p.updated_at 
FROM publications p
LEFT JOIN publication_images pi ON pi.publication_id = p.id 
  AND pi.position = 1 
JOIN categories ct ON ct.id = p.category_id
JOIN conditions cn ON cn.id = p.condition_id
LEFT JOIN favorites f ON f.publication_id = p.id AND f.user_profile_id = '44f94490-e05d-4d63-a20d-bfe021c68c31';

-- Query para obteener una publicacion en especifico, junto con el nombre de la condición y la categoria
-- Reemplazar 'b262a9b7-7db1-4317-b138-6f96119dbf42' con el ID de la publicacion deseada
SELECT 
  p.id,
  p.title, 
  p.description, 
  cn.name AS condition, 
  ct.name AS category, 
  p.price, 
  p.stock, 
  p.owner_profile_id AS owner_id, 
  up.fullname AS owner_name,
  p.updated_at 
FROM publications p
JOIN user_profiles up ON up.id = p.owner_profile_id
JOIN categories ct ON ct.id = p.category_id
JOIN conditions cn ON cn.id = p.condition_id
WHERE p.id = 'b262a9b7-7db1-4317-b138-6f96119dbf42';

-- Query para obteener todas las publicaciones de un usuario especifico, junto con el nombre de la condición, categoria, y url de la imagen
-- Reemplazar '65dabf50-ee25-4301-aaaa-cbe5ce49f3ac' con el ID del usuario deseado
SELECT 
  p.id,
  p.title, 
  p.description, 
  cn.name AS condition, 
  ct.name AS category, 
  p.price, 
  p.stock, 
  pi.image_url, 
  p.updated_at 
FROM publications p
LEFT JOIN publication_images pi ON pi.publication_id = p.id 
  AND pi.position = 1 
JOIN categories ct ON ct.id = p.category_id
JOIN conditions cn ON cn.id = p.condition_id
WHERE p.owner_profile_id = '65dabf50-ee25-4301-aaaa-cbe5ce49f3ac'

-- Query para obtener todas las publicaciones marcadas como favoritas de un usuario en particular, junto con el nombre de la ccondición, categoria, y url de la imagen
-- Reemplazar 'b262a9b7-7db1-4317-b138-6f96119dbf42' con el ID de la publicacion deseada
SELECT 
  p.id,
  p.title, 
  p.description, 
  cn.name AS condition, 
  ct.name AS category, 
  p.price, 
  p.stock, 
  pi.image_url, 
  p.owner_profile_id AS owner_id, 
  p.updated_at 
FROM publications p
LEFT JOIN publication_images pi ON pi.publication_id = p.id 
  AND pi.position = 1 
JOIN categories ct ON ct.id = p.category_id
JOIN conditions cn ON cn.id = p.condition_id
JOIN favorites f ON f.publication_id = p.id AND f.user_profile_id = '44f94490-e05d-4d63-a20d-bfe021c68c31';