import express from 'express';
import pool from '../config/db.js';
import { verifyToken } from '../middleware/auth.js';
import { deleteImage } from '../utils/imagekit.js';

const router = express.Router();

// GET all experiments (public)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM experiments ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new experiment (admin only)
router.post('/', verifyToken, async (req, res) => {
  const { title, thumbnail_url, video_url, thumbnail_file_id } = req.body;
  if (!title || !thumbnail_url || !video_url) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO experiments (title, thumbnail_url, video_url, thumbnail_file_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, thumbnail_url, video_url, thumbnail_file_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update experiment (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, thumbnail_url, video_url, thumbnail_file_id } = req.body;

  try {
    // First, fetch the existing record to get old fileId
    const old = await pool.query('SELECT thumbnail_file_id FROM experiments WHERE id = $1', [id]);
    if (old.rows.length === 0) return res.status(404).json({ message: 'Experiment not found' });

    const oldFileId = old.rows[0].thumbnail_file_id;

    // If thumbnail changed, delete the old image from ImageKit
    if (thumbnail_url && thumbnail_file_id && oldFileId && thumbnail_file_id !== oldFileId) {
      await deleteImage(oldFileId);
    }

    const result = await pool.query(
      'UPDATE experiments SET title = $1, thumbnail_url = $2, video_url = $3, thumbnail_file_id = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
      [title, thumbnail_url, video_url, thumbnail_file_id, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Experiment not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE experiment (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    // Get fileId before deleting
    const record = await pool.query('SELECT thumbnail_file_id FROM experiments WHERE id = $1', [id]);
    if (record.rows.length === 0) return res.status(404).json({ message: 'Experiment not found' });

    const fileId = record.rows[0].thumbnail_file_id;
    if (fileId) await deleteImage(fileId);

    await pool.query('DELETE FROM experiments WHERE id = $1', [id]);
    res.json({ message: 'Experiment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;