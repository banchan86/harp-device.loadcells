## Calibrate Offsets

Every load cell channel has a hardware offset adjustment on the Load Cells Reader: a digital potentiometer shifts the amplified signal before it reaches the converter, so you can zero the resting load of a sensor or center its signal in the measurement range. Refer to the [connections](./connections.md?tabs=loadcellsreader#connections) article to set up a Load Cells Reader on **Port 0**, which we will use for the rest of these examples. This article covers how to set the offset of a channel and verify it in Bonsai.

The complete workflow is shown below. Copy and paste it into Bonsai or build each section by following the step-by-step instructions below.

:::workflow
![Calibrate Offsets](../workflows/calibrateoffsets-toplevel.bonsai)
:::

### Set the Channel Offset

The [`OffsetLoadCell0`] register sets the offset of `Channel0`, in steps from −255 to 255. The [`OffsetLoadCell1`] to [`OffsetLoadCell7`] registers do the same for the other channels.

:::workflow
![Calibrate Offsets Set Offset](../workflows/calibrateoffsets-setoffset.bonsai)
:::

- Insert a [`KeyDown`] operator and set the `Filter` property to `A`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `OffsetLoadCell0`.
    - `OffsetLoadCell0` - Set the offset in steps (e.g. 100).
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

In a separate branch:

- Insert a [`KeyDown`] operator and set the `Filter` property to `S`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `OffsetLoadCell0`.
    - `OffsetLoadCell0` - Set the offset to 0.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

Run the workflow and press <kbd>A</kbd> to apply the offset and <kbd>S</kbd> to remove it. The device rejects values outside −255 to 255.

> [!TIP]
> The offsets live on the interface board, not on the Reader. When you plug a Reader in, the LoadCells re-sends all four offsets of that port about 250 ms later, so swapping Readers keeps your calibration.

> [!WARNING]
> Firmware 1.2 stores the offset with its sign inverted, so reading the register back, including in the register dump logged at startup, returns the negative of the value you wrote. The offset applied to the signal is the one you wrote.

> [!WARNING]
> **TODO**: Measure how many load cell counts one offset step corresponds to, and confirm the direction of a positive offset on the signal.

### Verify the Offset

To see the effect of an offset, start acquisition and plot the channel you are adjusting.

:::workflow
![Calibrate Offsets Verify](../workflows/calibrateoffsets-verify.bonsai)
:::

- Insert a [`KeyDown`] operator and set the `Filter` property to `D`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `AcquisitionState`.
    - `AcquisitionState` - Select `Enabled`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

In a separate branch:

- Insert a [`SubscribeSubject`] operator named `LoadCells Events`.
- Insert a [`Parse`] operator and configure the `Register` property to `LoadCellData`.
- Insert a [`MemberSelector`] operator and set the `Selector` property to `Channel0`.
- Insert a [`VisualizerWindow`] operator.

Run the workflow, press <kbd>D</kbd> to start acquisition, then press <kbd>A</kbd> and <kbd>S</kbd>. The plotted trace of `Channel0` shifts by the offset and back. Adjust the value until the unloaded sensor reads close to 0, then repeat for the other channels with their own offset registers.

[!INCLUDE [](version-footer.md)]

<!--Reference Style Links -->
[`OffsetLoadCell0`]: xref:Harp.LoadCells.OffsetLoadCell0
[`OffsetLoadCell1`]: xref:Harp.LoadCells.OffsetLoadCell1
[`OffsetLoadCell7`]: xref:Harp.LoadCells.OffsetLoadCell7
[`CreateMessage`]: xref:Harp.LoadCells.CreateMessage
[`Parse`]: xref:Harp.LoadCells.Parse
[`KeyDown`]: xref:Bonsai.Windows.Input.KeyDown
[`MulticastSubject`]: xref:Bonsai.Expressions.MulticastSubject
[`SubscribeSubject`]: xref:Bonsai.Expressions.SubscribeSubject
[`MemberSelector`]: xref:Bonsai.Expressions.MemberSelectorBuilder
[`VisualizerWindow`]: xref:Bonsai.Design.VisualizerWindow
