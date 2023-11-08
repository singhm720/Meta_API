const axios = require('axios');
const fs = require('fs');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const META_GRAPH_API_KEY = 'EAAKOjYZBHVlwBO3mEZAkSoyDsacSn5pTNzKAb4DjSZAWOiEFigwkWPtCyqMw0VYxKLZBFig5L9ZBeLZCwTn7AmhHuJGjxyQAB1I38ZBGGuJtHT614QkA8TukoNZAZBeL0EFFJnuHuIizm7FWdENbi1Wep1IKhZAMFa75jVXnRZCgL08f0WbrS2nAGzvFmdMhP8ZD';
const SPREADSHEET_ID = '1FC4YU02p-HtU9dmQPgsVsuMx1Fe_f_HyhwpIhUol4RQ';
const SHEET_NAME = 'Testing_Sheet';
const fetchMetaData = async () => {
  try {
    const apiUrl = 'https://developers.facebook.com/docs/graph-api';
    const params = {
      fields: 'impressions,cpm,ctr,clicks,amount_spent,purchases,cost_per_purchase',
      date_preset: 'last_30_days',
      access_token: META_GRAPH_API_KEY,
    };

    const { data } = await axios.get(apiUrl, {
      params,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const insights = data.data;

    // const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    // await doc.useServiceAccountAuth(require('./credentials.json'));
    // await doc.loadInfo();

    // const sheet = doc.sheetsByTitle[SHEET_NAME]; // Change to sheetsByTitle to select the sheet by name

    // // Clear existing data in the sheet (optional, you can remove this line if you don't want to clear data)
    // await sheet.clear();

    // // Add headers to the Google Sheet using setHeaderRow
    // await sheet.setHeaderRow(['impressions', 'cpm', 'ctr', 'clicks', 'amount_spent', 'purchases', 'cost_per_purchase']);

    // // Add rows to the Google Sheet
    // await sheet.addRows(insights.map((insight) => ({
    //   impressions: insight.impressions,
    //   cpm: insight.cpm,
    //   ctr: insight.ctr,
    //   clicks: insight.clicks,
    //   amount_spent: insight.amount_spent,
    //   purchases: insight.purchases,
    //   cost_per_purchase: insight.cost_per_purchase,
    // })));

    // Write CSV data to a file (optional, you can remove this part if not needed)
    const csvData = 'impressions,cpm,ctr,clicks,amount_spent,purchases,cost_per_purchase\n' +
      insights.map((insight) =>
        `${insight.impressions},${insight.cpm},${insight.ctr},${insight.clicks},${insight.amount_spent},${insight.purchases},${insight.cost_per_purchase}`
      ).join('\n');

    fs.writeFileSync('meta_data.csv', csvData);
  } catch (error) {
    console.error(error);
  }
};

fetchMetaData();

setInterval(fetchMetaData, 3600000); // Update data every hour
