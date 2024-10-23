import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { calculateRequestedDays, calculateStartDate, calculateEndDate } from "../functions/FormCalculations";
import vacationRequest from "../types/VacationRequest";
import apiClient from "../services/ApiCilent";

const RequestForm = () => {
    const navigate = useNavigate();
    const [startDateValue, setStartDateValue] = useState<string>('');
    const [requestedDaysValue, setRequestedDaysValue] = useState<number>(0);
    const [endDateValue, setEndDateValue] = useState<string>('');
    const [commentValue, setCommentValue] = useState<string | undefined>()


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result: vacationRequest = {
            startDate: new Date(startDateValue),
            endDate: new Date(endDateValue),
            requestedDays: requestedDaysValue,
            comment: commentValue || ''
        };

        apiClient.post<vacationRequest>('vacation_requests', result);
        navigate('/');
    }


    const stringToDate = (dateString?: string): Date | undefined =>
        dateString ? new Date(dateString) : undefined;

    const dateToString = (date: Date): string => 
        date.toISOString().split('T')[0];

    return(
    <form onSubmit={onSubmit} className="col-md-4  offset-md-4">
    <Form.Group  className="mb-3">
        <Form.Label  htmlFor="startDate">Start Date</Form.Label>
        <Form.Control type="date"
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
        <Form.Control.Feedback type="invalid">

        </Form.Control.Feedback>
    </Form.Group>
    <Form.Group  className="mb-3">
        <Form.Label  htmlFor="requestedDays">Number of Requested Vacation Days</Form.Label>
        <Form.Control type="number"
                      id="requestedDays"
                      value = {requestedDaysValue}
                      onChange={(e) => {
                        const newRequestedDaysValue = Number(e.target.value);
                        setRequestedDaysValue(newRequestedDaysValue);

                        if (startDateValue) {
                            setEndDateValue(dateToString(calculateEndDate(new Date(startDateValue), newRequestedDaysValue)));
                        }
                        if (endDateValue && !startDateValue) {
                            setStartDateValue(dateToString(calculateStartDate(new Date(endDateValue), newRequestedDaysValue)))
                        }
                      }}/>
    <Form.Control.Feedback type="invalid">

    </Form.Control.Feedback>
    </Form.Group>
    <Form.Group  className="mb-3">
        <Form.Label  htmlFor="endDate">End Date</Form.Label>
        <Form.Control type="date" 
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
    <Form.Control.Feedback type="invalid">

    </Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label  htmlFor="comment">Comment</Form.Label>
        <Form.Control as="textarea"
                      rows={3}
                      id="comment"
                      onChange={(e) => setCommentValue(e.target.value)}/>
    <Form.Control.Feedback type="invalid">

    </Form.Control.Feedback>
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