## Installation

This page covers the software you'll need to interact with the LoadCells, as well as how to update the firmware on the device.

## Software Packages

These steps are only required the first time you connect the device to a new computer, and you can install just the packages for the functionality you need.

# [Bonsai](#tab/bonsai)

[Bonsai](https://bonsai-rx.org/) is a visual reactive programming language that provides flexible and comprehensive control of the LoadCells.

[placeholder - installation-bonsaipackage.png]{width=650}

- Download and install [Bonsai](https://bonsai-rx.org/docs/articles/installation.html).
- Launch Bonsai and install the `Harp.LoadCells` package by searching for it in the [Bonsai package manager](https://bonsai-rx.org/docs/articles/packages.html). Tick the "Show advanced" checkbox if it does not appear.
- (Optional) Install the `Bonsai.Windows.Input` package to follow along with the examples in this user guide.

# [Python](#tab/python)

The [Harp](https://harp-tech.org/python/) library provides a Python interface for controlling Harp devices and [loading](logging-analysis.md) recorded data. To install the full library, install it in a Python environment with:

```cmd
pip install harp
```

To install only the package necessary for loading data:

```cmd
pip install harp-data
```

> [!NOTE]
> Substitute `uv add` for `pip install` if you are using the [uv](https://docs.astral.sh/uv/) package manager.

# [GUI](#tab/gui)

The [LoadCells GUI](loadcells-gui.md) is a standalone application for configuring the device and monitoring load cell data without Bonsai.

> [!WARNING]
> **TODO**: The GUI has not been released from the harp-tech repository yet. A cross-platform version built on .NET 8 and Avalonia is proposed in [pull request 9](https://github.com/harp-tech/device.loadcells/pull/9), with alpha binaries published at the [fchampalimaud fork](https://github.com/fchampalimaud/device.loadcells/releases/tag/app1.0.0-alpha.1). The repository README also links an older Windows-only GUI (v1.1.0) that requires separate driver and runtime installers. Update these steps when a release is published.

- Download the archive for your operating system from the release page and extract it.
- Run the `Harp.LoadCells.App` executable.

***

## Firmware

New features are added and bugs are fixed with firmware updates which are published on the [release page](https://github.com/harp-tech/device.loadcells/releases) in the LoadCells repository. Each firmware release is tagged with a `fw` version prefix (e.g. `fw1.2-harp1.15`), and the `.hex` files can be found in the "Assets" section. Download the file that matches the hardware (`hw`) version of your device, for example `LoadCells-fw1.2-harp1.15-hw1.1-ass0.hex` for [hardware 1.1](loadcells-overview.md#hardware).

>[!TIP]
> The hardware version is printed on the PCB silkscreen next to the board name, e.g. `harp load cells interface v1.1`.

To update the firmware, use the device setup tool in Bonsai:

[placeholder - installation-firmwareupdate.png]{width=650}

1. Add the [`Device`] operator in Bonsai.
2. Double-click on the [`Device`] node while the workflow is not running.
3. Select the COM port for the device.
4. Click "Bootloader".
5. Click "Open".
6. Select the downloaded `.hex` file.
7. Click "Update".

After the update, the device will reboot with the new firmware and go through the [startup LED sequence](troubleshooting.md#indicator-lights).

[!INCLUDE [](version-footer.md)]

<!--Reference Style Links -->
[`Device`]: xref:Harp.LoadCells.Device
