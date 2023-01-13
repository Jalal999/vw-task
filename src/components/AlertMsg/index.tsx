import Alert from 'react-bootstrap/Alert';

type AlertMsgPropTypes = {
    msgType: string,
    msgText: string
}

const AlertMsg = ({ msgType, msgText }: AlertMsgPropTypes) => {
    return (
        <Alert variant={msgType}>
            {msgText}
        </Alert>
    )
}

export default AlertMsg;