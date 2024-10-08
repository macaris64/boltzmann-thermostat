'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Thermostat {
  name: string;
  x: number;
  y: number;
  active: boolean;
  bias: number;
  temperature: number;
}

const App: React.FC = () => {
  const [thermostats, setThermostats] = useState<Thermostat[]>([]);
  const [energy, setEnergy] = useState<number>(0);
  const [averageTemp, setAverageTemp] = useState<number>(22);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const weights: number[][] = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => Math.random() - 0.5)
  );

  useEffect(() => {
    const initialThermostats: Thermostat[] = [
      { name: "Thermostat A", x: 100, y: 100, active: Math.random() > 0.5, bias: Math.random() - 0.5, temperature: 22 },
      { name: "Thermostat B", x: 500, y: 100, active: Math.random() > 0.5, bias: Math.random() - 0.5, temperature: 22 },
      { name: "Thermostat C", x: 100, y: 500, active: Math.random() > 0.5, bias: Math.random() - 0.5, temperature: 22 },
      { name: "Thermostat D", x: 500, y: 500, active: Math.random() > 0.5, bias: Math.random() - 0.5, temperature: 22 },
      { name: "Thermostat E", x: 300, y: 100, active: Math.random() > 0.5, bias: Math.random() - 0.5, temperature: 22 },
      { name: "Thermostat F", x: 100, y: 300, active: Math.random() > 0.5, bias: Math.random() - 0.5, temperature: 22 },
      { name: "Thermostat G", x: 500, y: 300, active: Math.random() > 0.5, bias: Math.random() - 0.5, temperature: 22 },
      { name: "Thermostat H", x: 300, y: 500, active: Math.random() > 0.5, bias: Math.random() - 0.5, temperature: 22 }
    ];
    setThermostats(initialThermostats);
  }, []);

  const sigmoid = (x: number): number => 1 / (1 + Math.exp(-x));

  const updateThermostats = () => {
    setThermostats(prevThermostats =>
      prevThermostats.map((thermostat, i) => {
        let weightedSum = thermostat.bias;
        prevThermostats.forEach((otherThermostat, j) => {
          if (i !== j) {
            weightedSum += weights[i][j] * (otherThermostat.active ? 1 : 0);
          }
        });

        const probability = sigmoid(weightedSum);
        const newActive = Math.random() < probability;
        const newTemperature = newActive
          ? Math.min(thermostat.temperature + 0.5, 26)
          : Math.max(thermostat.temperature - 0.5, 18);

        return {
          ...thermostat,
          active: newActive,
          temperature: newTemperature
        };
      })
    );
  };

  const calculateEnergy = () => {
    let energyValue = 0;
    thermostats.forEach((thermostat_i, i) => {
      thermostats.forEach((thermostat_j, j) => {
        if (i !== j) {
          energyValue -= weights[i][j] * (thermostat_i.active ? 1 : 0) * (thermostat_j.active ? 1 : 0);
        }
      });
      energyValue -= thermostat_i.bias * (thermostat_i.active ? 1 : 0);
    });
    setEnergy(energyValue);
  };

  const calculateAverageTemperature = () => {
    const totalTemperature = thermostats.reduce((sum, thermostat) => sum + thermostat.temperature, 0);
    setAverageTemp(Number((totalTemperature / thermostats.length).toFixed(1)));
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < thermostats.length; i++) {
      for (let j = i + 1; j < thermostats.length; j++) {
        if (weights[i][j] !== 0) {
          const fromNode = thermostats[i];
          const toNode = thermostats[j];
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.strokeStyle = fromNode.active === toNode.active ? "green" : "red";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }

    thermostats.forEach(thermostat => {
      ctx.beginPath();
      ctx.arc(thermostat.x, thermostat.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = thermostat.active ? "#ffab40" : "#757575";
      ctx.fill();
      ctx.strokeStyle = "#e0e0e0";
      ctx.stroke();
      ctx.fillStyle = "#e0e0e0";
      ctx.fillText(thermostat.name, thermostat.x - 20, thermostat.y + 35);
    });

  };

  useEffect(() => {
    if (thermostats.length > 0) {
      const intervalId = setInterval(() => {
        updateThermostats();
        calculateEnergy();
        calculateAverageTemperature();
        drawCanvas();
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [thermostats]);

  return (
    <div className="App">
      <h1>Boltzmann Machine Thermostat Simulation</h1>
      <canvas ref={canvasRef} width="600" height="600" />
      <div id="infoPanel">
        <h3>Thermostat Status</h3>
        {thermostats.map((thermostat) => (
          <p key={thermostat.name}>
            {thermostat.name}: {thermostat.active ? "Active - Heating" : "Passive - Standby"},
            Temp: {thermostat.temperature.toFixed(1)}°C
          </p>
        ))}
        <h4>Current Energy Saving: {energy.toFixed(2)}</h4>
        <h4>Current Avg Temperature: {averageTemp} °C</h4>
      </div>
    </div>
  );
};

export default App;
