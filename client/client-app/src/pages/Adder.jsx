import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, TextField } from "@mui/material";
import { useState } from "react";


export default function Adder(props) {
    const updateDefaultData = () => {
        props.updateDefaultData();
    }

    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState();
    const [searchTerms, setSearchTerms] = useState([]);

    async function postFetch() {
        let apiUrl = import.meta.env.VITE_API_URL;
        apiUrl += "/" + selectedCategory;

        console.log("Posting to: " + apiUrl);
        let result = await fetch(`http://${apiUrl}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchTerms)
        }).then();

        let response = await result.text();
        console.log(result + response);
        return;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setSearchTerms({});
        setOpen(false);
    };

    async function handleSubmit() {
        await postFetch();
        updateDefaultData();
        handleClose();
    }

    const handleCategorySelection = (event) => {
        setSearchTerms({});
        setSelectedCategory(event.target.dataset.value);
        // console.log(event.target.dataset.value);
    }

    const handleAttributeInput = (event, cateogry, key) => {
        let newCateogry = {};
        const allKeys = Object.keys(cateogry);
        Object.entries(searchTerms).forEach(([oldKey, oldValue]) => { 
            if (allKeys.includes(oldKey)) {newCateogry[oldKey] = oldValue;}
        })        
        if (key == "email" || key == "address") {
            let email = "";
            let address = "";
            if (searchTerms["contact"] != null) {
                if (searchTerms["contact"]["email"] != null) {email = searchTerms["contact"]["email"]};
                if (searchTerms["contact"]["address"] != null) {address = searchTerms["contact"]["address"]};
            };
            newCateogry["contact"] = {};
            newCateogry["contact"]["email"] = email;
            newCateogry["contact"]["address"] = address;
            newCateogry["contact"][key] = event.target.value;
        }
        else {newCateogry[key] = event.target.value;}
        
        
        setSearchTerms(newCateogry);
        console.log(searchTerms);
    }

    const categories = [
        <MenuItem key={"hires"} value={"hires"}>Hire</MenuItem>,        
        <MenuItem key={"departments"} value={"departments"}>Department</MenuItem>,
        <MenuItem key={"users"} value={"users"}>User</MenuItem>
        
    ]

    const userAttributes = {"first_name":'', "last_name":'', "email":'', "address":''};
    const departmentAttributes = {"name":''};
    const hireAttributes = {"user_id":'', "title":'', "department":'', "salary":null};

    let inputAttributes = () => {
        let result = []
        if (selectedCategory == "users") {

            Object.entries(userAttributes).forEach(([key, value]) => {
                let row = <TextField label={key} variant="outlined" name="attributeSearchInput" onChange={ (event) => handleAttributeInput(event, userAttributes, key)}/>
                result.push(row);
            })
        }
        else if (selectedCategory == "departments") {
            Object.entries(departmentAttributes).forEach(([key, value]) => {
                let row = <TextField label={key} variant="outlined" name="attributeSearchInput" onChange={ (event) => handleAttributeInput(event, departmentAttributes, key)}/>
                result.push(row);
            })
        }
        else if (selectedCategory == "hires")
            Object.entries(hireAttributes).forEach(([key, value]) => {
                let row = <TextField label={key} variant="outlined" name="attributeSearchInput" onChange={ (event) => handleAttributeInput(event, hireAttributes, key)}/>
                result.push(row);
            })

        // console.log(result);
        return result;
      
    }

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>Add</Button>
            <Dialog
                open={open}
                // fullScreen={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">Select from the categories below to create an new Item from</DialogTitle>
                <DialogContent>
                    <div>
                        <div>
                            <TextField
                            label="Select"
                            select
                            helperText="Please select a category"
                            onClickCapture={handleCategorySelection}
                            >
                            {categories}
                            </TextField>
                        </div>
                            {inputAttributes(selectedCategory)}
                        </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleSubmit}>Confirm</Button> 
                    <Button variant="contained" onClick={handleClose}>Cancel</Button> 
                </DialogActions>
                   
            </Dialog>
            
        </div>
    )
}