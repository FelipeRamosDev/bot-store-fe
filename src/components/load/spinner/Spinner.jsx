'use client';
import './Spinner.scss';

export default function Spinner({ color, message, ...props }) {
    return (
        <div className="spinner-block" {...props}>
            <div className="spinner-item">
                <div className="lds-ring" color={color}><div></div><div></div><div></div><div></div></div>
            </div>

            <p className="spinner-item message">{message}</p>
        </div>
    );
}
