import { Divider } from "antd";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
// import defaultImage from '../defaultone.png';
import usdtLogo from "../tether-usdt-logo.png";
import FundWithBridge from "./FundWithBridge";
import GenerateAddress from "./GenerateAddress";
import SellCryptoWithBridge from "./SellCryptoWithBridge";
import { getAddressBalance } from "../methods/app";

const Style = styled.div`
  padding: 20px;

  & .currency {
    display: flex;

    & img {
      width: 20px;
      height: 20px;
      margin-right: 7px;
      border-radius: 50%;
    }
  }

  & .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    row-gap: 10px;
    margin-top: 10px;
    & > * {
      border: 1px solid #eee;
      padding: 20px;
    }
  }
`;

function AppWallet() {
  const { data, profile } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      profile.switchwallet_address != null ||
      profile.switchwallet_address != ""
    ) {
      dispatch(getAddressBalance());
    }
    // eslint-disable-next-line
  }, [profile.switchwallet_address]);
  return (
    <Style>
      <h1>
        {data.amountInAppWallet != null ? data.amountInAppWallet : 0} USDT
      </h1>
      <div className="currency">
        <img src={usdtLogo} alt="" />
        <p>USDT</p>
      </div>
      <p style={{ fontSize: 13 }}>
        {profile != undefined ? profile.switchwallet_address : null}
      </p>

      <Divider />

      <div className="actions">
        <GenerateAddress />
        <FundWithBridge />
        <SellCryptoWithBridge />
      </div>
    </Style>
  );
}

export default AppWallet;
