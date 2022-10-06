import { connectToDb } from "./connection";

export const findDocuments = async () => {
  const {db} = await connectToDb();
  const docs = await db.collection('sample').find();
  return docs;
};

export const insertDocument = async (newDocument: {
  sampleMessage: string,
  sampleNumber: number
}) => {
  const {db} = await connectToDb();
  const doc = await db.collection('sample').insertOne(newDocument);
  return doc;
};