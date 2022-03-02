import { Client } from "./client.ts";

enum ContainerPort {
  TCP = "tcp",
  UDP = "udp",
  SCTP = "sctp",
}

enum MountType {
  BIND = "bind",
  VOLUME = "volume",
  TMPFS = "tmpfs",
  NPIPE = "npipe",
}

enum MountConsistency {
  DEFAULT = "default",
  CONSISTENT = "consistent",
  CACHED = "cached",
  DELEGATED = "delegated",
}

export type Container = {
  Id: string;
  Names: Array<string>;
  Image: string;
  ImageID: string;
  Command: string;
  Created: number;
  Ports: Array<
    {
      IP?: string;
      PrivatePort: number;
      PublicPort?: number;
      Type: ContainerPort;
    }
  >;
  SizeRw: number;
  SizeRootFs: number;
  Labels: Record<string, string>;
  State: string;
  Status: string;
  HostConfig: {
    NetworkMode: string;
  };
  NetworkSettings: {
    Networks: Record<string, {
      IPAMConfig?: {
        IPv4Address: string;
        IPv6Address: string;
        LinkLocalIPs: Array<string>;
      };
      Links: Array<string>;
      Aliases: Array<string>;
      NetworkID: string;
      EndpointID: string;
      Gateway: string;
      IPAddress: string;
      IPPrefixLen: number;
      IPv6Gateway: string;
      GlobalIPv6Address: string;
      GlobalIPv6PrefixLen: number;
      MacAddress: string;
      DriverOpts?: Record<string, string>;
    }>;
  };
  Mounts: Array<
    {
      Target: string;
      Source: string;
      Type: MountType;
      ReadOnly: boolean;
      Consistency: MountConsistency;
      BindOptions?: {
        Propagation: string;
        NonRecursive: boolean;
      };
      VolumeOptions?: {
        NoCopy: boolean;
        Labels: Record<string, string>;
        DriverConfig?: {
          Name: string;
          Options: Record<string, string>;
        };
      };
      TmpfsOptions: {
        SizeBytes: number;
        Mode: number;
      };
    }
  >;
};

// https://docs.docker.com/engine/api/v1.41/#operation/ContainerList
export async function listContainers(
  client: Client,
): Promise<Array<Container>> {
  const response = await client.get("/containers/json");

  return Promise.resolve(response.body);
}

// https://docs.docker.com/engine/api/v1.41/#operation/ContainerInspect
export async function inspectContainer(
  client: Client,
  id: string,
): Promise<Record<string, string>> {
  const response = await client.get(`/containers/${id}/json`);

  return Promise.resolve(response.body);
}
