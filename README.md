# @matteogheza/node-eventlog
_An event log utility for Windows 10 & Server 2012/2016 that actually works_

**This is an updated version of the original [node-eventlog](https://github.com/xSlither/node-eventlog) by Chase M. Allen, updated to use node-addon-api v8.5.0 for better compatibility with modern Node.js versions.**

### What's New in v2.0.0

- ✅ Updated to node-addon-api v8.5.0 (from v2.0.0)
- ✅ Support for Node.js versions 18, 20, and 22
- ✅ Support for NAPI versions 3-8
- ✅ Improved error handling and stability
- ✅ Modern build system with @mapbox/node-pre-gyp

`node-eventlog` is a lightweight C++ based module for Node.js, exclusive for the Windows operating systems, that provides functionality for writing entries to the Event Logs.

I created this module after finding a lack of existing supported packages that provided functionality for writing to the Windows Event Logs.

### Compatibility

This module is written using NAPI, for compatibility with future versions of Node. It’s been tested with 64-bit Node 12.8 on 64-bit Windows 10 & Server 2012/2016- although, it should work with other installments of Node/Windows.

### Installing

I made installing this package really simple utilizing a really cool module called [node-pre-gyp](https://github.com/mapbox/node-pre-gyp). I’m able to host the pre-compiled binaries, here on GitHub, as releases.

To install, simply use the npm package:
```batch
npm i @matteogheza/node-eventlog
```

However, if there is an issue installing the pre-compiled binaries (such as being behind a corporate firewall), it will fallback to compiling from the source, which means you need to have [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) or Visual Studio & Python installed.

### How to use the module

Something I love about TypeScript is that my definitions file tells you everything you really need to know:
```typescript
export type Severity = "info" | "warn" | "error";

export declare class EventLog {
    public readonly source: string;

    constructor(source: string);

    log(message: string, severity?: Severity, code?: number): Promise<boolean>;
}
```

Simply import the class, and create a new instance. The constructor requires a `source`, which is the name of the application that will be displayed in the Event Log entry.

The `.log()` method will write a new entry to the _Application_ logs. You can optionally provide the type of log entry to write (_info [default], warn, error_), as well as an event code (_default is 1000_).

> _Note_: the `.log()` method is **_Asynchronous_**  

```javascript
const { EventLog } = require("@matteogheza/node-eventlog");

const AppName = 'MyTestApp';

const Test = async () => {
    const logger = new EventLog(AppName);
    console.log(await logger.log('Test Message', 'info', 9999));
};

Test();
```

### Suggestions?

There are several other features that could potentially be added such as writing to other sections of the Event Logs or being able to read previous entries. Open a new issue if there’s something you’d like to see added!
