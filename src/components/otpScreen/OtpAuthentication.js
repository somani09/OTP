import React, { useState,useEffect, useRef } from 'react'
import './OtpAuth.scss'
import Ring from './ring.svg'
function OtpAuthentication({phone, setPhone, setNumberSent, numberSent, setVarificationComplete}) {
    

    const [otp,setOtp]=useState(new Array(6).fill(""));
    const [invalidOtp, setinvalidOtp] = useState(false);
    const [attempsAllowed, setattemptsAllowed] = useState(2);
    const [disabled, setdisabled] = useState(true);
    const [resendOtp, setresendOtp] = useState(false);
    const seconds=30;
    const [timer, settimer] = useState(seconds);
    const [togg, settogg] = useState(true);
    const otpInputFocusRef = useRef(null);
    const [loading, setLoading] = useState(false)
    


    useEffect(() => {
        otpInputFocusRef.current.focus();
    },[])

    useEffect(() => {
        if(otp.join("").length===6)
            setdisabled(false);
        else
            setdisabled(true);
    },[otp])

    useEffect(() => {
        const interval1 = setInterval(() => {
            settimer(timer => timer - 1);
          }, 1000);
          const timeOut=setTimeout(()=>{
            clearInterval(interval1);
            setresendOtp(true);
            clearTimeout(timeOut);
          },seconds*1000);
    }, [togg])


    const handleChange=(element,index)=>{
        setinvalidOtp(false);
        if(isNaN(element.value)) return false;
        setOtp([...otp.map((cur,idx)=>(idx===index)?element.value:cur)]);
        if(element.nextSibling && element.value!==""){
            element.nextSibling.focus();
        }
    }

    const handlePress=(e)=>{
        if(e.key==="Backspace"||e.key==="Delete")
        {
            if(e.target.previousSibling&&e.target.value==="")
                e.target.previousSibling.focus();
        }
        if (e.key === 'Enter') {
			document.getElementById('submit_Otp').click();
		}
    }

    const verify = () =>{
        setLoading(true);
        setTimeout(() => {
            setVarificationComplete(true);
            window.open("https://somani09.github.io/portfolio/", '_blank');
        }, 3000);
    }

    const handleResend=()=>{
        settimer(seconds);
        setattemptsAllowed(attempsAllowed=>attempsAllowed-1);
        setresendOtp(false);
        settogg(!togg);
        
    }

    return (
        <>
            <div id="otp-verification-screen"  className="col space-between mainAuth align-items-center justify-center"  >
                <div className="col align-items-center justify-center">
                    <h1 className="mainHeader">Verify</h1>
                    <p className="simpleText">We have sent OTP on {phone}. Please enter it below.</p>
                    {loading?<img src={Ring} width="40px" />:
                    <div className="row">
                        {otp.map((data,index)=>{
                            return(
                                <input
                                    ref={index===0?otpInputFocusRef:null}
                                    className="otp-input "
                                    type="tel"
                                    maxLength="1"
                                    key={index}
                                    value={data}
                                    onKeyDown={handlePress}
                                    onChange={e=>handleChange(e.target,index)}
                                    onFocus={e=>e.target.select()}
                                />
                            )
                        })
                        }
                    </div>}
                    <p className=" invalid" style={{ visibility: invalidOtp === true ? 'visible': 'hidden'}}>Incorrect OTP</p>


                </div>
                <div className="col">
                    <button disabled={disabled} className="submit" id="submit_Otp" onClick={verify}>Confirm</button>
                    {resendOtp?
                    (
                    <div className="noOtp " style={{ visibility: attempsAllowed !== 0 ? 'visible': 'hidden'}}>
                        <span>Didn't get an OTP?</span>
                        <button className="resendBtn" id="resendOtpBtn" onClick={handleResend}>Resend otp</button>
                    </div>
                    )
                    :<p className=" resendOtp"  style={{ visibility: attempsAllowed !== 0 ? 'visible': 'hidden'}} >You can resend the OTP in 0:{timer}</p>}
                    </div>
                </div> 
        </>
    )
}

export default OtpAuthentication
