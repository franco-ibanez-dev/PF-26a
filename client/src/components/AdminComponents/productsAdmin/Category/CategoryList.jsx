import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { grey } from "@mui/material/colors";
import { fetchCategory } from "../../../../redux/actions";
import { ActionsUpdate, ActionsDelete } from "./ActionsCategory";

const CategoryList = () => {
  const [pageSize, setPageSize] = useState(3);
  const [rowId, setRowId] = useState(null);
  const allCategories = useSelector((state) => state.category);
  const dispatch = useDispatch();
  console.log("hola", allCategories);
  useEffect(() => {
    dispatch(fetchCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "name",
        headerName: "Name",
        width: 200,
        renderCell: (params) => params.row.name,

        editable: true,
      },

      { field: "id", headerName: "Id", width: 300 },
      {
        field: "actionUpdate",
        headerName: "Edit",
        type: "actions",
        renderCell: (params) => (
          <ActionsUpdate {...{ params, rowId, setRowId }} />
        ),
      },
      {
        field: "select",
        headerName: "Select",
        type: "boolean",
        editable: true,
      },
      {
        field: "actionDelete",
        headerName: "Delete",
        type: "actions",
        renderCell: (params) => (
          <ActionsDelete {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <Box sx={{ height: 300, width: 1 }}>
      <DataGrid
        columns={columns}
        rows={allCategories}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[3, 6, 12]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: grey[200],
          },
        }}
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </Box>
  );
};

export default CategoryList;
