import { useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

function RenderRule(rule, playerDetails) {
  const qrPayload = JSON.stringify({
    ...playerDetails,
    reward_code: `gameball_${rule.id}_${rule.pointsToRedeem}`,
  });
  console.log(qrPayload);
  return (
    <div>
      <div> {rule.ruleType}</div>
      <a>{rule.id}</a>
      <div>
        <QRCodeSVG value={qrPayload} />
      </div>
    </div>
  );
}

function RulesPage() {
  const location = useLocation();
  const rules = location.state.redemptionRules;
  const playerDetails = location.state.playerDetails;
  console.log(location);

  return (
    <div>
      {rules.map((rule) => {
        return RenderRule(rule, playerDetails);
      })}
    </div>
  );
}

export default RulesPage;
