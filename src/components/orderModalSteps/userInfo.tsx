import { useState } from "react";
import { Snackbar, Alert, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

interface UserInfoProps {
    toPaperDims: () => void;
    cancelOrder: () => void;
    onSubmit: (shipping: string, address: string, zip: string, city: string, stateName: string, name: string, email: string) => void;
}

const FTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& label.Mui-root": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiInput-underline:hover": {
    borderBottomColor: "white",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "white",
  },
  "& .MuiInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const stateAbbreviations = [
 'State','AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
 'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
 'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
 'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
 'VT','VI','VA','WA','WV','WI','WY'
];

const UserInfo = (props: UserInfoProps) => {
    const [stateName, setStateName] = useState<string>('State');
    const [shipping, setShipping] = useState<string>('Shipping');
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [zip, setZip] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [renderWarningSnackbar, setRenderWarningSnackbar] = useState<boolean>(false);

    const cancelCallback = () => {
        props.cancelOrder();
    };

    const submitUserInfo = () => {
        if (shipping === 'Shipping' || address === '' || zip === '' || city === '' || stateName === 'State' || name === '' || email === ''){
          setRenderWarningSnackbar(true);
          return;
        }
        props.onSubmit(shipping, address, zip, city, stateName, name, email);
    }

    const backToPaperDims = () => {
      props.toPaperDims();
    }

    return (
      <div
        style={{
          backgroundColor: "#711d8c",
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "15px",
        }}
      >
        <div style={{ marginLeft: "5%", marginTop: "2%", marginRight: "2%" }}>
          <Typography variant="h3">3) Provide Delivery Information</Typography>
          <Divider
            style={{ marginTop: "1%", width: "90%", color: "primary" }}
            color="white"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "10%",
            marginRight: "10%",
            marginTop: "2%",
            height: "40vh",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <FormControl
            component="fieldset"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <FTextField
              variant="standard"
              color="primary"
              label="Full Name"
              sx={{
                fontSize: "150%",
                color: "white",
                input: { color: "white", fontSize: 20 },
              }}
              onChange={(event) => setName(event?.target.value)}
            />
            <FTextField
              style={{ marginTop: "2%" }}
              variant="standard"
              label="Email Address"
              sx={{ input: { color: "white", fontSize: 20 } }}
              onChange={(event) => setEmail(event?.target.value)}
            />
            <FTextField
              style={{ marginTop: "2%" }}
              variant="standard"
              label="Address"
              sx={{ input: { color: "white", fontSize: 20 } }}
              onChange={(event) => setAddress(event?.target.value)}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "2%",
              }}
            >
              <FTextField
                variant="standard"
                label="Zip Code"
                sx={{ input: { color: "white", fontSize: 20 } }}
                onChange={(event) => setZip(event?.target.value)}
              />
              <FTextField
                variant="standard"
                label="City"
                sx={{ input: { color: "white", fontSize: 20 } }}
                onChange={(event) => setCity(event?.target.value)}
              />
              <FormControl
                style={{
                  borderRadius: "5px",
                  padding: "1%",
                  width: "10%",
                  height: "100%",
                  backgroundColor: "orange",
                }}
              >
                <InputLabel
                  id="stateLabel"
                  color="primary"
                  sx={{ input: { color: "white", fontSize: 20 } }}
                >
                  
                </InputLabel>
                <Select
                  variant="standard"
                  value={stateName}
                  defaultValue="State"
                  sx={{ input: { color: "white", fontSize: 20 } }}
                  onChange={(event) => setStateName(event?.target.value)}
                >
                  {stateAbbreviations.map((abbr) => {
                    return (
                      <MenuItem key={abbr} value={abbr}>
                        {abbr}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl
                style={{
                  borderRadius: "5px",
                  padding: "1%",
                  width: "20%",
                  height: "100%",
                  backgroundColor: "orange",
                }}
              >
                <InputLabel id="shippingLabel"></InputLabel>
                <Select
                  variant="standard"
                  value={shipping}
                  defaultValue="Shipping"
                  onChange={(event) => setShipping(event?.target.value)}
                >
                  <MenuItem value="Shipping">Shipping</MenuItem>
                  <MenuItem value="Budget">Standard (+$1.99)</MenuItem>
                  <MenuItem value="Express">Express (+$3.99)</MenuItem>
                  <MenuItem value="Overnight">Overnight (+$.7.99)</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Typography variant="h6" sx={{ marginTop: "5%" }}>
              NOTICE: Virtual Order Proofs will be sent to the email submitted
              for your final approval and payment.
            </Typography>
          </FormControl>
        </div>
        <Divider style={{ margin: "2%", width: "90%" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "10%",
            marginRight: "10%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="button">Fulfilled by Prodigi</Typography>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Button
              sx={{
                marginRight: "10%",
                fontSize: "150%",
                padding: "0",
              }}
              onClick={cancelCallback}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ fontSize: "150%", padding: "0", marginRight: "10%" }}
              onClick={backToPaperDims}
            >
              Back
            </Button>
            <Button
              variant="contained"
              sx={{
                fontSize: "150%",
                padding: "0",
              }}
              onClick={submitUserInfo}
            >
              Submit
            </Button>
          </div>
        </div>
        <Snackbar
          open={renderWarningSnackbar}
          autoHideDuration={3000}
          onClose={() => setRenderWarningSnackbar(false)}
        >
          <Alert
            severity="warning"
            onClose={() => setRenderWarningSnackbar(false)}
          >
            <Typography variant="h6">Please complete all fields</Typography>
          </Alert>
        </Snackbar>
      </div>
    );
}

export default UserInfo;