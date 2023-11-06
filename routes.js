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

module.exports = router;
