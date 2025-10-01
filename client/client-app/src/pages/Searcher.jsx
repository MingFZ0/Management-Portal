import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, TextField } from "@mui/material";
import { useState } from "react";


export default function Searcher(props) {
    const updateRowdata = (data, selectedCategory) => {
        props.updateRowdata(data, selectedCategory);
    }
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState();
    const [searchTerms, setSearchTerms] = useState([]);

    async function getFetch() {
        let apiUrl = import.meta.env.VITE_API_URL;
        apiUrl += "/" + selectedCategory + "?";

        Object.entries(searchTerms).forEach(([key, value]) => { 
            apiUrl += key + "=" + value + "&"
        }) 

        let result = await (await fetch(`http://${apiUrl}`)).text();
        let data = JSON.parse(result);

        data.forEach(row => {
            row["id"] = row["_id"];
        });
        console.log(data);
        return data;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setSearchTerms({});
        setOpen(false);
    };

    async function handleSubmit() {
        let data = await getFetch();
        
        updateRowdata(data, selectedCategory);
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
        newCateogry[key] = event.target.value;
        
        
        setSearchTerms(newCateogry);
        console.log(searchTerms);
    }

    const categories = [
        <MenuItem key={"hires"} value={"hires"}>Hire</MenuItem>,        
        <MenuItem key={"departments"} value={"departments"}>Department</MenuItem>,
        <MenuItem key={"users"} value={"users"}>User</MenuItem>
        
    ]

    const userAttributes = {"id":'', "first_name":'', "last_name":'', "email":'', "address":''};
    const departmentAttributes = {"id":'', "name":''};
    const hireAttributes = {"id":'', "user_id":'', "title":'', "department":'', "salary":null};

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
            <Button variant="contained" onClick={handleClickOpen}>Search</Button>
            <Dialog
                open={open}
                // fullScreen={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">Select from the categories below to create a search</DialogTitle>
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