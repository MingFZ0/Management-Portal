import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function Edit(props) {
    const targetID = props.targetID;
    const cateogries = ["hires", "departments", "users"];
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.onEditExit();
    }


    const handleAttributeInput = (event, key) => {
        let newRecord = {};
        const allKeys = Object.keys(response);
        Object.entries(response).forEach(([oldKey, oldValue]) => { 
            if (allKeys.includes(oldKey)) {newRecord[oldKey] = oldValue;}
        })        
        newRecord[key] = event.target.value;
        
        
        setResponse(newRecord);
        console.log(response);
    }

    async function generateSubmit(newData) {
        let apiUrl = import.meta.env.VITE_API_URL;
        apiUrl += "/" + cateogries[props.categorySelected] + "?_id=" + props.onEdit.row["id"];

        console.log(apiUrl);
        let completeData = await (await fetch(`http://${apiUrl}`)).text();
        let completeDataParsed = await JSON.parse(completeData);
        let record = {};

        Object.entries(completeDataParsed).forEach(([key, value]) => {
            record[key] = value;
        })

        Object.entries(newData).forEach(([key, value]) => {
            record[key] = value;
        })

        if (record["email"] != null || record["address"] != null) {
            record["contact"] = {email: record["email"], address: record["address"]}
        }

        Object.entries(record).forEach(([key, value]) => {
            if (value.length == 0 && key != "contact") {record[key] = null;}
        })
        
        console.log(record);
        record["_id"] = props.onEdit.row["id"];
        return record;
    }

    function generateFields() {
        // console.log(props.onEdit.row);
        let record = {};
        if (cateogries[props.categorySelected] == "hires") {
            record["department_id"] = null;
            record["title"] = props.onEdit.row["title"];
            record["salary"] = props.onEdit.row["salary"];
        }
        else if (cateogries[props.categorySelected] == "departments") {
            record["name"] = props.onEdit.row["name"];
        }
        else if (cateogries[props.categorySelected] == "users") {
            record["first_name"] = props.onEdit.row["first_name"];
            record["last_name"] = props.onEdit.row["last_name"];
            record["email"] = props.onEdit.row["email"];
            record["address"] = props.onEdit.row["address"];
        }

        let result = [];
        Object.entries(record).forEach(([key, value]) => {
            let enterValue = "";
            let row;
            if (value != null) {enterValue = value;}
            if (key == "salary") {
                row = <TextField label={key} defaultValue={enterValue} type="number" variant="outlined" name="attributeEditInput" onChange={ (event) => handleAttributeInput(event, key)}/>
            }
            else {
                row = <TextField label={key} defaultValue={enterValue} variant="outlined" name="attributeEditInput" onChange={ (event) => handleAttributeInput(event, key)}/>
            }
            result.push(row);
            })

        return result;
    }

    async function submitData() {
        let newRecord = await generateSubmit(response);
        console.log(newRecord);

        let apiUrl = import.meta.env.VITE_API_URL;
        apiUrl += "/" + cateogries[props.categorySelected];

        let result = await fetch(`http://${apiUrl}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecord)
        }).then();
        console.log(result);
        handleClose();
    }

    async function deleteData() {
        let apiUrl = import.meta.env.VITE_API_URL;
        apiUrl += "/" + cateogries[props.categorySelected] + "?_id=" + props.onEdit.row["id"];

        let result = await fetch(`http://${apiUrl}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then();
        console.log(result);
        handleClose();
    }

    if (props.onEdit != null && props.onEdit.row != null) {
        return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>EDIT</Button>
            <Dialog
                open={open}
                // fullScreen={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">{"Editing " + cateogries[props.categorySelected] + ": " + props.onEdit["id"]}</DialogTitle>
                <DialogContent>
                    <div>
                        {generateFields()}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={submitData}>Save</Button> 
                    <Button variant="contained" onClick={handleClose}>Cancel</Button> 
                    <Button variant="contained" onClick={deleteData}>Delete</Button> 
                </DialogActions>
            </Dialog>
        </div>
        )
    }else {
        return (<Button variant="text">*Click On a row to Enable Editing</Button>)
    }
    
}