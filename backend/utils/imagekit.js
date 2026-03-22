import imagekit from '../config/imagekit.js';

export const deleteImage = async (fileId) => {
  if (!fileId) return;
  try {
    await imagekit.deleteFile(fileId);
    console.log(`Deleted ImageKit file: ${fileId}`);
  } catch (error) {
    console.error('ImageKit delete error:', error);
  }
};