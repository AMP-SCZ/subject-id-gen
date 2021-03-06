/* eslint-disable no-console */
// To be used from the CLI or package.json script, and only once.

const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const sites = require('../sites.json');
const generateIds = require('./genIds.js');

const seed = async () => {
  try {
    dotenv.config({ path: '.env.local' });
    const mongoUri = process.env.MONGODB_URI;
    const mongoDatabase = process.env.MONGODB_DB;
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const client = await MongoClient.connect(mongoUri, opts);
    const db = client.db(mongoDatabase);

    const foundSite = await db.collection('sites').findOne();

    if (foundSite !== null) {
      throw new Error('Sites collection already exists');
    }

    const sitesWithFields = sites.map(site => ({
      siteId: site.id,
      name: site.name,
      network: site.network,
      idseq: 1,
      members: [],
    }));

    console.log('Populating DB with sites...');
    await db.collection('sites').insertMany(sitesWithFields);
    console.log('Success!');

    console.log('Populating DB with ids...');
    await Promise.all(
      sites.map(async site => {
        console.log(`...for site: ${site.name}`);
        const idsForSite = generateIds({ site: site.id, n: 9999 });
        await db.collection('subjectids').insertMany(idsForSite);
      })
    );
    console.log('Success!');
    process.exit(0);
  } catch (error) {
    console.trace(error);
    process.exit(1);
  }
};

seed();
