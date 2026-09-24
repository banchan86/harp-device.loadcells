## Bonsai

Bonsai is a visual reactive programming language for building interactive experiments and processing data streams in real time. It supports a growing ecosystem of hardware and software packages that are commonly used in neuroscience. This article will cover how to set up the LoadCells in Bonsai.

>[!TIP]
> More information on Bonsai can be found in the official [documentation](https://bonsai-rx.org/docs/).

### First Steps

We will use a simple example to connect and test the device in Bonsai. This example starts acquisition with a key press and displays the load cell samples as they arrive. We revisit this example in more detail in the "Bonsai Workflows" section.

Before beginning:
- Connect the [USB](connections.md) cable to the computer.
- Launch "Bonsai" from the Windows Start menu.
- Hover over the workflow cell below, and click on the "Copy" icon on the top right.
- Paste the workflow into Bonsai.

:::workflow
![LoadCells First Steps](../workflows/loadcells-firststeps.bonsai)
:::

> [!TIP]
> The [Harp device pattern](https://harp-tech.org/articles/operators.html#device-pattern) will initialize the device, log data, and provide hooks to send commands as well as receive messages from the LoadCells using the [Harp communication protocol](https://harp-tech.org/protocol/BinaryProtocol-8bit.html). If your workflow does not look like the one above, make sure that the [Harp.LoadCells](./installation.md#software-packages) package is installed.

- Click on the [`LoadCells (Device)`] operator and set the `PortName` property to the communications port for the device (e.g. COM8).
- Click on the [`LoadCellsDataWriter (DeviceDataWriter)`] operator and set the `Path` property for the name and location of the save folder (e.g. `LoadCells.harp`).
- Press the "Start" button in Bonsai to run the workflow.
- Press <kbd>A</kbd> to start acquisition.

A [visualizer](xref:Bonsai.Design.VisualizerWindow) will automatically open when the workflow starts. Once you press <kbd>A</kbd>, it displays the eight load cell channels, updated 1000 times per second:

```text
LoadCellDataPayload { Channel0 = -35, Channel1 = 12, Channel2 = 4, Channel3 = -2, Channel4 = 0, Channel5 = 0, Channel6 = 0, Channel7 = 0 }
```

Channels of a port without a [Load Cells Reader](connections.md?tabs=loadcellsreader#connections) read 0, so the values stream even before any sensor is connected.

The device is ready to use! If, instead, an error appears in Bonsai, check out the [troubleshooting](troubleshooting.md) section.

Next, we suggest going through the "Bonsai Workflows" section if you are not familiar with using Harp devices in Bonsai.

Alternatively, if you have experience with Harp devices, you can check the [register table](xref:Harp.LoadCells) in the reference to access the device functionality directly.

[!INCLUDE [](version-footer.md)]

<!--Reference Style Links -->
[`LoadCells (Device)`]: xref:Harp.LoadCells.Device
[`LoadCellsDataWriter (DeviceDataWriter)`]: xref:Harp.LoadCells.DeviceDataWriter
