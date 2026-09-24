## Configure Sync Output

The **DO0** BNC on the LoadCells is a sync output that lets other equipment follow the recording: it can toggle once per second while acquisition is running, or emit a fixed-width pulse on command. Refer to the [connections](./connections.md?tabs=syncoutput#connections) article to connect **DO0** to an external device, which we will use for the rest of these examples. This article covers how to enable the heartbeat, pulse the sync output, and visualize the sync output events in Bonsai.

The complete workflow is shown below. Copy and paste it into Bonsai or build each section by following the step-by-step instructions below.

:::workflow
![Configure Sync Output](../workflows/configuresyncoutput-toplevel.bonsai)
:::

### Enable the Heartbeat

The [`DO0Sync`] register selects the behavior of **DO0**. With `Heartbeat`, the output toggles every second, but only while acquisition is running, so the heartbeat doubles as a hardware indication that data is being recorded. The example enables the heartbeat and starts acquisition with one key.

:::workflow
![Configure Sync Output Heartbeat](../workflows/configuresyncoutput-heartbeat.bonsai)
:::

- Insert a [`KeyDown`] operator and set the `Filter` property to `A`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `DO0Sync`.
    - `DO0Sync` - Select `Heartbeat`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `AcquisitionState`.
    - `AcquisitionState` - Select `Enabled`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

In a separate branch:

- Insert a [`KeyDown`] operator and set the `Filter` property to `S`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `DO0Sync`.
    - `DO0Sync` - Select `None`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

Run the workflow and press <kbd>A</kbd>. **DO0** changes level once per second for as long as acquisition runs. Press <kbd>S</kbd> to turn the heartbeat off.

### Pulse the Sync Output

With [`DO0Sync`] set to `Pulse`, every command that raises **DO0** produces a pulse whose duration in milliseconds is set by the [`DO0PulseWidth`] register, from 1 to 255 ms. The output is raised by writing `DO0` to the [`SyncOutputState`] register.

:::workflow
![Configure Sync Output Pulse](../workflows/configuresyncoutput-pulse.bonsai)
:::

- Insert a [`KeyDown`] operator and set the `Filter` property to `D`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `DO0Sync`.
    - `DO0Sync` - Select `Pulse`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `DO0PulseWidth`.
    - `DO0PulseWidth` - Set the pulse duration in milliseconds (e.g. 50).
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

In a separate branch:

- Insert a [`KeyDown`] operator and set the `Filter` property to `F`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `SyncOutputState`.
    - `SyncOutputState` - Select `DO0`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

Run the workflow, press <kbd>D</kbd> to configure pulse mode, then press <kbd>F</kbd>. **DO0** goes high for 50 ms and returns low on its own.

> [!TIP]
> With [`DO0Sync`] set to `None`, **DO0** is a plain digital output: writing `DO0` to [`SyncOutputState`] holds it high and writing `None` clears it.

> [!WARNING]
> **TODO**: `device.yml` lists [`SyncOutputState`] as an event-only register, but firmware 1.2 accepts writes to it and uses them to drive **DO0**. Verify the write on hardware. If confirmed, the register's access in `device.yml` should be updated to `[Write, Event]` so the interface documents it.

### Visualize Sync Output Events

The LoadCells broadcasts events occurring on the device using the [Harp communication protocol](https://harp-tech.org/protocol/BinaryProtocol-8bit.html). To visualize each heartbeat toggle and its time on the device clock, we can decode the [`HarpMessages`] coming from the device using the workflow below:

:::workflow
![Configure Sync Output Visualize Events](../workflows/configuresyncoutput-visualizeevents.bonsai)
:::

- Insert a [`SubscribeSubject`] operator named `LoadCells Events`. This will listen to [`HarpMessages`] broadcast from the [`PublishSubject`] named `LoadCells Events` in the Harp device pattern.
- Insert a [`FilterMessageType`] operator and set the `MessageType` property to `Event`. The pulse example writes the same register, and this filter drops the device's reply to that write so only the heartbeat toggles reach the visualizer.
- Insert a [`Parse`] operator and configure the `Register` property to `TimestampedSyncOutputState`.
- Insert a [`VisualizerWindow`] operator. This will automatically open a window displaying the parsed events when the workflow starts.

Run the workflow and press <kbd>A</kbd>. The visualizer will display one line per second:

```text
DO0@1052.000128
None@1053.000128
```

The first value is the `Payload`, `DO0` when the output went high and `None` when it went low, and the second number is the timestamp on the device clock. Pulses do not generate these events; only the heartbeat does. The `SyncOutput` flag of [`EnableEvents`] must be enabled, which is the power-up default.

[!INCLUDE [](version-footer.md)]

<!--Reference Style Links -->
[`DO0Sync`]: xref:Harp.LoadCells.DO0Sync
[`DO0PulseWidth`]: xref:Harp.LoadCells.DO0PulseWidth
[`SyncOutputState`]: xref:Harp.LoadCells.SyncOutputState
[`AcquisitionState`]: xref:Harp.LoadCells.AcquisitionState
[`EnableEvents`]: xref:Harp.LoadCells.EnableEvents
[`CreateMessage`]: xref:Harp.LoadCells.CreateMessage
[`Parse`]: xref:Harp.LoadCells.Parse
[`FilterMessageType`]: xref:Bonsai.Harp.FilterMessageType
[`HarpMessages`]: xref:Bonsai.Harp.HarpMessage
[`KeyDown`]: xref:Bonsai.Windows.Input.KeyDown
[`MulticastSubject`]: xref:Bonsai.Expressions.MulticastSubject
[`SubscribeSubject`]: xref:Bonsai.Expressions.SubscribeSubject
[`PublishSubject`]: xref:Bonsai.Reactive.PublishSubject
[`VisualizerWindow`]: xref:Bonsai.Design.VisualizerWindow
