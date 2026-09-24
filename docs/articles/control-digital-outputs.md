## Control Digital Outputs

The LoadCells has eight digital outputs, **DO1** to **DO8**, on its screw terminal, switching between 0 V and the 3.3 V or 5 V level chosen with the output voltage selector jumper. Refer to the [connections](./connections.md?tabs=digitaloutputs#connections) article to connect an external device to **DO1**, which we will use for the rest of these examples. This article covers how to set and clear outputs, toggle outputs, and write the complete output state in Bonsai.

The complete workflow is shown below. Copy and paste it into Bonsai or build each section by following the step-by-step instructions below.

:::workflow
![Control Digital Outputs](../workflows/controldigitaloutputs-toplevel.bonsai)
:::

[!INCLUDE [](digitaloutput-mapping-warning.md)]

### Set and Clear Outputs

The [`DigitalOutputSet`] register raises the selected outputs and the [`DigitalOutputClear`] register lowers them, leaving every other output as it was.

:::workflow
![Control Digital Outputs Set Clear](../workflows/controldigitaloutputs-setclear.bonsai)
:::

- Insert a [`KeyDown`] operator and set the `Filter` property to `A`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `DigitalOutputSet`.
    - `DigitalOutputSet` - Select `DO1`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

In a separate branch:

- Insert a [`KeyDown`] operator and set the `Filter` property to `S`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `DigitalOutputClear`.
    - `DigitalOutputClear` - Select `DO1`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

Run the workflow and press <kbd>A</kbd> to raise **DO1** and <kbd>S</kbd> to lower it. Select several outputs in the same payload to switch them together.

### Toggle Outputs

The [`DigitalOutputToggle`] register inverts the selected outputs.

:::workflow
![Control Digital Outputs Toggle](../workflows/controldigitaloutputs-toggle.bonsai)
:::

- Insert a [`KeyDown`] operator and set the `Filter` property to `D`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `DigitalOutputToggle`.
    - `DigitalOutputToggle` - Select `DO1` and `DO2`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

Run the workflow and press <kbd>D</kbd> repeatedly. **DO1** and **DO2** flip on every press.

### Write the Output State

The [`DigitalOutputState`] register writes all eight outputs at once: the selected outputs go high and every other output goes low, including outputs that a [threshold](detect-thresholds.md) is holding high.

:::workflow
![Control Digital Outputs State](../workflows/controldigitaloutputs-state.bonsai)
:::

- Insert a [`KeyDown`] operator and set the `Filter` property to `F`.
- Insert a [`CreateMessage`] operator and configure these properties:
    - `Payload` - Select `DigitalOutputState`.
    - `DigitalOutputState` - Select `DO2` and `DO4`.
- Insert a [`MulticastSubject`] operator named `LoadCells Commands`.

Run the workflow and press <kbd>F</kbd>. **DO2** and **DO4** go high and the other six outputs go low, whatever their previous state.

> [!NOTE]
> [`DigitalOutputState`] is also an event register. The device broadcasts it whenever a load cell threshold changes an output, which the [Detect Thresholds](detect-thresholds.md#visualize-threshold-events) article shows how to visualize. Writes from Bonsai do not generate these events; they only produce the usual command reply.

[!INCLUDE [](version-footer.md)]

<!--Reference Style Links -->
[`DigitalOutputSet`]: xref:Harp.LoadCells.DigitalOutputSet
[`DigitalOutputClear`]: xref:Harp.LoadCells.DigitalOutputClear
[`DigitalOutputToggle`]: xref:Harp.LoadCells.DigitalOutputToggle
[`DigitalOutputState`]: xref:Harp.LoadCells.DigitalOutputState
[`CreateMessage`]: xref:Harp.LoadCells.CreateMessage
[`KeyDown`]: xref:Bonsai.Windows.Input.KeyDown
[`MulticastSubject`]: xref:Bonsai.Expressions.MulticastSubject
