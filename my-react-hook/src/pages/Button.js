import React, { useState } from "react";

export default function Button() {
    const [buttonText, setButtonText] = useState("Click me, please");
    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={() => setButtonText("Thanks, been clicked!")}>
                {buttonText}
            </button>
            <button onClick={() => setCount(count + 1)}>
                Click {count} time(s).
            </button>
        </div>
    );
}