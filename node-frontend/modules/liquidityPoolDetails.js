require("dotenv").config();

const getLiquidityPoolsDetails = async (req, res) => {
  const numberOfPools = req.body.numberOfPools || 5;

  const uniswapGraphQuery = `query {
        pools(first: ${numberOfPools}){
          id
          token0{
            name
            id
            symbol
          }
          token1{
            name
            id
            symbol
          }
          blockNumber
          timestamp
        }
      }`;

  const queryURL = process.env.CHAINSTASCK_QUERY_URL;

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: uniswapGraphQuery,
    }),
  };

  const response = await fetch(queryURL, options);
  const queryResult = await response.json();
  const pools = queryResult.data.pools;

  res.send(pools);
};

module.exports = getLiquidityPoolsDetails;
