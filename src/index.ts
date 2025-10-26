import '@/libs/dotenv';
import '@/libs/winston';
import { app } from './app';

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
