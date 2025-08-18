import favoritesModel from '../models/favorites.model.js';
import publicationsModel from '../models/publications.model.js';
import publicationImagesModel from '../models/publicationImages.model.js';
import usersModel from '../models/users.model.js';

const create = async (req, res) => {
  try {
    const { profileId: userProfileId } = req.user;
    const publication = req.body;

    console.info('Creating a new publication:', publication);
    const createdPublication = await publicationsModel.create(
      publication,
      userProfileId
    );

    await publicationImagesModel.create({
      publicationId: createdPublication.id,
      imageUrl: publication.imageUrl,
    });

    res.status(201).json({
      message: 'Publication created successfully',
      data: createdPublication,
    });
  } catch (error) {
    console.error(
      'Internal server error occurred while creating publication:',
      error
    );
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    console.info(`Deleting publication with ID: ${id}`);
    const deletedPublication = await publicationsModel.deleteById(id);
    if (!deletedPublication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    res.status(200).json({ message: 'Publication deleted successfully!' });
  } catch (error) {
    console.error(
      'Internal server error occurred while deleting publication:',
      error
    );
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const findAll = async (req, res) => {
  try {
    const email = req.user?.email || null;
    const { condition, category } = req.query;
    const filters = { condition, category };

    let userProfileId = null;

    if (email) {
      const user = await usersModel.findByEmail(email);
      userProfileId = user?.profile_id || null;
    }

    console.info('Fetching all publications');
    const publications = await publicationsModel.findAll(
      userProfileId,
      filters
    );
    if (!publications || publications.length === 0) {
      return res.status(404).json({ message: 'No publications found' });
    }

    res.status(200).json({
      message: 'Publications fetched successfully',
      count: publications.length,
      data: publications.map((publication) => {
        const {
          image_url: imageUrl,
          owner_id: ownerId,
          is_favorite: isFavorite,
          updated_at: updatedAt,
          ...rest
        } = publication;
        return {
          ...rest,
          imageUrl,
          ownerId,
          isFavorite,
          updatedAt,
        };
      }),
    });
  } catch (error) {
    console.error(
      'Internal server error occurred while fetching publications:',
      error
    );
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const findById = async (req, res) => {
  try {
    const email = req.user?.email || null;
    const { id } = req.params;

    let userProfileId = null;

    if (email) {
      const user = await usersModel.findByEmail(email);
      userProfileId = user?.profile_id || null;
    }

    console.info(`Fetching publication with ID: ${id}`);
    const fetchedPublication = await publicationsModel.findById(
      id,
      userProfileId
    );
    if (!fetchedPublication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    const {
      image_url: imageUrl,
      owner_id,
      owner_name,
      is_favorite: isFavorite,
      updated_at: updatedAt,
      ...rest
    } = fetchedPublication;
    const publication = {
      ...rest,
      imageUrl,
      owner: {
        id: owner_id,
        name: owner_name,
      },
      isFavorite,
      updatedAt,
    };

    res.status(200).json({
      message: 'Publication fetched successfully',
      data: publication,
    });
  } catch (error) {
    console.error(
      'Internal server error occurred while fetching publication',
      error
    );
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const findByOwnerId = async (req, res) => {
  try {
    const email = req.user?.email || null;
    const { profileId: ownerId } = req.params;
    const { condition, category } = req.query;
    const filters = { condition, category };

    let userProfileId = null;

    if (email) {
      const user = await usersModel.findByEmail(email);
      userProfileId = user?.profile_id || null;
    }

    console.info(`Fetching publications for owner ID: ${ownerId}`);
    const publications = await publicationsModel.findByOwnerId(
      ownerId,
      userProfileId,
      filters
    );
    if (!publications || publications.length === 0) {
      return res
        .status(404)
        .json({ message: 'No publications found for this owner' });
    }

    res.status(200).json({
      message: 'Publications fetched successfully',
      count: publications.length,
      data: publications.map((publication) => {
        const {
          image_url: imageUrl,
          is_favorite: isFavorite,
          updated_at: updatedAt,
          ...rest
        } = publication;
        return {
          ...rest,
          imageUrl,
          isFavorite,
          updatedAt,
        };
      }),
    });
  } catch (error) {
    console.error(
      'Internal server error occurred while fetching publications by owner ID:',
      error
    );
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const markOrUnmarkAsFavorite = async (req, res) => {
  try {
    const { profileId: userProfileId } = req.user;
    const { id: publicationId } = req.params;

    const fetchedFavorite = await favoritesModel.findByUserAndPublicationId(
      userProfileId,
      publicationId
    );

    const favorite = fetchedFavorite
      ? await favoritesModel.deleteByUserAndPublicationId(
          userProfileId,
          publicationId
        )
      : await favoritesModel.create(userProfileId, publicationId);

    const fetchedPublication = await publicationsModel.findById(
      favorite.publication_id,
      favorite.user_profile_id
    );

    const {
      image_url: imageUrl,
      owner_id,
      owner_name,
      is_favorite: isFavorite,
      updated_at: updatedAt,
      ...rest
    } = fetchedPublication;
    const publication = {
      ...rest,
      imageUrl,
      owner: {
        id: owner_id,
        name: owner_name,
      },
      isFavorite,
      updatedAt,
    };

    const message = isFavorite
      ? 'Publication marked as favorite successfully!'
      : 'Publication unmarked as favorite successfully';

    res.status(201).json({
      message,
      data: publication,
    });
  } catch (error) {
    console.error(
      'Internal server error occurred while marking favorite publications:',
      error
    );
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const publication = { id, ...req.body };

    console.info(`Updating publication with ID: ${id}`);
    const updatedPublication = await publicationsModel.update(publication);
    if (!updatedPublication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    console.log('Uodating publication image');
    await publicationImagesModel.update({
      publicationId: id,
      imageUrl: publication.imageUrl,
    });

    res.status(200).json({ message: 'Publication updated successfully' });
  } catch (error) {
    console.error(
      'Internal server error occurred while updating publications:',
      error
    );
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  create,
  deleteById,
  findAll,
  findById,
  findByOwnerId,
  markOrUnmarkAsFavorite,
  update,
};
