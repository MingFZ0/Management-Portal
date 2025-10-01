import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function Edit(props) {
    const cateogry = props.cateogry;
    const targetID = props.targetID;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.onEditExit();
    }



    if (props.onEdit != null) 
    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>EDIT</Button>
            <Dialog
                open={open}
                // fullScreen={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">{"Editing ID of " + targetID + " within " + cateogry}</DialogTitle>
                <DialogContent>
                    <div>
                        <div>
                            {/* <TextField
                            label="Select"
                            helperText="Please select a category"
                            onClickCapture={handleCategorySelection}
                            >
                            {categories}
                            </TextField> */}
                        </div>
                            {}
                        </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>Save</Button> 
                    <Button variant="contained" onClick={handleClose}>Cancel</Button> 
                    <Button variant="contained" onClick={handleClose}>Delete</Button> 
                </DialogActions>
            </Dialog>
        </div>
    )
}