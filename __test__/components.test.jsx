
import {test} from '@jest/globals';

import {ColoredButton} from "../src/app/components.jsx";

import {render, screen} from "@testing-library/react";

test.each([['red'], ['blue'], ['green'], ['yellow']])(
    'Verify that the %s button has an id and class to identify its color', (color) => {
        render(<ColoredButton color={color} />);
        const button = screen.getByRole("button", {name: `${color}_pad`});
        expect(button).toHaveClass(`${color}_pad_color`);
        expect(button).toHaveAttribute("id", `${color}_pad`);
    }
);