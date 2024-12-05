import LoadingIcon from "@/assets/Icons/LoadingIcon";
import adminBaseApi from "@/axiosAdmin";
import FormManager from "@/Components/Page/Common/FormManager";
import CustomTooltip from "@/Components/UI/CustomTooltip";
import DataTable from "@/Components/UI/DataTable";
import Panel from "@/Components/UI/Panel";
import PopupModal from "@/Components/UI/PopupModal";
import TextBox from "@/Components/UI/TextBox";
import { countDecimals, getCurrencySymbol, stringShorten } from "@/helpers";
import { TOAST_SHOW } from "@/Redux/Actions/ToastAction";
import { IWallet, pageProps } from "@/utils/types";
import { CopyAllRounded, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const columns = [
  "#",
  "Wallet address",
  "Amount",
  "Currency",
  "Tx-id",
  "Type",
  "Status",
  "Date",
];

const AdminFee = ({ setPageName }: pageProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [feeTransaction, setFeeTransactions] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [cryptoData, setCryptoData] = useState<IWallet[]>([]);

  useEffect(() => {
    getFeeWalletBalance();
    setPageName("Fee");
  }, []);

  const getFeeWalletBalance = async () => {
    try {
      const {
        data: { data },
      } = await adminBaseApi.get("/admin/getFeeWalletBalance");
      setCryptoData(data.cryptoWallets);
      setFeeData(data?.transactions);
      setLoading(false);
    } catch (e: any) {
      const message = e.response.data.message ?? e.message;
      dispatch({
        type: TOAST_SHOW,
        payload: {
          message: message,
          severity: "error",
        },
      });
    }
  };
  const setFeeData = (transactionData: any[]) => {
    const tempData1 = [];
    for (let i = 0; i < transactionData.length; i++) {
      const temp = transactionData[i];
      const tempObject = {
        no: i + 1,
        wallet_address: temp.wallet_address,
        amount: temp.amount + " ($ " + temp.amount_in_usd + ")",
        wallet_type: temp.wallet_type,
        transaction_id: !temp.transaction_id ? (
          <Box>No Transaction Ref</Box>
        ) : (
          <CustomTooltip title={temp.transaction_id}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Typography fontSize={14} fontWeight={700}>
                <a
                  href={
                    "https://blockchair.com/search?q=" + temp.transaction_id
                  }
                  target="_blank"
                >
                  {stringShorten(temp.transaction_id, 7, 5)}
                </a>
              </Typography>
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(
                    "https://blockchair.com/search?q=" + temp.transaction_id
                  );
                  dispatch({
                    type: TOAST_SHOW,
                    payload: {
                      message: "Copied!",
                      severity: "info",
                    },
                  });
                }}
              >
                <CopyAllRounded fontSize="small" color="secondary" />
              </IconButton>
            </Box>
          </CustomTooltip>
        ),
        hidden: temp.transaction_id,
        transaction_type: temp.transaction_type,
        status: temp.status,
        date:
          new Date(temp.createdAt).toLocaleDateString() +
          " " +
          new Date(temp.createdAt).toLocaleTimeString(),
      };
      tempData1.push(tempObject);
    }
    setFeeTransactions(tempData1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Box sx={{ m: 2, mb: 5 }}>
      {loading ? (
        <>
          <Box
            sx={{
              height: "375px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingIcon size={75} />
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontWeight: 700, mt: 5 }}>
              Crypto Fee Wallets
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {cryptoData.map((x) => (
              <Box
                key={x.id}
                sx={{
                  border: "1px solid",
                  width: "40vw",
                  height: "150px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 3,
                }}
              >
                <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
                  {x.wallet_type}
                </Typography>
                <Typography>{x.wallet_address}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 1,
                    mt: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 30,
                      fontWeight: 900,
                      textAlign: "right",
                      color: "text.secondary",
                    }}
                  >
                    {getCurrencySymbol(
                      x.wallet_type,
                      countDecimals(x.amount) > 8
                        ? x.amount.toFixed(8)
                        : x.amount
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 700,
                      textAlign: "right",
                      color: theme.palette.error.main,
                    }}
                  >
                    ({getCurrencySymbol("USD", x.amount_in_usd)})
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              mt: 5,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontWeight: 700, mt: 5 }}>
              Fee Transactions
            </Typography>
            <TextBox
              customWidth="auto"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Divider sx={{ my: 2 }} />

          <Panel radius={10}>
            <Box>
              <DataTable
                columns={columns}
                data={feeTransaction}
                searchValue={searchValue}
                loading={loading}
              />
            </Box>
          </Panel>
        </>
      )}
    </Box>
  );
};

export default AdminFee;
