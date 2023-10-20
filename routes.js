const express = require('express');
const router = express.Router();
const db = require('./db');


// Define a route to store complaints in the database
router.post('/complaints', async (req, res) => {
  const { name, contactNumber, complaint } = req.body;

  if (!name || !contactNumber || !complaint) {
    return res.status(400).json({ error: 'Name, Contact Number, and Complaint are required.' });
  }

  try {
    // Insert the complaint into the database
    const result = await db.query(
      'INSERT INTO complaints (name, contact_number, complaint_text) VALUES ($1, $2, $3) RETURNING *',
      [name, contactNumber, complaint]
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
    const query = `SELECT
        COALESCE(t1.node_id, '${nodeid}') AS nodeid,
        COALESCE(t1.status, 'Active') AS status,
        t2.timestamp
      FROM
        (SELECT '${nodeid}' AS node_id) AS query_nodeid 
      LEFT JOIN
        dead_nodes AS t1
      ON
        query_nodeid.node_id = t1.node_id
      LEFT JOIN
        dead_nodes AS t2
      ON
        query_nodeid.node_id = t2.node_id
      WHERE
        t2.timestamp >= NOW() - INTERVAL '24 HOUR';`

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
