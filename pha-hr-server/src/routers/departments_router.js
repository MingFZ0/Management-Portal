import express, { json } from 'express';
import { addToCollection, getCollectionCount } from '../api';

var departments_router = express.Router();

departments_router.post('/',
    async function(req, response) {
        console.log("Post to departments:", req.body);
        let result = await addToCollection(req.body, "departments");
        return response.send(result);
    }
)

departments_router.get('/count',
    async function(req, response) {
        console.log("Get Count From " + "departments");
        let result = await getCollectionCount("departments");
        console.log(result);
        return response.send({count: result});
    }
)

departments_router.get('/',
    async function(req, response) {
        
    }
)
export default departments_router;