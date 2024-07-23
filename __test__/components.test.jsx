
import {test, advanceTimersByTime, beforeEach, jest} from '@jest/globals';

import {ColoredButton, PowerToggleSwitch, GameDisplay} from "../src/app/components.jsx";
import Simon from "../src/app/page.js"

import {render, screen, within, findByText} from "@testing-library/react";
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

test("Verify that <GameDisplay /> displays a neutral sign to indicate the machine is on", () => {
    const user = userEvent.setup();
    render(<GameDisplay power="ON" level="- -" />);
    const game_display_screen = screen.getByText("- -");
    expect(game_display_screen).toBeVisible();
});

