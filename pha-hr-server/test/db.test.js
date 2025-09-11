import {getCollections} from '../src/api';
import { closeClient } from '../src/utils/swen343_db_utils';
import 'dotenv/config'; //This is what loads the ENV variables

test('Get a list of the collections', async ()=> 
{
    let result =  await getCollections();
    console.log(result)
    closeClient();
}, 10000) //Adjust the timeout to 10,000 ms for safety