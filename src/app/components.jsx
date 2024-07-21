
function ColoredButton({color}) {
    return <button aria-label={`${color}_pad`} id={`${color}_pad`} className={`pad_button ${color}`}></button>
}

function PowerToggleSwitch({power}) {
    const buttons = ["off", "on"].map(
        (button) => {
            const cssClass = power === button ? "selected_output power_button" : "power_button"
            return <button key={`${button}_button`} id={`{${button}_button`} aria-label={`power_${button}_button`} className={cssClass}></button>
        }
    );
    return <>
        <div className="power_switch">
            <p className="power_label">OFF</p>
            <div className="power_toggle">
                {buttons}
            </div>
            <p className="power_label">ON</p>
        </div>
    </>
}

export {ColoredButton, PowerToggleSwitch};