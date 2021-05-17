import { ObjectId } from 'mongodb';
import withSession from '../../../lib/session';
import { connectToDatabase } from '../../../lib/db';

export default withSession(async (req, res) => {
  const user = req.session.get('user');

  if (user) {
    try {
      const { id } = user;
      const { db } = await connectToDatabase();
      const wholeUser = await db
        .collection('users')
        .findOne({ _id: ObjectId(id) });
      const { access, isVerified, email, role } = wholeUser;
      const userFromDb = {
        id,
        isLoggedIn: true,
        isVerified,
        email,
        access,
        role,
      };
      res.json(userFromDb);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});
