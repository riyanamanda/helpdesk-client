export function PageBackground() {
    return (
        <>
            <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, oklch(1 0 0 / 0.35) 1px, transparent 0)",
                    backgroundSize: "36px 36px",
                }}
            />
            <div className="pointer-events-none absolute inset-0 bg-radial from-transparent to-background" />
        </>
    );
}
