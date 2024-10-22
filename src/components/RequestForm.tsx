import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { calculateRequestedDays, calculateStartDate, calculateEndDate } from "../functions/FormCalculations";

const RequestForm = () => {
    const navigate = useNavigate();
    const [startDateValue, setStartDateValue] = useState<string | undefined>();
    const [requestedDaysValue, setRequestedDaysValue] = useState<number | undefined>();
    const [endDateValue, setEndDateValue] = useState<string | undefined>();


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const stringToDate = (dateString?: string): Date | undefined =>
        dateString ? new Date(dateString) : undefined;

    const dateToString = (date: Date): string => 
        date.toISOString().split('T')[0];

    return(
    <form onSubmit={onSubmit} className="col-md-4  offset-md-4">
    <Form.Group>
        <Form.Label  htmlFor="startDate">Start Date</Form.Label>
        <Form.Control type="date"
                      className="form-control"
                      id="startDate"
                      value = {startDateValue || ''}
                      onChange={(e) => {
                        const newStartDateValue = e.target.value;
                        setStartDateValue(newStartDateValue);

                        if (endDateValue && newStartDateValue) {
                            const days = calculateRequestedDays(stringToDate(newStartDateValue), stringToDate(endDateValue));
                            setRequestedDaysValue(days);
                        }
                        if (requestedDaysValue && newStartDateValue) {
                            setEndDateValue(dateToString(calculateEndDate(new Date(newStartDateValue), requestedDaysValue)));
                        }
                      }}/>
    </Form.Group>
    <Form.Group>
        <Form.Label  htmlFor="requestedDays">Number of Requested Vacation Days</Form.Label>
        <Form.Control type="number"
                      className="form-control"
                      id="requestedDays"
                      value = {requestedDaysValue || 0}
                      onChange={(e) => {
                        const newRequestedDaysValue = Number(e.target.value);
                        setRequestedDaysValue(newRequestedDaysValue);

                        if (startDateValue) {
                            setEndDateValue(dateToString(calculateEndDate(new Date(startDateValue), newRequestedDaysValue)));
                        }
                      }}/>
    </Form.Group>
    <Form.Group>
        <Form.Label  htmlFor="endDate">End Date</Form.Label>
        <Form.Control type="date" 
                      className="form-control"
                      id="endDate"
                      value = {endDateValue || ''}
                      onChange={(e) => {
                        const newEndDateValue = e.target.value;
                        setEndDateValue(newEndDateValue);

                        if (startDateValue && newEndDateValue) {
                            const days = calculateRequestedDays(stringToDate(startDateValue), stringToDate(newEndDateValue))
                            setRequestedDaysValue(days);
                        }
                        if (requestedDaysValue && !startDateValue && newEndDateValue) {
                            setStartDateValue(dateToString(calculateStartDate(new Date(newEndDateValue), requestedDaysValue)))
                        }
                      }} />
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label  htmlFor="comment">Comment</Form.Label>
        <Form.Control as="textarea" rows={3} id="comment"/>
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