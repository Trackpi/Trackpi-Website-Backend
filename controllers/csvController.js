const axios = require('axios'); // For making requests to your existing APIs

exports.getCsvFile = async (req, res) => {
  const { type } = req.query; // Get the type from the query (project or form)

  if (!type) {
    return res.status(400).json({ error: 'Type parameter is required (project/form)' });
  }

  try {
    let data;

    // Fetch data based on the type (project or form)
    if (type === 'project') {
      const projectResponse = await axios.get('http://localhost:3000/api/projects'); // Replace with your actual API URL
      data = projectResponse.data; // Assuming the data is in the response body
    } else if (type === 'form') {
      const formResponse = await axios.get('http://localhost:3000/contactForm'); // Replace with your actual API URL
      data = formResponse.data; // Assuming the data is in the response body
    } else {
      return res.status(400).json({ error: 'Invalid type parameter. Use "project" or "form".' });
    }

    // Convert data to CSV format
    const headers = Object.keys(data[0]).join(','); // Get headers from the first object in the array
    const rows = data.map(item => Object.values(item).join(',')); // Get values of each row
    const csv = [headers, ...rows].join('\n'); // Combine headers and rows into CSV format

    // Set headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${type}-data.csv`);

    // Send CSV as response
    res.status(200).send(csv);

  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ error: 'An error occurred while exporting data.' });
  }
};
