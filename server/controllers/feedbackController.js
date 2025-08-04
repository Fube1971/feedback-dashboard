/**
 * Controller: feedbackController
 * Description: Handles incoming feedback-related HTTP requests.
 * Current use: Placeholder routes for GET and POST.
 */

{/*GET/api/feedback */}
//Used to test if the GET route is working.
const getFeedback = (req, res) => {
    res.json({ message: "GET feedback route works!" });
};

{/*POST/api/feedback*/}
//Handles feedback submission from the frontend.
const submitFeedback = (req, res) => {
    const data = req.body;
    console.log("Received feedback:", data);
    res.status(201).json({ message: "Feedback submitted!" });
};

// Export both controller functions
module.exports = {
    getFeedback,
    submitFeedback,
};
