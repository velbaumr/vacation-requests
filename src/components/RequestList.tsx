import apiClient from "../services/apiCilent";
import vacationRequest from "../types/vacationRequest";

const RequestList = () => {
    const items = apiClient.get<vacationRequest>('vacation_request');
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
                items && items.map((item: vacationRequest) => (
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