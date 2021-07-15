import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

const LandingPage: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Use Cases</h1>
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={() => history.push("/onboarding")}
      >
        Customer Onboarding
      </Button>
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={() => history.push("/recharge")}
      >
        Balance Recharge
      </Button>
      <Button variant="contained" size="large" color="primary">
        Query Subscriber Info
      </Button>
      <Button variant="contained" size="large" color="primary">
        Use Case 4
      </Button>
    </div>
  );
};

export default LandingPage;
