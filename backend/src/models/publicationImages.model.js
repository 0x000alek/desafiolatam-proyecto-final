import format from 'pg-format';
import { config } from '../../config/wawita.config.js';
import pool from '../../db/config.db.js';

const create = async (publicationImage) => {
  const { name: table } = config.db.tables.publicationImages;
  const { publicationId, imageUrl } = publicationImage;

  const query = format(
    `INSERT INTO %I (publication_id, image_url) VALUES (%L, %L) RETURNING *`,
    table,
    publicationId,
    imageUrl
  );
  console.info(`Executing query: ${query}`);

  const { rows } = await pool.query(query);
  return rows[0];
};

const findByPublicationId = async (publicationId) => {
  const { name: table } = config.db.tables.publicationImages;

  const query = format(
    `
    SELECT 
      id, 
      publication_id, 
      image_url, 
      position 
    FROM %I 
    WHERE publication_id = %L
  `,
    table,
    publicationId
  );
  console.info(`Executing query: ${query}`);

  const { rows } = await pool.query(query);
  return rows;
};

const update = async (publicationImage) => {
  const { name: table } = config.db.tables.publicationImages;
  const { publicationId, imageUrl } = publicationImage;

  const query = format(
    `UPDATE %I
    SET 
      image_url = %L,
      updated_at = NOW()
    WHERE publication_id = %L
    RETURNING *`,
    table,
    imageUrl,
    publicationId
  );
  console.info(`Executing query: ${query}`);

  const { rows } = await pool.query(query);
  return rows[0];
};

export default { create, findByPublicationId, update };
