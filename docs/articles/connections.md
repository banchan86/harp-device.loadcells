## Ports and Connections

This article will cover the ports and status indicator on the LoadCells, as well as how to connect the device to the Load Cells Reader and to external equipment.

### Ports

[placeholder - loadcells-devicepinout.svg]{width=600}

**12V (Barrel Jack)** - Powers the LoadCells and the connected Load Cells Readers from a 12 V supply through a 2.1 mm barrel jack. The silkscreen next to the jack reads `12V Only!`, so do not use any other supply voltage.

> [!WARNING]
> **TODO**: Confirm the barrel jack polarity and the minimum supply current with two Load Cells Readers connected.

**USB (Mini-B)** - This port connects the device to the computer running [Bonsai](harp-bonsai.md).

**Port 0, Port 1 (RJ45)** - Each port connects one [Load Cells Reader](peripherals/peripherals-loadcellsreader.md) with a straight-through Ethernet patch cable. The ports carry an SPI bus, 5 V, and ground rather than Ethernet, so never connect them to a network. **Port 0** supplies channels 0 to 3 and **Port 1** channels 4 to 7 of the load cell data. Refer to the [Acquire Data](acquire-data.md) article to read them.

> [!WARNING]
> **TODO**: Confirm the silkscreen labels of the two RJ45 ports. The schematic names both connectors `Port 0`; the firmware maps the connector nearest the board edge (`J1`) to channels 0 to 3.

**DI0 (BNC)** - Digital input. It either reports its logic level as events or starts and stops acquisition on a rising or falling edge. The same input is available on the **DI0** position of the screw terminal. Refer to the [Trigger Acquisition](trigger-acquisition.md) article.

**DO0 (BNC)** - Sync output. It can toggle once per second while acquisition is running, or emit a fixed-width pulse on command, to align other equipment with the load cell data. Refer to the [Configure Sync Output](configure-sync-output.md) article.

**GND, DO1–DO8, DI0 (Screw Terminal)** - Eight digital outputs, a ground return, and a second connection to the digital input. Each output can be driven from Bonsai or raised automatically when a load cell crosses a threshold. Refer to the [Control Digital Outputs](control-digital-outputs.md) and [Detect Thresholds](detect-thresholds.md) articles.

**+5V, GND (Screw Terminal)** - A 5 V supply output for external circuitry.

> [!WARNING]
> **TODO**: Confirm the current available from the **+5V** terminal.

**CLKIN (Stereo Jack)** - Harp clock synchronization input. Connect it to a Harp clock generator such as the [Harp Timestamp Generator](https://github.com/harp-tech/device.timestampgeneratorgen3) to align the device clock with the rest of the rig.

**Output voltage selector (Jumper)** - Selects the logic level of **DO0** to **DO8**: `3V` (3.3 V) or `5V`. Move the jumper with the device powered off.

**PDI (Header)** - Programming header for firmware development. It is not needed for normal use, since firmware updates go through USB.

### Indicator Lights

**STATE** - The LED cycles on and off with a period of:

- 2 seconds when it's communicating with Bonsai
- 4 seconds when in standby
- 100 milliseconds when a catastrophic error occurs

> [!WARNING]
> **TODO**: Confirm the observed **STATE** LED blink patterns on the device. The **TX** and **RX** LED footprints are not populated on hardware 1.1.

### Connections

# [Load Cells Reader](#tab/loadcellsreader)

[placeholder - connection-loadcellsreader.svg]{width=450}

1. Connect each load cell to one of the four connectors on the Reader (**I1** to **I4**), matching the silkscreen: excitation positive to **5V**, signal positive to **I+**, signal negative to **I-**, and excitation negative to **0V**.
2. Connect the Reader's RJ45 to **Port 0** or **Port 1** on the LoadCells with a straight-through Ethernet patch cable. **I1** to **I4** on a Reader in **Port 0** become `Channel0` to `Channel3`, and on a Reader in **Port 1** they become `Channel4` to `Channel7`.
3. The LoadCells detects a Reader as soon as it is connected and re-applies the channel offsets about 250 ms later. The channels of a port without a Reader read 0.
4. Refer to the [Acquire Data](acquire-data.md) article to read the load cells in Bonsai, and to [Calibrate Offsets](calibrate-offsets.md) to zero them.

> [!WARNING]
> **TODO**: Confirm the wiring colors or pin mapping of the load cell sensors validated with the Reader, and whether the Reader can be connected while the LoadCells is powered.

# [Digital Input](#tab/digitalinput)

[placeholder - connection-digitalinput.svg]{width=450}

1. Connect the signal to the **DI0** BNC, or to the **DI0** position of the screw terminal with its return on **GND**. The input is pulled up and buffered at 3.3 V logic.
2. Refer to the [Trigger Acquisition](trigger-acquisition.md) article to read the input or use it to start and stop acquisition in Bonsai.

> [!WARNING]
> **TODO**: Confirm the maximum input voltage the **DI0** buffer tolerates before documenting 5 V sources as compatible.

# [Sync Output](#tab/syncoutput)

[placeholder - connection-syncoutput.svg]{width=450}

1. Connect the **DO0** BNC to the trigger or sync input of the external device. The output swings between 0 V and the level set by the output voltage selector jumper.
2. Refer to the [Configure Sync Output](configure-sync-output.md) article to configure the heartbeat or pulse in Bonsai.

# [Digital Outputs](#tab/digitaloutputs)

[placeholder - connection-digitaloutputs.svg]{width=450}

1. Connect the external device input to one of the **DO1** to **DO8** positions of the screw terminal, and its ground to **GND**.
2. Set the output voltage selector jumper to match the logic level the external device expects (`3V` or `5V`). The outputs are logic-level line drivers intended for high-impedance inputs.
3. Refer to the [Control Digital Outputs](control-digital-outputs.md) article to drive the outputs from Bonsai, or to [Detect Thresholds](detect-thresholds.md) to drive them from load cell thresholds.

> [!WARNING]
> **TODO**: Confirm the maximum current each digital output can source or sink.

# [Harp Synchronization](#tab/harpsynchronization)

[placeholder - connection-harpsynchronization.svg]{width=450}

1. Connect a clock output of a Harp clock generator (e.g. the [Harp Timestamp Generator](https://github.com/harp-tech/device.timestampgeneratorgen3)) to the **CLKIN** jack with a stereo jack cable.
2. The LoadCells adopts the generator's clock automatically. To verify the connection, check that the **STATE** LEDs of the connected boards blink simultaneously.
3. Refer to the [Harp synchronization clock](https://harp-tech.org/protocol/SynchronizationClock.html) documentation for how devices synchronize.

---

[!INCLUDE [](version-footer.md)]
