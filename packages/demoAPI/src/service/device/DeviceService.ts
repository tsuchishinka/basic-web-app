import { RequestFetchDevice, ResponseFetchDevice } from "./types";
import { DeviceRequestClient } from "./DeviceRequestClient";

interface IDeviceService {
  fetchDeviceList: (params: {
    name?: string;
    offset?: number;
    limit?: number;
  }) => Promise<ResponseFetchDevice>;
}

class DeviceService extends DeviceRequestClient implements IDeviceService {
  async fetchDeviceList(params: RequestFetchDevice) {
    const response = await this.get<ResponseFetchDevice>({
      url: "/device",
      params,
    });
    return response;
  }
}

export { DeviceService };
