
function ColoredButton({color, activeColor}) {
    const cssClass = (
        color === activeColor ?
            `button active_${color}_pad_color` :
            `button ${color}_pad_color`
    );
    return <button aria-label={`${color}_pad`} id={`${color}_pad`} className={cssClass}></button>
}

export {ColoredButton};