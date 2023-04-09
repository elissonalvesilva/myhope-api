import 'module-alias/register';
import dotenv from 'dotenv';
import { MongoHelper } from '@/infra/db/mongo/helper';

dotenv.config();

MongoHelper.connect(process.env.MONGO_URL || '')
  .then(async () => {
    const app = (await import('./app')).default;
    app.listen(process.env.APP_PORT, () =>
      console.log(
        `${process.env.APP_NAME} API running at http://localhost:${process.env.APP_PORT}`,
      ),
    );
  })
  .catch(console.error);