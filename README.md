## Boltzmann Machine Thermostat Simulation

In this simulation, we are modeling the concept of a Boltzmann Machine using thermostats that adjust the temperature to maintain an optimal balance. The thermostats communicate with each other and attempt to achieve a low-energy, stable state. Here’s a breakdown of how the Boltzmann Machine principles are represented through the thermostat simulation:

### Thermostat Principles

#### Thermostat States

Each thermostat node has two possible states:

- **Active**: When the thermostat is on and heating, represented visually by an orange color.
- **Passive**: When the thermostat is in standby, represented by a gray color.

An active state indicates the thermostat is heating its area, while a passive state means the thermostat is not consuming energy.

#### Energy and State Changes

- The thermostats are connected by virtual "links," which represent the influence each thermostat has on others. These links have weights that contribute to the overall energy in the system.
- The Boltzmann Machine tries to minimize energy across all nodes. Thermostats shift between active and passive states based on the state of neighboring thermostats. This balance allows the system to find a state where energy is minimized, which is the Boltzmann Machine’s goal.

#### Temperature Adjustments

- When a thermostat is active, its local temperature increases slightly, symbolizing the heating effect.
- If the thermostat is passive, the local temperature decreases slightly.
- Temperatures are capped between 18 and 26 degrees Celsius to mimic a realistic thermostat range.

#### Energy Calculation

- Energy in this simulation is a measure of the overall system's effort to stabilize. Each thermostat has a bias (a fixed tendency to prefer heating or cooling), and connections between thermostats have weights that represent the relationship between them.
- The system calculates energy based on the sum of these interactions. Thermostats update their states to minimize this energy, which represents how a Boltzmann Machine processes inputs.

#### Sigmoid Function and Probability

- For each thermostat, we calculate the probability of it turning on based on its bias and connections to other thermostats.
- This is done using a sigmoid function, a mathematical function that maps the weighted sum of connections to a probability between 0 and 1.
- The randomness of the system allows the thermostat to switch states with probabilities that reflect natural variations, helping it move towards a low-energy, balanced state.

### Summary

The simulation allows you to observe how a system of thermostats, connected like a Boltzmann Machine, can reach a stable, low-energy configuration by updating states based on interactions and minimizing energy consumption. This represents how neural networks, inspired by Boltzmann Machines, adapt to different inputs and find balance within a network.


## Run the Simulation

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
