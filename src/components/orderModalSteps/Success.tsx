import { Button, Divider, Typography } from "@mui/material";

interface SuccessProps {
    close: () => void;
}

const Success = (props: SuccessProps) => {
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
          <Typography variant="h4">Your order has been submitted!</Typography>
          <Divider style={{ marginTop: "1%", width: "90%" }} />
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
          <Typography variant="body1">
            Prodigi has recieved your order! Be on the lookout for an email with
            details on final proofing and payment steps.
          </Typography>
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
          <Button variant="contained" onClick={props.close}>
            Close
          </Button>
        </div>
      </div>
    );
}

export default Success;