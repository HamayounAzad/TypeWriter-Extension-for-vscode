# Typewriter for VS Code - Human like typing for GIFs and live demos

![Demo gif of setting and playback](https://raw.githubusercontent.com/dan-silver/typewriter-for-vscode/master/assets/demo.gif)

## Features
- Natural typing simulation with configurable speeds
- Multiple typing profiles (Perfect, Slow, Fast, Natural)
- Pause and resume functionality
- Customizable typing speeds

## Available Commands

| Command | Command ID | Description |
|---------|------------|-------------|
| Set Text | `typewriter.setTypewriter` | Set text from current selection |
| Play | `typewriter.playback` | Start typing playback |
| Pause/Resume | `typewriter.pause` | Pause or resume typing |
| Select Profile | `typewriter.setProfile` | Choose typing profile |

## Setting Custom Keyboard Shortcuts

You can set your own keyboard shortcuts for any command:

1. Open Command Palette (`Ctrl/Cmd+Shift+P`)
2. Type "Preferences: Open Keyboard Shortcuts"
3. Search for "typewriter"
4. Click the plus icon next to any command to add your preferred shortcut

Example keybindings.json entries:
```json
{
    "key": "ctrl+shift+t",
    "command": "typewriter.setTypewriter",
    "when": "editorTextFocus"
},
{
    "key": "ctrl+shift+p",
    "command": "typewriter.playback",
    "when": "editorTextFocus"
}
```

## Typing Profiles
- **Perfect**: Balanced speed (30-120ms)
- **Slow**: Slower typing (100-200ms)
- **Fast**: Quick typing (20-80ms)
- **Natural**: Variable speed (40-160ms)

## Extension Settings

* `typewriter.TypingMinSpeed`: Lower limit on how fast to type in ms - randomized between this and max
* `typewriter.TypingMaxSpeed`: Upper limit on how fast to type in ms - randomized between min and this

## Using Typewriter

1. Select text you want to type
2. Use the Command Palette or your custom shortcut to set the text
3. (Optional) Select a typing profile
4. Start typing with the Play command
5. Use Pause/Resume as needed

## Release Notes

## [1.0.0] - 2025-01-06

### Added
- First release of Typewriter extension
- Realistic human-like typing simulation
- Multiple typing profiles with different speeds:
  - Perfect: Clean typing with no mistakes
  - Slow: Relaxed typing pace
  - Fast: Quick and efficient typing
  - Natural: Balanced typing speed
- Essential typing commands:
  - Set text from selection
  - Start/stop typing playback
  - Pause and resume typing
  - Switch between typing profiles
- Configurable typing speeds through settings
- User-customizable keyboard shortcuts

### Changed
- Improved typing simulation for more realistic behavior
- Optimized typing mechanism for better performance

### Fixed
- Command prefix issues in VS Code command palette
- Typing behavior inconsistencies
