const axios = require('axios');

exports.getCsvFile = async (req, res) => {
  const { type } = req.query; // Get 'type' from query

  if (!type || (type !== 'project' && type !== 'form')) {
    return res.status(400).json({ error: 'Invalid type. Use ?type=project or ?type=form' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];  // Get token from Authorization header

    if (!token) {
      return res.status(401).json({ error: 'Token is missing or invalid' });
    }

    let apiUrl;
    if (type === 'project') {
      apiUrl = 'http://localhost:3001/api/projects/getAllProjects'; // Adjust API URL if necessary
    } else {
      apiUrl = 'http://localhost:3001/contactForm/getforms'; // Adjust API URL if necessary
    }

    // Make the request to the API with the token
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,  // Send the token in the request
      },
    });

    const data = response.data;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: `No ${type} data available for export.` });
    }

    // Extract column headers from the first object in the data array
    const headers = Object.keys(data[0]).join(',');

    // Format rows with double quotes for proper CSV formatting
    const rows = data.map(item =>
      Object.values(item).map(value => `"${value}"`).join(',')
    );

    const csv = [headers, ...rows].join('\n');

    // Set response headers for CSV file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${type}-data.csv`);

    res.status(200).send(csv);

  } catch (error) {
    console.error('Error exporting CSV:', error);
    res.status(500).json({ error: 'An error occurred while exporting data.' });
  }
};
