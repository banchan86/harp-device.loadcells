## Overview

The Harp [LoadCells](articles/loadcells-overview.md) is a force acquisition interface for behavioral neuroscience rigs. It reads up to eight load cell sensors at 1 kHz with hardware timestamps and turns force thresholds into digital events without software in the loop.

[placeholder - loadcells-with-peripherals.svg]{width=600}

Load cells output a small differential voltage that has to be amplified, offset-compensated, and timed precisely before it becomes usable behavioral data. The LoadCells splits this work across two boards. One or two [Load Cells Reader](articles/peripherals/peripherals-loadcellsreader.md) boards sit next to the sensors, amplifying and digitizing four load cells each. The LoadCells interface board collects their samples over a cable, timestamps them on the Harp clock, streams them to the computer, and can raise its digital outputs the moment a load cell crosses a configurable threshold.

The LoadCells provides:

- Simultaneous acquisition from up to 8 load cells (two Load Cells Readers with 4 channels each) at 1 kHz.
- Per-channel offset compensation to zero the resting load of each sensor.
- 8 digital outputs that you can drive from Bonsai or trigger automatically from load cell thresholds.
- A digital input to start and stop acquisition from external hardware, and a sync output to align other equipment.
- Hardware timestamping and synchronization with other [Harp](https://harp-tech.org/articles/about.html) devices.
- [Bonsai](https://bonsai-rx.org/) integration for flexible experiment acquisition and control.

## Getting a Device

Assembled units are available from the [Open Ephys store](https://open-ephys.org/harp), or build your own using the hardware design files in the [LoadCells](https://github.com/harp-tech/device.loadcells) repository.

> [!WARNING]
> **TODO**: Confirm whether the LoadCells and the Load Cells Reader are stocked by the Open Ephys store, and adjust this section if they are only available as design files.

## Acknowledgments

Hardware design and GUI contributed by [Champalimaud Foundation](https://www.cf-hw.org/), Bonsai interface by [NeuroGEARS](https://neurogears.org/), testing and feedback by [Allen Institute for Neural Dynamics](https://www.allenneuraldynamics.org/), and documentation by [Open Ephys](https://open-ephys.org/).

[!INCLUDE [](./articles/version-footer.md)]
