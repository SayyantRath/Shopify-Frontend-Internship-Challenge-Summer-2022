import { Snackbar, Alert, Button, Divider, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useState } from "react";

interface PaperDimProps {
    selectedType: string;
    dimensions: any[];
    toUserInfo: (arg0: string, arg1: string) => void;
    toPaperType: () => void;
    cancelOrder: () => void;
}

const aspectRatios = {
    "EMA": [
        {
            width: 11,
            height: 14,
            SKU: "GLOBAL-FAP-11X14",
            price: 6.82
        },
        {
            width: 12,
            height: 16,
            SKU: "GLOBAL-FAP-12X16",
            price: 8.18
        },
        {
            width: 16,
            height: 24,
            SKU: "GLOBAL-FAP-16X24",
            price: 11.59
        },
        {
            width: 20,
            height: 28,
            SKU: "GLOBAL-FAP-20X28",
            price: 14.32
        },
        {
            width: 24,
            height: 36,
            SKU: "GLOBAL-FAP-24X36",
            price: 24.54
        }
    ],
    "BAP": [
        {
            width: 8.3,
            height: 11.7,
            SKU: "ART-FAP-BAP-A4",
            price: 3.41
        },
        {
            width: 7.9,
            height: 11.8,
            SKU: "ART-FAP-BAP-8X12",
            price: 3.41
        },
        {
            width: 12,
            height: 16,
            SKU: "ART-FAP-BAP-12X16",
            price: 4.77
        },
        {
            width: 11.7,
            height: 16.5,
            SKU: "ART-FAP-BAP-A3",
            price: 5.45
        },
        {
            width: 16.5,
            height: 23.4,
            SKU: "ART-FAP-BAP-A2",
            price: 8.18
        }
    ],
    "CPWP": [
        {
            width: 8.3,
            height: 11.7,
            SKU: "P-FIN-CPWP-211X297",
            price: 7.50
        },
        {
            width: 11.8,
            height: 11.8,
            SKU: "P-FIN-CPWP-300X300",
            price: 8.18
        },
        {
            width: 11,
            height: 13.8,
            SKU: "P-FIN-CPWP-280X350",
            price: 9.55
        },
        {
            width: 11.8,
            height: 15.7,
            SKU: "P-FIN-CPWP-300X400",
            price: 10.91
        },
        {
            width: 15.7,
            height: 19.7,
            SKU: "P-FIN-CPWP-400X500",
            price: 17.31
        }
    ],
    "SAP": [
        {
            width: 7.9,
            height: 11.8,
            SKU: "ART-FAP-SAP-8X12",
            price: 4.77
        },
        {
            width: 8.3,
            height: 11.7,
            SKU: "ART-FAP-SAP-A4",
            price: 5.45
        },
        {
            width: 11.8,
            height: 15.7,
            SKU: "ART-FAP-SAP-12X16",
            price: 8.18
        },
        {
            width: 11.7,
            height: 16.5,
            SKU: "ART-FAP-SAP-A3",
            price: 8.86
        },
        {
            width: 15.7,
            height: 19.7,
            SKU: "P-FIN-SAP-400X500",
            price: 10.91
        }
    ],
    "MFA": [
        {
            width: 8.3,
            height: 11.7,
            SKU: "ART-FAP-MFA-A4",
            price: 7.50
        },
        {
            width: 11.8,
            height: 15.7,
            SKU: "ART-FAP-MFA-12X16",
            price: 10.91
        },
        {
            width: 11.7,
            height: 16.5,
            SKU: "ART-FAP-MFA-A3",
            price: 12.27
        },
        {
            width: 15.7,
            height: 19.7,
            SKU: "P-FIN-MFA-400X500",
            price: 15.00
        },
        {
            width: 16.5,
            height: 23.4,
            SKU: "ART-FAP-MFA-A2",
            price: 15.68
        }
    ]
}

const PaperDim = (props: PaperDimProps) => {
    const [selectedSKU, setSelectedSKU] = useState<string>("");
    const [renderWarningSnackbar, setRenderWarningSnackbar] = useState<boolean>(false);

    //@ts-ignore
    const priceDirectory = aspectRatios[props.selectedType];
    const realDims = props.dimensions[1] / props.dimensions[0];

    let lowestDistance = 100;
    let recommendedChoice = 0;
    for (let i = 0; i < 5; i++){
        const ratioDims = priceDirectory[i].width/ priceDirectory[i].height;
        if (Math.abs(realDims - ratioDims) < lowestDistance){
            lowestDistance = Math.abs(realDims - ratioDims);
            recommendedChoice = i;
        }
    }

    const changeDims = (event: any) => {
        setSelectedSKU(event.target.value);
    }
    
    const cancelCallback = () => {
        props.cancelOrder();
    }

    const submitPaperDims = () => {
        if (selectedSKU === ""){
          setRenderWarningSnackbar(true);
          return;
        }
        props.toUserInfo(props.selectedType, selectedSKU);
    }

    const backToPaperType = () => {
      props.toPaperType();
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
          <Typography variant="h3">2) Set the Dimensions</Typography>
          <Divider style={{ marginTop: "1%", width: "90%" }} color="white" />
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
            justifyContent: "space-evenly",
          }}
        >
          <FormControl
            component="fieldset"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <RadioGroup aria-label="paper-type" onChange={changeDims}>
              {priceDirectory.map((entry: any) => {
                return (
                  <FormControlLabel
                    sx={{ fontSize: "150%" }}
                    key={entry.SKU}
                    value={entry.SKU}
                    control={<Radio />}
                    label={
                      <Typography variant="h5">{`${entry.width} X ${entry.height} --  Price: $${entry.price}`}</Typography>
                    }
                  />
                );
              })}
            </RadioGroup>
            <Typography
              variant="body2"
              sx={{ marginTop: "1%", fontSize: "150%" }}
            >
              Recommended Dimensions (based on selected picture):
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "150%" }}
            >{`${priceDirectory[recommendedChoice].width} X ${priceDirectory[recommendedChoice].height}`}</Typography>
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
              sx={{ marginRight: "10%", fontSize: "150%", padding: 0 }}
              onClick={cancelCallback}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ marginRight: "10%", fontSize: "150%", padding: 0 }}
              onClick={backToPaperType}
            >
              Back
            </Button>
            <Button
              variant="contained"
              sx={{ fontSize: "150%", padding: 0 }}
              onClick={submitPaperDims}
            >
              Next
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

export default PaperDim;