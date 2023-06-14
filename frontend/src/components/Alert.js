export default function Alert(props) {
    const { alert } = props;
    return (
        <>
            {alert && <div className={`p-4 ${alert.status === 'success' ? 'bg-green-300' : 'bg-red-300'} flex items-center`}>
                <strong
                    className={"${props==='success'?'text-green-900':'text-red-900'}"}>{alert.status === 'success' ? 'Success' : 'Error'}!</strong>
                <p className={"ml-3"}>{alert.message}</p>
            </div>}
        </>
    )
}