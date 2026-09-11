import cors from "cors";
import express from "express";
import axios from "axios";
import groupDataIntoDays from "./groupDataIntoDays.js";
import averageDayData from "./averageDayData.js";

const app = express();
const port = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

app.get("/api/stocks/:symbol", async (req, res) => {
  const { symbol } = req.params;
  try {
    const response = await axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`,
      { params: { range: "1mo", interval: "15m" } }
    );
    const data = response.data.chart.result[0];
    const groupedData = groupDataIntoDays(data);
    const averageData = averageDayData(groupedData);
    res.json(averageData);
  }
  catch (error) {
    res.status(500).json({ error: "Failed to fetch stock data" });
    // This is a generic error handler and message. If more specifics can be added, then add them here.
  }

});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
