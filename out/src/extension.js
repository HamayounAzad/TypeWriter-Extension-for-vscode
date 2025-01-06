'use strict';
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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const humanTyper_1 = require("./humanTyper");
const typingProfiles_1 = require("./typingProfiles");
let typewriterBuffer;
function activate(context) {
    let playTypewriterCmd = vscode.commands.registerCommand('typewriter.playback', () => {
        let minSpeed = vscode.workspace.getConfiguration('typewriter').get('TypingMinSpeed') | 30;
        let maxSpeed = vscode.workspace.getConfiguration('typewriter').get('TypingMaxSpeed') | 120;
        (0, humanTyper_1.type)(typewriterBuffer, minSpeed, maxSpeed);
    });
    let setTypewriterCmd = vscode.commands.registerCommand('typewriter.setTypewriter', () => {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        var selection = editor.selection;
        typewriterBuffer = editor.document.getText(selection);
    });
    let pausePlaybackCmd = vscode.commands.registerCommand('typewriter.pause', () => {
        (0, humanTyper_1.pause)();
    });
    let setProfileCmd = vscode.commands.registerCommand('typewriter.setProfile', () => __awaiter(this, void 0, void 0, function* () {
        const profiles = Object.keys(typingProfiles_1.typingProfiles);
        const selected = yield vscode.window.showQuickPick(profiles, {
            placeHolder: 'Select a typing profile'
        });
        if (selected) {
            (0, humanTyper_1.setProfile)(selected);
        }
    }));
    context.subscriptions.push(playTypewriterCmd);
    context.subscriptions.push(setTypewriterCmd);
    context.subscriptions.push(pausePlaybackCmd);
    context.subscriptions.push(setProfileCmd);
}
// this method is called when your extension is deactivated
function deactivate() {
}
//# sourceMappingURL=extension.js.map