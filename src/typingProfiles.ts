export interface TypingProfile {
    name: string;
    minSpeed: number;
    maxSpeed: number;
    mistakeRate: number;  // Probability of making a typo (0-1)
    correctionDelay: number;  // How long to wait before correcting mistakes (ms)
    pauseChars: string[];  // Characters to pause on
    pauseMultiplier: number;  // How much longer to pause on pauseChars
    doubleKeyProbability: number;  // Probability of double-typing a character
}

export const typingProfiles: { [key: string]: TypingProfile } = {
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
}
