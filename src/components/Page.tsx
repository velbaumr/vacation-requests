import { useEffect } from "react";

const Page = (props: {title: string, children: React.ReactNode | React.ReactNode[]}) => {
    useEffect(() => {
        document.title = props.title
     }, [props.title]);
     
    return(
        <div className='container'>
            <h1>{props.title}</h1>
            <div>
                {props.children}
            </div>
        </div>);
}

export default Page;