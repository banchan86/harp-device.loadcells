## LoadCells GUI

The LoadCells GUI is a standalone application that exposes the device configuration and shows the load cell channels in real time. Use it to check a rig quickly, zero the load cells, or test thresholds without building a Bonsai workflow.

Before beginning, [install the GUI](installation.md#software-packages), follow the hardware setup [guide](connections.md), and connect the USB cable to the computer. Launch the `Harp.LoadCells.App` executable from the folder you extracted.

[placeholder - loadcellsgui-mainwindow.png]{width=650}

> [!WARNING]
> **TODO**: This article is a stub. The GUI is proposed in [pull request 9](https://github.com/harp-tech/device.loadcells/pull/9) and has not been released from the harp-tech repository. Its description lists device configuration, real-time monitoring of the data, and a cross-platform interface with light and dark themes. Fill in the usage steps and screenshots once the application is released.

### Usage

- Select the COM port of the LoadCells and connect.
- Review the current device configuration and adjust the registers you need, such as the channel offsets and the thresholds.
- Start acquisition to monitor the load cell channels in real time.

> [!WARNING]
> Only one program can access the device's COM port at a time. Close the GUI before starting a Bonsai workflow that uses the device.

[!INCLUDE [](version-footer.md)]
