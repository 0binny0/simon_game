"use client";
import {useState, useEffect, useRef} from "react";

import {ColoredButton, GameDisplay, PowerToggleSwitch, NewGameButton} from "@/app/components.jsx";
import {games} from "./games.js";


export default function Simon() {
    const [activeColor, setActiveColor] = useState(null);
    const [power, setPower] = useState("off");
    const [level, setLevel] = useState("- -");
    const [game, setNewGame] = useState(null);
    let round;
    if (!isNaN(parseInt(level))) {
        round = game[level];
    }
    const demo_color_pattern = useRef(null);
    let i = useRef(0);

    useEffect(() => {

        if (power === "on" && /\d+/.test(level)) {
            demo_color_pattern.current = setInterval(() => {
                if (i.current > round.length) {
                    i.current = 0;
                    clearInterval(demo_color_pattern.current);
                } else {
                    setActiveColor(round[i.current]);
                    i.current++;
                }

            }, 750);
            return () => clearInterval(demo_color_pattern.current)
        }
    }, [game, level, round, activeColor, power]);


    function handle_new_game_button_press() {
        if (power === "on") {
            const status_signs = [" ", "- -", " ", "0"];
            let i = 0;
            const interval_id = setInterval(() => {
                setLevel(status_signs[i]);
                if (i === 3) {
                    setNewGame(games[Math.floor(Math.random() * games.length)]);
                    clearInterval(interval_id);
                } else {
                    i++
                }
            }, 600);
        }
    }

    const coloredPads = ['green', 'red', 'yellow', 'blue'].map(
        (color) => {
            return <ColoredButton aria-label={`${color}_pad`} key={color} color={activeColor === color ? `active_${color}` : color} />
        }
    );

    return <>
        <div className="interface_wrapper">
            <main className="game_interface">
                <div className="colored_pads">
                    {coloredPads}
                </div>
                <section className="game_controls">
                    <h1>Simon</h1>
                    <div className="game_control_wrapper">
                        <GameDisplay power={power} level={level} />
                        <NewGameButton start_game={handle_new_game_button_press}/>
                    </div>
                    <PowerToggleSwitch power={power} setPower={setPower} setLevel={setLevel}/>
                </section>
            </main>
        </div>
    </>
}
