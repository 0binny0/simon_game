
import {test, advanceTimersByTime} from '@jest/globals';

import {ColoredButton, PowerToggleSwitch} from "../src/app/components.jsx";
import Simon from "../src/app/page.js"

import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';

test.each([['red'], ['blue'], ['green'], ['yellow']])(
    'Verify that the %s button has an id and class to identify its color', (color) => {
        render(<ColoredButton color={color} />);
        const button = screen.getByRole("button", {name: `${color}_pad`});
        expect(button).toHaveClass(`${color}`);
        expect(button).toHaveAttribute("id", `${color}_pad`);
    }
);

test.each(['off', 'on'])(
    "Verify that a toggle switch can be switched to the %s position", (power) => {
            const user = userEvent.setup();
            render(<PowerToggleSwitch power={power} />);
            const activePowerSwitch = screen.getByRole("button", {name: `power_${power}_button`});
            expect(activePowerSwitch).toHaveClass("selected_output");
            const inactivePowerSwitch = (
                power === "off" ?
                    screen.getByRole("button", {name: `power_on_button`}) :
                    screen.getByRole("button", {name: `power_off_button`})
            );
            expect(inactivePowerSwitch).not.toHaveClass("selected_output");
    }
);

// test(
//     'Verify that toggling the power button to "ON" displays a sign to indicate the game is on',
//     async () => {
//         const user = userEvent.setup({advanceTimers: advanceTimersByTime, delay: 500})
//         render(<Simon />);
//         const power_on_button = screen.getByRole("button", {name: "turn_game_on"});
//         await user.click(power_on_button);
//         const game_display_info = screen.getByText("- -");
//         expect(game_display_info).toBeInTheDocument();
//     }
// );