import styled from "@emotion/styled";
import CheckIcon from "@mui/icons-material/Check";

export const LangTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
  cursor: pointer;
  background: white;
`;

export const LangFlag = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
`;

export const LangText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const CheckIconStyled = styled(CheckIcon)`
  font-size: 18px;
  color: #000;
`;

export const VerticalLine = styled.div`
  width: 1px;
  height: 20px;
  background: #ddd;
`;
