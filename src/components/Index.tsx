import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import RequestList from './RequestList';
import Page from './Page';

const Index = () => {
    return(
    <Page title="Vacation Requests">
    <RequestList />
    <Link to="/add">
        <Button>Add Request</Button>
    </Link>
    </Page>   
    );
}

export default Index;