import 'dotenv/config';

export const config = {
  server: {
    env: process.env.NODE_ENV || 'development',
    protocol: process.env.PROTOCOL || 'http',
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT) || 3000,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'wawita_db',

    paginationDefaults: {
      defaultLimit: parseInt(process.env.PAGINATION_DEFAULT_LIMIT) || 10,
      defaultPage: parseInt(process.env.PAGINATION_DEFAULT_PAGE) || 1,
      maxLimit: parseInt(process.env.PAGINATION_MAX_LIMIT) || 100,
      maxPage: parseInt(process.env.PAGINATION_MAX_PAGE) || 1000,
      type: 'offset',
    },

    tables: {
      users: {
        name: 'users',
        allowedColumns: [
          'id',
          'email',
          'password_hash',
          'is_active',
          'created_at',
          'updated_at',
        ],
      },
      userProfiles: {
        name: 'user_profiles',
        allowedColumns: [
          'id',
          'user_id',
          'fullname',
          'nickname',
          'avatar_url',
          'biography',
          'created_at',
          'updated_at',
        ],
      },
      categories: {
        name: 'categories',
        allowedColumns: ['id', 'name', 'created_at', 'updated_at'],
      },
      publications: {
        name: 'publications',
        allowedColumns: [
          'id',
          'owner_profile_id',
          'title',
          'description',
          'condition',
          'price',
          'stock',
          'status',
          'category_id',
          'created_at',
          'updated_at',
        ],
      },
      publicationImages: {
        name: 'publication_images',
        allowedColumns: [
          'id',
          'publication_id',
          'image_url',
          'position',
          'created_at',
          'updated_at',
        ],
      },
      favorites: {
        name: 'favorites',
        allowedColumns: [
          'id',
          'user_profile_id',
          'publication_id',
          'created_at',
          'updated_at',
        ],
      },
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret_key',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret:
      process.env.JWT_REFRESH_SECRET || 'default_refresh_secret_key',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  auth: {
    saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
    tokenHeader: process.env.TOKEN_HEADER || 'Authorization',
    cookieName: process.env.COOKIE_NAME || 'auth_token',
  },
  api: {
    prefix: process.env.API_PREFIX || '/api',
    version: process.env.API_VERSION || 'v1',
  },
  paths: {
    logsDir: process.env.LOGS_DIR || 'logs',
  },
};
