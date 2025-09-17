import {getCollections} from '../../src/api.js';
import {closeClient} from '../../src/utils/swen343_db_utils.js';
import 'dotenv/config'; //This is what loads the ENV variables

test('Get a list of the collections', async ()=> 
{
    let result =  await getCollections();
    console.log(result)
    closeClient();
}, 10000)
