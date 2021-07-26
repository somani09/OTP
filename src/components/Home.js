import React, { useState } from 'react'
import OtpAuthentiction from './otpScreen/OtpAuthentication';
import Phone from './phoneScreen/Phone';
import './home.scss'
import VarificationComplete from './varificationComplete/VarificationComplete';
import down from './down.png'
function Home() {

    const [phone, setPhone] = useState();
    const [numberSent, setNumberSent] = useState(false);
    const [varificationComplete, setVarificationComplete] = useState(false)
    const [workingDropdown, setWorkingDropdown] = useState(false);

    function resetPhone(){
        setPhone('0');
    }

    return (
        <div className="row space-evenly align-items-center w-100 h-100">
            {/* <div className="col workingArea">
                <div onClick={e=>setWorkingDropdown(!workingDropdown)} className="row dropHeader  w-100" >
                    <img src={down} className="downImg rightImg dImg" />
                    <p>Working</p>
                </div>
                <div className="workingPoints col" style={{visibility:workingDropdown?'visible':'hidden'}} >
                    <div>
                        <p>-- ek number</p>
                    </div>
                    <div>
                        <p>-- doo number</p>
                    </div>
                    <div>
                        <p>-- theen number</p>
                    </div>
                    <div>
                        <p>-- chaar number</p>
                    </div>
                </div>
            </div> */}
            {numberSent?
                varificationComplete?
                <VarificationComplete 
                    varificationComplete={varificationComplete} 
                    setVarificationComplete={setVarificationComplete}
                    resetPhone={resetPhone} 
                    setNumberSent={setNumberSent} />:
                <OtpAuthentiction 
                    phone={phone} 
                    setPhone={setPhone} 
                    resetPhone={resetPhone} 
                    setNumberSent={setNumberSent}
                    setVarificationComplete={setVarificationComplete}/>:
                <Phone 
                    phone={phone} 
                    setPhone={setPhone} 
                    resetPhone={resetPhone} 
                    numberSent={numberSent} 
                    setNumberSent={setNumberSent}/>
            }
            {/* <div>hello 2</div> */}
        </div>
    )
}

export default Home
