const news = require('../models/newsSchema');

// Add news details
exports.addNewsDetails = async (req, res) => {
    try {
        // console.log("Inside news controller function");

        const {
          newsLink 
        } = req.body;

        const newsFile = req.file ? `/uploads/news/${req.file.filename}` : null;

            const latestNews=new news({
              newsLink,newsFile
            })
            await latestNews.save()
            res.status(200).json(latestNews)

    } catch (error) {
        // console.error("Error adding news details:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// Edit news detailsss
exports.editNewsDetails = async (req, res) => {
    const { newsLink, newsFile } = req.body;
    const { id } = req.params;
    console.log(id);
  
    

    const uploadedNewsFile = req.file ? `/uploads/news/${req.file.filename}` : newsFile;
  
    try {
      if (!id) {
        return res.status(400).json({ error: "News ID (pid) is required" });
      }
      if (!newsLink) {
        return res.status(400).json({ error: "newsLink is required" });
      }
  
      const updateNews = await news.findByIdAndUpdate(
        { _id: id },
        {
          newsLink,
          newsFile: uploadedNewsFile,
        },
        { new: true }
      );
  
      if (!updateNews) {
        return res.status(404).json({ error: "News not found" });
      }
  
      res.status(200).json(updateNews);
    } catch (error) {
      console.error("Error updating news details:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  // Get All news
exports.getAllNewsDetails = async (req, res) => {
    try {
      const newsDetails = await news.find();
      res.status(200).json(newsDetails);
    } catch (error) {
      res.status(500).json({ error: "Error fetching employees", details: error.message });
    }
  };
  // Delete Employee by ID
exports.deleteANewsDetail = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      
      const deletedNews = await news.findByIdAndDelete({_id:id});
      console.log(deletedNews);
      
      if (!deletedNews) {
        return res.status(404).json({ error: "News not found" });
      }
  
      res.status(200).json({ message: "News deleted successfully", deletedNews });
    } catch (error) {
      res.status(500).json({ error: "Error deleting News", details: error.message });
    }
  };