const express = require('express');
const router = express.Router();
const db = require('./db');


// Define a route to store complaints in the database
router.post('/complaints', async (req, res) => {
  const { name, email, contactNumber, Vertical, nodeId, complaint } = req.body;

  if (!name || !contactNumber || !complaint) {
    return res.status(400).json({ error: 'Name, Contact Number, and Complaint are required.' });
  }

  try {
    // Insert the complaint into the database
    const result = await db.query(
      'INSERT INTO complaints (name, email, contactNumber, Vertical, nodeId, complaint) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, email, contactNumber, Vertical, nodeId, complaint ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting complaint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/feedback', async (req, res) => {
  const { name, email, contactNumber, feedback } = req.body;

  // if (!name || !contactNumber || !feedback) {
  //   return res.status(400).json({ error: 'Name, Contact Number, and Feedback are required.' });
  // }

  try {
    // Insert the complaint into the database
    const result = await db.query(
      'INSERT INTO feedback (name, email, contactNumber, feedback) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, contactNumber, feedback ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting feedback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route to retrieve the status from the database
router.get('/status', async (req, res) => {
  const { nodeid } = req.query;

  try {
    // Replace this query with your actual query to retrieve the status based on the provided nodeid
   const query = `
          SELECT timestamp, node_id AS nodeid, status 
          FROM dead_nodes 
          WHERE timestamp >= NOW() - INTERVAL '3 HOUR'
          AND node_id='${nodeid}'`;
    
    const query1 = "SELECT * FROM dead_nodes";

    // Execute the query to retrieve the status
    const result = await db.query(query);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error retrieving status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/complaints/active', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM public.complaints WHERE status=$1', ['Active']);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching active complaints:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Endpoint to close a complaint by ID
router.put('/complaints/:id/close', async (req, res) => {
  const { id } = req.params;

  try {
    // Update the status to 'Closed' and set the updated time
    const result = await db.query(
      'UPDATE public.complaints SET status=$1, updated_time=NOW() WHERE sno=$2 RETURNING *',
      ['Closed', id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Complaint not found' });
    } else {
      res.json({ message: 'Complaint closed successfully' });
    }
  } catch (error) {
    console.error('Error closing complaint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/feedback', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM public.feedback');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching active feedback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
