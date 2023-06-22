// Import modules seeder files here.
import { nsql_db } from '../../Utils/Database/db.client';

async function seed() {
}

seed()
    .then((out) => console.log('Seeding done. Details: ', out))
    .catch((err) => console.error('Seeding Exception. Details: ', err));
