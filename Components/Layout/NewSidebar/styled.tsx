import styled from "@emotion/styled";

export const SidebarWrapper = styled.aside`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 14px;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MenuItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  background: ${({ active }) => (active ? "#eef2ff" : "transparent")};
  font-size: 14px;
  font-weight: 500;
  color: ${({ active }) => (active ? "#3b82f6" : "#111827")};
  border-left: ${({ active }) =>
    active ? "4px solid #3b82f6" : "4px solid transparent"};

  &:hover {
    background: #f2f4f7;
  }
`;

export const IconBox = styled.div<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: ${({ active }) => (active ? "#dbeafe" : "#f3f4f6")};
`;

export const ReferralCard = styled.div`
  background: #f9fafb;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin-bottom: 18px;

  .label {
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 6px;
  }
`;

export const ReferralCodeBox = styled.div`
  background: white;
  border: 1px solid #d1d5db;
  padding: 10px 12px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 14px;
    font-weight: 600;
    color: #3b82f6;
  }

  .copy-btn {
    background: #eef2ff;
    border-radius: 8px;
    padding: 6px;
    cursor: pointer;
  }
`;

export const KnowledgeBaseBtn = styled.button`
  width: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #f3f4f6;
  }
`;
