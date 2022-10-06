import {NextApiRequest, NextApiResponse} from 'next';
import adminApp from '../../lib/admin';
import admin from 'firebase-admin';
import { findDocuments, insertDocument } from '../../db/sample';
import { randomInt } from 'crypto';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const idToken = req.headers.authorization;

  const verified = idToken ? await admin.auth(adminApp).verifyIdToken(idToken) : null;

  if (verified!) {
    return res.status(403).json({
      message: '拒否されました'
    });
  }

  try {
    switch(req.method) {
      case 'GET':
        const docs = await findDocuments();
        res.status(200).json(
          JSON.stringify(docs)
        );
        break;
      case 'POST':
        const doc = insertDocument({
          sampleMessage: `時刻は${new Date().toLocaleString()}です`,
          sampleNumber: randomInt(10000)
        });
        res.status(200).json(
          JSON.stringify(doc)
        );
        break;
    }
  } catch (err) {
    res.status(403).json(err);
  }
};

export default handler;