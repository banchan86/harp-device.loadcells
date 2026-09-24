## Detect Thresholds

Each of the eight digital outputs, **DO1** to **DO8**, can follow a load cell channel on its own: the LoadCells compares every new sample against a threshold, raises the output once the channel has stayed at or above the threshold for a set time, and lowers it once the channel has stayed below for another set time, all on the device with 1 ms resolution. Refer to the [connections](./connections.md?tabs=loadcellsreader#connections) article to set up a Load Cells Reader on **Port 0** and the Digital Outputs tab to wire **DO1**, which we will use for the rest of these examples. This article covers how to configure a threshold and visualize the threshold events in Bonsai.

The complete workflow is shown below. Copy and paste it into Bonsai or build each section by following the step-by-step instructions below.

:::workflow
![Detect Thresholds](../workflows/detectthresholds-toplevel.bonsai)
:::

[!INCLUDE [](digitaloutput-mapping-warning.md)]

### Configure a Threshold

Four registers configure the threshold of one output. For **DO1** they are [`DO1TargetLoadCell`], which selects the channel to watch (or `None` to leave the output under manual control), [`DO1Threshold`], the value the channel is compared against in load cell counts, [`DO1TimeAboveThreshold`], the time in milliseconds the channel must stay at or above the threshold before the output goes high, and [`DO1TimeBelowThreshold`], the time it must stay below before the output goes low. The `DO2` to `DO8` registers configure the other outputs the same way. The example configures **DO1** to follow `Channel0` and starts acquisition, since thresholds are only evaluated against fresh samples.

:::workflow
![Detect Thresholds Configure](../workflows/detectthresholds-configure.bonsai)
:::

- Insert a [`KeyDown`] operator and set the `Filter` property to `A`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `DO1TargetLoadCell`.
    - `DO1TargetLoadCell` - Select `Channel0`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `DO1Threshold`.
    - `DO1Threshold` - Set the threshold in load cell counts (e.g. 1000).
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `DO1TimeAboveThreshold`.
    - `DO1TimeAboveThreshold` - Set the hold time above threshold in milliseconds (e.g. 50).
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `DO1TimeBelowThreshold`.
    - `DO1TimeBelowThreshold` - Set the hold time below threshold in milliseconds (e.g. 50).
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `AcquisitionState`.
    - `AcquisitionState` - Select `Enabled`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

In a separate branch:

- Insert a [`KeyDown`] operator and set the `Filter` property to `S`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `DO1TargetLoadCell`.
    - `DO1TargetLoadCell` - Select `None`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

Run the workflow and press <kbd>A</kbd>. Press on the load cell connected to **I1** of the Reader: **DO1** goes high 50 ms after `Channel0` reaches 1000 counts, and low 50 ms after it drops back below. Press <kbd>S</kbd> to release **DO1** to manual control.

> [!TIP]
> A hold time of 0 ms makes the output follow the comparison on the very next sample. The hold times are counted in samples, so they only advance while acquisition is running.

> [!WARNING]
> The comparison is greater than or equal to the threshold, so a threshold of 0 with an unloaded sensor hovering around zero will chatter. Give the threshold some margin above the resting value, or zero the sensor first with [Calibrate Offsets](calibrate-offsets.md).

> [!WARNING]
> **TODO**: Firmware 1.2 adds a per-output threshold inversion, which makes the output follow "less than or equal" instead, for detecting forces in the negative direction. It lives at register address 57 as a bitmask (bit 0 for **DO1** through bit 7 for **DO8**), but `device.yml` still lists that address as reserved, so the Bonsai interface cannot address it by name. Verify the feature on hardware and expose it in `device.yml` before documenting a workflow for it.

### Visualize Threshold Events

The LoadCells broadcasts events occurring on the device using the [Harp communication protocol](https://harp-tech.org/protocol/BinaryProtocol-8bit.html). To visualize when a threshold changes an output, and the resulting state of all eight outputs, we can decode the [`HarpMessages`] coming from the device using the workflow below:

:::workflow
![Detect Thresholds Visualize Events](../workflows/detectthresholds-visualizeevents.bonsai)
:::

- Insert a [`SubscribeSubject`] operator named `LoadCells Events`. This will listen to [`HarpMessages`] broadcast from the [`PublishSubject`] named `LoadCells Events` in the Harp device pattern.
- Insert a [`Parse`] operator and configure the `Register` property to `TimestampedDigitalOutputState`.
- Insert a [`VisualizerWindow`] operator. This will automatically open a window displaying the parsed events when the workflow starts.

Run the workflow, press <kbd>A</kbd>, and load the sensor past the threshold. The visualizer will display one line each time a threshold raises or lowers an output:

```text
DO1@1052.348256
None@1053.921472
```

The first value is the `Payload`, the set of outputs that are currently high, and the second number is the timestamp on the device clock. The `Thresholds` flag of [`EnableEvents`] must be enabled for these events to be broadcast, which is the power-up default. Outputs changed from Bonsai with the [Control Digital Outputs](control-digital-outputs.md) registers do not produce these events.

[!INCLUDE [](version-footer.md)]

<!--Reference Style Links -->
[`DO1TargetLoadCell`]: xref:Harp.LoadCells.DO1TargetLoadCell
[`DO1Threshold`]: xref:Harp.LoadCells.DO1Threshold
[`DO1TimeAboveThreshold`]: xref:Harp.LoadCells.DO1TimeAboveThreshold
[`DO1TimeBelowThreshold`]: xref:Harp.LoadCells.DO1TimeBelowThreshold
[`EnableEvents`]: xref:Harp.LoadCells.EnableEvents
[`CreateMessage`]: xref:Harp.LoadCells.CreateMessage
[`Parse`]: xref:Harp.LoadCells.Parse
[`HarpMessages`]: xref:Bonsai.Harp.HarpMessage
[`KeyDown`]: xref:Bonsai.Windows.Input.KeyDown
[`MulticastSubject`]: xref:Bonsai.Expressions.MulticastSubject
[`SubscribeSubject`]: xref:Bonsai.Expressions.SubscribeSubject
[`PublishSubject`]: xref:Bonsai.Reactive.PublishSubject
[`VisualizerWindow`]: xref:Bonsai.Design.VisualizerWindow
