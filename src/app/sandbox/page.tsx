import React from "react";
import ScrabbleTile from "~/components/ui/scrabble-tile";

export default function SandboxPage() {
  return (
    <main className="container mt-2 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Tiles</h1>

      <div className="flex gap-2">
        <ScrabbleTile letter="A" />
        <ScrabbleTile letter="B" size={3} theme="classic" />
        <ScrabbleTile
          letter="C"
          size={2}
          borderColor="aqua"
          backgroundColor="papayawhip"
          textColor="purple"
        />
        <ScrabbleTile letter="D" size={2.5} theme="solarizedDark" />
        <ScrabbleTile letter="E" size={2.5} theme="solarizedLight" />
        <ScrabbleTile letter="F" size={5} theme="gruvbox" />
      </div>
    </main>
  );
}
