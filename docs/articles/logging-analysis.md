## Logging and Analysis

This article covers how data from the device is logged to disk, and how to read and plot the logged data with the `harp-data` Python package.

### Log Data

Data from the device is logged by the [`DeviceDataWriter`] operator in the Harp device pattern, which saves raw data from all device registers in the Harp binary format to the folder set in its `Path` property:

:::workflow
![Harp Device Pattern](../workflows/harp-devicepattern.bonsai)
:::

While the workflow is running, registers are logged as the device produces messages (events and command echoes). Two properties of the [`Device`] operator are also important for logging:

- `DumpRegisters` - Enabled by default, this property logs a read of every register when the device initializes, capturing the initial state of the device at the start of the experiment.
- `Heartbeat` - Disabled by default, enable it to regularly log the device's hardware timestamp. While acquisition is running, the 1 kHz [`LoadCellData`](acquire-data.md) events already provide a dense record of the device clock.

> [!WARNING]
> The register dump can be used as an approximate start time for the workflow or experiment, but keep in mind that other devices in the workflow may initialize at a different time.

### Analyze Data

The [`harp-data`](https://harp-tech.org/python/) package imports data stored in the Harp binary format as [pandas](https://pandas.pydata.org/) DataFrames, which can then be analyzed with any `pandas` compatible plotting or analysis library.

The following example demonstrates how to read and plot data from the [`LoadCellData`](acquire-data.md) register.

> [!NOTE]
> This example requires a Python environment with [harp-data](installation.md#software-packages) and [`matplotlib`](https://matplotlib.org/) (used by `pandas` as a plotting backend) installed.

```python
# Import the dependencies
import matplotlib.pyplot as plt
from harp import data

# Finds device.yml in the folder, builds the device module, returns a dataset reader
reader = data.open_dataset("LoadCells.harp")

# Lists every register in the reader by name and address
print(reader.contents)

# Load data from a particular register
df = reader.read("LoadCellData")   # by name
df = reader.read(33)               # or by address

# Inspect DataFrame: one row per 1 ms sample, one column per channel
print(df.head())

# Plot the eight load cell channels against the device timestamp
df.plot()
plt.show()
```

[!INCLUDE [](version-footer.md)]

<!--Reference Style Links -->
[`DeviceDataWriter`]: xref:Harp.LoadCells.DeviceDataWriter
[`Device`]: xref:Harp.LoadCells.Device
