import React, { useState,useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField, Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { Provinces, DegreeField } from "app/data/Constant";

export default function DialogEditDiploma(props) {
  const { open, item, handleCloseDialog } = props;
  const [diploma, setDiploma] = useState({});

  useEffect(()=>{
    setDiploma(item)
  },[])
  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle style={{ padding: 0 }}>
        <Typography variant="h6" style={{ padding: "10px 0 0 20px" }}>
          Chỉnh sửa văn bằng
        </Typography>
        <Box className="icon-close">
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          sm={12}
          xs={12}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 5,
          }}
          spacing={2}
        >
            <Grid item xs={5} md={5}>
            <TextField
              size="small"
              label="Tên văn bằng"
              variant="outlined"
              value={diploma?.name}
              onChange={(event) =>
                setDiploma({ ...diploma, name: event.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={5} md={5}>
          <Autocomplete
              freeSolo
              size="small"
              fullWidth
              value={diploma?.field}
              onChange={(event, newValue) =>
                setDiploma((diploma) => ({
                  ...diploma,
                  field: newValue,
                }))
              }
              options={DegreeField}
              getOptionLabel={(option) => option.field}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Lĩnh vực"
                  className="font-15"
                  fullWidth
                  variant="outlined"
              size="small"

                />
              )}
            />
          </Grid>
          <Grid item xs={5} md={5}>
            <TextField
              size="small"
              label="Ngày cấp"
              variant="outlined"
              value={diploma?.field?.field}
              onChange={(event) =>
                setDiploma({ ...diploma, field: event.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={5} md={5}>
          <Autocomplete
              freeSolo
              size="small"
              fullWidth
              value={diploma?.issuedBy}
              onChange={(event, newValue) =>
                setDiploma((diploma) => ({
                  ...diploma,
                  issuedBy: newValue,
                }))
              }
              options={DegreeField}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Nơi cấp"
                  className="font-15"
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              size="small"
              label="Nội dung văn bằng"
              variant="outlined"
              value={diploma?.content}
              onChange={(event) =>
                setDiploma({ ...diploma, content: event.target.value })
              }
              fullWidth
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button className="button-confirm" onClick={handleCloseDialog}>
          Lưu
        </Button>
        <Button className="button-cancel" onClick={handleCloseDialog}>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}
