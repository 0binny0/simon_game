
function ColoredButton({color}) {
    return <button aria-label={`${color}_pad`} id={`${color}_pad`} className={`pad_button ${color}`}></button>
}

function PowerToggleSwitch({power, setPower}) {

    function handle_pressing_toggle_switch(e) {
        if (e.currentTarget.id === "on_button" && power === "OFF") {
            setPower("ON")
        } else if (e.currentTarget.id === "off_button" && power === "ON") {
            setPower("OFF")
        }
    }

    const buttons = ["off", "on"].map(
        (button) => {
            const cssClass = power === button ? "selected_output power_button" : "power_button"
            return <button key={`${button}_button`} id={`${button}_button`} aria-label={`power_${button}_button`} className={cssClass} onClick={handle_pressing_toggle_switch}></button>
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
        <p className="display_box" id="game_display">
            <span className="display_info">{power === "ON" ? level : null}</span>
        </p>
    </>
}

function NewGameButton({start_game}) {
    return <button aria-label="start_new_game" className="new_game" id="new_game_button" onClick={start_game}></button>
}

export {ColoredButton, PowerToggleSwitch, GameDisplay, NewGameButton};