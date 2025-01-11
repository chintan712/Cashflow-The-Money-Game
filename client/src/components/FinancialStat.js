import React from "react";
 
import "devextreme/dist/css/dx.light.css";
import "./FinancialStat.css";
 
import { Drawer } from "devextreme-react/drawer";
 
class FinancialStat extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <Drawer
                    minSize={37}
                    height={600}
                    render={ () => <div style="width: 150px">Drawer content</div> } >
                    <div>View content</div>
                </Drawer>
            </React.Fragment>
        );
    }
}
export default FinancialStat;