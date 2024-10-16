import { useEffect } from "react";

const Page = (props: {title: string, children: React.ReactNode | React.ReactNode[]}) => {
    useEffect(() => {
        document.title = props.title
     }, [props.title]);

    return(
        <div className='container'>
            <h3>{props.title}</h3>
            <div>
                {props.children}
            </div>
        </div>);
}

export default Page;