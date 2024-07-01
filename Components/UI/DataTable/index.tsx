import {
  ExpandLessRounded,
  ExpandMoreRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NoData from "../NoData";

interface DataTableProps {
  columns: string[];
  data: any[];
  hasAction?: boolean;
  collapsible?: boolean;
  collapsibleForUser?: boolean;
  collapsibleItem?: JSX.Element;
  originalData?: any[];
  actionColumn?: (index: number) => JSX.Element | JSX.Element[];
  actionText?: string;
}

interface customRow {
  row: any[];
  index: number;
  collapsible?: boolean;
  collapsibleItem?: JSX.Element;
  hasAction?: boolean;
  actionColumn?: Function;
  collapsibleForUser?: boolean;
}

const DataTable = ({
  columns,
  data,
  hasAction,
  actionColumn,
  collapsibleForUser,
  originalData,
  collapsible,
  actionText,
}: DataTableProps) => {
  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ "& th": { color: "text.primary", fontWeight: 700 } }}>
          <TableRow>
            {collapsible && !collapsibleForUser && <TableCell>#</TableCell>}
            {columns.map((item) => (
              <TableCell key={item} sx={{ whiteSpace: "nowrap" }}>
                {item}
              </TableCell>
            ))}
            {hasAction && <TableCell>{actionText ?? ""}</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, index) => {
              return (
                <CustomRow
                  key={`${row[0]}_${index}`}
                  row={row}
                  index={index}
                  collapsibleItem={<Box>Hello</Box>}
                  collapsibleForUser={collapsibleForUser}
                  collapsible={collapsible}
                  hasAction={hasAction}
                  actionColumn={actionColumn}
                />
              );
            })
          ) : (
            <TableRow
              sx={{
                "&:last-child td": { border: 0, textAlign: "center" },
              }}
            >
              <TableCell colSpan={columns.length + 1}>
                <NoData />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CustomRow = ({
  row,
  index,
  collapsible,
  collapsibleItem,
  collapsibleForUser = false,
  hasAction,
  actionColumn,
}: customRow) => {
  const [open, setOpen] = useState(false);

  const allDataKeys = Object.keys(row);
  return (
    <>
      <TableRow sx={{ "&:last-child td": { border: 0 } }}>
        {collapsible && !collapsibleForUser && (
          <TableCell>
            <IconButton onClick={() => setOpen(!open)}>
              {open ? (
                <ExpandLessRounded color="primary" />
              ) : (
                <ExpandMoreRounded color="secondary" />
              )}
            </IconButton>
          </TableCell>
        )}
        {allDataKeys
          .filter((k) => k !== "hidden" && k !== "id")
          .map((key: any, index) => (
            <TableCell
              sx={{
                textTransform: key === "email" ? "none" : "capitalize",
                whiteSpace: "nowrap",
              }}
              key={`${row[key]}_${index}`}
            >
              {Array.isArray(row[key])
                ? row[key].join(", ")
                : row[key] ?? "No Data"}
            </TableCell>
          ))}
        {hasAction && (
          <TableCell sx={{ width: "480px", whiteSpace: "nowrap" }}>
            {actionColumn && actionColumn(index)}
            {collapsibleForUser && (
              <Button variant="rounded" onClick={() => setOpen(!open)}>
                View Details
              </Button>
            )}
          </TableCell>
        )}
      </TableRow>
      {collapsible && (
        <TableRow>
          <TableCell
            sx={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={allDataKeys.length + 2}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ mx: 3, mt: 5, mb: 6 }}>
                {collapsibleItem && collapsibleItem}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default DataTable;
