import 'dotenv/config';
import { rolesSlug, usersSlug } from '@/lib/collectionNames';
import config from '@payload-config';
import { MongoClient } from 'mongodb';
import { BasePayload, getPayload } from 'payload';

// users
async function seedUsers(payload: BasePayload) {
  const adminRole = await payload.create({
    collection: rolesSlug,
    depth: 0,
    data: {
      label: 'admin',
    },
  });
  await payload.create({
    collection: usersSlug,
    depth: 0,
    data: {
      username: 'admin',
      password: 'admin',
      role: adminRole.id,
      isAdmin: true,
    },
  });
}

export async function createAdminUser() {
  const allowColdStart = process.env.ALLOW_COLD_START;
  if (allowColdStart !== 'true') {
    throw new Error('Cold start is not allowed');
  }

  const dbName = process.env.MONGO_DB_NAME;
  const uri = process.env.MONGODB_URI;

  if (!dbName || !uri) {
    throw new Error('Unable to connect to database, missing environment variables');
  }

  const client = await MongoClient.connect(`${uri}`);
  const db = client.db(dbName);
  await db.dropDatabase();

  const payload = await getPayload({ config });
  await seedUsers(payload);

  await client.close();
}
