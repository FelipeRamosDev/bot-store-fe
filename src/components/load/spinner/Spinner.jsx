'use client';
import './Spinner.scss';

export default function Spinner({ color }) {
    return (<>
        <div className="lds-ring" color={color}><div></div><div></div><div></div><div></div></div>
    </>);
}
