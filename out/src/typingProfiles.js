"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typingProfiles = void 0;
exports.typingProfiles = {
    perfect: {
        name: "Perfect",
        minSpeed: 30,
        maxSpeed: 120,
        mistakeRate: 0,
        correctionDelay: 0,
        pauseChars: [",", ".", "!"],
        pauseMultiplier: 1.5,
        doubleKeyProbability: 0
    },
    slow: {
        name: "Slow",
        minSpeed: 100,
        maxSpeed: 200,
        mistakeRate: 0,
        correctionDelay: 0,
        pauseChars: [",", ".", "!", " "],
        pauseMultiplier: 2,
        doubleKeyProbability: 0
    },
    fast: {
        name: "Fast",
        minSpeed: 20,
        maxSpeed: 80,
        mistakeRate: 0,
        correctionDelay: 0,
        pauseChars: [",", ".", "!"],
        pauseMultiplier: 1.2,
        doubleKeyProbability: 0
    },
    natural: {
        name: "Natural",
        minSpeed: 40,
        maxSpeed: 160,
        mistakeRate: 0,
        correctionDelay: 0,
        pauseChars: [",", ".", "!", " ", "\n"],
        pauseMultiplier: 1.8,
        doubleKeyProbability: 0
    }
};
//# sourceMappingURL=typingProfiles.js.map