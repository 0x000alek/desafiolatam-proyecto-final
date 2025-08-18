import format from 'pg-format';
import { config } from '../../config/wawita.config.js';
import pool from '../../db/config.db.js';

const create = async (userProfileId, publicationId) => {
  const { name: table } = config.db.tables.favorites;

  const query = format(
    'INSERT INTO %I (user_profile_id, publication_id) VALUES (%L, %L) RETURNING *',
    table,
    userProfileId,
    publicationId
  );
  console.info(`Executing query: ${query}`);

  const { rows } = await pool.query(query);
  return rows[0];
};

const deleteByUserAndPublicationId = async (userProfileId, publicationId) => {
  const { name: table } = config.db.tables.favorites;

  const query = format(
    `DELETE FROM %I WHERE user_profile_id = %L AND publication_id = %L RETURNING *`,
    table,
    userProfileId,
    publicationId
  );
  console.info(`Executing query: ${query}`);

  const { rows } = await pool.query(query);
  return rows[0];
};

const findByUserAndPublicationId = async (userProfileId, publicationId) => {
  const { name: table } = config.db.tables.favorites;

  const query = format(
    `SELECT * FROM %I WHERE user_profile_id = %L AND publication_id = %L`,
    table,
    userProfileId,
    publicationId
  );
  console.info(`Executing query: ${query}`);

  const { rows } = await pool.query(query);
  return rows[0];
};

export default {
  create,
  deleteByUserAndPublicationId,
  findByUserAndPublicationId,
};
