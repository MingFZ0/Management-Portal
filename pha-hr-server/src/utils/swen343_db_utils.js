import { MongoClient } from 'mongodb'
import 'dotenv/config';

const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.URL}/${process.env.DBNAME}`

const client = new MongoClient(url) //Single client instance

/**
 * connect(): is a helper function that is responsible for allowing users to be able
 * connect to their existing MongoDB database.
 * @returns database object
 */
async function connect()  {
    //const url = "mongodb://swen343:password@127.0.0.1:27017/swen343db"

    const database = client.db(process.env.DBNAME);

    return database;
}

function closeClient() { client.close(); }


export {connect, closeClient};