

export default async function RecordPanel(props) {
    let hire = props.data;

    let render = () => {
        setTimeout
    }
    let panel = async() => {
        setTimeout(() => {
            
        }, 10);
        let arr = [];
        for (let i = 0; i < hire.length; i++) {
            let first_name = hire["first_name"];
            let last_name = hire["last_name"];
            let title = hire["title"];
            let department = hire["department"];
            let cardObj = () => {
                <Card>
                    <CardHeader>{last_name + first_name}</CardHeader>
                    <Typography variant='h2'>{title}</Typography>
                    <Typography variant='h2'>{department}</Typography>
                </Card>
            }
            arr.push(cardObj)
        }
        return arr;
    }

    console.log(props.data);


    return (
        <div>
            {panel()}
        </div>
    )
}