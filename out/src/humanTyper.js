"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pause = pause;
exports.setProfile = setProfile;
exports.type = type;
const vscode_1 = require("vscode");
const typingProfiles_1 = require("./typingProfiles");
let paused = false;
let currentProfile = typingProfiles_1.typingProfiles.perfect;
let isTyping = false;
function pause() {
    if (paused && resumeCall) {
        resumeCall();
        resumeCall = undefined;
    }
    paused = !paused;
}
let resumeCall;
function setProfile(profileName) {
    if (profileName in typingProfiles_1.typingProfiles) {
        currentProfile = typingProfiles_1.typingProfiles[profileName];
        vscode_1.window.showInformationMessage(`Typing profile set to: ${currentProfile.name}`);
    }
    else {
        vscode_1.window.showErrorMessage(`Profile "${profileName}" not found!`);
    }
}
function type(textToInsert, minSpeed, maxSpeed) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isTyping)
            return; // Prevent multiple typing sessions
        var editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        isTyping = true;
        try {
            // Use provided speeds or fall back to profile speeds
            const actualMinSpeed = minSpeed || currentProfile.minSpeed;
            const actualMaxSpeed = maxSpeed || currentProfile.maxSpeed;
            yield typeText(textToInsert, editor, editor.selection.end, actualMinSpeed, actualMaxSpeed);
        }
        finally {
            isTyping = false;
        }
    });
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function wait(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
function typeChar(editor, char, pos) {
    return __awaiter(this, void 0, void 0, function* () {
        yield editor.edit(editBuilder => {
            editBuilder.insert(pos, char);
        });
        return new vscode_1.Position(pos.line, pos.character + char.length);
    });
}
function typeText(text, editor, startPos, minSpeed, maxSpeed) {
    return __awaiter(this, void 0, void 0, function* () {
        let pos = startPos;
        for (let i = 0; i < text.length; i++) {
            if (paused) {
                resumeCall = () => __awaiter(this, void 0, void 0, function* () {
                    yield typeText(text.slice(i), editor, pos, minSpeed, maxSpeed);
                });
                return;
            }
            const char = text[i];
            // Handle newlines
            if (char === '\n') {
                pos = new vscode_1.Position(pos.line + 1, 0);
            }
            // Type the character
            pos = yield typeChar(editor, char, pos);
            editor.selection = new vscode_1.Selection(pos, pos);
            // Calculate delay before next character
            let delay = getRandomArbitrary(minSpeed, maxSpeed);
            if (currentProfile.pauseChars.includes(char)) {
                delay += maxSpeed * currentProfile.pauseMultiplier;
            }
            // Wait before typing next character
            yield wait(delay);
        }
    });
}
//# sourceMappingURL=humanTyper.js.map