import { Anon } from "anon-protocol";
import { SocksProxyAgent } from "socks-proxy-agent";
import axios from "axios";

const socksPort: number = Number(process.env.SOCKS_PORT) || 1080;
const proxyURL = process.env.SOCKS_PROXY || `socks5://127.0.0.1`;
const proxyOptions = `${proxyURL}:${socksPort}`;
const anon = new Anon({ socksPort });
const httpsAgent = new SocksProxyAgent(proxyOptions);
const client = axios.create({ httpsAgent });

const isRunning = async (): Promise<boolean> => {
  return await anon.isRunning();
};

export { anon, client, isRunning };
