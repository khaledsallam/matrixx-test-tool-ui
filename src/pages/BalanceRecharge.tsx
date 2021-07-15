import { useState, Fragment } from "react";
import axios, { AxiosResponse } from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert, { Color } from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

interface RechargeForm {
  msisdn: string;
  activationCode: string;
}

const useStyles = makeStyles({
  root: {
    "margin-right": "20px",
  },
});

const BalanceRecharge: React.FC = () => {
  const classes = useStyles();
  const className = clsx(classes.root);
  const [result, setResult] = useState<Color>();
  const [resultMessage, setResultMessage] = useState("");
  const formik = useFormik({
    initialValues: { msisdn: "", activationCode: "" },
    onSubmit: async (values: RechargeForm) => {
      const { msisdn, activationCode } = values;
      try {
        await axios.get(
          `http://localhost:9000/recharge/?msisdn=${msisdn}&activationCode=${activationCode}`
        );
        setResult("success");
        setResultMessage("Balance recharged successfully");
      } catch (err) {
        setResult("error");
        setResultMessage("something went wrong");
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Fragment>
          <TextField
            value={formik.values.msisdn}
            margin={"normal"}
            id="msisdn"
            label="Phone Number"
            variant="outlined"
            color="secondary"
            className={className}
            onChange={formik.handleChange}
          />

          <TextField
            value={formik.values.activationCode}
            margin={"normal"}
            id="activationCode"
            label="Voucher activation code"
            variant="outlined"
            color="secondary"
            className={className}
            onChange={formik.handleChange}
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </Fragment>
      </form>
      {result && resultMessage && (
        <Alert severity={result}>
          <AlertTitle>{result}</AlertTitle>
          {resultMessage}
        </Alert>
      )}
    </div>
  );
};

export default BalanceRecharge;
