import { Client } from "./client.ts";
import { HttpStatus } from "../deps.ts";

export type DockerVersion = {
  Platform: {
    Name: string;
  };
  Components: Array<
    {
      Name: string;
      Version: string;
      Details?: Record<string, string>;
    }
  >;
  Version: string;
  ApiVersion: string;
  MinAPIVersion: string;
  GitCommit: string;
  GoVersion: string;
  Os: string;
  Arch: string;
  KernelVersion: string;
  Experimental: boolean;
  BuildTime: string;
};

// https://docs.docker.com/engine/api/v1.41/#operation/SystemVersion
export async function systemVersion(client: Client): Promise<DockerVersion> {
  const response = await client.get("/version");

  return Promise.resolve(response.body as DockerVersion);
}

export async function systemVersionValue(client: Client): Promise<string> {
  const object = await systemVersion(client);

  return Promise.resolve(object.Version);
}

// https://docs.docker.com/engine/api/v1.41/#operation/SystemPingHead
export async function ping(client: Client): Promise<boolean> {
  const response = await client.head("/_ping");

  return Promise.resolve(response.status === HttpStatus.Ok);
}

// https://docs.docker.com/engine/api/v1.41/#operation/SystemPing
export async function pingValue(client: Client): Promise<unknown> {
  const response = await client.get("/_ping");

  return Promise.resolve(response.body);
}
