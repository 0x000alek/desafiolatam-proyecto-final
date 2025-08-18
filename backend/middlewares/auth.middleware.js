import { config } from '../config/wawita.config.js';
import authToken from '../src/helpers/authToken.helper.js';
import usersModel from '../src/models/users.model.js';

const verifyToken =
  (allowViewerMode = false) =>
  (req, res, next) => {
    console.info('Verifying token...');
    try {
      const authorization = req.header(config.auth.tokenHeader);
      if (!authorization) {
        if (allowViewerMode) {
          console.info('Viewer mode allowed: empty token');
          return next();
        }
        console.warn('No token provided');
        return res.status(401).json({ message: 'No token provided' });
      }

      const token = authorization.split('Bearer ')[1];

      const { email } = authToken.decode(token);
      if (!email) {
        console.warn('Invalid token: no user id found');
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = { email };

      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };

const attachProfileId = async (req, res, next) => {
  try {
    const { email } = req.user;
    if (!email) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: no email in token' });
    }

    const user = await usersModel.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user.profileId = user.profile_id;
    next();
  } catch (error) {
    console.error('Error attaching profile ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const verifyProfileAccess = () => async (req, res, next) => {
  console.info('Verifying profile access...');
  try {
    const { profileId } = req.params;
    const { profile_id: userProfileId } = await usersModel.findByEmail(
      req.user.email
    );

    if (!profileId || userProfileId !== profileId) {
      console.warn('Unauthorized access to profile');
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  } catch (error) {
    console.error('Error verifying profile access:', error);
    return res.status(403).json({ message: 'Forbidden' });
  }
};

export default { verifyToken, attachProfileId, verifyProfileAccess };
