
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

function GameDisplay({power, level}) {
    return <>
        <p className="display_box">
            <span className="display_info">{power === "ON" ? level : null}</span>
        </p>
    </>
}

function NewGameButton({start_new_game}) {
    return <button aria-label="start_new_game" className="new_game" id="new_game_button" onClick={start_new_game}></button>
}

export {ColoredButton, PowerToggleSwitch, GameDisplay};