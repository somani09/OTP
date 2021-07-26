import React, { useState, useEffect, useRef } from 'react'
import './phone.scss'

function Phone({phone, setPhone, resetPhone, setNumberSent}) {

    
    const [disabled, setdisabled] = useState(true);
    const numberInputFocusRef = useRef(null);
    const [invalid, setInvalid] = useState(false);
    const [invalidLength, setInvalidLength] = useState(false);
    useEffect(() => {
        if(phone)
            setdisabled(false);
        else
            setdisabled(true);
    },[phone])

    useEffect(() => {
        numberInputFocusRef.current.focus();
    },[])

    const verify = () =>{
        console.log("wordf")
        if(isNaN(phone))
            setInvalid(true)
        else if(phone.length!==10)
            setInvalidLength(true)
        else 
            setNumberSent(true)
    }

    return (
    <>
        <div id="phone-screen"  className="col space-between phoneArea align-items-center "  >
            {/* <div className="col align-items-center justify-center"> */}
                <h1 className="mainHeader">OTP Authentication</h1>
                <p className="simpleText">Please enter your phone number</p>
                <div className="row inputArea align-items-center justify-center">
                    <input
                                ref={numberInputFocusRef}
                                className="otp-inputNumber "
                                type="tel"
                                maxLength="10"
                                value={phone}
                                onChange={e=>{setPhone(e.target.value); setInvalid(false); setInvalidLength(false)}}
                            />
                </div>
            {/* </div> */}
            <div className="col justify-center align-items-center">
                <div className="errorPhone" style={{ visibility: invalid ? 'visible': 'hidden'}}>Invalid Number</div>
                <div className="errorPhone" style={{ visibility: invalidLength ? 'visible': 'hidden'}}>Enter a 10 digit phone </div>
                <button disabled={disabled} className="submit" id="submit_Number" onClick={(e)=>verify(phone)}>Get OTP</button>
            </div>
        </div> 
    </>
    )
}

export default Phone
