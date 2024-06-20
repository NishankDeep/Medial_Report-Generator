
import React from "react";
import { changeStartingLetter } from "./Helper";

const PatientInfoBox = ({ currentReport }) => {
    return (
        <>
            <div className="flex justify-between font-bold text-md p-2" style={{ backgroundColor: '#f5f5f5d0', borderRadius: '1rem', marginLeft: '3rem',marginRight: '3rem' }} >

                <div>
                    <p>
                        <strong>PRN No: {currentReport.prn} </strong>
                    </p>
                    <p>
                        <strong>Name: {currentReport.salutation} {changeStartingLetter(currentReport.name)}</strong>
                    </p>
                    <p>
                        <strong>Age: {currentReport.age}({currentReport.gender})</strong>
                    </p>
                    <p>
                        <strong>Referred By: {currentReport.referredBy} </strong>
                    </p>
                </div>
                <div className="text-right">
                    <p>
                        <strong>Sample Colleted On: {currentReport.Sample_Collected_On} </strong>
                    </p>
                    <p>
                        <strong>Report Out On: {currentReport.Sample_Out_On}</strong>
                    </p>
                </div>
            </div>
        </>
    );
}

export default PatientInfoBox