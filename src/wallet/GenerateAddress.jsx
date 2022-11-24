import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Modal } from "antd";
import { generateSwitchWalletAddress } from "../methods/app";

function GenerateAddress() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const generate = () => {
    setOpen(false);
    dispatch(generateSwitchWalletAddress(email));
  };

  return (
    <div>
      <p>Wallet Address from SwitchWallet</p>
      <br />
      <Button onClick={() => setOpen(true)}>Generate Address</Button>
      <Modal
        footer={null}
        width={320}
        open={open}
        onCancel={() => setOpen(false)}
        title="Generate address"
      >
        <div>
          <p>User Email?</p>
          <Input
            addonAfter="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />

        <br />

        <Button block type="primary" onClick={() => generate()}>
          Submit
        </Button>
      </Modal>
    </div>
  );
}

export default GenerateAddress;
