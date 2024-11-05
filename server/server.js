const express = require('express');
const app = express();
const cors = require("cors");
const corsOptions = {
    origin :["http://localhost:5173"]
}
app.use(cors(corsOptions))

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
