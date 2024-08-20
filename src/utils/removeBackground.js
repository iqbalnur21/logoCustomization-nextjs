import { removeBackgroundFromImageBase64 } from 'remove.bg';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { imageBase64 } = req.body;

    console.log('imageBase64:', imageBase64);
    try {
      const result = await removeBackgroundFromImageBase64({
        base64img: imageBase64,
        apiKey: process.env.REMOVE_BG_API_KEY,
        size: 'regular',
        type: 'auto',
        crop: true,
        scale: '50%',
      });
      const outputBase64 = `data:image/png;base64,${result.base64img}`;
      res.status(200).json({ outputBase64 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Background removal failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
