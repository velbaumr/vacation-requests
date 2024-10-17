import { useEffect, useState } from "react";
import apiClient from "../services/ApiCilent";
import vacationRequest from "../types/VacationRequest";

const RequestList = () => {
    const [vacationRequests, setVacationrecuests] = useState<Array<vacationRequest> | null>(null);
 
    useEffect(() => {
        const items = apiClient.get<vacationRequest>('vacation_request');
        setVacationrecuests(items);
    }, [])

    return(
    <table>
        <thead>
            <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>No of Requested Days</th>
                <th>Comment</th>
            </tr>
        </thead>
        <tbody>
            {
                vacationRequests && vacationRequests.map((item: vacationRequest) => (
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                ))
            }
        </tbody>
    </table>);
}

export default RequestList;