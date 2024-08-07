"use client";
import {useState, useEffect, useRef} from "react";

import {ColoredButton, GameDisplay, PowerToggleSwitch, NewGameButton} from "@/app/components.jsx";

import {games} from "../../public/games.js";

function set_new_game() {
    let x = Math.floor(Math.random() & games.length);
    return games[x]
}


export default function Simon() {
    const [activeColor, setActiveColor] = useState(null);
    const [power, setPower] = useState("off");
    const [level, setLevel] = useState("- -");
    const [game, setNewGame] = useState(null);
    let round;
    let colors_remaining = useRef(null);
    if (game && !isNaN(parseInt(level))) {
        round = game[level];
        // round = ['red', null, 'blue', null, 'blue'];
        colors_remaining.current = JSON.parse(JSON.stringify(round)).filter((element) => element != null);
    }
    const demo_color_pattern = useRef(null);
    let color_index = useRef(0);
    let color_button_increment_ref = useRef(0);
    let screen_display_increment_ref = useRef(0);
    let timer = useRef(null);
    let countdown_timer = useRef(null);
    let userClickTimerExpired = useRef(false);
    const buttons_ref = useRef(null);
    let countdown_interval = useRef(null);

    useEffect(() => {
        async function timer_countdown() {
            // run timer for 5 seconds after the color demo
            countdown_interval.current = 0;
            countdown_timer.current = setInterval(() => {
                // console.log(`The timer is : ${countdown_interval.current}`)
                if (!userClickTimerExpired.current) {
                    ++countdown_interval.current;
                    if (countdown_interval.current === 5) {
                        clearInterval(countdown_timer.current);
                        userClickTimerExpired.current = true;
                        display_screen_info([" ", "! !", " ", "! !", " ", "0"]);
                    }
                } else {
                    clearInterval(countdown_timer.current);
                    setLevel(" ");
                }
            }, 1000);
        }
        if (power === "on") {
            [...buttons_ref.current.children].forEach(button => button.setAttribute("disabled", true));
            if (/\d+/.test(level)) {
                //demo the pattern to match to the user
                demo_color_pattern.current = setInterval(() => {
                    if (color_button_increment_ref.current > round.length) {
                        color_button_increment_ref.current = 0;
                        clearInterval(demo_color_pattern.current);
                        // console.log("End color demo...");
                        [...buttons_ref.current.children].forEach(button => button.removeAttribute("disabled"));
                        timer_countdown();
                    } else {
                        // console.log(`Show color: ${round[color_button_increment_ref.current]}`)
                        setActiveColor(round[color_button_increment_ref.current]);
                        color_button_increment_ref.current++;
                    }
                }, 650);val
            }
            return () => clearInterval(demo_color_pattern.current);
        }
    }, [level, round, power]);

    function validate_user_guess(e) {
        if (/\d+/.test(level)) {
            // console.log(`Colors remaining at the time of clicking the button: ${colors_remaining.current}`)
            if (power === "on" && /\d+/.test(level)) {
                // console.log(`Making a guess...the current guesses remaining are: ${colors_remaining.current}`)
                const pad = e.currentTarget.id.indexOf("_");
                const color = e.currentTarget.id.substring(0, pad)
                const colors = [color, null];
                let i = 0;
                // console.log("Changing the color")
                setActiveColor(color);
                setTimeout(() => {
                    console.log("Removing the color")
                    setActiveColor(null);
                }, 100);
                countdown_interval.current = 0
                // console.log("Chaning color coming up...")
                console.log(`The ${e.currentTarget.id} was clicked`);
                if (!e.currentTarget.id.startsWith(colors_remaining.current[color_index.current])) {
                    console.log("Wrong guess made..");
                    userClickTimerExpired.current = true;
                    console.log("Reset the game...");
                    color_index.current = 0;
                    display_screen_info([" ", "! !", " ", "! !", " ", "0"]);
                } else {
                    console.log("Color matched...");
                    color_index.current++;
                    colors_remaining.current = colors_remaining.current.slice(color_index.current);
                    console.log(`Colors remaining after removing the first element: ${colors_remaining.current}`)
                    if (colors_remaining.current.length === 0) {
                        // console.log("Move to next level")
                        clearInterval(countdown_timer.current);
                        color_index.current = 0;
                        setLevel(level => `${parseInt(level) + 1}`);
                    }
                }
                setActiveColor(color);
                // console.log("Still waiting on color change...")
            }
        }
    }

    function display_screen_info(signs) {
        // setActiveColor(null);
        if (power === "on") {
            [...buttons_ref.current.children].forEach(button => {
                button.setAttribute("disabled", true);
            });
            clearInterval(timer.current);
            const status_signs = signs;
            timer.current = setInterval(() => {
                if (screen_display_increment_ref.current >= status_signs.length - 1) {
                    clearInterval(timer.current);
                    setLevel(status_signs[screen_display_increment_ref.current]);
                    // userClickTimerExpired.current = false;
                    color_button_increment_ref.current = 0;
                    screen_display_increment_ref.current = 0;
                    [...buttons_ref.current.children].forEach(button => {
                        button.removeAttribute("disabled");
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
                                  color={activeColor === color ? `active_${color}` : color} guess={validate_user_guess}/>
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