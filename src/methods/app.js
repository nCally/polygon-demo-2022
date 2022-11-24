import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

// const emaildskj = ' '
const currency = 4; // USDT
const network = 3; // polygon
const BankAccount = "0000187849";

export const generateSwitchWalletAddress = createAsyncThunk(
  "app/generateSwitchWalletAddress",
  async (email) => {
    const body = {
      clientEmailAddress: email,
      currency,
      networkChain: network,
      publicKey: process.env.REACT_APP_SWITCH_WALLET_PUBLIC_KEY,
    };
    console.log(process.env.REACT_APP_SWITCH_WALLET_API_KEY);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `apikey ${process.env.REACT_APP_SWITCH_WALLET_API_KEY}`,
      },
    };
    const response = await axios.post(
      "https://testnet.switchwallet.io/api/v1/walletAddress/generate",
      body,
      config
    );
    return response.data.data.address;
  }
);

export const getAddressBalance = createAsyncThunk(
  "app/getAddressBalance",
  async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `apikey ${process.env.REACT_APP_SWITCH_WALLET_API_KEY}`,
      },
    };
    const res = await axios.get(
      `https://testnet.switchwallet.io/api/v1/walletBalance/originAccounts?publicKey=${process.env.REACT_APP_SWITCH_WALLET_PUBLIC_KEY}`,
      config
    );
    const balance = res.data.data.filter((p) => p.key === "USDT");
    return balance[0].balance;
  }
);

export const getOriginAddress = createAsyncThunk(
  "app/getOriginAddress",
  async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `apikey ${process.env.REACT_APP_SWITCH_WALLET_API_KEY}`,
      },
    };
    const res = await axios.get(
      `https://testnet.switchwallet.io/api/OriginAccount`,
      config
    );
    const account = res.data.data.address;
    return account;
  }
);

export const getInfo = createAsyncThunk("app/getInfo", async () => {
  const res = await axios.get("/generate");
  return res.data;
});

export const withdrawSwitchwallet = createAsyncThunk(
  "app/withdrawSwitchwallet",
  async () => {
    await axios.post("/withdraw-to-address");
  }
);

export const buyCryptoApi = createAsyncThunk(
  "app/buyCrypto",
  async (request) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          secretKey: process.env.REACT_APP_XENDBRIDGE_SECRET_KEY,
        },
      };
      console.log(request, "=========");
      const body = {
        emailAddress: request.email,
        phoneNumber: "07064366723",
        userName: "annadoe",
        payInCurrencyCode: "NGN",
        payInCurrencyNetwork: "LOCAL",
        receiveInCurrencyCode: "USDT",
        receiveInCurrencyNetwork: "POLYGON",
        orderAmount: parseFloat(request.amount),
        consumerDepositMethod: {
          paymentMethod: "Bank",
          paymentData: {
            accountName: "Anna doe",
            accountNumber: BankAccount,
            bankName: "Access Bank",
          },
        },
        consumerReceiptMethod: {
          paymentMethod: "Crypto",
          paymentData: {
            walletAddress: request.walletAddress,
            network: "POLYGON",
          },
        },
      };
      const response = await axios.post(
        "https://canary.xendbridge.com/api/peertopeerorder/buy/initiate",
        body,
        config
      );
      console.log(response);
      if (response.data.Data.Status === 1) {
        message.success("Buy order submitted successfully");
      } else {
        message.success(response.data.Data.Message);
      }
    } catch (e) {
      console.log(e);
      message.success(e.respoonse.data.Data.Message);
    }
  }
);

export const sellCryptoApi = createAsyncThunk(
  "app/sellCrypto",
  async (request) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        secretKey: process.env.REACT_APP_XENDBRIDGE_SECRET_KEY,
      },
    };
    const sellorder = {
      emailAddress: request.email,
      phoneNumber: "07064366723",
      userName: "annadoe",
      payInCurrencyCode: "USDT",
      payInCurrencyNetwork: "POLYGON",
      receiveInCurrencyCode: "NGN",
      receiveInCurrencyNetwork: "LOCAL",
      orderAmount: parseFloat(request.amount),
      consumerDepositMethod: {
        paymentMethod: "Crypto",
        paymentData: {
          walletAddress: request.walletAddress,
          network: "POLYGON",
        },
      },
      consumerReceiptMethod: {
        paymentMethod: "Bank",
        paymentData: {
          accountName: "Anna Doe",
          accountNumber: BankAccount,
          bankName: "Access Bank",
        },
      },
    };
    const response = await axios.post(
      "https://canary.xendbridge.com/api/peertopeerorder/sell/initiate",
      sellorder,
      config
    );
    console.log(response);
    if (response.data.Data.Status === 1) {
      message.success("Buy order submitted successfully");
    } else {
      message.success(response.data.Data.Message);
    }
  }
);

const appRx = createSlice({
  name: "app",
  initialState: {
    profile: {
      switchwallet_address: "",
      email: "",
      switchwallet_originaddress: "",
    },
    data: {
      amountInConnectedAddress: 0,
      amountInAppWallet: 0,
      amountSaved: 0,
    },
  },
  reducers: {
    updateConnectedAddressBalance: (store, action) => {
      const state = store;
      state.data.amountInConnectedAddress = action.payload;
      return state;
    },
    updateWalletAddressBalance: (store, action) => {
      const state = store;
      state.data.amountInAppWallet = action.payload;
      return state;
    },
    updateAmountSaved: (store, action) => {
      const state = store;
      state.data.amountSaved = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getInfo.fulfilled, (store, action) => {
        const state = store;
        state.profile = action.payload;
      })
      .addCase(generateSwitchWalletAddress.fulfilled, (store, action) => {
        const state = store;
        state.profile.switchwallet_address = action.payload;
      })
      .addCase(getAddressBalance.fulfilled, (store, action) => {
        const state = store;
        state.data.amountInAppWallet = action.payload;
      })
      .addCase(getOriginAddress.fulfilled, (store, action) => {
        const state = store;
        state.profile.switchwallet_originaddress = action.payload;
      }),
});

export const { updateConnectedAddressBalance, updateAmountSaved } =
  appRx.actions;

export default appRx.reducer;
