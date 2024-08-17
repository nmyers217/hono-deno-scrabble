import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import ScrabbleTile from "~/components/ui/scrabble-tile";

export default function SandboxPage() {
  return (
    <main className="container mt-12 flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Tiles</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
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
        </CardContent>
      </Card>

      <div className="flex flex-row justify-between gap-4">
        <Card className="w-6/12">
          <CardHeader>
            <CardTitle>Tray</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrabbleTray letters={["A", "B"]} />
          </CardContent>
        </Card>

        <Card className="w-6/12">
          <CardHeader>
            <CardTitle>Board</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </main>
  );
}

export function ScrabbleTray(props: { letters?: string[] }) {
  return (
    <div className="flex w-full flex-row justify-center gap-2 rounded-lg border-2 p-2">
      {props.letters?.map((letter, index) => (
        <ScrabbleTile key={index} letter={letter} theme="gruvbox" />
      ))}
    </div>
  );
}
