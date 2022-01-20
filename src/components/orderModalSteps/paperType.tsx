import { Button, Divider, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useState } from "react";

interface PaperTypeProps {
    toPaperDim: (selectedType: string) => void;
    cancelOrder: () => void;
}

const paperTypes = [
    {
        type: "EMA",
        description: `A premium quality heavyweight fine art print material with a smooth, clean finish. 
        This museum-quality paper is extremely consistent and works perfectly with large, full colour graphics or illustrations. 
        The matte finish emphasises different highlights and tones in the source artworks; helping to create stunning works of art.`
    },
    {
        type: "BAP",
        description: `An affordable barrier coated poster paper perfect for volume projects that require the best quality art substrate at the most competitive price. 
        Our budget art paper is a smooth, bright white, all-purpose good quality paper with a matte finish.`
    },
    {
        type: "CPWP",
        description: `A 100% cotton rag paper with a matte finish, offering a similar archival-standard performance to our Hahnemuhle photo rag paper but at a slightly lower weight. 
        With a matte finish and a tight, highly textured surface resemblant of etching paper. This mid-white stock produces smooth skin tones and is well suited for premium portraiture and wedding photography.`
    },
    {
        type: "SAP",
        description: `One of our most popular substrates, SAP is a high-quality, smooth matte paper with a light, fine-grain surface texture. 
        This paper is particularly suited to contemporary illustration and photography. Image reproduction is sharp, crisp and vibrant, with great density and vivid colours.`
    },
    {
        type: "MFA",
        description: `A gently textured etching paper designed for museum-quality reproductions. 
        This beautiful and versatile art paper is particularly suited to Giclée reproductions of artworks and paintings. Ideal for premium colour and monochrome prints.`
    }
]

const PaperType = (props: PaperTypeProps) => {
    const [type, setType] = useState<number>(0);

    const changeType = (event: any) => {
        switch (event.target.value) {
            case "EMA":
                setType(0);
                break;
            case "BAP":
                setType(1);
                break;
            case "CPWP":
                setType(2);
                break;
            case "SAP":
                setType(3);
                break;
            case "MFA":
                setType(4);
                break;
        }
    };

    const cancelCallback = () => {
        props.cancelOrder();
    }

    const submitPaperType = () => {
        props.toPaperDim(paperTypes[type].type);
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
          <Typography variant="h3">1) Pick your Paper type</Typography>
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
            <RadioGroup
              aria-label="paper-type"
              defaultValue="EMA"
              onChange={changeType}
            >
              <FormControlLabel
                value="EMA"
                control={<Radio />}
                label={
                  <Typography variant="h6">Enhanced Matte Art (EMA)</Typography>
                }
              />
              <FormControlLabel
                value="BAP"
                control={<Radio />}
                label={
                  <Typography variant="h6">Budget Art Paper (BAP)</Typography>
                }
              />
              <FormControlLabel
                value="CPWP"
                control={<Radio />}
                label={
                  <Typography variant="h6">
                    Cold Press Watercolor Paper (CPWP)
                  </Typography>
                }
              />
              <FormControlLabel
                value="SAP"
                control={<Radio />}
                label={
                  <Typography variant="h6">Smooth Art Paper (SAP)</Typography>
                }
              />
              <FormControlLabel
                value="MFA"
                control={<Radio />}
                label={
                  <Typography variant="h6">
                    Museum Fine Art Paper (MFA)
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
          <Divider orientation="vertical" sx={{ height: "100%" }} color="white"/>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              width: "40%",
            }}
          >
            <Typography variant="h5">Description</Typography>
            <Typography variant="subtitle1">
              {paperTypes[type].description}
            </Typography>
          </div>
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
              sx={{ fontSize: "150%", padding: "0", marginRight: "10%" }}
              onClick={cancelCallback}
            >
              Cancel
            </Button>
            <Button
              sx={{ fontSize: "150%", padding: "0" }}
              variant="contained"
              onClick={submitPaperType}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
}

export default PaperType;