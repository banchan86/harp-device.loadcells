## Trigger Acquisition

The **DI0** input on the LoadCells can either report its logic level as events or act as a hardware trigger that starts and stops acquisition, so an external device can gate the load cell recording with no software in the loop. Refer to the [connections](./connections.md?tabs=digitalinput#connections) article to set up a digital signal on **DI0**, which we will use for the rest of these examples. This article covers how to configure the digital input trigger and visualize the digital input events in Bonsai.

The complete workflow is shown below. Copy and paste it into Bonsai or build each section by following the step-by-step instructions below.

:::workflow
![Trigger Acquisition](../workflows/triggeracquisition-toplevel.bonsai)
:::

### Configure the Digital Input Trigger

The [`DI0Trigger`] register selects the role of **DI0**. With `None`, the input is a plain digital input that broadcasts its level. With `RisingEdge`, a rising edge starts acquisition and the following falling edge stops it. `FallingEdge` does the opposite. The device powers up with `None`.

:::workflow
![Trigger Acquisition Configure Trigger](../workflows/triggeracquisition-configuretrigger.bonsai)
:::

- Insert a [`KeyDown`] operator and set the `Filter` property to `A`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `DI0Trigger`.
    - `DI0Trigger` - Select `RisingEdge`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

In a separate branch:

- Insert a [`KeyDown`] operator and set the `Filter` property to `S`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `DI0Trigger`.
    - `DI0Trigger` - Select `None`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

Run the workflow and press <kbd>A</kbd>. Drive **DI0** high and the load cell events start streaming; drive it low and they stop. Press <kbd>S</kbd> to return **DI0** to a plain input.

> [!WARNING]
> While [`DI0Trigger`] is `RisingEdge` or `FallingEdge`, the device stops broadcasting [`DigitalInputState`] events, and it does not send an [`AcquisitionState`] message when the input starts or stops acquisition. Watch the [`LoadCellData`] events to know whether acquisition is running.

### Visualize Digital Input Events

The LoadCells broadcasts events occurring on the device using the [Harp communication protocol](https://harp-tech.org/protocol/BinaryProtocol-8bit.html). To visualize when **DI0** changes level, we can decode the [`HarpMessages`] coming from the device using the workflow below:

:::workflow
![Trigger Acquisition Visualize Events](../workflows/triggeracquisition-visualizeevents.bonsai)
:::

- Insert a [`SubscribeSubject`] operator named `LoadCells Events`. This will listen to [`HarpMessages`] broadcast from the [`PublishSubject`] named `LoadCells Events` in the Harp device pattern.
- Insert a [`Parse`] operator and configure the `Register` property to `TimestampedDigitalInputState`.
- Insert a [`VisualizerWindow`] operator. This will automatically open a window displaying the parsed events when the workflow starts.

Run the workflow with [`DI0Trigger`] set to `None` and toggle the signal on **DI0**. The visualizer will display one line per edge:

```text
DI0@1052.348256
None@1053.102144
```

The first value is the `Payload`, `DI0` when the input is high and `None` when it is low, and the second number is the timestamp on the device clock. The `DigitalInput` flag of [`EnableEvents`] must be enabled for these events to be broadcast, which is the power-up default.

[!INCLUDE [](version-footer.md)]

<!--Reference Style Links -->
[`DI0Trigger`]: xref:Harp.LoadCells.DI0Trigger
[`DigitalInputState`]: xref:Harp.LoadCells.DigitalInputState
[`AcquisitionState`]: xref:Harp.LoadCells.AcquisitionState
[`LoadCellData`]: xref:Harp.LoadCells.LoadCellData
[`EnableEvents`]: xref:Harp.LoadCells.EnableEvents
[`CreateMessage`]: xref:Harp.LoadCells.CreateMessage
[`Parse`]: xref:Harp.LoadCells.Parse
[`HarpMessages`]: xref:Bonsai.Harp.HarpMessage
[`KeyDown`]: xref:Bonsai.Windows.Input.KeyDown
[`MulticastSubject`]: xref:Bonsai.Expressions.MulticastSubject
[`SubscribeSubject`]: xref:Bonsai.Expressions.SubscribeSubject
[`PublishSubject`]: xref:Bonsai.Reactive.PublishSubject
[`VisualizerWindow`]: xref:Bonsai.Design.VisualizerWindow
