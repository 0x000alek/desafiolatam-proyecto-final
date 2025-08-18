import format from 'pg-format';
import { config } from '../../config/wawita.config.js';
import pool from '../../db/config.db.js';

const create = async (publication, userProfileId) => {
  const { name: table } = config.db.tables.publications;
  const { title, description, condition, price, stock } = publication;

  const query = format(
    `INSERT INTO %I (
      owner_profile_id, 
      title, 
      description, 
      condition, 
      price, 
      stock
    ) VALUES (%L, %L, %L, %L, %L, %L) RETURNING *`,
    table,
    userProfileId,
    title,
    description,
    condition,
    price,
    stock
  );
  console.info(`Executing query: ${query}`);

  const { rows } = await pool.query(query);
  return rows[0];
};

const deleteById = async (id) => {
  const { name: table } = config.db.tables.publications;

  const query = format(`DELETE FROM %I WHERE id = %L RETURNING *`, table, id);
  console.info(`Executing query: ${query}`);

  const { rows } = await pool.query(query);
  return rows[0];
};

const findAll = async (userProfileId, filters = {}) => {
  const { name: table } = config.db.tables.publications;
  const { condition, category } = filters;

  let selectIsFavoriite = '';
  let joinFavorites = '';
  if (userProfileId) {
    selectIsFavoriite =
      'CASE WHEN f.id IS NOT NULL THEN true ELSE false END AS is_favorite, ';
    joinFavorites = format(
      `
      LEFT JOIN favorites f ON f.publication_id = p.id
      AND f.user_profile_id = %L
    `,
      userProfileId
    );
  }

  let query = format(
    `
    SELECT 
      p.id,
      p.title, 
      p.description, 
      p.condition, 
      p.price, 
      p.stock, 
      pi.image_url, 
      p.owner_profile_id AS owner_id, 
      ${selectIsFavoriite}
      p.updated_at 
    FROM %I p
    LEFT JOIN publication_images pi ON pi.publication_id = p.id 
      AND pi.position = 1 
    ${joinFavorites}
  `,
    table
  );

  let whereClause = '';
  if (condition) {
    whereClause += format(`WHERE p.condition_id = %L `, condition);
  }
  if (category) {
    whereClause += whereClause
      ? format(`AND p.category_id = %L `, category)
      : format(`WHERE p.category_id = %L `, category);
  }

  query += whereClause;
  console.info(`Executing query: ${query}`);

  const { rows } = await pool.query(query);
  return rows;
};

const findById = async (id, userProfileId) => {
  const { name: table } = config.db.tables.publications;

  let selectIsFavoriite = '';
  let joinFavorites = '';
  if (userProfileId) {
    selectIsFavoriite =
      'CASE WHEN f.id IS NOT NULL THEN true ELSE false END AS is_favorite, ';
    joinFavorites = format(
      `
      LEFT JOIN favorites f ON f.publication_id = p.id
      AND f.user_profile_id = %L
    `,
      userProfileId
    );
  }

  const query = format(
    `SELECT 
      p.id,
      p.title, 
      p.description, 
      p.condition, 
      p.price, 
      p.stock, 
      pi.image_url, 
      p.owner_profile_id AS owner_id, 
      up.fullname AS owner_name,
      ${selectIsFavoriite}
      p.updated_at 
    FROM %I p
    JOIN user_profiles up ON up.id = p.owner_profile_id
    LEFT JOIN publication_images pi ON pi.publication_id = p.id 
      AND pi.position = 1 
    ${joinFavorites}
    WHERE p.id = %L
    `,
    table,
    id
  );
  console.info(`Executing query: ${query}`);

  const { rows } = await pool.query(query);
  return rows[0];
};

const findByOwnerId = async (ownerId, userProfileId, filters = {}) => {
  const { name: table } = config.db.tables.publications;
  const { condition, category } = filters;

  let selectIsFavoriite = '';
  let joinFavorites = '';
  if (userProfileId) {
    selectIsFavoriite =
      'CASE WHEN f.id IS NOT NULL THEN true ELSE false END AS is_favorite, ';
    joinFavorites = format(
      `
      LEFT JOIN favorites f ON f.publication_id = p.id
      AND f.user_profile_id = %L
    `,
      userProfileId
    );
  }

  let query = format(
    `SELECT 
      p.id,
      p.title, 
      p.description, 
      p.condition,
      p.price, 
      p.stock, 
      pi.image_url, 
      ${selectIsFavoriite}
      p.updated_at 
    FROM %I p
    LEFT JOIN publication_images pi ON pi.publication_id = p.id 
      AND pi.position = 1 
    ${joinFavorites}
    `,
    table
  );

  let whereClause = format('WHERE p.owner_profile_id = %L ', ownerId);
  if (condition) {
    whereClause += format(`AND p.condition_id = %L `, condition);
  }
  if (category) {
    whereClause += format(`AND p.category_id = %L `, category);
  }

  query += whereClause;
  console.info(`Executing query: ${query}`);

  const { rows } = await pool.query(query);
  return rows;
};

const findMarkedAsFavorites = async (userProfileId) => {
  const { name: table } = config.db.tables.publications;

  const query = format(
    `SELECT 
      p.id,
      p.title, 
      p.description, 
      p.condition,
      p.price, 
      p.stock, 
      pi.image_url, 
      p.owner_profile_id AS owner_id, 
      p.updated_at 
    FROM %I p
    LEFT JOIN publication_images pi ON pi.publication_id = p.id 
      AND pi.position = 1 
    JOIN favorites f ON f.publication_id = p.id 
      AND f.user_profile_id = %L`,
    table,
    userProfileId
  );
  console.info(`Executing query: ${query}`);

  const { rows } = await pool.query(query);
  return rows;
};

const update = async (publication) => {
  const { name: table } = config.db.tables.publications;
  const { id, title, description, condition, price, stock } = publication;

  const query = format(
    `UPDATE %I
    SET 
      title = %L,
      description = %L,
      condition = %L,
      price = %L,
      stock = %L,
      updated_at = NOW()
    WHERE id = %L
    RETURNING *`,
    table,
    title,
    description,
    condition,
    price,
    stock,
    id
  );
  console.info(`Executing query: ${query}`);

  const { rows } = await pool.query(query);
  return rows[0];
};

export default {
  create,
  deleteById,
  findAll,
  findById,
  findByOwnerId,
  findMarkedAsFavorites,
  update,
};
