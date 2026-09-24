## Acquire Data

The LoadCells samples all eight load cell channels at the same instant, 1000 times per second, whenever acquisition is running, and broadcasts every sample as an event stamped with the device clock. Refer to the [connections](./connections.md?tabs=loadcellsreader#connections) article to set up a Load Cells Reader on **Port 0**, which we will use for the rest of these examples. This article covers how to start and stop acquisition, enable the device events, visualize the load cell events, and plot a single channel in Bonsai.

The complete workflow is shown below. Copy and paste it into Bonsai or build each section by following the step-by-step instructions below.

:::workflow
![Acquire Data](../workflows/acquiredata-toplevel.bonsai)
:::

> [!WARNING]
> You can find and add these operators to the workflow from the Bonsai [Toolbox](https://bonsai-rx.org/docs/articles/editor.html?tabs=mouse-controls#toolbox). Make sure to use the device-specific versions, e.g. `Device (Harp.LoadCells)` instead of `Device (Harp)`. If correctly selected, the names of these operators in the workflow panel will change to reflect either the name of the device or the selected register/payload.

### Start and Stop Acquisition

The [`AcquisitionState`] register starts and stops sampling. Acquisition is stopped when the device powers up, so no load cell data is broadcast until you enable it.

:::workflow
![Acquire Data Start Acquisition](../workflows/acquiredata-startacquisition.bonsai)
:::

- Insert a [`KeyDown`] operator and set the `Filter` property to `A`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `AcquisitionState`.
    - `AcquisitionState` - Select `Enabled`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

In a separate branch:

- Insert a [`KeyDown`] operator and set the `Filter` property to `S`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `AcquisitionState`.
    - `AcquisitionState` - Select `Disabled`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

Run the workflow and press <kbd>A</kbd> to start acquisition and <kbd>S</kbd> to stop it. The next sections show how to see the data that acquisition produces.

> [!TIP]
> The **DI0** input can also start and stop acquisition without any command from Bonsai. See [Trigger Acquisition](trigger-acquisition.md).

### Enable Events

The [`EnableEvents`] register selects which events the device broadcasts: `LoadCellData`, `DigitalInput`, `SyncOutput`, and `Thresholds`. All four are enabled when the device powers up. The workflow writes the register anyway, so the example does not depend on whatever ran before it.

:::workflow
![Acquire Data Enable Events](../workflows/acquiredata-enableevents.bonsai)
:::

- Insert a [`KeyDown`] operator and set the `Filter` property to `D`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `EnableEvents`.
    - `EnableEvents` - Select `LoadCellData`, `DigitalInput`, `SyncOutput`, and `Thresholds`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

> [!WARNING]
> [`EnableEvents`] is an absolute mask: every event that is not selected in the write is disabled by that same write, including the events enabled at power-up. To turn off just the load cell stream, for example, write the other three flags together.

Run the workflow and press <kbd>D</kbd>. The device keeps broadcasting all four kinds of events.

### Visualize Load Cell Events

The LoadCells broadcasts events occurring on the device using the [Harp communication protocol](https://harp-tech.org/protocol/BinaryProtocol-8bit.html). To visualize the load cell samples and when they were taken, we can decode the [`HarpMessages`] coming from the device using the workflow below:

:::workflow
![Acquire Data Visualize Events](../workflows/acquiredata-visualizeevents.bonsai)
:::

- Insert a [`SubscribeSubject`] operator named `LoadCells Events`. This will listen to [`HarpMessages`] broadcast from the [`PublishSubject`] named `LoadCells Events` in the Harp device pattern.
- Insert a [`Parse`] operator and configure the `Register` property to `TimestampedLoadCellData`.
- Insert a [`VisualizerWindow`] operator. This will automatically open a window displaying the parsed events when the workflow starts.

> [!NOTE]
> Every register event can be parsed in two forms, selected in the `Register` property of [`Parse`]. The bare payload (e.g. `LoadCellData`, used in [First Steps](./harp-bonsai.md#first-steps)) returns only the register values while the timestamped variant (e.g. `TimestampedLoadCellData`) returns the same payload wrapped in a `Value` field and adds a `Seconds` field carrying the device timestamp. Use the bare variant if it is enough for live monitoring or the timestamped variant if you need to visualize the timestamp as well. Regardless of which option is chosen, all data is [logged](./logging-analysis.md) with device timestamps.

Run the workflow and press <kbd>A</kbd> to start acquisition. The visualizer will display one line per sample:

```text
LoadCellDataPayload { Channel0 = -35, Channel1 = 12, Channel2 = 4, Channel3 = -2, Channel4 = 0, Channel5 = 0, Channel6 = 0, Channel7 = 0 }@1052.348256
```

The first part is the `Payload` value with the eight channels as signed 16-bit readings, and the second number is the timestamp on the device clock. `Channel0` to `Channel3` come from the Reader on **Port 0** and `Channel4` to `Channel7` from the Reader on **Port 1**. The channels of an empty port read 0.

> [!TIP]
> The timestamp marks the start of the conversion on the Reader, taken at the 1 ms tick of the device clock, not the moment the message left the device.

### Plot a Single Channel

The load cell payload is a structure with eight fields. To plot one channel over time, select that field before opening the visualizer.

:::workflow
![Acquire Data Plot Channel](../workflows/acquiredata-plotchannel.bonsai)
:::

- Insert a [`SubscribeSubject`] operator named `LoadCells Events`.
- Insert a [`Parse`] operator and configure the `Register` property to `LoadCellData`.
- Insert a [`MemberSelector`] operator and set the `Selector` property to `Channel0`.
- Insert a [`VisualizerWindow`] operator.

Run the workflow, start acquisition, and press on the load cell connected to **I1** of the Reader. The visualizer plots `Channel0` as a time series that follows the applied force.

### Alternative: Start Acquisition with Timer

You can replace [`KeyDown`] with other operators to start acquisition with other triggers in Bonsai, for instance a [`Timer`].

:::workflow
![Acquire Data Timer](../workflows/acquiredata-timer.bonsai)
:::

- Insert a [`Timer`] operator and set the `DueTime` property to the number of seconds to wait before starting acquisition (e.g. 2 seconds).
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `AcquisitionState`.
    - `AcquisitionState` - Select `Enabled`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

Run the workflow and observe the load cell events start after 2 seconds.

[!INCLUDE [](version-footer.md)]

<!--Reference Style Links -->
[`AcquisitionState`]: xref:Harp.LoadCells.AcquisitionState
[`EnableEvents`]: xref:Harp.LoadCells.EnableEvents
[`CreateMessage`]: xref:Harp.LoadCells.CreateMessage
[`Parse`]: xref:Harp.LoadCells.Parse
[`HarpMessages`]: xref:Bonsai.Harp.HarpMessage
[`KeyDown`]: xref:Bonsai.Windows.Input.KeyDown
[`Timer`]: xref:Bonsai.Reactive.Timer
[`MulticastSubject`]: xref:Bonsai.Expressions.MulticastSubject
[`SubscribeSubject`]: xref:Bonsai.Expressions.SubscribeSubject
[`PublishSubject`]: xref:Bonsai.Reactive.PublishSubject
[`MemberSelector`]: xref:Bonsai.Expressions.MemberSelectorBuilder
[`VisualizerWindow`]: xref:Bonsai.Design.VisualizerWindow
