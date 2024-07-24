"use client";
import {useState} from "react";

import {ColoredButton, GameDisplay, PowerToggleSwitch, NewGameButton} from "@/app/components.jsx";

export default function Simon() {
    const [activeColor, setActiveColor] = useState(null);
    const [power, setPower] = useState("OFF");
    const [level, setLevel] = useState("- -");


    function handle_new_game_button_press() {
        const status_signs = [" ", "- -", " ", "1"];
        let i = 0;
        const interval_id = setInterval(() => {
            setLevel(status_signs[i++])
        }, 500);
        if (i === 3) {
            clearInterval(interval_id);
        }
    }

    const coloredPads = ['red', 'yellow', 'green', 'blue'].map(
        (color) => {
            return <ColoredButton key={color} color={activeColor === color ? `active_${color}` : {color}} />
        }
    );
    return <main className="game_interface">
        <div className="colored_pads">
            {coloredPads}
        </div>
        <section className="game_controls">
            <h1>Simon</h1>
            <GameDisplay power={power} level={level} />
            <NewGameButton start_game={handle_new_game_button_press}/>
            <PowerToggleSwitch power={power} setPower={setPower}/>
        </section>
    </main>
}
