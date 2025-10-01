import { Button, Dialog } from "@mui/material";

export function SearchRecord() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    };

    return (
        <Button variant="outlined" onClick={handleClickOpen}>
            Open simple dialog
        </Button>
    )
}