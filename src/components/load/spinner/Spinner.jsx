'use client';
import './Spinner.scss';

/**
 * Spinner component displays a loading spinner with an optional message.
 *
 * This component is used to show a loading state with a spinner animation. 
 * It can optionally display a message below the spinner. The spinner's color
 * can be customized via the `color` prop.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.color] - The color of the spinner. This should be a valid CSS color value.
 * @param {string} [props.message] - Optional message to display below the spinner.
 *
 * @example
 * return (
 *   <Spinner color="tertiary" message="Loading, please wait..." />
 * );
 *
 * @returns {JSX.Element} A div containing a spinner and an optional message.
 */
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
