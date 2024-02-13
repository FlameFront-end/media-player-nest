import { diskStorage } from 'multer';

const generateId = () =>
  Array(18)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

const normalizeFileName = (req, file, callback) => {
  const fileExtName = file.originalname.split('.').pop();

  callback(null, `${generateId()}.${fileExtName}`);
};

export const imageStorage = diskStorage({
  destination: './uploads/image',
  filename: normalizeFileName,
});

export const videoStorage = diskStorage({
  destination: './uploads/video',
  filename: normalizeFileName,
});

export const trackStorage = diskStorage({
  destination: './uploads/track',
  filename: normalizeFileName,
});
