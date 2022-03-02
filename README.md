# Docker

Deno client for Docker. It allows to control Docker through Unix socket.

## Usage

To use the library, you need to instanciate a `Client` object and import the right files.

The class `HttpClient` expects a connection as `Deno.Conn`.

```typescript
import { Client } from "https://deno.land/x/docker@v0.0.1/mod.ts";

// Instanciates the Docker client.
const client = new Client("v1.41", "/var/run/docker.sock");

// Get Docker version
const value = await systemVersionValue(client);

console.log(value);
```

Result:

```
20.10.12
```

## License

[MIT License](LICENSE)
