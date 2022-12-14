import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cd) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname.replace(' ', ''), ext);

      cd(null, `${name}-${Date.now()}${ext}`);
    },
  }),
};
