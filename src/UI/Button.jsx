export default function Button({label,onClick, textOnly,className,...props}){
    let cssClasses = textOnly ?'text-button':'button';
    cssClasses+=" "+ className

    return (<button className={cssClasses} onClick={onClick} {...props}>{label}</button>)
}