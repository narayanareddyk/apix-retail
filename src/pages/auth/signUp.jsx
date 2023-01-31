import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import newCustomerIcon from "../../assests/images/auth/newCustomer.svg";
import existingCustomerIcon from "../../assests/images/auth/existingCustomer.svg";

export default function SignUpComponent() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "USER_LOGOUT" });
  }, []);

  return (
    <>
      <h4 style={{marginBottom:30,marginTop:30}}>Register with us</h4>

      <div className="auth-card" onClick={()=>navigate("/newCustomer")} >
        <div className="img-wrapper primary-color">
          <img height={22} src={newCustomerIcon} />
        </div>
        <div>
          <h5>New Customer</h5>
          <p>Description here</p>
        </div>
      </div>

      <div className="auth-card " onClick={()=>navigate("/existingCustomer")}>
        <div className="img-wrapper secondary-color">
          <img height={22} src={existingCustomerIcon} />
        </div>
        <div>
          <h5>Existing Customer</h5>
          <p>Description here</p>
        </div>
      </div>
      <div>
        <Link to={"/login"}>Back to login</Link>
      </div>
    </>
  );
}
