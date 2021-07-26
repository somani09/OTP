import React from 'react'
import './verificationComplete.scss'

function VarificationComplete({setVarificationComplete,resetPhone,setNumberSent}) {

    function resetAll()
    {
        setVarificationComplete(false);
        resetPhone();
        setNumberSent(false);
    }

    return (
        <div className="col space-between mainAuth align-items-center justify-center">
            <h1 className="mainHeader">Verification Complete</h1>
            <p className=" restart" onClick={e=>resetAll()}>Varify another number?</p>
        </div>
    )
}

export default VarificationComplete
