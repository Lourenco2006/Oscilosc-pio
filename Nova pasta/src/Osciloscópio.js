import { useState } from "react";
import { LineChart, Line } from "recharts";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectItem } from "@/components/ui/select";

export default function Oscilloscope() {
  const [waveType, setWaveType] = useState("sine");
  const [frequency, setFrequency] = useState(5);
  const [amplitude, setAmplitude] = useState(1);
  const [sampleRate, setSampleRate] = useState(100);
  const [quantization, setQuantization] = useState(256);
  const [timeScale, setTimeScale] = useState(1);
  const [ampScale, setAmpScale] = useState(1);

  const samples = 1000;
  
  const generateWave = (t) => {
    switch (waveType) {
      case "square":
        return amplitude * (Math.sin(2 * Math.PI * frequency * t) >= 0 ? 1 : -1);
      case "triangle":
        return (2 * amplitude / Math.PI) * Math.asin(Math.sin(2 * Math.PI * frequency * t));
      case "sawtooth":
        return (2 * amplitude / Math.PI) * Math.atan(Math.tan(Math.PI * frequency * t));
      default:
        return amplitude * Math.sin(2 * Math.PI * frequency * t);
    }
  };

  const data = Array.from({ length: samples }, (_, i) => {
    const t = (i / sampleRate) * timeScale;
    const rawValue = generateWave(t);
    const quantizedValue = Math.round((rawValue + 1) * (quantization / 2)) / (quantization / 2) - 1;
    return { x: t, y: quantizedValue * ampScale };
  });

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <LineChart width={600} height={300} data={data}>
          <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
        </LineChart>

        <div className="grid grid-cols-2 gap-4">
          <Select label="Forma de Onda" value={waveType} onChange={setWaveType}>
            <SelectItem value="sine">Senoidal</SelectItem>
            <SelectItem value="square">Quadrada</SelectItem>
            <SelectItem value="triangle">Triangular</SelectItem>
            <SelectItem value="sawtooth">Dente de Serra</SelectItem>
          </Select>
          <Slider
            label="Frequência (Hz)"
            min={1}
            max={50}
            value={frequency}
            onChange={setFrequency}
          />
          <Slider
            label="Amplitude"
            min={0.1}
            max={2}
            step={0.1}
            value={amplitude}
            onChange={setAmplitude}
          />
          <Slider
            label="Frequência de amostragem"
            min={50}
            max={500}
            value={sampleRate}
            onChange={setSampleRate}
          />
          <Slider
            label="Quantização"
            min={4}
            max={1024}
            step={4}
            value={quantization}
            onChange={setQuantization}
          />
          <Slider
            label="Escala de tempo"
            min={0.5}
            max={2}
            step={0.1}
            value={timeScale}
            onChange={setTimeScale}
          />
          <Slider
            label="Escala de amplitude"
            min={0.5}
            max={2}
            step={0.1}
            value={ampScale}
            onChange={setAmpScale}
          />
        </div>
      </CardContent>
    </Card>
  );
}