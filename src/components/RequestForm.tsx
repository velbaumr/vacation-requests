import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RequestForm = () => {
    const navigate = useNavigate();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    return(
    <form onSubmit={onSubmit} className="col-md-4  offset-md-4">
    <div className="form-group">
        <Form.Label>Start Date</Form.Label>
        <Form.Control type="date" className="form-control" required/>
    </div>
    <div className="form-group">
        <Form.Label>Number of Requested Vacation Days</Form.Label>
        <Form.Control type="number" className="form-control" required />
    </div>
    <div className="form-group">
        <Form.Label>End Date</Form.Label>
        <Form.Control type="date" className="form-control" required />
    </div>
    <Form.Group className="mb-3">
        <Form.Label>Comment</Form.Label>
        <Form.Control as="textarea" rows={3} />
    </Form.Group>
    <Button type="submit"
        variant="primary"
        className="button-primary  mt-2 ms-2">Add Request</Button>
    <Button onClick={() => navigate('/')}
        variant="secondary"
        className="button-primary  mt-2 ms-2">Cancel</Button>
    </form>);
}

export default RequestForm;