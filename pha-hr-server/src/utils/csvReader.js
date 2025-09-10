import * as fs from 'fs';
import * as readline from 'readline';

export async function readCSV(file)
{
    var labels = [];
    var data = [];
    const fileStream = fs.createReadStream(file);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity // Recognize all line breaks
    });
    var i = 0;
    for await (const line of rl) 
    {
        //console.log(`Line from file: ${line}`);
        if (i == 0)
        {
            labels = line.split(",");
            for (var i = 0; i < labels.length; i++)
            {
                labels[i] = labels[i].trim();
            }
        }
        else
        {
            let items = line.split(",");
            let dataLine = {};
            
            for (var col = 0; col < labels.length; col++)
            {
                let value = items[col];
                value = value.trim();//Clean up extra whitespace
                if (!isNaN(value))
                    value = Number(value)
                dataLine[labels[col]] = value;//Creates object entry name:value (dataLine[the_label]=the_value)
            }
            // console.log(dataLine)
            data.push(dataLine);
        }
        i++;
    }
    // console.log(Object.keys(data[0]));
    // console.log(data);
    fileStream.close();
    return data;
}