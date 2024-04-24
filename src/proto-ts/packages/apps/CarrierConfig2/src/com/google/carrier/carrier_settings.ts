/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import Long = require("long");

export const protobufPackage = "com.google.carrier";

/**
 * Copyright (C) 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface Timestamp {
  seconds: number;
  nanos: number;
}

/**
 * Settings of one carrier, including apns and configs
 * This is the payload to be delivered from server
 */
export interface CarrierSettings {
  /** A unique canonical carrier name */
  canonicalName: string;
  /** Version number of current carrier’s settings */
  version: number;
  /** Carrier APNs */
  apns:
    | CarrierApns
    | undefined;
  /** Carrier configs */
  configs:
    | CarrierConfig
    | undefined;
  /** Vendor carrier configs */
  vendorConfigs: VendorConfigs | undefined;
  lastUpdated: Timestamp | undefined;
}

/** A collection of multiple carriers’ settings */
export interface MultiCarrierSettings {
  /** Version number */
  version: number;
  /** List of CarrierSettings */
  setting: CarrierSettings[];
  lastUpdated: Timestamp | undefined;
}

/** An access point name (aka. APN) entry */
export interface ApnItem {
  /**
   * The name of APN, map to xml apn "carrier" attribute
   * eg. Verizon Internet, may visible to user in Settings
   */
  name: string;
  /**
   * The value of APN, eg. send to modem for data call. map to xml
   * "apn" attribute, eg. vzwinternet
   */
  value: string;
  type: ApnItem_ApnType[];
  /**
   * Network types that this APN applies to, separated by "|". A network type
   * is represented as an integer defined in TelephonyManager.NETWORK_TYPE_*.
   * Default value "0" means all network types.
   */
  bearerBitmask: string;
  /**
   * Below are all parameters for the APN
   * APN server / auth parameters.
   */
  server: string;
  proxy: string;
  port: string;
  user: string;
  password: string;
  authtype: number;
  /** MMS configuration. */
  mmsc: string;
  mmscProxy: string;
  mmscProxyPort: string;
  protocol: ApnItem_Protocol;
  roamingProtocol: ApnItem_Protocol;
  /** MTU for the connections. */
  mtu: number;
  /** An ID used to sync the APN in modem. */
  profileId: number;
  /** Max connections. */
  maxConns: number;
  /** The wait time required between disconnecting and connecting, in seconds. */
  waitTime: number;
  /** The time to limit max connection, in seconds. */
  maxConnsTime: number;
  /** Whether to be persisted to modem. */
  modemCognitive: boolean;
  /** Whether visible in APN settings. */
  userVisible: boolean;
  /** Whether editable in APN settings. */
  userEditable: boolean;
  /**
   * If > 0: when an APN becomes a preferred APN on user/framework
   * selection, other APNs with the same apn_set_id will also be preferred
   * by framework when selecting APNs.
   */
  apnSetId: number;
  skip464xlat: ApnItem_Xlat;
  lingeringNetworkTypeBitmask: string;
  alwaysOn: boolean;
  mtuV6: number;
}

/**
 * Next two fields type and bearer_bitmask affect how APN is selected by
 * platform. eg. type means APN capability and bearer_bitmask specifies
 * which RATs apply.
 * Note mcc/mnc and mvno data doesn't belong to this proto because they
 * define a carrier.
 * APN types as defined in Android code PhoneConstants.java
 */
export enum ApnItem_ApnType {
  /** ALL - this APN can serve all kinds of data connections */
  ALL = 0,
  /** DEFAULT - internet data */
  DEFAULT = 1,
  MMS = 2,
  SUPL = 3,
  DUN = 4,
  HIPRI = 5,
  FOTA = 6,
  IMS = 7,
  CBS = 8,
  /** IA - Initial attach */
  IA = 9,
  EMERGENCY = 10,
  XCAP = 11,
  UT = 12,
  RCS = 13,
  UNRECOGNIZED = -1,
}

export function apnItem_ApnTypeFromJSON(object: any): ApnItem_ApnType {
  switch (object) {
    case 0:
    case "ALL":
      return ApnItem_ApnType.ALL;
    case 1:
    case "DEFAULT":
      return ApnItem_ApnType.DEFAULT;
    case 2:
    case "MMS":
      return ApnItem_ApnType.MMS;
    case 3:
    case "SUPL":
      return ApnItem_ApnType.SUPL;
    case 4:
    case "DUN":
      return ApnItem_ApnType.DUN;
    case 5:
    case "HIPRI":
      return ApnItem_ApnType.HIPRI;
    case 6:
    case "FOTA":
      return ApnItem_ApnType.FOTA;
    case 7:
    case "IMS":
      return ApnItem_ApnType.IMS;
    case 8:
    case "CBS":
      return ApnItem_ApnType.CBS;
    case 9:
    case "IA":
      return ApnItem_ApnType.IA;
    case 10:
    case "EMERGENCY":
      return ApnItem_ApnType.EMERGENCY;
    case 11:
    case "XCAP":
      return ApnItem_ApnType.XCAP;
    case 12:
    case "UT":
      return ApnItem_ApnType.UT;
    case 13:
    case "RCS":
      return ApnItem_ApnType.RCS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ApnItem_ApnType.UNRECOGNIZED;
  }
}

export function apnItem_ApnTypeToJSON(object: ApnItem_ApnType): string {
  switch (object) {
    case ApnItem_ApnType.ALL:
      return "ALL";
    case ApnItem_ApnType.DEFAULT:
      return "DEFAULT";
    case ApnItem_ApnType.MMS:
      return "MMS";
    case ApnItem_ApnType.SUPL:
      return "SUPL";
    case ApnItem_ApnType.DUN:
      return "DUN";
    case ApnItem_ApnType.HIPRI:
      return "HIPRI";
    case ApnItem_ApnType.FOTA:
      return "FOTA";
    case ApnItem_ApnType.IMS:
      return "IMS";
    case ApnItem_ApnType.CBS:
      return "CBS";
    case ApnItem_ApnType.IA:
      return "IA";
    case ApnItem_ApnType.EMERGENCY:
      return "EMERGENCY";
    case ApnItem_ApnType.XCAP:
      return "XCAP";
    case ApnItem_ApnType.UT:
      return "UT";
    case ApnItem_ApnType.RCS:
      return "RCS";
    case ApnItem_ApnType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Protocols allowed to connect to the APN. */
export enum ApnItem_Protocol {
  IP = 0,
  IPV6 = 1,
  IPV4V6 = 2,
  PPP = 3,
  UNRECOGNIZED = -1,
}

export function apnItem_ProtocolFromJSON(object: any): ApnItem_Protocol {
  switch (object) {
    case 0:
    case "IP":
      return ApnItem_Protocol.IP;
    case 1:
    case "IPV6":
      return ApnItem_Protocol.IPV6;
    case 2:
    case "IPV4V6":
      return ApnItem_Protocol.IPV4V6;
    case 3:
    case "PPP":
      return ApnItem_Protocol.PPP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ApnItem_Protocol.UNRECOGNIZED;
  }
}

export function apnItem_ProtocolToJSON(object: ApnItem_Protocol): string {
  switch (object) {
    case ApnItem_Protocol.IP:
      return "IP";
    case ApnItem_Protocol.IPV6:
      return "IPV6";
    case ApnItem_Protocol.IPV4V6:
      return "IPV4V6";
    case ApnItem_Protocol.PPP:
      return "PPP";
    case ApnItem_Protocol.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The skip 464xlat flag. Flag works as follows.
 * SKIP_464XLAT_DEFAULT: the APN will skip 464xlat only if the APN has type
 *                       IMS and does not support INTERNET which has type
 *                       DEFAULT or HIPRI.
 * SKIP_464XLAT_DISABLE: the APN will NOT skip 464xlat
 * SKIP_464XLAT_ENABLE: the APN will skip 464xlat
 */
export enum ApnItem_Xlat {
  SKIP_464XLAT_DEFAULT = 0,
  SKIP_464XLAT_DISABLE = 1,
  SKIP_464XLAT_ENABLE = 2,
  UNRECOGNIZED = -1,
}

export function apnItem_XlatFromJSON(object: any): ApnItem_Xlat {
  switch (object) {
    case 0:
    case "SKIP_464XLAT_DEFAULT":
      return ApnItem_Xlat.SKIP_464XLAT_DEFAULT;
    case 1:
    case "SKIP_464XLAT_DISABLE":
      return ApnItem_Xlat.SKIP_464XLAT_DISABLE;
    case 2:
    case "SKIP_464XLAT_ENABLE":
      return ApnItem_Xlat.SKIP_464XLAT_ENABLE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ApnItem_Xlat.UNRECOGNIZED;
  }
}

export function apnItem_XlatToJSON(object: ApnItem_Xlat): string {
  switch (object) {
    case ApnItem_Xlat.SKIP_464XLAT_DEFAULT:
      return "SKIP_464XLAT_DEFAULT";
    case ApnItem_Xlat.SKIP_464XLAT_DISABLE:
      return "SKIP_464XLAT_DISABLE";
    case ApnItem_Xlat.SKIP_464XLAT_ENABLE:
      return "SKIP_464XLAT_ENABLE";
    case ApnItem_Xlat.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** A collection of all APNs for a carrier */
export interface CarrierApns {
  /** APNs belong to this carrier */
  apn: ApnItem[];
}

/** An array of text */
export interface TextArray {
  item: string[];
}

/** An array of int */
export interface IntArray {
  item: number[];
}

/** Carrier configs */
export interface CarrierConfig {
  /** Key-value pairs, holding all config entries */
  config: CarrierConfig_Config[];
}

/** Key-Value pair as a config entry */
export interface CarrierConfig_Config {
  key: string;
  textValue?: string | undefined;
  intValue?: number | undefined;
  longValue?: number | undefined;
  boolValue?: boolean | undefined;
  textArray?: TextArray | undefined;
  intArray?: IntArray | undefined;
  bundle?: CarrierConfig | undefined;
  doubleValue?: number | undefined;
}

/** The configs of one vendor client. */
export interface VendorConfigClient {
  /**
   * Name of the client for which the configuration items need to
   * be stored
   */
  name: string;
  /**
   * Binary blob containing the configuration. The format
   * of the configuration depends on the specific client.
   * For some clients, the proto representation of {@link VendorConfigData}
   * defined in vendorconfigdata.proto is used.
   */
  value: Uint8Array;
}

/** A collection of configs from vendor clients. */
export interface VendorConfigs {
  /** Configuration */
  client: VendorConfigClient[];
}

function createBaseTimestamp(): Timestamp {
  return { seconds: 0, nanos: 0 };
}

export const Timestamp = {
  encode(message: Timestamp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.seconds !== 0) {
      writer.uint32(8).int64(message.seconds);
    }
    if (message.nanos !== 0) {
      writer.uint32(16).int32(message.nanos);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Timestamp {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimestamp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.seconds = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.nanos = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Timestamp {
    return {
      seconds: isSet(object.seconds) ? Number(object.seconds) : 0,
      nanos: isSet(object.nanos) ? Number(object.nanos) : 0,
    };
  },

  toJSON(message: Timestamp): unknown {
    const obj: any = {};
    if (message.seconds !== 0) {
      obj.seconds = Math.round(message.seconds);
    }
    if (message.nanos !== 0) {
      obj.nanos = Math.round(message.nanos);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Timestamp>, I>>(base?: I): Timestamp {
    return Timestamp.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Timestamp>, I>>(object: I): Timestamp {
    const message = createBaseTimestamp();
    message.seconds = object.seconds ?? 0;
    message.nanos = object.nanos ?? 0;
    return message;
  },
};

function createBaseCarrierSettings(): CarrierSettings {
  return {
    canonicalName: "",
    version: 0,
    apns: undefined,
    configs: undefined,
    vendorConfigs: undefined,
    lastUpdated: undefined,
  };
}

export const CarrierSettings = {
  encode(message: CarrierSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.canonicalName !== "") {
      writer.uint32(10).string(message.canonicalName);
    }
    if (message.version !== 0) {
      writer.uint32(16).int64(message.version);
    }
    if (message.apns !== undefined) {
      CarrierApns.encode(message.apns, writer.uint32(26).fork()).ldelim();
    }
    if (message.configs !== undefined) {
      CarrierConfig.encode(message.configs, writer.uint32(34).fork()).ldelim();
    }
    if (message.vendorConfigs !== undefined) {
      VendorConfigs.encode(message.vendorConfigs, writer.uint32(50).fork()).ldelim();
    }
    if (message.lastUpdated !== undefined) {
      Timestamp.encode(message.lastUpdated, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CarrierSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCarrierSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.canonicalName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.version = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.apns = CarrierApns.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.configs = CarrierConfig.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.vendorConfigs = VendorConfigs.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.lastUpdated = Timestamp.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CarrierSettings {
    return {
      canonicalName: isSet(object.canonicalName) ? String(object.canonicalName) : "",
      version: isSet(object.version) ? Number(object.version) : 0,
      apns: isSet(object.apns) ? CarrierApns.fromJSON(object.apns) : undefined,
      configs: isSet(object.configs) ? CarrierConfig.fromJSON(object.configs) : undefined,
      vendorConfigs: isSet(object.vendorConfigs) ? VendorConfigs.fromJSON(object.vendorConfigs) : undefined,
      lastUpdated: isSet(object.lastUpdated) ? Timestamp.fromJSON(object.lastUpdated) : undefined,
    };
  },

  toJSON(message: CarrierSettings): unknown {
    const obj: any = {};
    if (message.canonicalName !== "") {
      obj.canonicalName = message.canonicalName;
    }
    if (message.version !== 0) {
      obj.version = Math.round(message.version);
    }
    if (message.apns !== undefined) {
      obj.apns = CarrierApns.toJSON(message.apns);
    }
    if (message.configs !== undefined) {
      obj.configs = CarrierConfig.toJSON(message.configs);
    }
    if (message.vendorConfigs !== undefined) {
      obj.vendorConfigs = VendorConfigs.toJSON(message.vendorConfigs);
    }
    if (message.lastUpdated !== undefined) {
      obj.lastUpdated = Timestamp.toJSON(message.lastUpdated);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CarrierSettings>, I>>(base?: I): CarrierSettings {
    return CarrierSettings.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CarrierSettings>, I>>(object: I): CarrierSettings {
    const message = createBaseCarrierSettings();
    message.canonicalName = object.canonicalName ?? "";
    message.version = object.version ?? 0;
    message.apns = (object.apns !== undefined && object.apns !== null)
      ? CarrierApns.fromPartial(object.apns)
      : undefined;
    message.configs = (object.configs !== undefined && object.configs !== null)
      ? CarrierConfig.fromPartial(object.configs)
      : undefined;
    message.vendorConfigs = (object.vendorConfigs !== undefined && object.vendorConfigs !== null)
      ? VendorConfigs.fromPartial(object.vendorConfigs)
      : undefined;
    message.lastUpdated = (object.lastUpdated !== undefined && object.lastUpdated !== null)
      ? Timestamp.fromPartial(object.lastUpdated)
      : undefined;
    return message;
  },
};

function createBaseMultiCarrierSettings(): MultiCarrierSettings {
  return { version: 0, setting: [], lastUpdated: undefined };
}

export const MultiCarrierSettings = {
  encode(message: MultiCarrierSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== 0) {
      writer.uint32(8).int64(message.version);
    }
    for (const v of message.setting) {
      CarrierSettings.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.lastUpdated !== undefined) {
      Timestamp.encode(message.lastUpdated, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MultiCarrierSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultiCarrierSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.version = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.setting.push(CarrierSettings.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lastUpdated = Timestamp.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MultiCarrierSettings {
    return {
      version: isSet(object.version) ? Number(object.version) : 0,
      setting: Array.isArray(object?.setting) ? object.setting.map((e: any) => CarrierSettings.fromJSON(e)) : [],
      lastUpdated: isSet(object.lastUpdated) ? Timestamp.fromJSON(object.lastUpdated) : undefined,
    };
  },

  toJSON(message: MultiCarrierSettings): unknown {
    const obj: any = {};
    if (message.version !== 0) {
      obj.version = Math.round(message.version);
    }
    if (message.setting?.length) {
      obj.setting = message.setting.map((e) => CarrierSettings.toJSON(e));
    }
    if (message.lastUpdated !== undefined) {
      obj.lastUpdated = Timestamp.toJSON(message.lastUpdated);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MultiCarrierSettings>, I>>(base?: I): MultiCarrierSettings {
    return MultiCarrierSettings.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MultiCarrierSettings>, I>>(object: I): MultiCarrierSettings {
    const message = createBaseMultiCarrierSettings();
    message.version = object.version ?? 0;
    message.setting = object.setting?.map((e) => CarrierSettings.fromPartial(e)) || [];
    message.lastUpdated = (object.lastUpdated !== undefined && object.lastUpdated !== null)
      ? Timestamp.fromPartial(object.lastUpdated)
      : undefined;
    return message;
  },
};

function createBaseApnItem(): ApnItem {
  return {
    name: "",
    value: "",
    type: [],
    bearerBitmask: "",
    server: "",
    proxy: "",
    port: "",
    user: "",
    password: "",
    authtype: 0,
    mmsc: "",
    mmscProxy: "",
    mmscProxyPort: "",
    protocol: 0,
    roamingProtocol: 0,
    mtu: 0,
    profileId: 0,
    maxConns: 0,
    waitTime: 0,
    maxConnsTime: 0,
    modemCognitive: false,
    userVisible: false,
    userEditable: false,
    apnSetId: 0,
    skip464xlat: 0,
    lingeringNetworkTypeBitmask: "",
    alwaysOn: false,
    mtuV6: 0,
  };
}

export const ApnItem = {
  encode(message: ApnItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    writer.uint32(26).fork();
    for (const v of message.type) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.bearerBitmask !== "") {
      writer.uint32(34).string(message.bearerBitmask);
    }
    if (message.server !== "") {
      writer.uint32(42).string(message.server);
    }
    if (message.proxy !== "") {
      writer.uint32(50).string(message.proxy);
    }
    if (message.port !== "") {
      writer.uint32(58).string(message.port);
    }
    if (message.user !== "") {
      writer.uint32(66).string(message.user);
    }
    if (message.password !== "") {
      writer.uint32(74).string(message.password);
    }
    if (message.authtype !== 0) {
      writer.uint32(80).int32(message.authtype);
    }
    if (message.mmsc !== "") {
      writer.uint32(90).string(message.mmsc);
    }
    if (message.mmscProxy !== "") {
      writer.uint32(98).string(message.mmscProxy);
    }
    if (message.mmscProxyPort !== "") {
      writer.uint32(106).string(message.mmscProxyPort);
    }
    if (message.protocol !== 0) {
      writer.uint32(112).int32(message.protocol);
    }
    if (message.roamingProtocol !== 0) {
      writer.uint32(120).int32(message.roamingProtocol);
    }
    if (message.mtu !== 0) {
      writer.uint32(128).int32(message.mtu);
    }
    if (message.profileId !== 0) {
      writer.uint32(136).int32(message.profileId);
    }
    if (message.maxConns !== 0) {
      writer.uint32(144).int32(message.maxConns);
    }
    if (message.waitTime !== 0) {
      writer.uint32(152).int32(message.waitTime);
    }
    if (message.maxConnsTime !== 0) {
      writer.uint32(160).int32(message.maxConnsTime);
    }
    if (message.modemCognitive === true) {
      writer.uint32(176).bool(message.modemCognitive);
    }
    if (message.userVisible === true) {
      writer.uint32(184).bool(message.userVisible);
    }
    if (message.userEditable === true) {
      writer.uint32(192).bool(message.userEditable);
    }
    if (message.apnSetId !== 0) {
      writer.uint32(200).int32(message.apnSetId);
    }
    if (message.skip464xlat !== 0) {
      writer.uint32(208).int32(message.skip464xlat);
    }
    if (message.lingeringNetworkTypeBitmask !== "") {
      writer.uint32(218).string(message.lingeringNetworkTypeBitmask);
    }
    if (message.alwaysOn === true) {
      writer.uint32(224).bool(message.alwaysOn);
    }
    if (message.mtuV6 !== 0) {
      writer.uint32(232).int32(message.mtuV6);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApnItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApnItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
        case 3:
          if (tag === 24) {
            message.type.push(reader.int32() as any);

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.type.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.bearerBitmask = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.server = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.proxy = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.port = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.user = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.password = reader.string();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.authtype = reader.int32();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.mmsc = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.mmscProxy = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.mmscProxyPort = reader.string();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.protocol = reader.int32() as any;
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.roamingProtocol = reader.int32() as any;
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.mtu = reader.int32();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.profileId = reader.int32();
          continue;
        case 18:
          if (tag !== 144) {
            break;
          }

          message.maxConns = reader.int32();
          continue;
        case 19:
          if (tag !== 152) {
            break;
          }

          message.waitTime = reader.int32();
          continue;
        case 20:
          if (tag !== 160) {
            break;
          }

          message.maxConnsTime = reader.int32();
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.modemCognitive = reader.bool();
          continue;
        case 23:
          if (tag !== 184) {
            break;
          }

          message.userVisible = reader.bool();
          continue;
        case 24:
          if (tag !== 192) {
            break;
          }

          message.userEditable = reader.bool();
          continue;
        case 25:
          if (tag !== 200) {
            break;
          }

          message.apnSetId = reader.int32();
          continue;
        case 26:
          if (tag !== 208) {
            break;
          }

          message.skip464xlat = reader.int32() as any;
          continue;
        case 27:
          if (tag !== 218) {
            break;
          }

          message.lingeringNetworkTypeBitmask = reader.string();
          continue;
        case 28:
          if (tag !== 224) {
            break;
          }

          message.alwaysOn = reader.bool();
          continue;
        case 29:
          if (tag !== 232) {
            break;
          }

          message.mtuV6 = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ApnItem {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      value: isSet(object.value) ? String(object.value) : "",
      type: Array.isArray(object?.type) ? object.type.map((e: any) => apnItem_ApnTypeFromJSON(e)) : [],
      bearerBitmask: isSet(object.bearerBitmask) ? String(object.bearerBitmask) : "",
      server: isSet(object.server) ? String(object.server) : "",
      proxy: isSet(object.proxy) ? String(object.proxy) : "",
      port: isSet(object.port) ? String(object.port) : "",
      user: isSet(object.user) ? String(object.user) : "",
      password: isSet(object.password) ? String(object.password) : "",
      authtype: isSet(object.authtype) ? Number(object.authtype) : 0,
      mmsc: isSet(object.mmsc) ? String(object.mmsc) : "",
      mmscProxy: isSet(object.mmscProxy) ? String(object.mmscProxy) : "",
      mmscProxyPort: isSet(object.mmscProxyPort) ? String(object.mmscProxyPort) : "",
      protocol: isSet(object.protocol) ? apnItem_ProtocolFromJSON(object.protocol) : 0,
      roamingProtocol: isSet(object.roamingProtocol) ? apnItem_ProtocolFromJSON(object.roamingProtocol) : 0,
      mtu: isSet(object.mtu) ? Number(object.mtu) : 0,
      profileId: isSet(object.profileId) ? Number(object.profileId) : 0,
      maxConns: isSet(object.maxConns) ? Number(object.maxConns) : 0,
      waitTime: isSet(object.waitTime) ? Number(object.waitTime) : 0,
      maxConnsTime: isSet(object.maxConnsTime) ? Number(object.maxConnsTime) : 0,
      modemCognitive: isSet(object.modemCognitive) ? Boolean(object.modemCognitive) : false,
      userVisible: isSet(object.userVisible) ? Boolean(object.userVisible) : false,
      userEditable: isSet(object.userEditable) ? Boolean(object.userEditable) : false,
      apnSetId: isSet(object.apnSetId) ? Number(object.apnSetId) : 0,
      skip464xlat: isSet(object.skip464xlat) ? apnItem_XlatFromJSON(object.skip464xlat) : 0,
      lingeringNetworkTypeBitmask: isSet(object.lingeringNetworkTypeBitmask)
        ? String(object.lingeringNetworkTypeBitmask)
        : "",
      alwaysOn: isSet(object.alwaysOn) ? Boolean(object.alwaysOn) : false,
      mtuV6: isSet(object.mtuV6) ? Number(object.mtuV6) : 0,
    };
  },

  toJSON(message: ApnItem): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    if (message.type?.length) {
      obj.type = message.type.map((e) => apnItem_ApnTypeToJSON(e));
    }
    if (message.bearerBitmask !== "") {
      obj.bearerBitmask = message.bearerBitmask;
    }
    if (message.server !== "") {
      obj.server = message.server;
    }
    if (message.proxy !== "") {
      obj.proxy = message.proxy;
    }
    if (message.port !== "") {
      obj.port = message.port;
    }
    if (message.user !== "") {
      obj.user = message.user;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    if (message.authtype !== 0) {
      obj.authtype = Math.round(message.authtype);
    }
    if (message.mmsc !== "") {
      obj.mmsc = message.mmsc;
    }
    if (message.mmscProxy !== "") {
      obj.mmscProxy = message.mmscProxy;
    }
    if (message.mmscProxyPort !== "") {
      obj.mmscProxyPort = message.mmscProxyPort;
    }
    if (message.protocol !== 0) {
      obj.protocol = apnItem_ProtocolToJSON(message.protocol);
    }
    if (message.roamingProtocol !== 0) {
      obj.roamingProtocol = apnItem_ProtocolToJSON(message.roamingProtocol);
    }
    if (message.mtu !== 0) {
      obj.mtu = Math.round(message.mtu);
    }
    if (message.profileId !== 0) {
      obj.profileId = Math.round(message.profileId);
    }
    if (message.maxConns !== 0) {
      obj.maxConns = Math.round(message.maxConns);
    }
    if (message.waitTime !== 0) {
      obj.waitTime = Math.round(message.waitTime);
    }
    if (message.maxConnsTime !== 0) {
      obj.maxConnsTime = Math.round(message.maxConnsTime);
    }
    if (message.modemCognitive === true) {
      obj.modemCognitive = message.modemCognitive;
    }
    if (message.userVisible === true) {
      obj.userVisible = message.userVisible;
    }
    if (message.userEditable === true) {
      obj.userEditable = message.userEditable;
    }
    if (message.apnSetId !== 0) {
      obj.apnSetId = Math.round(message.apnSetId);
    }
    if (message.skip464xlat !== 0) {
      obj.skip464xlat = apnItem_XlatToJSON(message.skip464xlat);
    }
    if (message.lingeringNetworkTypeBitmask !== "") {
      obj.lingeringNetworkTypeBitmask = message.lingeringNetworkTypeBitmask;
    }
    if (message.alwaysOn === true) {
      obj.alwaysOn = message.alwaysOn;
    }
    if (message.mtuV6 !== 0) {
      obj.mtuV6 = Math.round(message.mtuV6);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ApnItem>, I>>(base?: I): ApnItem {
    return ApnItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ApnItem>, I>>(object: I): ApnItem {
    const message = createBaseApnItem();
    message.name = object.name ?? "";
    message.value = object.value ?? "";
    message.type = object.type?.map((e) => e) || [];
    message.bearerBitmask = object.bearerBitmask ?? "";
    message.server = object.server ?? "";
    message.proxy = object.proxy ?? "";
    message.port = object.port ?? "";
    message.user = object.user ?? "";
    message.password = object.password ?? "";
    message.authtype = object.authtype ?? 0;
    message.mmsc = object.mmsc ?? "";
    message.mmscProxy = object.mmscProxy ?? "";
    message.mmscProxyPort = object.mmscProxyPort ?? "";
    message.protocol = object.protocol ?? 0;
    message.roamingProtocol = object.roamingProtocol ?? 0;
    message.mtu = object.mtu ?? 0;
    message.profileId = object.profileId ?? 0;
    message.maxConns = object.maxConns ?? 0;
    message.waitTime = object.waitTime ?? 0;
    message.maxConnsTime = object.maxConnsTime ?? 0;
    message.modemCognitive = object.modemCognitive ?? false;
    message.userVisible = object.userVisible ?? false;
    message.userEditable = object.userEditable ?? false;
    message.apnSetId = object.apnSetId ?? 0;
    message.skip464xlat = object.skip464xlat ?? 0;
    message.lingeringNetworkTypeBitmask = object.lingeringNetworkTypeBitmask ?? "";
    message.alwaysOn = object.alwaysOn ?? false;
    message.mtuV6 = object.mtuV6 ?? 0;
    return message;
  },
};

function createBaseCarrierApns(): CarrierApns {
  return { apn: [] };
}

export const CarrierApns = {
  encode(message: CarrierApns, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.apn) {
      ApnItem.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CarrierApns {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCarrierApns();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.apn.push(ApnItem.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CarrierApns {
    return { apn: Array.isArray(object?.apn) ? object.apn.map((e: any) => ApnItem.fromJSON(e)) : [] };
  },

  toJSON(message: CarrierApns): unknown {
    const obj: any = {};
    if (message.apn?.length) {
      obj.apn = message.apn.map((e) => ApnItem.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CarrierApns>, I>>(base?: I): CarrierApns {
    return CarrierApns.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CarrierApns>, I>>(object: I): CarrierApns {
    const message = createBaseCarrierApns();
    message.apn = object.apn?.map((e) => ApnItem.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTextArray(): TextArray {
  return { item: [] };
}

export const TextArray = {
  encode(message: TextArray, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.item) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TextArray {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTextArray();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.item.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TextArray {
    return { item: Array.isArray(object?.item) ? object.item.map((e: any) => String(e)) : [] };
  },

  toJSON(message: TextArray): unknown {
    const obj: any = {};
    if (message.item?.length) {
      obj.item = message.item;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TextArray>, I>>(base?: I): TextArray {
    return TextArray.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TextArray>, I>>(object: I): TextArray {
    const message = createBaseTextArray();
    message.item = object.item?.map((e) => e) || [];
    return message;
  },
};

function createBaseIntArray(): IntArray {
  return { item: [] };
}

export const IntArray = {
  encode(message: IntArray, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.item) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntArray {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntArray();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.item.push(reader.int32());

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.item.push(reader.int32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IntArray {
    return { item: Array.isArray(object?.item) ? object.item.map((e: any) => Number(e)) : [] };
  },

  toJSON(message: IntArray): unknown {
    const obj: any = {};
    if (message.item?.length) {
      obj.item = message.item.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IntArray>, I>>(base?: I): IntArray {
    return IntArray.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IntArray>, I>>(object: I): IntArray {
    const message = createBaseIntArray();
    message.item = object.item?.map((e) => e) || [];
    return message;
  },
};

function createBaseCarrierConfig(): CarrierConfig {
  return { config: [] };
}

export const CarrierConfig = {
  encode(message: CarrierConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.config) {
      CarrierConfig_Config.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CarrierConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCarrierConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.config.push(CarrierConfig_Config.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CarrierConfig {
    return {
      config: Array.isArray(object?.config) ? object.config.map((e: any) => CarrierConfig_Config.fromJSON(e)) : [],
    };
  },

  toJSON(message: CarrierConfig): unknown {
    const obj: any = {};
    if (message.config?.length) {
      obj.config = message.config.map((e) => CarrierConfig_Config.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CarrierConfig>, I>>(base?: I): CarrierConfig {
    return CarrierConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CarrierConfig>, I>>(object: I): CarrierConfig {
    const message = createBaseCarrierConfig();
    message.config = object.config?.map((e) => CarrierConfig_Config.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCarrierConfig_Config(): CarrierConfig_Config {
  return {
    key: "",
    textValue: undefined,
    intValue: undefined,
    longValue: undefined,
    boolValue: undefined,
    textArray: undefined,
    intArray: undefined,
    bundle: undefined,
    doubleValue: undefined,
  };
}

export const CarrierConfig_Config = {
  encode(message: CarrierConfig_Config, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.textValue !== undefined) {
      writer.uint32(18).string(message.textValue);
    }
    if (message.intValue !== undefined) {
      writer.uint32(24).int32(message.intValue);
    }
    if (message.longValue !== undefined) {
      writer.uint32(32).int64(message.longValue);
    }
    if (message.boolValue !== undefined) {
      writer.uint32(40).bool(message.boolValue);
    }
    if (message.textArray !== undefined) {
      TextArray.encode(message.textArray, writer.uint32(50).fork()).ldelim();
    }
    if (message.intArray !== undefined) {
      IntArray.encode(message.intArray, writer.uint32(58).fork()).ldelim();
    }
    if (message.bundle !== undefined) {
      CarrierConfig.encode(message.bundle, writer.uint32(66).fork()).ldelim();
    }
    if (message.doubleValue !== undefined) {
      writer.uint32(73).double(message.doubleValue);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CarrierConfig_Config {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCarrierConfig_Config();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.textValue = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.intValue = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.longValue = longToNumber(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.boolValue = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.textArray = TextArray.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.intArray = IntArray.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.bundle = CarrierConfig.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 73) {
            break;
          }

          message.doubleValue = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CarrierConfig_Config {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      textValue: isSet(object.textValue) ? String(object.textValue) : undefined,
      intValue: isSet(object.intValue) ? Number(object.intValue) : undefined,
      longValue: isSet(object.longValue) ? Number(object.longValue) : undefined,
      boolValue: isSet(object.boolValue) ? Boolean(object.boolValue) : undefined,
      textArray: isSet(object.textArray) ? TextArray.fromJSON(object.textArray) : undefined,
      intArray: isSet(object.intArray) ? IntArray.fromJSON(object.intArray) : undefined,
      bundle: isSet(object.bundle) ? CarrierConfig.fromJSON(object.bundle) : undefined,
      doubleValue: isSet(object.doubleValue) ? Number(object.doubleValue) : undefined,
    };
  },

  toJSON(message: CarrierConfig_Config): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.textValue !== undefined) {
      obj.textValue = message.textValue;
    }
    if (message.intValue !== undefined) {
      obj.intValue = Math.round(message.intValue);
    }
    if (message.longValue !== undefined) {
      obj.longValue = Math.round(message.longValue);
    }
    if (message.boolValue !== undefined) {
      obj.boolValue = message.boolValue;
    }
    if (message.textArray !== undefined) {
      obj.textArray = TextArray.toJSON(message.textArray);
    }
    if (message.intArray !== undefined) {
      obj.intArray = IntArray.toJSON(message.intArray);
    }
    if (message.bundle !== undefined) {
      obj.bundle = CarrierConfig.toJSON(message.bundle);
    }
    if (message.doubleValue !== undefined) {
      obj.doubleValue = message.doubleValue;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CarrierConfig_Config>, I>>(base?: I): CarrierConfig_Config {
    return CarrierConfig_Config.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CarrierConfig_Config>, I>>(object: I): CarrierConfig_Config {
    const message = createBaseCarrierConfig_Config();
    message.key = object.key ?? "";
    message.textValue = object.textValue ?? undefined;
    message.intValue = object.intValue ?? undefined;
    message.longValue = object.longValue ?? undefined;
    message.boolValue = object.boolValue ?? undefined;
    message.textArray = (object.textArray !== undefined && object.textArray !== null)
      ? TextArray.fromPartial(object.textArray)
      : undefined;
    message.intArray = (object.intArray !== undefined && object.intArray !== null)
      ? IntArray.fromPartial(object.intArray)
      : undefined;
    message.bundle = (object.bundle !== undefined && object.bundle !== null)
      ? CarrierConfig.fromPartial(object.bundle)
      : undefined;
    message.doubleValue = object.doubleValue ?? undefined;
    return message;
  },
};

function createBaseVendorConfigClient(): VendorConfigClient {
  return { name: "", value: new Uint8Array(0) };
}

export const VendorConfigClient = {
  encode(message: VendorConfigClient, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VendorConfigClient {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVendorConfigClient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VendorConfigClient {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
    };
  },

  toJSON(message: VendorConfigClient): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VendorConfigClient>, I>>(base?: I): VendorConfigClient {
    return VendorConfigClient.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VendorConfigClient>, I>>(object: I): VendorConfigClient {
    const message = createBaseVendorConfigClient();
    message.name = object.name ?? "";
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseVendorConfigs(): VendorConfigs {
  return { client: [] };
}

export const VendorConfigs = {
  encode(message: VendorConfigs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.client) {
      VendorConfigClient.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VendorConfigs {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVendorConfigs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.client.push(VendorConfigClient.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VendorConfigs {
    return {
      client: Array.isArray(object?.client) ? object.client.map((e: any) => VendorConfigClient.fromJSON(e)) : [],
    };
  },

  toJSON(message: VendorConfigs): unknown {
    const obj: any = {};
    if (message.client?.length) {
      obj.client = message.client.map((e) => VendorConfigClient.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VendorConfigs>, I>>(base?: I): VendorConfigs {
    return VendorConfigs.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VendorConfigs>, I>>(object: I): VendorConfigs {
    const message = createBaseVendorConfigs();
    message.client = object.client?.map((e) => VendorConfigClient.fromPartial(e)) || [];
    return message;
  },
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
