---
uid: Harp.LoadCells.Device
---

Use the [Harp device pattern](https://harp-tech.org/articles/operators.html#device-pattern) to initialize the device, log data, and send commands to and receive messages from the LoadCells.

:::workflow
![Harp Device Pattern](../workflows/harp-devicepattern.bonsai)
:::

Check out the following in-depth guides to learn how to access the device functionality with the `Harp.LoadCells` package:
- [Acquire Data](../articles/acquire-data.md)
- [Calibrate Offsets](../articles/calibrate-offsets.md)
- [Trigger Acquisition](../articles/trigger-acquisition.md)
- [Configure Sync Output](../articles/configure-sync-output.md)
- [Control Digital Outputs](../articles/control-digital-outputs.md)
- [Detect Thresholds](../articles/detect-thresholds.md)

Refer to the register table below for a complete listing of the available registers on the device.

<table>
  <thead>
    <tr><th colspan="2">LoadCells</th></tr>
  </thead>
  <tbody>
    <tr><td>whoAmI</td><td>1232</td></tr>
    <tr><td>firmwareVersion</td><td>1.2</td></tr>
    <tr><td>hardwareTargets</td><td>1.0</td></tr>
  </tbody>
</table>

### Registers

| name | address | type | length | access | description | range | interfaceType |
|-|-|-|-|-|-|-|-|
| [AcquisitionState](xref:Harp.LoadCells.AcquisitionState) | 32 | U8 |  | Write | Enables the data acquisition. |  | [EnableFlag](xref:Bonsai.Harp.EnableFlag) |
| [LoadCellData](xref:Harp.LoadCells.LoadCellData) | 33 | S16 | 8 | Event | Value of single ADC read from all load cell channels. |  | [LoadCellDataPayload](xref:Harp.LoadCells.LoadCellDataPayload) |
| [DigitalInputState](xref:Harp.LoadCells.DigitalInputState) | 34 | U8 |  | Event | Status of the digital input pin 0. An event will be emitted when DI0Trigger == None. |  | [DigitalInputs](xref:Harp.LoadCells.DigitalInputs) |
| [SyncOutputState](xref:Harp.LoadCells.SyncOutputState) | 35 | U8 |  | Event | Status of the digital output pin 0. An periodic event will be emitted when DO0Sync == ToggleEachSecond. |  | [SyncOutputs](xref:Harp.LoadCells.SyncOutputs) |
| [DI0Trigger](xref:Harp.LoadCells.DI0Trigger) | 39 | U8 |  | Write | Configuration of the digital input pin 0. |  | [TriggerConfig](xref:Harp.LoadCells.TriggerConfig) |
| [DO0Sync](xref:Harp.LoadCells.DO0Sync) | 40 | U8 |  | Write | Configuration of the digital output pin 0. |  | [SyncConfig](xref:Harp.LoadCells.SyncConfig) |
| [DO0PulseWidth](xref:Harp.LoadCells.DO0PulseWidth) | 41 | U8 |  | Write | Pulse duration (ms) for the digital output pin 0. The pulse will only be emitted when DO0Sync == Pulse. | [1:255] | |
| [DigitalOutputSet](xref:Harp.LoadCells.DigitalOutputSet) | 42 | U16 |  | Write | Set the specified digital output lines. |  | [DigitalOutputs](xref:Harp.LoadCells.DigitalOutputs) |
| [DigitalOutputClear](xref:Harp.LoadCells.DigitalOutputClear) | 43 | U16 |  | Write | Clear the specified digital output lines. |  | [DigitalOutputs](xref:Harp.LoadCells.DigitalOutputs) |
| [DigitalOutputToggle](xref:Harp.LoadCells.DigitalOutputToggle) | 44 | U16 |  | Write | Toggle the specified digital output lines |  | [DigitalOutputs](xref:Harp.LoadCells.DigitalOutputs) |
| [DigitalOutputState](xref:Harp.LoadCells.DigitalOutputState) | 45 | U16 |  | Write, Event | Write the state of all digital output lines. An event will be emitted when the value of any pin was changed by a threshold event. |  | [DigitalOutputs](xref:Harp.LoadCells.DigitalOutputs) |
| [OffsetLoadCell0](xref:Harp.LoadCells.OffsetLoadCell0) | 48 | S16 |  | Write | Offset value for Load Cell channel 0. | 0 [-255:255] | |
| [OffsetLoadCell1](xref:Harp.LoadCells.OffsetLoadCell1) | 49 | S16 |  | Write | Offset value for Load Cell channel 1. | 0 [-255:255] | |
| [OffsetLoadCell2](xref:Harp.LoadCells.OffsetLoadCell2) | 50 | S16 |  | Write | Offset value for Load Cell channel 2. | 0 [-255:255] | |
| [OffsetLoadCell3](xref:Harp.LoadCells.OffsetLoadCell3) | 51 | S16 |  | Write | Offset value for Load Cell channel 3. | 0 [-255:255] | |
| [OffsetLoadCell4](xref:Harp.LoadCells.OffsetLoadCell4) | 52 | S16 |  | Write | Offset value for Load Cell channel 4. | 0 [-255:255] | |
| [OffsetLoadCell5](xref:Harp.LoadCells.OffsetLoadCell5) | 53 | S16 |  | Write | Offset value for Load Cell channel 5. | 0 [-255:255] | |
| [OffsetLoadCell6](xref:Harp.LoadCells.OffsetLoadCell6) | 54 | S16 |  | Write | Offset value for Load Cell channel 6. | 0 [-255:255] | |
| [OffsetLoadCell7](xref:Harp.LoadCells.OffsetLoadCell7) | 55 | S16 |  | Write | Offset value for Load Cell channel 7. | 0 [-255:255] | |
| [DO1TargetLoadCell](xref:Harp.LoadCells.DO1TargetLoadCell) | 58 | U8 |  | Write | Target Load Cell that will be used to trigger a threshold event on DO1 pin. |  | [LoadCellChannel](xref:Harp.LoadCells.LoadCellChannel) |
| [DO2TargetLoadCell](xref:Harp.LoadCells.DO2TargetLoadCell) | 59 | U8 |  | Write | Target Load Cell that will be used to trigger a threshold event on DO2 pin. |  | [LoadCellChannel](xref:Harp.LoadCells.LoadCellChannel) |
| [DO3TargetLoadCell](xref:Harp.LoadCells.DO3TargetLoadCell) | 60 | U8 |  | Write | Target Load Cell that will be used to trigger a threshold event on DO3 pin. |  | [LoadCellChannel](xref:Harp.LoadCells.LoadCellChannel) |
| [DO4TargetLoadCell](xref:Harp.LoadCells.DO4TargetLoadCell) | 61 | U8 |  | Write | Target Load Cell that will be used to trigger a threshold event on DO4 pin. |  | [LoadCellChannel](xref:Harp.LoadCells.LoadCellChannel) |
| [DO5TargetLoadCell](xref:Harp.LoadCells.DO5TargetLoadCell) | 62 | U8 |  | Write | Target Load Cell that will be used to trigger a threshold event on DO5 pin. |  | [LoadCellChannel](xref:Harp.LoadCells.LoadCellChannel) |
| [DO6TargetLoadCell](xref:Harp.LoadCells.DO6TargetLoadCell) | 63 | U8 |  | Write | Target Load Cell that will be used to trigger a threshold event on DO6 pin. |  | [LoadCellChannel](xref:Harp.LoadCells.LoadCellChannel) |
| [DO7TargetLoadCell](xref:Harp.LoadCells.DO7TargetLoadCell) | 64 | U8 |  | Write | Target Load Cell that will be used to trigger a threshold event on DO7 pin. |  | [LoadCellChannel](xref:Harp.LoadCells.LoadCellChannel) |
| [DO8TargetLoadCell](xref:Harp.LoadCells.DO8TargetLoadCell) | 65 | U8 |  | Write | Target Load Cell that will be used to trigger a threshold event on DO8 pin. |  | [LoadCellChannel](xref:Harp.LoadCells.LoadCellChannel) |
| [DO1Threshold](xref:Harp.LoadCells.DO1Threshold) | 66 | S16 |  | Write | Value used to threshold a Load Cell read, and trigger DO1 pin. |  | |
| [DO2Threshold](xref:Harp.LoadCells.DO2Threshold) | 67 | S16 |  | Write | Value used to threshold a Load Cell read, and trigger DO2 pin. |  | |
| [DO3Threshold](xref:Harp.LoadCells.DO3Threshold) | 68 | S16 |  | Write | Value used to threshold a Load Cell read, and trigger DO3 pin. |  | |
| [DO4Threshold](xref:Harp.LoadCells.DO4Threshold) | 69 | S16 |  | Write | Value used to threshold a Load Cell read, and trigger DO4 pin. |  | |
| [DO5Threshold](xref:Harp.LoadCells.DO5Threshold) | 70 | S16 |  | Write | Value used to threshold a Load Cell read, and trigger DO5 pin. |  | |
| [DO6Threshold](xref:Harp.LoadCells.DO6Threshold) | 71 | S16 |  | Write | Value used to threshold a Load Cell read, and trigger DO6 pin. |  | |
| [DO7Threshold](xref:Harp.LoadCells.DO7Threshold) | 72 | S16 |  | Write | Value used to threshold a Load Cell read, and trigger DO7 pin. |  | |
| [DO8Threshold](xref:Harp.LoadCells.DO8Threshold) | 73 | S16 |  | Write | Value used to threshold a Load Cell read, and trigger DO8 pin. |  | |
| [DO1TimeAboveThreshold](xref:Harp.LoadCells.DO1TimeAboveThreshold) | 74 | U16 |  | Write | Time (ms) above threshold value that is required to trigger a DO1 pin event. | 0  | |
| [DO2TimeAboveThreshold](xref:Harp.LoadCells.DO2TimeAboveThreshold) | 75 | U16 |  | Write | Time (ms) above threshold value that is required to trigger a DO2 pin event. | 0  | |
| [DO3TimeAboveThreshold](xref:Harp.LoadCells.DO3TimeAboveThreshold) | 76 | U16 |  | Write | Time (ms) above threshold value that is required to trigger a DO3 pin event. | 0  | |
| [DO4TimeAboveThreshold](xref:Harp.LoadCells.DO4TimeAboveThreshold) | 77 | U16 |  | Write | Time (ms) above threshold value that is required to trigger a DO4 pin event. | 0  | |
| [DO5TimeAboveThreshold](xref:Harp.LoadCells.DO5TimeAboveThreshold) | 78 | U16 |  | Write | Time (ms) above threshold value that is required to trigger a DO5 pin event. | 0  | |
| [DO6TimeAboveThreshold](xref:Harp.LoadCells.DO6TimeAboveThreshold) | 79 | U16 |  | Write | Time (ms) above threshold value that is required to trigger a DO6 pin event. | 0  | |
| [DO7TimeAboveThreshold](xref:Harp.LoadCells.DO7TimeAboveThreshold) | 80 | U16 |  | Write | Time (ms) above threshold value that is required to trigger a DO7 pin event. | 0  | |
| [DO8TimeAboveThreshold](xref:Harp.LoadCells.DO8TimeAboveThreshold) | 81 | U16 |  | Write | Time (ms) above threshold value that is required to trigger a DO8 pin event. | 0  | |
| [DO1TimeBelowThreshold](xref:Harp.LoadCells.DO1TimeBelowThreshold) | 82 | U16 |  | Write | Time (ms) below threshold value that is required to trigger a DO1 pin event. | 0  | |
| [DO2TimeBelowThreshold](xref:Harp.LoadCells.DO2TimeBelowThreshold) | 83 | U16 |  | Write | Time (ms) below threshold value that is required to trigger a DO2 pin event. | 0  | |
| [DO3TimeBelowThreshold](xref:Harp.LoadCells.DO3TimeBelowThreshold) | 84 | U16 |  | Write | Time (ms) below threshold value that is required to trigger a DO3 pin event. | 0  | |
| [DO4TimeBelowThreshold](xref:Harp.LoadCells.DO4TimeBelowThreshold) | 85 | U16 |  | Write | Time (ms) below threshold value that is required to trigger a DO4 pin event. | 0  | |
| [DO5TimeBelowThreshold](xref:Harp.LoadCells.DO5TimeBelowThreshold) | 86 | U16 |  | Write | Time (ms) below threshold value that is required to trigger a DO5 pin event. | 0  | |
| [DO6TimeBelowThreshold](xref:Harp.LoadCells.DO6TimeBelowThreshold) | 87 | U16 |  | Write | Time (ms) below threshold value that is required to trigger a DO6 pin event. | 0  | |
| [DO7TimeBelowThreshold](xref:Harp.LoadCells.DO7TimeBelowThreshold) | 88 | U16 |  | Write | Time (ms) below threshold value that is required to trigger a DO7 pin event. | 0  | |
| [DO8TimeBelowThreshold](xref:Harp.LoadCells.DO8TimeBelowThreshold) | 89 | U16 |  | Write | Time (ms) below threshold value that is required to trigger a DO8 pin event. | 0  | |
| [EnableEvents](xref:Harp.LoadCells.EnableEvents) | 90 | U8 |  | Write | Specifies the active events in the device. |  | [LoadCellEvents](xref:Harp.LoadCells.LoadCellEvents) |
