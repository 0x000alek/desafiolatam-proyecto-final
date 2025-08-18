import publicationsModel from '../models/publications.model.js';
import usersModel from '../models/users.model.js';
import userProfilesModel from '../models/userProfiles.model.js';

const findUserPrivateProfileById = async (req, res) => {
  try {
    const { profileId } = req.user;

    console.info(`Fetching profile for ID: ${profileId}`);
    const fetchedUserProfile = await userProfilesModel.findById(profileId);
    if (!fetchedUserProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    const { avatar_url: avatarUrl, biography, ...rest } = fetchedUserProfile;
    const userProfile = {
      ...rest,
      avatarUrl,
      biography,
    };

    const publications = await publicationsModel.findByOwnerId(profileId);
    userProfile.publications = publications.map((publication) => {
      const {
        image_url: imageUrl,
        updated_at: updatedAt,
        ...rest
      } = publication;
      return {
        ...rest,
        imageUrl,
        updatedAt,
      };
    });

    res.status(200).json({
      message: 'User profile fetched successfully!',
      data: userProfile,
    });
  } catch (error) {
    console.error(
      'Internal server error occurred while fetching user profile:',
      error
    );
    res.status(500).json({ message: 'Internal server error' });
  }
};

const findUserPublicProfileById = async (req, res) => {
  try {
    const email = req.user?.email || null;
    const { profileId } = req.params;

    let loggedUserProfileId = null;

    if (email) {
      const user = await usersModel.findByEmail(email);
      loggedUserProfileId = user?.profile_id;
    }

    console.info(`Fetching profile for ID: ${profileId}`);
    const fetchedUserProfile = await userProfilesModel.findById(profileId);
    if (!fetchedUserProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    const { avatar_url: avatarUrl, biography, ...rest } = fetchedUserProfile;
    const userProfile = {
      ...rest,
      avatarUrl,
      biography,
    };

    const publications = await publicationsModel.findByOwnerId(
      profileId,
      loggedUserProfileId
    );
    userProfile.publications = publications.map((publication) => {
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
    });

    res.status(200).json({
      message: 'User profile fetched successfully!',
      data: userProfile,
    });
  } catch (error) {
    console.error(
      'Internal server error occurred while fetching user profile:',
      error
    );
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default { findUserPrivateProfileById, findUserPublicProfileById };
