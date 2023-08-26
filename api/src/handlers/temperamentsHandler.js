const { getAllTemperaments } = require("../controllers/temperamentsController");
async function temperamentsHandler(req, res) {
    try {
        const { temperaments, totalCount } = await getAllTemperaments();
        return res.status(200).send({ totalCount, temperaments });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}
module.exports = { temperamentsHandler };
