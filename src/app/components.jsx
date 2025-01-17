
function ColoredButton({color, timer_ref, guess}) {
    return <button aria-label={`${color}_pad`} id={`${color}_pad`} className={`pad_button ${color}`} onClick={guess}></button>
}

function PowerToggleSwitch({power, setPower, setLevel}) {

    function handle_pressing_toggle_switch(e) {
        console.log
        if (e.currentTarget.id === "on_button" && power === "off") {
            setPower("on");
        } else if (e.currentTarget.id === "off_button" && power === "on") {
            setPower("off");
            setLevel("- -");
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
        <div className="count_wrapper">
            <p className="display_box" id="game_display">
                <span className="display_info">{power === "on" ? !isNaN(parseInt(level)) ? parseInt(level) + 1 : level: null}</span>
            </p>
            <p className="button_label">Count</p>
        </div>
    </>
}

function NewGameButton({start_game}) {
    return <>
        <div className="start_wrapper">
            <button aria-label="start_new_game" className="new_game" id="new_game_button" onClick={start_game}></button>
            <p className="button_label">Start</p>
        </div>
    </>
}

export {ColoredButton, PowerToggleSwitch, GameDisplay, NewGameButton};