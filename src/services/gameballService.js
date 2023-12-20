import axios from "axios"

const getRedemptionRules = async (apiKey, secretKey) => {
  try {
    const config = { headers: { apiKey: apiKey, secretKey: secretKey } };
    const res = await axios.get(
      "https://api.gameball.co/api/v3/integrations/client/redemption/config",
      config
    );

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

const createPlayer = async (apiKey, player) => {
  try {
    const config = { headers: { apiKey: apiKey } };
    const res = await axios.post(
      "https://api.gameball.co/api/v3/integrations/player", player, config
    );

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export{ getRedemptionRules, createPlayer };
