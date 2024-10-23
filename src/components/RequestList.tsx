import { useEffect, useState } from "react";
import apiClient from "../services/ApiCilent";
import vacationRequest from "../types/VacationRequest";

const RequestList = () => {
    const [vacationRequests, setVacationRequests] = useState<vacationRequest[] | null>(null);
 
    useEffect(() => {
        const items = apiClient.get<vacationRequest[]>('vacation_requests');
        setVacationRequests(items);
    }, []);

    return(
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Requested vacation days</th>
                <th>Comment</th>
            </tr>
        </thead>
        <tbody>
            {
                vacationRequests && vacationRequests.map((item: vacationRequest, index) => (
                    <tr key={index}>
                        <td>{new Date(item.startDate).toLocaleDateString()}</td>
                        <td>{new Date(item.endDate).toLocaleDateString()}</td>
                        <td>{item.requestedDays}</td>
                        <td>{item.comment}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>);
}

export default RequestList;