import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import RequestList from './RequestList';
import Page from './Page';

const Index = () => {
    const navigate = useNavigate();
    return(
    <Page title="Vacation Requests">
    <RequestList />
    <Button onClick={() => navigate('/add')}>Add Request</Button>
    </Page>   
    );
}

export default Index;