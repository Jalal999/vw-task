import { useState, useEffect } from 'react';
import { Form, Button, Spinner, Card } from 'react-bootstrap';
import { getUserData, submitUserData } from '../../services/common';
import AlertMsg from '../AlertMsg';

type dataType = {
    firstname: string;
    lastname: string;
    email: string;
    car?: string;
    purchasedate?: string;
}

const UserForm = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<dataType>({
        firstname: "",
        lastname: "",
        email: "",
        car: "",
        purchasedate: "",
    });
    const [msgType, setMsgType] = useState("");
    const [alertMsg, setAlertMsg] = useState("");

    const carOptions = ["Golf", "Tiguan", "Arteon"];

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await getUserData() as dataType;
            setUserData({ ...fetchedData });
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const res = await submitUserData(userData);
        if (res.error) {
            setMsgType("danger")
            setAlertMsg(res.error)
        } else if (res.request.status === 200) {
            setMsgType("success")
            setAlertMsg("User data has been successfully submitted...")
        }
    };

    return (
        <Card style={{ margin: "40px", padding: "30px" }}>
            {(msgType !== "") ?
                <AlertMsg msgType={msgType} msgText={alertMsg} />
                : null
            }
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) :
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={userData.firstname}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    firstname: e.target.value,
                                })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            defaultValue={userData.lastname}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    lastname: e.target.value,
                                })
                            } />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            defaultValue={userData.email}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    email: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Car</Form.Label>
                        <Form.Select
                            defaultValue={userData.car}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    car: e.target.value,
                                })
                            }>
                            {carOptions.map((car) => (
                                <option value={car} key={car}>
                                    {car}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Purchased Date</Form.Label>
                        <Form.Control
                            type="date"
                            min="2018-01-01"
                            defaultValue={userData.purchasedate}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    purchasedate: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ width: '100%' }}>
                        Submit
                    </Button>
                </Form>
            }
        </Card>
    )
}

export default UserForm;