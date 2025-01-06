import {window, workspace, Position, Selection, TextEditor} from 'vscode';
import { TypingProfile, typingProfiles } from './typingProfiles';

let paused = false;
let currentProfile: TypingProfile = typingProfiles.perfect;
let isTyping = false;

export function pause() {
    if (paused && resumeCall) {
        resumeCall();
        resumeCall = undefined;
    }
    paused = !paused;
}

let resumeCall;

export function setProfile(profileName: string) {
    if (profileName in typingProfiles) {
        currentProfile = typingProfiles[profileName];
        window.showInformationMessage(`Typing profile set to: ${currentProfile.name}`);
    } else {
        window.showErrorMessage(`Profile "${profileName}" not found!`);
    }
}

export async function type(textToInsert: string, minSpeed?: number, maxSpeed?: number) {
    if (isTyping) return; // Prevent multiple typing sessions

    var editor = window.activeTextEditor;
    if (!editor) {
        return; // No open text editor
    }

    isTyping = true;
    try {
        // Use provided speeds or fall back to profile speeds
        const actualMinSpeed = minSpeed || currentProfile.minSpeed;
        const actualMaxSpeed = maxSpeed || currentProfile.maxSpeed;

        await typeText(textToInsert, editor, editor.selection.end, actualMinSpeed, actualMaxSpeed);
    } finally {
        isTyping = false;
    }
}

function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

async function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeChar(editor: TextEditor, char: string, pos: Position): Promise<Position> {
    await editor.edit(editBuilder => {
        editBuilder.insert(pos, char);
    });
    return new Position(pos.line, pos.character + char.length);
}

async function typeText(text: string, editor: TextEditor, startPos: Position, minSpeed: number, maxSpeed: number) {
    let pos = startPos;
    
    for (let i = 0; i < text.length; i++) {
        if (paused) {
            resumeCall = async () => {
                await typeText(text.slice(i), editor, pos, minSpeed, maxSpeed);
            };
            return;
        }

        const char = text[i];
        
        // Handle newlines
        if (char === '\n') {
            pos = new Position(pos.line + 1, 0);
        }

        // Type the character
        pos = await typeChar(editor, char, pos);
        editor.selection = new Selection(pos, pos);

        // Calculate delay before next character
        let delay = getRandomArbitrary(minSpeed, maxSpeed);
        if (currentProfile.pauseChars.includes(char)) {
            delay += maxSpeed * currentProfile.pauseMultiplier;
        }
        
        // Wait before typing next character
        await wait(delay);
    }
}