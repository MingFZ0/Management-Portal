/**
 * 
 * @param {Json encoded string} data : String with Name:Value Json for the fields for the new document
 */
async function addItem(data, menuType)
{
    let url = 'http://localhost:5005/' +'?type='+menuType;
    let result = await fetch(url, {method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Content type
          },
        body: data
    });
}

