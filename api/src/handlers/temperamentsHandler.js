const { getAllTemperaments } = require("../controllers/temperamentsController");
async function temperamentsHandler(req, res) {
    try {
        const { temperaments, message } = await getAllTemperaments();
        res.status(200).send({
            success: message,
            data: temperaments,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}
module.exports = { temperamentsHandler };
