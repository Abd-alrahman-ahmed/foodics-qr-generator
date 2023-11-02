import { Component, useEffect, useState } from "react";
import { createPlayer, getRedemptionRules } from "../services/gameballService";
import { useNavigate } from "react-router-dom";

const handleSubmit = async (navigate, apiKey, secretKey, playerDetails) => {
  try {
    const apiPlayerDetails = await createPlayer(apiKey, {
      playerUniqueId: playerDetails.mobile_country_code + "" + playerDetails.customer_mobile_number,
      playerAttributes: {
        displayName: playerDetails.customer_name,
        mobile: playerDetails.mobile_country_code + "" + playerDetails.customer_mobile_number
      }
    });
    let playerBalance = apiPlayerDetails.balance.pointsBalance - apiPlayerDetails.balance.pendingPoints;
    const res = await getRedemptionRules(apiKey, secretKey);
    const allowed_types = ["percentage_discount_settings", "free_shipping_settings", "free_product_settings", "fixed_rate_settings"];
    const redemptionRules = res.redemptionRules.filter(r => r.pointsToRedeem <= playerBalance && allowed_types.includes(r.ruleType));
    // Should navigate to RulesPage with res passed
    navigate("/rulesPage", {
      state: {
        redemptionRules: redemptionRules,
        playerDetails
      }
    });
  } catch (e) {
    console.log(e);
  }
};

function HomePage() {
  const [apiKey, setApikey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [mobile_country_code, setmobileCountryCode] = useState(0);
  const [customer_mobile_number, setmobileNumber] = useState("");
  const [customer_name, setCustomerName] = useState("");
  const navigate = useNavigate();
  const playerDetails = {
    mobile_country_code: +mobile_country_code,
    customer_mobile_number: customer_mobile_number,
    customer_name: customer_name,
  };
  return (
    <div>
      <form>
        <div>
          <label>
            Apikey:
            <input
              type="text"
              name="apiKey"
              value={apiKey}
              onChange={(e) => setApikey(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            SecretKey:
            <input
              type="password"
              name="secretKey"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Player Country Code:
            <input
              type="number"
              name="mobile_country_code"
              value={mobile_country_code}
              onChange={(e) => setmobileCountryCode(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Player Mobile Number:
            <input
              type="text"
              name="customer_mobile_number"
              value={customer_mobile_number}
              onChange={(e) => setmobileNumber(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Player Name:
            <input
              type="text"
              name="customer_name"
              value={customer_name}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </label>
        </div>
        <input
          type="submit"
          value="Submit"
          onClick={async (e) => {
            e.preventDefault();
            await handleSubmit(navigate, apiKey, secretKey, playerDetails);
          }}
        />
      </form>
      <br/>
      <hr/>
      <br/>
      <input
          type="button"
          value="Test Install Flow"
          onClick={async (e) => {
            e.preventDefault();
            window.location.href = "https://app.stg.gameball.co/foodics_auth";
          }}
        />
    </div>
  );
}

export default HomePage;
