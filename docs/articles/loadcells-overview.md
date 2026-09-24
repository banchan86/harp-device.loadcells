## LoadCells

The LoadCells is a Harp interface board that acquires force measurements from up to eight load cells through two [Load Cells Reader](peripherals/peripherals-loadcellsreader.md) boards, at 1 kHz per channel, and exposes threshold-triggered digital outputs for closed-loop control.

[placeholder - loadcells-overview-pcb.png]{width=450}

> [!NOTE]
> The photo in the repository shows the Load Cells Reader, not the interface board. You can find it on the [Load Cells Reader](peripherals/peripherals-loadcellsreader.md) page.

### Key Features

- Reads up to two Load Cells Readers, for 8 simultaneously sampled load cell channels at 1 kHz.
- Per-channel offset compensation, applied in hardware on the Reader.
- 8 digital outputs that can each follow a load cell threshold with configurable hold times, at 3.3 V or 5 V logic.
- Digital input to start and stop acquisition from external hardware, plus a heartbeat or pulse sync output.

### Specs

- Load cell channels: 8 (2 Load Cells Readers × 4 channels)
- Sampling rate: 1 kHz, all channels sampled simultaneously
- Sample format: 16-bit signed integer per channel
- Offset compensation range: −255 to 255 steps per channel
- Digital outputs: 8 (**DO1**–**DO8**), 3.3 V or 5 V logic, selectable with the output voltage selector jumper
- Sync output: 1 (**DO0**, BNC), heartbeat or pulse mode with 1–255 ms pulse width
- Digital input: 1 (**DI0**, BNC and screw terminal)
- Threshold detection: one comparator per digital output, 1 ms resolution, 0–65535 ms hold time above and below threshold
- Power: 12 V barrel jack
- Communication: USB (Mini-B)
- Timestamp resolution: 32 µs
- Synchronization frequency: 1 Hz
- Synchronization accuracy: 22 ± 16 µs (between clock generator and this device)

> [!WARNING]
> **TODO**: Add the load cell input range and sensitivity (front-end gain of the Load Cells Reader), the physical unit of one offset step, and the maximum current of the digital outputs. None of these are recorded in the repository.

### Hardware

| Version | Notes |
| ------- | ----- |
| 1.1 | <ul><li> Current PCB version in the repository, released as `pcb1.1`. Firmware builds tagged `hw1.1` target it. </li></ul> |
| 1.0 | <ul><li> Earliest version with published firmware builds (`hw1.0` assets on every firmware release). Its design files are not in the repository. </li></ul> |

> [!WARNING]
> **TODO**: Describe what changed between hardware 1.0 and 1.1. Only the 1.1 design files are in the repository, and the firmware treats both versions identically.

### Firmware

| Version | Notes |
| ------- | ----- |
| 1.2 | <ul><li> Corrected DOs shift in firmware at the threshold definition </li><li> Add threshold inversion feature </li><li> Updated to atxmega core 1.15 </li><li> Include device metadata file as embedded resource </li></ul> |
| 1.1 | <ul><li> Update core start and firmware </li></ul> |
| 1.0 | <ul><li> Add initial schema and automatic interface generation </li><li> Update interface to use new generators </li><li> Raise harp core to 1.13 </li></ul> |

[!INCLUDE [](version-footer.md)]
