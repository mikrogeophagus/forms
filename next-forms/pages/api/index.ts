import {NextApiRequest, NextApiResponse} from 'next';
import adminApp from '../../lib/admin';
import admin from 'firebase-admin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const idToken = req.headers.authorization;

  const verified = idToken ? await admin.auth(adminApp).verifyIdToken(idToken) : null;

  const message = verified ?
    `リクエストは ${verified.email} からです。`
    :
    'リクエストは認証されていません。';

  switch(req.method) {
    default:
      res.status(200).json({
        message
      });
      break;
  }
};

export default handler;