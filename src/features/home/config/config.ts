const hidden = { x: 0, scale: 0.5, rotate: 0, z: -1, opacity: 0 };

export const stackConfigs = {
    // < 480px — 3 cards: indices 2, 3, 4
    xs: [
        hidden,
        hidden,
        { x: -95, scale: 0.88, rotate: -5, z: 2, opacity: 1 },
        { x: 0, scale: 1.0, rotate: 0, z: 30, opacity: 1 },
        { x: 95, scale: 0.88, rotate: 5, z: 3, opacity: 1 },
        hidden,
        hidden,
        hidden,
    ],
    // 480–767px — 5 cards: indices 1–5
    sm: [
        hidden,
        { x: -175, scale: 0.82, rotate: -8, z: 1, opacity: 1 },
        { x: -95, scale: 0.91, rotate: -4, z: 2, opacity: 1 },
        { x: 0, scale: 1.0, rotate: 0, z: 30, opacity: 1 },
        { x: 100, scale: 0.91, rotate: 4, z: 3, opacity: 1 },
        { x: 188, scale: 0.82, rotate: 8, z: 2, opacity: 1 },
        hidden,
        hidden,
    ],
    // 768–1023px — 7 cards: indices 0–6
    md: [
        { x: -285, scale: 0.8, rotate: -10, z: 1, opacity: 1 },
        { x: -192, scale: 0.87, rotate: -7, z: 2, opacity: 1 },
        { x: -98, scale: 0.93, rotate: -3, z: 3, opacity: 1 },
        { x: 0, scale: 1.0, rotate: 0, z: 30, opacity: 1 },
        { x: 100, scale: 0.93, rotate: 3, z: 4, opacity: 1 },
        { x: 192, scale: 0.87, rotate: 7, z: 3, opacity: 1 },
        { x: 280, scale: 0.82, rotate: 10, z: 2, opacity: 1 },
        hidden,
    ],
    // ≥ 1024px — all 8 cards
    lg: [
        { x: -360, scale: 0.8, rotate: -11, z: 1, opacity: 1 },
        { x: -240, scale: 0.87, rotate: -7, z: 2, opacity: 1 },
        { x: -120, scale: 0.93, rotate: -3, z: 3, opacity: 1 },
        { x: 0, scale: 1.0, rotate: 0, z: 30, opacity: 1 },
        { x: 120, scale: 0.93, rotate: 3, z: 4, opacity: 1 },
        { x: 240, scale: 0.87, rotate: 7, z: 3, opacity: 1 },
        { x: 355, scale: 0.82, rotate: 10, z: 2, opacity: 1 },
        { x: 465, scale: 0.77, rotate: 13, z: 1, opacity: 1 },
    ],
};
