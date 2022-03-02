import { Helpers as http, HttpClient, HttpResponse } from "../deps.ts";

const TRANSPORT = "unix";
const DEFAULT_HEADERS = { "Host": "localhost", "Accept": "application/json" };

export class Client {
  private _httpClient?: HttpClient;

  constructor(
    private apiVersion: string = "v1.41",
    private socket: string = "/var/run/docker.sock",
  ) {}

  get httpClient(): Promise<HttpClient> {
    if (!this._httpClient) {
      const promise = Deno.connect({ path: this.socket, transport: TRANSPORT })
        .then((conn: Deno.Conn) => {
          return new HttpClient(conn);
        });

      return promise;
    }

    return Promise.resolve(this._httpClient);
  }

  public async head(
    path: string,
    headers: Record<string, string> = {},
  ): Promise<HttpResponse> {
    const mergedHheaders = Object.assign(headers, DEFAULT_HEADERS);
    const response = await http.head(
      await this.httpClient,
      `/${this.apiVersion}${path}`,
      mergedHheaders,
    );

    return Promise.resolve(response);
  }

  public async get(
    path: string,
    headers: Record<string, string> = {},
  ): Promise<HttpResponse> {
    const mergedHheaders = Object.assign(headers, DEFAULT_HEADERS);
    const response = await http.get(
      await this.httpClient,
      `/${this.apiVersion}${path}`,
      mergedHheaders,
    );

    return Promise.resolve(response);
  }
}
