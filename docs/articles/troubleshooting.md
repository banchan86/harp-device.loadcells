## Indicators and Errors

This article covers how to resolve common errors on the LoadCells.

### Indicator Lights

The **STATE** LED is the only indicator on the board. Refer to the [Ports and Connections](connections.md#indicator-lights) article for its blink patterns. After a power cycle or a firmware update the LED runs through the Harp core startup sequence before settling into the standby pattern.

### COM Port Errors

**Q: In Bonsai, running the workflow throws an error "The port `ComX` does not exist."**

A: Either the wrong communications port in the `PortName` property in [`Device`] was selected, or the [USB](connections.md) cable is not properly connected. Try selecting a different communications port and checking the connection.

**Q: In Bonsai, running the workflow throws an error "Access to the port `ComX` is denied"**

A: Only one interface connection to the LoadCells can be opened at one time. Check that multiple instances of Bonsai are not running, and that the [LoadCells GUI](loadcells-gui.md) is closed. Sometimes, the port can also be locked by a program that did not terminate correctly; restarting the computer fixes it.

### Device Errors

**Q: The workflow runs but no [`LoadCellData`] events arrive.**

A: Acquisition is stopped when the device powers up. Start it with the [`AcquisitionState`] register as shown in [Acquire Data](acquire-data.md#start-and-stop-acquisition), or with the **DI0** input if it is configured as a trigger. If events still do not arrive, check that the `LoadCellData` flag of [`EnableEvents`] is enabled; a previous write to that register may have cleared it.

**Q: [`LoadCellData`] events arrive but four of the channels always read 0.**

A: The LoadCells reports 0 for the channels of a port where it does not detect a Load Cells Reader. Check the RJ45 cable between the Reader and **Port 0** (channels 0 to 3) or **Port 1** (channels 4 to 7), and that the cable is a straight-through patch cable. One possible reason for a cable that looks fine is a crossover cable, which swaps the SPI lines.

**Q: A channel reads a constant value that does not follow the load cell.**

A: One possible reason is a load cell wired to the wrong positions of the Reader connector; the differential signal must go to **I+** and **I-** with the excitation on **5V** and **0V**. Another is an offset large enough to push the signal out of range: reset the channel offset to 0 with [Calibrate Offsets](calibrate-offsets.md) and check whether the reading responds to force again.

**Q: The channel offset I wrote reads back as a negative number.**

A: Firmware 1.2 stores the offset with its sign inverted, so a read, including the register dump at startup, returns the negative of the value you wrote. The offset applied to the signal is the value you wrote. Write the register again to set a new value; there is nothing to correct on the device.

**Q: [`DigitalInputState`] events stopped after I configured the digital input trigger.**

A: The input only broadcasts its level while [`DI0Trigger`] is `None`. In `RisingEdge` or `FallingEdge` mode the input silently starts and stops acquisition instead. Watch the [`LoadCellData`] events to follow the trigger, or set [`DI0Trigger`] back to `None` to get the level events.

**Q: The heartbeat on **DO0** does not toggle.**

A: The heartbeat only runs while acquisition is on. Start acquisition and check that [`DO0Sync`] is set to `Heartbeat`, as in [Configure Sync Output](configure-sync-output.md#enable-the-heartbeat).

**Q: A different output than the one I selected changes, or **DO8** does not respond.**

A: The firmware and `device.yml` may disagree on which bit drives which output, which shifts every output by one and puts **DO8** out of reach. See the warning in [Control Digital Outputs](control-digital-outputs.md), and check the repository releases for a firmware or interface update that reconciles the mapping.

**Q: A threshold never raises its output.**

A: Thresholds are evaluated against fresh samples, so acquisition must be running. Then check, in order: the target register (`DO1TargetLoadCell` for **DO1**) selects the channel you are loading rather than `None`; the threshold is below the loaded reading and above the resting reading; and the time above threshold is short enough that the load is held for that long. Loading the sensor in the negative direction needs the inversion feature described in [Detect Thresholds](detect-thresholds.md#configure-a-threshold).

**Q: The outputs behave unexpectedly after I wrote [`DigitalOutputState`].**

A: [`DigitalOutputState`] writes all eight outputs, clearing every output not selected, including outputs a threshold was holding high. The threshold raises its output again on the next sample that satisfies its condition. Use [`DigitalOutputSet`] and [`DigitalOutputClear`] to change individual outputs without touching the others.

[!INCLUDE [](version-footer.md)]

<!--Reference Style Links -->
[`Device`]: xref:Harp.LoadCells.Device
[`LoadCellData`]: xref:Harp.LoadCells.LoadCellData
[`AcquisitionState`]: xref:Harp.LoadCells.AcquisitionState
[`EnableEvents`]: xref:Harp.LoadCells.EnableEvents
[`DigitalInputState`]: xref:Harp.LoadCells.DigitalInputState
[`DI0Trigger`]: xref:Harp.LoadCells.DI0Trigger
[`DO0Sync`]: xref:Harp.LoadCells.DO0Sync
[`DigitalOutputState`]: xref:Harp.LoadCells.DigitalOutputState
[`DigitalOutputSet`]: xref:Harp.LoadCells.DigitalOutputSet
[`DigitalOutputClear`]: xref:Harp.LoadCells.DigitalOutputClear
