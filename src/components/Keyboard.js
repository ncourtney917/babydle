import React, { useContext, useCallback, useEffect } from 'react';
import Key from "./Key"
import { AppContext } from '../pages/playgame';

function Keyboard() {
    const { onEnter, onDelete, onSelectLetter, disabledLetters, correctLetters, almostLetters, letterCount } = useContext(AppContext);

    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

    const handleKeyboard = useCallback((event) => {
        // if focus is on an input area, don't log keystrokes (for typing name for submitting score)
        if (
            event.target.tagName === "INPUT" || 
            event.target.isContentEditable
        ) {
            return;
        }

        if (event.key === "Enter") {
            onEnter(letterCount);
        } else if (event.key === "Backspace") {
            onDelete();
        } else {
            keys1.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key, letterCount);
                }
            });
            keys2.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key, letterCount);
                }
            });
            keys3.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key, letterCount);
                }
            });
        }
    });
    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard)

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);
    return (
        <div className="keyboard">
            <div className="keyboard-line">
                {keys1.map((key) => {
                    return <Key keyVal={key} disabled={disabledLetters.includes(key)} correct={correctLetters.includes(key)} almost ={almostLetters.includes(key)} />;
                })}
            </div>
            <div className="keyboard-line">
                {keys2.map((key) => {
                    return <Key keyVal={key} disabled={disabledLetters.includes(key)} correct={correctLetters.includes(key)} almost ={almostLetters.includes(key)} />;
                })}
                <Key keyVal={"DEL"} bigKey />
            </div>
            <div className="keyboard-line">
                {keys3.map((key) => {
                    return <Key keyVal={key} disabled={disabledLetters.includes(key)} correct={correctLetters.includes(key)} almost ={almostLetters.includes(key)} />;
                })}
                <Key keyVal={"ENTER"} bigKey />
            </div>
        </div>
    )
}

export default Keyboard