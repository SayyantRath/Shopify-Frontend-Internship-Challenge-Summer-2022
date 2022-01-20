import { Modal } from "@mui/material";
import { useState } from "react";
import PaperDim from "./orderModalSteps/paperDim";
import PaperType from "./orderModalSteps/paperType";
import UserInfo from "./orderModalSteps/userInfo";
import Success from "./orderModalSteps/Success"

interface OrderModalProps {
    imghref: String;
    dimensions: any[];
    cancelTransaction: () => void;
    close: () => void;
}

const OrderModal = (props: OrderModalProps) => {
    const [page, setPage] = useState<String>("PaperType");
    const [type, setType] = useState<string>("EMA");
    const [SKU, setSKU] = useState<String>("");

    const toPaperDim = (selectedType: string) => {
        setType(selectedType);
        setPage("PaperDim");
    }

    const toPaperType = () => {
        setPage("PaperType")
    }

    const toPaperDims = () => {
        setPage("PaperDim");
    }

    const toUserInfo = (selectedType: string, selectedSKU: string) => {
        setSKU(selectedSKU);
        setPage("UserInfo")
    }


    const onSubmit = (shipping: string, address: string, zip: string, city: string, stateName: string, name: string, email: string) => {

        const finalOrderObj = {
            "shippingMethod": shipping,
            "recipient": {
                "address": {
                    "line1": address,
                    "line2": "N/A",
                    "postalOrZipCode": zip,
                    "countryCode": "US",
                    "townOrCity": city,
                    "stateOrCounty": stateName
                },
                "name": name,
                "email": email
            },
            "items": [
                {
                    "sku": SKU,
                    "copies": 1,
                    "sizing": "fillPrintArea",
                    "assets": [
                        {
                            "printArea": "default",
                            "url": props.imghref
                        }
                    ]
                }
            ]
        }
        
        fetch("https://api.sandbox.prodigi.com/v4.0/Orders", {
            method: 'POST',
            headers: {
                "X-API-Key": "60618846-0129-4291-ac4e-3b68968d97f8",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalOrderObj)
        })
        .then((response) => response)
        .then((response) => response.json())
        .then((data) => {
            console.log("Submitted");
            setPage("Success")
      });
      
    }

    const cancelOrder = () => {
        props.cancelTransaction();
    }

    return (
        <Modal open={true} sx={{marginTop: "17.5vh", marginLeft: "17.5vw", width: "65vw", height: "65vh", color:"white"}}>
            <div>
                { page === "PaperType" 
                    ? <PaperType toPaperDim={toPaperDim} cancelOrder={cancelOrder}/>
                    : page === "PaperDim" ? <PaperDim selectedType={type} dimensions={props.dimensions} toPaperType={toPaperType} cancelOrder={cancelOrder} toUserInfo={toUserInfo}/>
                    : page === "UserInfo" ? <UserInfo onSubmit={onSubmit} cancelOrder={cancelOrder} toPaperDims={toPaperDims}/>
                    : <Success close={props.close}/>
                }
            </div>
        </Modal>
    )
};

export default OrderModal;