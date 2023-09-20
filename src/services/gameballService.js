import axios from "axios"

const getRedemptionRules = async (apiKey, secretKey) => {
  try {
    const config = { headers: { apiKey: apiKey, secretKey: secretKey } };
    const res = await axios.get(
      "https://api.stg.gameball.co/api/v3/integrations/client/redemption/config",
      config
    );

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export{ getRedemptionRules };
