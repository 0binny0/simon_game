"use client";
import {useState, useEffect, useRef} from "react";

import {ColoredButton, GameDisplay, PowerToggleSwitch, NewGameButton} from "@/app/components.jsx";

import {games} from "../../public/games.js";


export default function Simon() {
    const [activeColor, setActiveColor] = useState(null);
    const [power, setPower] = useState("off");
    const [level, setLevel] = useState("- -");
    const [game, setNewGame] = useState(null);
    let round;
    let colors_remaining;
    if (game && !isNaN(parseInt(level))) {
        round = game[level];
        colors_remaining = JSON.parse(JSON.stringify(round));
    }
    const demo_color_pattern = useRef(null);
    let color_button_increment_ref = useRef(0);
    let screen_display_increment_ref = useRef(0);
    let timer = useRef(null);
    let countdown_timer = useRef(null);
    let userClickTimerExpired = useRef(false);
    const buttons_ref = useRef(null);


    useEffect(() => {
        function timer_countdown() {
            console.log("timer countdown...starting")
            let i = 0;
            countdown_timer.current = setInterval(() => {
                if (!userClickTimerExpired.current) {
                    console.log(i);
                    ++i;
                    if (i === 5) {
                        clearInterval(countdown_timer.current);
                        userClickTimerExpired.current = true;
                        console.log("Timer expired...");
                        display_screen_info([" ", "! !", " ", "! !", " ", "0"]);
                    }
                } else {
                    console.log("Something is broken")
                    clearInterval(countdown_timer.current);
                    setLevel(" ");
                }
            }, 1000);
        }
        if (power === "on") {
            if (/\d+/.test(level)) {
                demo_color_pattern.current = setInterval(() => {
                    if (color_button_increment_ref.current > round.length) {
                        color_button_increment_ref.current = 0;
                        clearInterval(demo_color_pattern.current);
                        console.log("End color demo...");
                        timer_countdown();
                    } else {
                        setActiveColor(round[color_button_increment_ref.current]);
                        color_button_increment_ref.current++;
                    }
                }, 750);
            }
            return () => clearInterval(demo_color_pattern.current);
        }
    }, [level, round, power]);

    function display_screen_info(signs) {
        if (power === "on") {
            [...buttons_ref.current.children].forEach(button => {
                button.setAttribute("disabled", true);
            });
            // clearInterval(timer.current);
            const status_signs = signs;
            timer.current = setInterval(() => {
                if (screen_display_increment_ref.current >= status_signs.length - 1) {
                    clearInterval(timer.current);
                    setLevel(status_signs[screen_display_increment_ref.current]);
                    // userClickTimerExpired.current = false;
                    color_button_increment_ref.current = 0;
                    screen_display_increment_ref.current = 0;
                    [...buttons_ref.current.children].forEach(button => {
                        button.setAttribute("disabled", false);
                    });
                    if (userClickTimerExpired.current === true) {
                        userClickTimerExpired.current = false;
                        setLevel("0");
                    } else {
                        userClickTimerExpired.current = false;
                        setNewGame(games[Math.floor(Math.random() * games.length)]);
                    }
                } else {
                    setLevel(status_signs[screen_display_increment_ref.current]);
                    screen_display_increment_ref.current++
                }
            }, 600);
        }
    }

    function handle_new_game(signs) {
        setActiveColor(null);
        clearInterval(countdown_timer.current);
        clearInterval(timer.current);
        clearInterval(demo_color_pattern.current);
        display_screen_info(signs);
    }

    const coloredPads = ['green', 'red', 'yellow', 'blue'].map(
        (color) => {
            return <ColoredButton timer_ref={userClickTimerExpired} aria-label={`${color}_pad`} key={color}
                                  color={activeColor === color ? `active_${color}` : color}/>
        }
    );

    return <>
        <div className="interface_wrapper">
            <main className="game_interface">
                <div ref={buttons_ref} id="Hi" className="colored_pads">
                    {coloredPads}
                </div>
                <section className="game_controls">
                    <h1>Simon</h1>
                    <div className="game_control_wrapper">
                        <GameDisplay power={power} level={level}/>
                        <NewGameButton start_game={() => handle_new_game([" ", "-  -", " ", "0"])}/>
                    </div>
                    <PowerToggleSwitch power={power} setPower={setPower} setLevel={setLevel}/>
                </section>
            </main>
        </div>
    </>
}